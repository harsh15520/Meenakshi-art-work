"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const VIDEO_ASPECT = 16 / 9;
const MOBILE_BREAKPOINT = 640; // matches app/styles/journal.css's hero mobile breakpoint

// Accepts an 11-char ID or any YouTube URL (watch / shorts / embed) and returns the ID.
// Same parser as FloatingVideoShort.tsx — kept in sync deliberately.
function toId(raw: string): string {
  const m =
    raw.match(/(?:shorts\/|v=|youtu\.be\/|embed\/)([\w-]{11})/) ??
    raw.match(/^([\w-]{11})$/);
  return m ? m[1] : raw;
}

const MUTED_ICON = (
  <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M1.5 6h2.8L8 3v10L4.3 10H1.5z" fill="currentColor" stroke="none" />
    <path d="M10.5 6l3.5 4M14 6l-3.5 4" />
  </svg>
);

const UNMUTED_ICON = (
  <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M1.5 6h2.8L8 3v10L4.3 10H1.5z" fill="currentColor" stroke="none" />
    <path d="M10.8 5.2a4 4 0 0 1 0 5.6" />
    <path d="M12.4 3.6a6.5 6.5 0 0 1 0 8.8" />
  </svg>
);

const PLAY_ICON = (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
    <path d="M8 5v14l11-7z" />
  </svg>
);

const EXPAND_ICON = (
  <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M6 2H2v4M10 2h4v4M6 14H2v-4M10 14h4v-4" />
  </svg>
);

interface BoxSize {
  width: number;
  height: number;
}

function coverSize(containerWidth: number, containerHeight: number): BoxSize {
  const containerRatio = containerWidth / containerHeight;
  return containerRatio > VIDEO_ASPECT
    ? { width: containerWidth, height: containerWidth / VIDEO_ASPECT }
    : { width: containerHeight * VIDEO_ASPECT, height: containerHeight };
}

function containSize(containerWidth: number, containerHeight: number): BoxSize {
  const containerRatio = containerWidth / containerHeight;
  return containerRatio > VIDEO_ASPECT
    ? { width: containerHeight * VIDEO_ASPECT, height: containerHeight }
    : { width: containerWidth, height: containerWidth / VIDEO_ASPECT };
}

/**
 * PaintingHeroVideoBackground — a YouTube embed filling its parent like a
 * background video (iframes don't support object-fit, so sizing is
 * measured and applied manually, not the fragile pure-CSS vw/vh trick).
 *
 * Desktop: single layer, cropped to cover (matches how it already looked
 * and was confirmed fine).
 *
 * Mobile: the source clip is landscape (16:9); force-cropping that to
 * cover a tall portrait screen would cut most of the frame away and risks
 * losing the subject entirely. Instead, mobile renders two layers — the
 * full uncropped video letterboxed in the middle, and a blurred, oversized
 * copy of the same video behind it filling the letterbox gaps (the
 * Instagram/TikTok "landscape clip in a portrait feed" treatment). No new
 * assets, no cropping, at the cost of a second iframe on mobile only.
 *
 * Facade: nothing YouTube-related loads until the visitor clicks — the
 * static `posterImage` (the same hero photo used when a painting has no
 * video) fills the frame first, with a play button on top. Only the click
 * mounts the iframe(s) and starts autoplay, so a visitor who never
 * interacts never pays for the video's network weight (previously two
 * simultaneous autoplaying embeds loaded unconditionally on every visit).
 */
export default function PaintingHeroVideoBackground({
  youtubeId,
  posterImage,
  posterAlt,
}: {
  youtubeId: string;
  posterImage: string;
  posterAlt: string;
}) {
  const id = toId(youtubeId);
  const mainIframeRef = useRef<HTMLIFrameElement | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [mainSize, setMainSize] = useState<BoxSize | null>(null);
  const [backdropSize, setBackdropSize] = useState<BoxSize | null>(null);
  const [letterbox, setLetterbox] = useState(false);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const updateSize = () => {
      const { clientWidth, clientHeight } = el;
      if (!clientWidth || !clientHeight) return;
      const isMobile = window.innerWidth <= MOBILE_BREAKPOINT;
      setLetterbox(isMobile);

      if (isMobile) {
        setMainSize(containSize(clientWidth, clientHeight));
        const cover = coverSize(clientWidth, clientHeight);
        setBackdropSize({ width: cover.width * 1.3, height: cover.height * 1.3 });
      } else {
        setMainSize(coverSize(clientWidth, clientHeight));
        setBackdropSize(null);
      }
    };

    updateSize();
    const observer = new ResizeObserver(updateSize);
    observer.observe(el);
    window.addEventListener("resize", updateSize);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateSize);
    };
  }, []);

  const send = (func: "mute" | "unMute") => {
    mainIframeRef.current?.contentWindow?.postMessage(
      JSON.stringify({ event: "command", func, args: [] }),
      "*"
    );
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

  const src = `https://www.youtube-nocookie.com/embed/${id}?rel=0&autoplay=1&mute=1&loop=1&playlist=${id}&controls=0&showinfo=0&modestbranding=1&enablejsapi=1&playsinline=1`;
  // Backdrop is decorative and always muted — no jsapi/control needed, avoids ever accidentally unmuting a second copy of the same audio.
  const backdropSrc = `https://www.youtube-nocookie.com/embed/${id}?rel=0&autoplay=1&mute=1&loop=1&playlist=${id}&controls=0&showinfo=0&modestbranding=1&playsinline=1`;

  if (!playing) {
    return (
      <div className="painting-hero-video-wrap" ref={wrapRef}>
        <Image src={posterImage} alt={posterAlt} fill priority sizes="100vw" className="painting-hero-img" />
        <button
          type="button"
          className="painting-hero-video-play"
          onClick={() => setPlaying(true)}
          aria-label="Play background video"
        >
          <span className="painting-hero-video-play-icon">{PLAY_ICON}</span>
        </button>
      </div>
    );
  }

  return (
    <div className="painting-hero-video-wrap" ref={wrapRef}>
      {letterbox && backdropSize && (
        <div
          className="painting-hero-video-backdrop"
          aria-hidden="true"
          style={{ width: backdropSize.width, height: backdropSize.height }}
        >
          <iframe src={backdropSrc} title="" tabIndex={-1} allow="autoplay; encrypted-media" />
        </div>
      )}
      <div
        className="painting-hero-video-frame"
        aria-hidden="true"
        style={mainSize ? { width: mainSize.width, height: mainSize.height } : undefined}
      >
        <iframe
          ref={mainIframeRef}
          src={src}
          title=""
          tabIndex={-1}
          allow="autoplay; encrypted-media"
        />
      </div>
      <button
        type="button"
        className="painting-hero-video-mute"
        onClick={toggleMute}
        aria-pressed={!muted}
        aria-label={muted ? "Unmute background video" : "Mute background video"}
        title={muted ? "Unmute" : "Mute"}
      >
        {muted ? MUTED_ICON : UNMUTED_ICON}
      </button>
      {letterbox && (
        <a
          className="painting-hero-video-expand"
          href={`https://www.youtube.com/watch?v=${id}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Watch in landscape on YouTube"
          title="Watch in landscape"
        >
          {EXPAND_ICON}
          <span>Watch in landscape</span>
        </a>
      )}
    </div>
  );
}
