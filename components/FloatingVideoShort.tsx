"use client";

import { useEffect, useRef, useState } from "react";

// Accepts an 11-char ID or any YouTube URL (watch / shorts / embed) and returns the ID.
function toId(raw: string): string {
  const m =
    raw.match(/(?:shorts\/|v=|youtu\.be\/|embed\/)([\w-]{11})/) ??
    raw.match(/^([\w-]{11})$/);
  return m ? m[1] : raw;
}

const PLAY_ICON = (
  <svg viewBox="0 0 16 16" width="13" height="13" fill="currentColor" aria-hidden="true">
    <path d="M4 2 L14 8 L4 14 Z" />
  </svg>
);

const PAUSE_ICON = (
  <svg viewBox="0 0 16 16" width="13" height="13" fill="currentColor" aria-hidden="true">
    <rect x="3" y="2" width="4" height="12" />
    <rect x="9" y="2" width="4" height="12" />
  </svg>
);

const MUTED_ICON = (
  <svg viewBox="0 0 16 16" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M1.5 6h2.8L8 3v10L4.3 10H1.5z" fill="currentColor" stroke="none" />
    <path d="M10.5 6l3.5 4M14 6l-3.5 4" />
  </svg>
);

const UNMUTED_ICON = (
  <svg viewBox="0 0 16 16" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M1.5 6h2.8L8 3v10L4.3 10H1.5z" fill="currentColor" stroke="none" />
    <path d="M10.8 5.2a4 4 0 0 1 0 5.6" />
    <path d="M12.4 3.6a6.5 6.5 0 0 1 0 8.8" />
  </svg>
);

const MIN_ICON = (
  <svg viewBox="0 0 16 16" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
    <rect x="2.5" y="4.5" width="11" height="7" rx="1.2" />
  </svg>
);

const EXPAND_ICON = (
  <svg viewBox="0 0 16 16" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
    <rect x="2.5" y="2.5" width="11" height="11" rx="1.2" />
  </svg>
);

/**
 * FloatingVideoShort — persistent bottom-right overlay that surfaces each
 * phase's YouTube Short once the reader scrolls past the hero. Muted-by-default
 * autoplay (browser policy) with its own mute/unmute control.
 * Controls: pause/play + mute/unmute + minimize (collapses to a chip). Not dismissible.
 */
export default function FloatingVideoShort({
  youtubeId,
  title,
}: {
  youtubeId: string;
  title: string;
}) {
  const id = toId(youtubeId);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const [visible, setVisible] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || document.documentElement.scrollTop;
      const threshold = (window.innerHeight || 600) * 0.6;
      setVisible(y > threshold);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const send = (func: "playVideo" | "pauseVideo" | "mute" | "unMute") => {
    iframeRef.current?.contentWindow?.postMessage(
      JSON.stringify({ event: "command", func, args: [] }),
      "*"
    );
  };

  const togglePlay = () => {
    if (playing) {
      send("pauseVideo");
      setPlaying(false);
    } else {
      send("playVideo");
      setPlaying(true);
    }
  };

  const toggleMute = () => {
    if (muted) {
      send("unMute");
      setMuted(false);
    } else {
      send("mute");
      setMuted(true);
    }
  };

  const toggleMin = () => {
    setMinimized((m) => {
      const next = !m;
      if (next) send("pauseVideo");
      else send("playVideo");
      setPlaying(!next);
      return next;
    });
  };

  if (!visible) return null;

  const src = `https://www.youtube-nocookie.com/embed/${id}?rel=0&autoplay=1&mute=1&enablejsapi=1&playsinline=1`;

  return (
    <div
      className={`floating-video${minimized ? " is-min" : ""}`}
      role="region"
      aria-label={`${title} — short video`}
    >
      {!minimized && (
        <div className="floating-video__frame">
          <iframe
            ref={iframeRef}
            className="floating-video__embed"
            src={src}
            title={title}
            loading="lazy"
            allow="autoplay; encrypted-media; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      )}
      <div className="floating-video__bar">
        <span className="floating-video__title">{title}</span>
        <div className="floating-video__controls">
          {!minimized && (
            <button
              type="button"
              className="floating-video__btn"
              onClick={togglePlay}
              aria-pressed={playing}
              aria-label={playing ? "Pause video" : "Play video"}
              title={playing ? "Pause" : "Play"}
            >
              {playing ? PAUSE_ICON : PLAY_ICON}
            </button>
          )}
          {!minimized && (
            <button
              type="button"
              className="floating-video__btn"
              onClick={toggleMute}
              aria-pressed={!muted}
              aria-label={muted ? "Unmute video" : "Mute video"}
              title={muted ? "Unmute" : "Mute"}
            >
              {muted ? MUTED_ICON : UNMUTED_ICON}
            </button>
          )}
          <button
            type="button"
            className="floating-video__btn"
            onClick={toggleMin}
            aria-label={minimized ? "Expand video" : "Minimize video"}
            title={minimized ? "Expand" : "Minimize"}
          >
            {minimized ? EXPAND_ICON : MIN_ICON}
          </button>
        </div>
      </div>
    </div>
  );
}
