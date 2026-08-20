"use client";

import { useEffect, useRef, useState } from "react";

const DEFAULT_AUDIO_SOURCE = "/audio/academy-marequee-overlay-hindi.opus";
const DEFAULT_LABEL = "🎧 हिंदी में सुनें";

type Props = {
  src?: string;
  label?: string;
};

export default function MarqueeAudioPlayer({ src = DEFAULT_AUDIO_SOURCE, label = DEFAULT_LABEL }: Props) {
  const AUDIO_SOURCE = src;
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio();
    audio.preload = "metadata";
    audio.src = AUDIO_SOURCE;
    audio.load();
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

  if (hasError) {
    return (
      <div className="marquee-audio-wrap">
        <button
          type="button"
          className="marquee-audio-toggle marquee-audio-toggle--error"
          disabled
          aria-label="audio unavailable"
          title="Audio unavailable"
        >
          <span className="marquee-audio-icon" aria-hidden="true">
            <svg viewBox="0 0 16 16" width="12" height="12" fill="currentColor" aria-hidden="true">
              <path d="M4 2 L14 8 L4 14 Z" />
            </svg>
          </span>
          <span className="marquee-audio-label">Audio unavailable</span>
        </button>
      </div>
    );
  }

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.currentTime = 0;
      audio.play()
        .then(() => setIsPlaying(true))
        .catch((err) => {
          console.error("MarqueeAudioPlayer play failed:", err);
          setHasError(true);
        });
    }
  };

  return (
    <div className="marquee-audio-wrap">
      <button
        type="button"
        className="marquee-audio-toggle"
        onClick={togglePlay}
        aria-pressed={isPlaying}
        aria-label={isPlaying ? `pause ${label}` : `play ${label}`}
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
        <span className="hero-audio-label">{label}</span>
      </button>
    </div>
  );
}