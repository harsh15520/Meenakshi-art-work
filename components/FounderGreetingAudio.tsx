"use client";

import { useEffect, useRef, useState } from "react";

/**
 * FounderGreetingAudio — a compact player placed beside Meenakshi's signature
 * in the homepage "Meet the Artist" section.
 *
 * TODO: drop Meenakshi's real voice greeting here.
 * Place the recording at: public/audio/founder-greeting.opus
 * (mp3 fallback optional: public/audio/founder-greeting.mp3)
 * Until then the player renders a visible sample button beside the signature
 * (it simply won't play until the real recording is dropped in).
 */
const AUDIO_SOURCE = "/audio/founder-greeting.opus";
const AUDIO_FALLBACK = "/audio/founder-greeting.mp3";

export default function FounderGreetingAudio() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio();
    audio.preload = "metadata";
    audio.src = AUDIO_SOURCE;
    audioRef.current = audio;

    const handleEnded = () => setIsPlaying(false);
    const handleError = () => {
      // Try the mp3 fallback once before giving up.
      if (audio.src.endsWith(AUDIO_FALLBACK)) return;
      audio.src = AUDIO_FALLBACK;
      audio.load();
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

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          // No recording present yet — keep the visible sample button so the
          // placement is obvious; it simply won't play until the file exists.
          setIsPlaying(false);
        });
    }
  };

  return (
    <button
      type="button"
      className="founder-greeting-audio"
      onClick={togglePlay}
      aria-pressed={isPlaying}
      aria-label={isPlaying ? "Pause Meenakshi's greeting" : "Play Meenakshi's greeting"}
      title={isPlaying ? "Pause greeting" : "Hear Meenakshi's greeting"}
    >
      <span className="founder-greeting-icon" aria-hidden="true">
        {isPlaying ? (
          <span className="founder-greeting-eq" aria-hidden="true">
            <i></i><i></i><i></i>
          </span>
        ) : (
          <svg viewBox="0 0 16 16" width="12" height="12" fill="currentColor" aria-hidden="true">
            <path d="M4 2 L14 8 L4 14 Z" />
          </svg>
        )}
      </span>
    </button>
  );
}
