"use client";

import { useEffect, useRef, useState } from "react";
import { curriculumAudioLabels, type CurriculumAudioStyle } from "@/data/curriculumAudio";

type Audios = Partial<Record<CurriculumAudioStyle, string>>;

/**
 * PhaseAudioPlayer — plays a phase's NotebookLM Audio Overview on its
 * per-phase page. Reuses the existing hero-audio CSS (`.hero-audio-player`,
 * `.hero-audio-toggle`, `.hero-audio-lang`). A style selector swaps the source
 * between the styles generated for that phase (Deep Dive / Brief / Debate / Critique).
 */
export default function PhaseAudioPlayer({
  audios,
  phaseTitle,
}: {
  audios: Audios;
  phaseTitle: string;
}) {
  const styles = (Object.keys(audios) as CurriculumAudioStyle[]).filter((s) => audios[s]);
  const [activeStyle, setActiveStyle] = useState<CurriculumAudioStyle>(styles[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isPlayingRef = useRef(false);

  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  useEffect(() => {
    const audio = new Audio();
    audio.preload = "metadata";
    audioRef.current = audio;
    const handleEnded = () => setIsPlaying(false);
    const handleError = () => {
      setHasError(true);
      setIsPlaying(false);
    };
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("error", handleError);
    return () => {
      audio.pause();
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("error", handleError);
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    const src = audios[activeStyle];
    if (!src) return;
    audio.src = src;
    audio.load();
    if (isPlayingRef.current) audio.play().catch(() => setHasError(true));
  }, [activeStyle, audios]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio || !audios[activeStyle]) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setHasError(true));
    }
  };

  if (hasError || styles.length === 0) return null;

  return (
    <div className="phase-audio-wrap">
      <span className="phase-audio-badge">🎧 Hear it from the studio</span>
      <div
        className="hero-audio-player phase-audio-player"
        role="group"
        aria-label={`${phaseTitle} audio guides`}
      >
        <button
          type="button"
          className="hero-audio-toggle"
          onClick={togglePlay}
          aria-pressed={isPlaying}
          aria-label={isPlaying ? `Pause ${phaseTitle} audio` : `Play ${phaseTitle} audio`}
          title={isPlaying ? "Pause" : "Play"}
        >
          <span className="hero-audio-icon" aria-hidden="true">
            {isPlaying ? (
              <span className="hero-audio-eq" aria-hidden="true">
                <i></i>
                <i></i>
                <i></i>
              </span>
            ) : (
              <svg viewBox="0 0 16 16" width="12" height="12" fill="currentColor" aria-hidden="true">
                <path d="M4 2 L14 8 L4 14 Z" />
              </svg>
            )}
          </span>
          <span className="hero-audio-label">{isPlaying ? "Playing" : "Listen"}</span>
        </button>
        <div className="hero-audio-langs" role="tablist" aria-label="Audio style">
          {styles.map((style) => (
            <button
              key={style}
              type="button"
              role="tab"
              aria-selected={activeStyle === style}
              className={`hero-audio-lang ${activeStyle === style ? "is-active" : ""}`}
              onClick={() => setActiveStyle(style)}
            >
              {curriculumAudioLabels[style]}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
