"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type {
  SignatureInteraction,
  LightSimulatorData, AmbientSoundData, BeforeAfterSliderData,
  SeasonSwitchData, DetailExplorerData, ArtistCommentaryData, ColorPaletteExplorerData,
} from "@/data/narrativeModules";
import { AMBIENT_SYNTHS, type AmbientLoopHandle, type AmbientSynthKey } from "@/lib/ambientSoundSynth";

type AudioContextWindow = typeof window & { webkitAudioContext?: typeof AudioContext };

export default function SignatureInteraction({ interaction }: { interaction: SignatureInteraction }) {
  switch (interaction.type) {
    case "light-simulator":
      return <LightSimulator data={interaction.data as LightSimulatorData} />;
    case "ambient-sound":
      return <AmbientSound data={interaction.data as AmbientSoundData} />;
    case "before-after-slider":
      return <BeforeAfterSlider data={interaction.data as BeforeAfterSliderData} />;
    case "season-switch":
      return <SeasonSwitch data={interaction.data as SeasonSwitchData} />;
    case "detail-explorer":
      return <DetailExplorer data={interaction.data as DetailExplorerData} />;
    case "artist-commentary":
      return <ArtistCommentary data={interaction.data as ArtistCommentaryData} />;
    case "color-palette-explorer":
      return <ColorPaletteExplorer data={interaction.data as ColorPaletteExplorerData} />;
    default:
      return null;
  }
}

/* ── Light Simulator: 6 AM → 9 AM → 12 PM ─────────────────────────────── */
function LightSimulator({ data }: { data: LightSimulatorData }) {
  const [active, setActive] = useState(0);
  const states = data?.timeStates || [];

  if (!states.length) return null;

  return (
    <div className="signature-interaction signature-light-simulator">
      <div className="light-simulator-image">
        <Image
          src={states[active].image}
          alt={`${states[active].time} — ${states[active].description}`}
          fill
          sizes="(min-width: 980px) 70vw, 100vw"
          className="light-simulator-img"
        />
        <span className="light-simulator-time">{states[active].time}</span>
      </div>
      <div className="light-simulator-controls" role="tablist" aria-label="Time of day">
        {states.map((state, index: number) => (
          <button
            key={state.time}
            type="button"
            role="tab"
            aria-selected={active === index}
            className={`light-simulator-control ${active === index ? "is-active" : ""}`}
            onClick={() => setActive(index)}
          >
            {state.time}
          </button>
        ))}
      </div>
      <p className="light-simulator-description">{states[active].description}</p>
    </div>
  );
}

/* ── Ambient Sound: mood-based soundscape card ─────────────────────────── */
function AmbientSound({ data }: { data: AmbientSoundData }) {
  const sounds = data?.sounds || [];
  const interactive = sounds.some((sound) => sound.synth);

  const [playing, setPlaying] = useState<Set<AmbientSynthKey>>(new Set());
  const audioContextRef = useRef<AudioContext | null>(null);
  const loopsRef = useRef<Partial<Record<AmbientSynthKey, AmbientLoopHandle>>>({});

  function stopAllLoops() {
    Object.values(loopsRef.current).forEach((loop) => loop?.stop());
    loopsRef.current = {};
    audioContextRef.current?.close();
    audioContextRef.current = null;
  }

  useEffect(() => {
    return () => stopAllLoops();
  }, []);

  if (!sounds.length) return null;

  function ensureContext(): AudioContext | null {
    if (audioContextRef.current) return audioContextRef.current;
    const AudioContextCtor = window.AudioContext ?? (window as AudioContextWindow).webkitAudioContext;
    if (!AudioContextCtor) return null;
    audioContextRef.current = new AudioContextCtor();
    return audioContextRef.current;
  }

  function toggleSound(key: AmbientSynthKey) {
    const ctx = ensureContext();
    if (!ctx) return;

    setPlaying((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        loopsRef.current[key]?.stop();
        delete loopsRef.current[key];
        next.delete(key);
      } else {
        const loop = AMBIENT_SYNTHS[key](ctx, ctx.destination);
        loop.start();
        loopsRef.current[key] = loop;
        next.add(key);
      }
      return next;
    });
  }

  const synthKeys = sounds.map((sound) => sound.synth).filter((key): key is AmbientSynthKey => !!key);
  const allPlaying = synthKeys.length > 0 && synthKeys.every((key) => playing.has(key));

  function toggleRoom() {
    const ctx = ensureContext();
    if (!ctx) return;

    setPlaying((prev) => {
      const next = new Set(prev);
      if (allPlaying) {
        synthKeys.forEach((key) => {
          loopsRef.current[key]?.stop();
          delete loopsRef.current[key];
          next.delete(key);
        });
      } else {
        synthKeys.forEach((key) => {
          if (next.has(key)) return;
          const loop = AMBIENT_SYNTHS[key](ctx, ctx.destination);
          loop.start();
          loopsRef.current[key] = loop;
          next.add(key);
        });
      }
      return next;
    });
  }

  return (
    <div className="signature-interaction signature-ambient-sound">
      <div className="ambient-sound-visual" aria-hidden="true">
        {sounds.map((sound, index: number) => (
          <span
            key={sound.type}
            className={`ambient-sound-wave ambient-sound-wave--${index + 1}${sound.synth && playing.has(sound.synth) ? " is-playing" : ""}`}
          />
        ))}
      </div>
      {interactive ? (
        <>
          <div className="ambient-sound-list">
            {sounds.map((sound) => {
              const isPlaying = !!sound.synth && playing.has(sound.synth);
              return (
                <button
                  key={sound.type}
                  type="button"
                  className={`ambient-sound-item${isPlaying ? " is-playing" : ""}`}
                  aria-pressed={isPlaying}
                  aria-label={`${isPlaying ? "Stop" : "Play"} ${sound.type} sound`}
                  onClick={() => sound.synth && toggleSound(sound.synth)}
                >
                  <span className="ambient-sound-icon" aria-hidden="true">♪</span>
                  <p>
                    <strong>{sound.type}</strong>
                    <span>{sound.description}</span>
                  </p>
                </button>
              );
            })}
          </div>
          <button
            type="button"
            className={`ambient-sound-room-toggle${allPlaying ? " is-playing" : ""}`}
            aria-pressed={allPlaying}
            onClick={toggleRoom}
          >
            {allPlaying ? "Stop the room" : "Play the room"}
          </button>
        </>
      ) : (
        <div className="ambient-sound-list">
          {sounds.map((sound) => (
            <div key={sound.type} className="ambient-sound-item">
              <span className="ambient-sound-icon" aria-hidden="true">♪</span>
              <p>
                <strong>{sound.type}</strong>
                <span>{sound.description}</span>
              </p>
            </div>
          ))}
        </div>
      )}
      <p className="ambient-sound-hint">Imagine the room this painting lives in — this is what it sounds like.</p>
    </div>
  );
}

/* ── Before/After Slider: interactive horizontal comparison ────────────── */
function BeforeAfterSlider({ data }: { data: BeforeAfterSliderData }) {
  const [position, setPosition] = useState(50);
  const before = data?.beforeImage;
  const after = data?.afterImage;

  if (!before || !after) return null;

  return (
    <div className="signature-interaction signature-before-after">
      <div className="before-after-wrap" style={{ "--before-after-pos": `${position}%` } as React.CSSProperties}>
        <div className="before-after-image before-after-image--after">
          <Image src={after} alt={data?.afterLabel || "After"} fill sizes="(min-width: 980px) 70vw, 100vw" />
        </div>
        <div className="before-after-image before-after-image--before">
          <Image src={before} alt={data?.beforeLabel || "Before"} fill sizes="(min-width: 980px) 70vw, 100vw" />
        </div>
        <div className="before-after-divider" style={{ left: `${position}%` }}>
          <button
            type="button"
            className="before-after-handle"
            aria-label="Drag to compare before and after"
            onPointerDown={(e) => {
              const wrap = e.currentTarget.closest(".before-after-wrap") as HTMLElement;
              if (!wrap) return;
              const onMove = (ev: PointerEvent) => {
                const rect = wrap.getBoundingClientRect();
                const pct = Math.min(Math.max(((ev.clientX - rect.left) / rect.width) * 100, 0), 100);
                setPosition(pct);
              };
              const onUp = () => {
                window.removeEventListener("pointermove", onMove);
                window.removeEventListener("pointerup", onUp);
              };
              window.addEventListener("pointermove", onMove);
              window.addEventListener("pointerup", onUp);
            }}
          >
            <span>⇄</span>
          </button>
        </div>
      </div>
      <div className="before-after-labels">
        <span>{data?.beforeLabel || "Before"}</span>
        <span>{data?.afterLabel || "After"}</span>
      </div>
    </div>
  );
}

/* ── Season Switch: tabs showing the painting across seasons ───────────── */
function SeasonSwitch({ data }: { data: SeasonSwitchData }) {
  const [active, setActive] = useState(0);
  const seasons = data?.seasons || [];

  if (!seasons.length) return null;

  return (
    <div className="signature-interaction signature-season-switch">
      <div className="season-switch-image">
        <Image
          src={seasons[active].image}
          alt={`${seasons[active].season} — ${seasons[active].description}`}
          fill
          sizes="(min-width: 980px) 70vw, 100vw"
          className="season-switch-img"
        />
        <span className="season-switch-label">{seasons[active].season}</span>
      </div>
      <div className="season-switch-controls" role="tablist" aria-label="Season">
        {seasons.map((season, index: number) => (
          <button
            key={season.season}
            type="button"
            role="tab"
            aria-selected={active === index}
            className={`season-switch-control ${active === index ? "is-active" : ""}`}
            onClick={() => setActive(index)}
          >
            {season.season}
          </button>
        ))}
      </div>
      <p className="season-switch-description">{seasons[active].description}</p>
    </div>
  );
}

/* ── Detail Explorer: zoom into areas with stories ─────────────────────── */
function DetailExplorer({ data }: { data: DetailExplorerData }) {
  const [active, setActive] = useState(0);
  const details = data?.details || [];

  if (!details.length) return null;

  return (
    <div className="signature-interaction signature-detail-explorer">
      <div className="detail-explorer-main">
        <div className="detail-explorer-image">
          <Image
            src={details[active].image}
            alt={details[active].element}
            fill
            sizes="(min-width: 980px) 70vw, 100vw"
            className="detail-explorer-img"
          />
          {details[active].coordinates && (
            <span
              className="detail-explorer-marker"
              style={{
                left: `${details[active].coordinates.x}%`,
                top: `${details[active].coordinates.y}%`,
              }}
              aria-hidden="true"
            >
              +
            </span>
          )}
        </div>
        <div className="detail-explorer-stories">
          {details.map((detail, index: number) => (
            <button
              key={detail.element}
              type="button"
              className={`detail-explorer-tab ${active === index ? "is-active" : ""}`}
              onClick={() => setActive(index)}
            >
              {detail.element}
            </button>
          ))}
        </div>
        <p className="detail-explorer-story">{details[active].story}</p>
      </div>
    </div>
  );
}

/* ── Artist Commentary: personal note from Meenakshi ───────────────────── */
function ArtistCommentary({ data }: { data: ArtistCommentaryData }) {
  return (
    <div className="signature-interaction signature-artist-commentary">
      <div className="artist-commentary-quote">
        <span className="artist-commentary-mark" aria-hidden="true">&ldquo;</span>
        <p>{data?.text}</p>
        {data?.context && <p className="artist-commentary-context">{data.context}</p>}
        {data?.attribution && <p className="artist-commentary-attribution">— {data.attribution}</p>}
      </div>
    </div>
  );
}

/* ── Color Palette Explorer: interactive color breakdown ──────────────── */
function ColorPaletteExplorer({ data }: { data: ColorPaletteExplorerData }) {
  const [active, setActive] = useState(0);
  const colors = data?.colors || [];

  if (!colors.length) return null;

  return (
    <div className="signature-interaction signature-color-palette">
      <div className="color-palette-swatches">
        {colors.map((color, index: number) => (
          <button
            key={color.color}
            type="button"
            className={`color-palette-swatch ${active === index ? "is-active" : ""}`}
            style={{ backgroundColor: color.color }}
            aria-label={color.name || color.color}
            onClick={() => setActive(index)}
          />
        ))}
      </div>
      <div className="color-palette-detail">
        <p className="color-palette-name"><strong>{colors[active].name || colors[active].color}</strong></p>
        <p className="color-palette-role">{colors[active].role}</p>
        <p className="color-palette-reason">{colors[active].reasoning}</p>
      </div>
    </div>
  );
}