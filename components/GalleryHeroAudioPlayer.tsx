"use client";

import { useEffect, useRef, useState } from "react";

/**
 * GalleryHeroAudioPlayer — compact multilingual audio player for the
 * gallery hero. Plays a short studio welcome inviting the visitor to browse
 * the original paintings, in the selected language (English, Hindi, Punjabi).
 * Language switching preserves playback position.
 * Reuses the HeroAudioPlayer structure and .hero-audio-player CSS.
 *
 * NOTE: filenames match what Notebook LM exported
 * (gallery-page-hero-section-*.opus), not the earlier draft naming.
 */
const AUDIO_SOURCES: Record<string, string> = {
  en: "/audio/gallery-hero-section-english.opus",
  hi: "/audio/gallery-hero-section-hindi.opus",
  pa: "/audio/gallery-hero-punjabi.opus",
};

const LANG_LABELS: Record<string, string> = {
  en: "EN",
  hi: "हि",
  pa: "ਪੰ",
};

const STORAGE_KEY = "ma-gallery-hero-audio-lang";

export default function GalleryHeroAudioPlayer() {
  const [activeLang, setActiveLang] = useState<string>("en");
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const currentTimeRef = useRef(0);
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
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && AUDIO_SOURCES[saved]) setActiveLang(saved);
    } catch {
      /* localStorage unavailable — ignore */
    }
  }, []);

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
    <div className="hero-audio-player" role="group" aria-label="Gallery audio">
      <button
        type="button"
        className="hero-audio-toggle"
        onClick={togglePlay}
        aria-pressed={isPlaying}
        aria-label={isPlaying ? "Pause gallery audio" : "Play gallery audio"}
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

