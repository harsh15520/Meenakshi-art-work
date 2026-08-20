"use client";

import { useEffect, useRef, useState } from "react";

/**
 * HeroAudioPlayer — a compact multilingual audio player for the homepage hero.
 *
 * Plays a short studio welcome message in the selected language
 * (English, Hindi, or Punjabi).
 * Language switching preserves the current playback position.
 */
const AUDIO_SOURCES: Record<string, string> = {
  en: "/audio/welcome-en.opus",
  hi: "/audio/welcome-hindi.opus",
  pa: "/audio/welcome-punjabi.opus",
};

const LANG_LABELS: Record<string, string> = {
  en: "EN",
  hi: "हि",
  pa: "ਪੰ",
};

// Persist the user's last-chosen language so it survives reloads / returning visits.
const STORAGE_KEY = "ma-hero-audio-lang";

export default function HeroAudioPlayer() {
  const [activeLang, setActiveLang] = useState<string>("en");
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const currentTimeRef = useRef(0);
  const isPlayingRef = useRef(false);

  // Keep the ref in sync with state so the language-change effect can read
  // the current playing state without becoming a dependency itself.
  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  // Create the audio element once
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

  // Restore the last-chosen language from localStorage. Runs client-only after
  // mount to avoid SSR/hydration mismatches; unavailable/unknown values are ignored.
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && AUDIO_SOURCES[saved]) setActiveLang(saved);
    } catch {
      /* localStorage unavailable — ignore */
    }
  }, []);

  // Load the active language source, preserving playback position
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const wasPlaying = isPlayingRef.current;
    audio.pause();
    audio.src = AUDIO_SOURCES[activeLang];
    audio.load();
    audio.currentTime = currentTimeRef.current;

    if (wasPlaying) {
      audio.play().catch(() => setHasError(true));
    }
  }, [activeLang]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      currentTimeRef.current = audio.currentTime;
      setIsPlaying(false);
    } else {
      audio.currentTime = 0;
      audio.play()
        .then(() => setIsPlaying(true))
        .catch(() => setHasError(true));
    }
  };

  const switchLang = (lang: string) => {
    if (lang === activeLang) return;
    const audio = audioRef.current;
    if (audio) {
      currentTimeRef.current = audio.currentTime;
    }
    setActiveLang(lang);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      /* localStorage unavailable — ignore */
    }
  };

  if (hasError) return null;

  return (
    <div className="hero-audio-player" role="group" aria-label="Studio welcome audio">
      <button
        type="button"
        className="hero-audio-toggle"
        onClick={togglePlay}
        aria-pressed={isPlaying}
        aria-label={isPlaying ? "Pause studio welcome audio" : "Play studio welcome audio"}
        title={isPlaying ? "Pause" : "Play"}
      >
        <span className="hero-audio-icon" aria-hidden="true">
          {isPlaying ? (
            <span className="hero-audio-eq" aria-hidden="true">
              <i></i><i></i><i></i>
            </span>
          ) : (
            <svg viewBox="0 0 16 16" width="12" height="12" fill="currentColor" aria-hidden="true">
              <path d="M4 2 L14 8 L4 14 Z" />
            </svg>
          )}
        </span>
        <span className="hero-audio-label">{isPlaying ? "Playing" : "Listen"}</span>
      </button>

      <div className="hero-audio-langs" role="tablist" aria-label="Audio language">
        {Object.keys(AUDIO_SOURCES).map((lang) => (
          <button
            key={lang}
            type="button"
            role="tab"
            aria-selected={activeLang === lang}
            className={`hero-audio-lang ${activeLang === lang ? "is-active" : ""}`}
            onClick={() => switchLang(lang)}
          >
            {LANG_LABELS[lang]}
          </button>
        ))}
      </div>
    </div>
  );
}