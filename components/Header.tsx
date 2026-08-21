"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { trackNavigationClick } from "@/lib/analytics";

const links = [["Art Academy", "/academy"], ["Gallery", "/gallery"], ["Custom Orders", "/custom-orders"], ["Studio Journal", "/journal"], ["Contact", "/contact"]];

const handleNavClick = (label: string, href: string) => {
  trackNavigationClick(label, href);
};

type AudioContextWindow = typeof window & { webkitAudioContext?: typeof AudioContext };

const CHIME_NOTES = [261.63, 293.66, 329.63, 392.0, 440.0, 523.25]; // C4, D4, E4, G4, A4, C5

export default function Header() {
  const [open, setOpen] = useState(false);
  const [ambientOn, setAmbientOn] = useState(false);
  const [dimHeader, setDimHeader] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);
  const scheduleTimeoutRef = useRef<number | null>(null);
  const lastNoteRef = useRef<number | null>(null);

  const stopAmbient = () => {
    if (scheduleTimeoutRef.current !== null) {
      clearTimeout(scheduleTimeoutRef.current);
      scheduleTimeoutRef.current = null;
    }

    oscillatorsRef.current.forEach((oscillator) => {
      try {
        oscillator.stop();
      } catch {
        // Already stopped.
      }
      oscillator.disconnect();
    });
    oscillatorsRef.current = [];

    masterGainRef.current?.disconnect();
    masterGainRef.current = null;

    audioContextRef.current?.close();
    audioContextRef.current = null;
  };

  useEffect(() => {
    return () => stopAmbient();
  }, []);

  // Dim the sticky header while the dark closing footer is in view, so the
  // light bar doesn't fight that section's immersive dark background.
  useEffect(() => {
    const footer = document.querySelector(".site-footer");
    if (!footer) return;
    const observer = new IntersectionObserver(
      ([entry]) => setDimHeader(entry.isIntersecting),
      { threshold: 0.05 }
    );
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  const fadeOutAndStop = () => {
    const ctx = audioContextRef.current;
    const gain = masterGainRef.current;
    if (!ctx || !gain) {
      stopAmbient();
      return;
    }
    const now = ctx.currentTime;
    gain.gain.cancelScheduledValues(now);
    gain.gain.setValueAtTime(gain.gain.value, now);
    gain.gain.linearRampToValueAtTime(0, now + 0.4);
    window.setTimeout(stopAmbient, 450);
  };

  const playChime = (ctx: AudioContext, masterGain: GainNode, frequency: number) => {
    const now = ctx.currentTime;

    // Per-note gain with envelope: fast attack, slow exponential decay.
    const noteGain = ctx.createGain();
    noteGain.gain.setValueAtTime(0, now);
    noteGain.gain.linearRampToValueAtTime(0.22, now + 0.04); // Fast attack
    noteGain.gain.setTargetAtTime(0.001, now + 0.04, 1.5); // Exponential decay
    noteGain.connect(masterGain);

    // Slight random stereo pan for spatial variation.
    const panner = ctx.createStereoPanner();
    panner.pan.value = (Math.random() - 0.5) * 0.6;
    panner.connect(noteGain);

    // Fundamental + harmonics for warm timbre.
    const createHarmonic = (freq: number, gain: number) => {
      const osc = ctx.createOscillator();
      osc.type = "sine";
      osc.frequency.value = freq;
      const harmGain = ctx.createGain();
      harmGain.gain.value = gain;
      osc.connect(harmGain);
      harmGain.connect(panner);
      osc.start(now);
      oscillatorsRef.current.push(osc);
      return osc;
    };

    createHarmonic(frequency, 1.0);         // Fundamental
    createHarmonic(frequency * 2, 0.35);    // 2nd harmonic
    createHarmonic(frequency * 3, 0.15);    // 3rd harmonic

    // Schedule automatic cleanup after decay is ~inaudible (~10s total).
    window.setTimeout(() => {
      oscillatorsRef.current.forEach((osc, idx) => {
        if (osc.frequency.value === frequency || osc.frequency.value === frequency * 2 || osc.frequency.value === frequency * 3) {
          try {
            osc.stop();
          } catch {}
          osc.disconnect();
          oscillatorsRef.current.splice(idx, 1);
        }
      });
    }, 10000);
  };

  const scheduleNextChime = (ctx: AudioContext, masterGain: GainNode) => {
    if (scheduleTimeoutRef.current) return; // Already scheduled.

    const delay = 3500 + Math.random() * 4000; // 3.5–7.5s
    scheduleTimeoutRef.current = window.setTimeout(() => {
      if (!audioContextRef.current) return; // User toggled off.

      // Pick random note, avoid immediate repeat.
      let note = CHIME_NOTES[Math.floor(Math.random() * CHIME_NOTES.length)];
      while (note === lastNoteRef.current && CHIME_NOTES.length > 1) {
        note = CHIME_NOTES[Math.floor(Math.random() * CHIME_NOTES.length)];
      }
      lastNoteRef.current = note;

      playChime(ctx, masterGain, note);
      scheduleTimeoutRef.current = null;
      scheduleNextChime(ctx, masterGain); // Reschedule.
    }, delay);
  };

  const toggleAmbient = () => {
    if (ambientOn) {
      fadeOutAndStop();
      setAmbientOn(false);
      return;
    }

    const AudioContextCtor = window.AudioContext ?? (window as AudioContextWindow).webkitAudioContext;
    if (!AudioContextCtor) return;

    const ctx = new AudioContextCtor();
    audioContextRef.current = ctx;

    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 2500;
    filter.Q.value = 0.4;
    filter.connect(ctx.destination);

    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0, ctx.currentTime);
    masterGain.gain.linearRampToValueAtTime(0.04, ctx.currentTime + 1.5);
    masterGain.connect(filter);

    // Play first chime immediately, then schedule the rest.
    playChime(ctx, masterGain, CHIME_NOTES[Math.floor(Math.random() * CHIME_NOTES.length)]);
    masterGainRef.current = masterGain;
    scheduleNextChime(ctx, masterGain);
    setAmbientOn(true);
  };

  return (
    <>
      <div className="top-note">Women-only art academy in Saharanpur <span>•</span> Since 2017</div>
      <header className={`header-shell${dimHeader ? " header-shell--dim" : ""}`}>
        <Link href="/" className="brand" aria-label="Meenakshi Art Work home">
          <span className="brand-mark">M</span>
          <span><b>Meenakshi</b><small>ART WORK</small></span>
        </Link>
        <nav className="desktop-nav">{links.map(([label, href]) => <Link key={href} href={href} onClick={() => handleNavClick(label, href)}>{label}</Link>)}</nav>
        <div className="header-actions">
          <button
            type="button"
            className="ambient-toggle"
            onClick={toggleAmbient}
            aria-pressed={ambientOn}
            aria-label={ambientOn ? "Turn off ambient sound" : "Turn on ambient sound"}
            title={ambientOn ? "Turn off ambient sound" : "Turn on ambient sound"}
          >
            <span className="ambient-dot"></span>
            <span className="ambient-label">Ambient</span>
          </button>
          <a className="header-cta" href="https://wa.me/917017512686?text=Hello%20Meenakshi%20Art%20Work%2C%20I%20would%20like%20to%20make%20an%20inquiry." target="_blank" rel="noopener noreferrer">
            Enquire <span>↗</span>
          </a>
        </div>
        <button type="button" className={`menu-toggle${open ? " open" : ""}`} onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Toggle menu"><i></i><i></i></button>
      </header>
      <div className={`mobile-menu ${open ? "open" : ""}`} aria-hidden={!open}>
        {links.map(([label, href]) => <Link key={href} href={href} tabIndex={open ? 0 : -1} onClick={() => { setOpen(false); handleNavClick(label, href); }}>{label}<span>↗</span></Link>)}
      </div>
    </>
  );
}
