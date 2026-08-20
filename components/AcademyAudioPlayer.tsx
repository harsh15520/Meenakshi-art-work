"use client";

import { useEffect, useRef, useState } from "react";

/**
 * AcademyAudioPlayer — "Doubt Buster" player for the Art Academy hero.
 *
 * Plays a two-voice roleplay between a skeptical parent and the studio
 * instructor, answering common parent concerns in 3 languages.
 * Language switching preserves the current playback position.
 */
const AUDIO_SOURCES: Record<string, string> = {
  en: "/audio/academy-doubt-en.opus",
  hi: "/audio/academy-doubt-hi.opus",
  pa: "/audio/academy-doubt-pa.opus",
};

const LANG_LABELS: Record<string, string> = {
  en: "EN",
  hi: "हि",
  pa: "ਪੰ",
};

export default function AcademyAudioPlayer() {
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
  };

  if (hasError) return null;

  return (
    <div className="academy-audio-wrap">
      <span className="academy-audio-badge">🎧 Hear the Doubt Buster</span>
      <div className="hero-audio-player academy-audio-player" role="group" aria-label="Parent and instructor conversation audio">
        <span className="academy-audio-voices" aria-hidden="true">
          <i className="academy-audio-voice academy-audio-voice--parent">👩</i>
          <i className="academy-audio-voice academy-audio-voice--instructor">🎨</i>
        </span>
        <button
          type="button"
          className="hero-audio-toggle"
          onClick={togglePlay}
          aria-pressed={isPlaying}
          aria-label={isPlaying ? "Pause parent and instructor conversation" : "Play parent and instructor conversation"}
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
    </div>
  );
}