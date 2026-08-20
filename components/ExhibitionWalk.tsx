"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Reveal from "./Reveal";
import type { ExhibitionImage, ExhibitionPiece } from "@/data/exhibitionImages";
import { getExhibitionPieceStoryHref } from "@/data/exhibitionImages";
import { GALLERY_BLUR } from "@/lib/image-optimization";

const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"];
const pad = (n: number) => String(n).padStart(2, "0");

/** Ambient hue per room theme — tints the background so each room feels different. */
const THEME_HUES: Record<string, string> = {
  devotional: "#5a3b36",
  divine: "#3a3a5a",
  rural: "#4a3a2a",
  wildlife: "#2f3f33",
  graphite: "#3a3a3a",
  pop: "#4a2a3a",
  occasion: "#5a3a4a",
  heritage: "#3a4a40",
  table: "#5a4636",
  devotion: "#4a3a3a",
  gesture: "#3f3a50",
  default: "#302927",
};

function ChevronIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {direction === "left" ? <path d="M15 18l-6-6 6-6" /> : <path d="M9 18l6-6-6-6" />}
    </svg>
  );
}

type Props = {
  images: ExhibitionImage[];
  eyebrow?: string;
  title?: string;
  intro?: string;
  variant?: "gallery" | "custom";
  id?: string;
};

export default function ExhibitionWalk({ images, eyebrow = "STEP INSIDE", title = "The exhibition", intro = "Seen enough at a glance? Step inside.", variant = "gallery", id }: Props) {
  const [index, setIndex] = useState(0);
  const [mode, setMode] = useState<"guided" | "browse">("guided");
  const [inspect, setInspect] = useState(false);
  const [carouselWidth, setCarouselWidth] = useState(0);
  const [stageWidth, setStageWidth] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const count = images.length;
  const slideRatio = variant === "custom" ? 1 : 0.92;
  const gapRatio = variant === "custom" ? 0 : 0.02;

  const currentImage = images[index];
  const currentTheme = currentImage?.theme ?? "default";
  const hue = THEME_HUES[currentTheme] ?? THEME_HUES.default;
  const isGallery = variant === "gallery";

  const goTo = useCallback((i: number) => setIndex(Math.max(0, Math.min(count - 1, i))), [count]);

  // Hooks must run on every render regardless of `count`, so the empty-state
  // early return happens after all of them (below), not before.
  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => setCarouselWidth(entry.contentRect.width));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (variant !== "custom") return;
    const el = stageRef.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => setStageWidth(entry.contentRect.width));
    observer.observe(el);
    return () => observer.disconnect();
  }, [variant]);

  useEffect(() => {
    if (variant !== "custom") return;
    const update = () => setViewportHeight(window.innerHeight);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [variant]);

  // Respect users who prefer reduced motion — disable the guided auto-advance
  // and the per-slide aria-live announcement so screen readers aren't spammed.
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

// Guided tour auto-advance (disabled when the visitor prefers reduced motion)
  useEffect(() => {
    if (mode !== "guided" || prefersReducedMotion) return;
    const t = setInterval(() => goTo(index + 1 >= count ? 0 : index + 1), 7000);
    return () => clearInterval(t);
  }, [index, mode, count, goTo, prefersReducedMotion]);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goTo(index + 1);
      if (e.key === "ArrowLeft") goTo(index - 1);
      if (e.key === "Escape") setInspect(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, count, goTo]);

  if (count === 0) {
    return (
      <section className={`exhibition-walk${variant === "custom" ? " exhibition-walk--custom" : ""}`}>
        <Reveal className="exhibition-walk__intro">
          <p className="eyebrow">{eyebrow}</p>
          <h2>{title}</h2>
          <p>{intro}</p>
        </Reveal>
        <div className="exhibition-carousel__stage" ref={stageRef}>
          <div className="exhibition-carousel exhibition-carousel--empty">
            <div className="exhibition-carousel__empty-message">
              <p>No artwork to display yet.</p>
              <p className="eyebrow">COMING SOON</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const currentRatio = currentImage?.ratio ?? 0.8;
  const isFull = variant === "custom" && currentImage?.display === "full";

  let frameWidth = 0;
  let frameHeight = 0;
  if (variant === "custom" && stageWidth > 0 && viewportHeight > 0) {
    if (isFull) {
      frameWidth = stageWidth;
      frameHeight = viewportHeight * 0.88;
    } else {
      const availableWidth = Math.min(stageWidth * 0.9, 680);
      const maxHeight = viewportHeight * 0.75;
      frameHeight = availableWidth / currentRatio;
      frameWidth = availableWidth;
      if (frameHeight > maxHeight) {
        frameHeight = maxHeight;
        frameWidth = maxHeight * currentRatio;
      }
    }
  }

  const effectiveWidth = variant === "custom" ? frameWidth : carouselWidth;
  const step = effectiveWidth * (slideRatio + gapRatio);

  const roomLabel = currentImage?.label ?? `Room ${ROMAN[index]}`;

  return (
    <section
      id={id}
      className={`exhibition-walk${variant === "custom" ? " exhibition-walk--custom" : ""} exhibition-walk--${currentTheme}`}
      style={{ background: `linear-gradient(180deg, var(--paper) 0%, ${hue} 220px, ${hue} 100%)` }}
    >
      {variant === "custom" && currentImage && (
        <div className="exhibition-walk__ambient" aria-hidden="true">
          <Image src={currentImage.src} alt="" fill sizes="100vw" className="exhibition-walk__ambient-image" />
        </div>
      )}

      <Reveal className="exhibition-walk__intro">
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        <p>{intro}</p>
      </Reveal>

      {/* Guided / Browse toggle + progress readout */}
      <div className="exhibition-tourbar">
        <div className="exhibition-tourbar__modes" role="group" aria-label="Tour mode">
          <button
            type="button"
            className={`exhibition-tourbar__mode${mode === "guided" ? " is-active" : ""}`}
            onClick={() => setMode("guided")}
            aria-pressed={mode === "guided"}
          >
            Guided tour
          </button>
          <button
            type="button"
            className={`exhibition-tourbar__mode${mode === "browse" ? " is-active" : ""}`}
            onClick={() => setMode("browse")}
            aria-pressed={mode === "browse"}
          >
            Browse
          </button>
        </div>
        <div className="exhibition-tourbar__progress" aria-hidden="true">
          <span className="exhibition-tourbar__count">
            {currentImage?.wing ? currentImage.wing : `Room ${ROMAN[index]}`} · {pad(index + 1)} / {pad(count)}
          </span>
          <div className="exhibition-tourbar__track">
            <div
              className="exhibition-tourbar__fill"
              style={{ width: `${((index + 1) / count) * 100}%` }}
            />
          </div>
        </div>
        {currentImage?.pieces && currentImage.pieces.length > 0 && (
          <button type="button" className="exhibition-tourbar__inspect" onClick={() => setInspect(true)}>
            {isGallery ? "Inspect this room" : "See the pieces"} <span>↗</span>
          </button>
        )}
      </div>

      <div className="exhibition-carousel__stage" ref={stageRef}>
        <motion.div
          className={`exhibition-carousel${isFull ? " exhibition-carousel--full" : ""}`}
          ref={carouselRef}
          animate={variant === "custom" && frameWidth > 0 ? { width: frameWidth, height: frameHeight } : undefined}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
<motion.div
            className="exhibition-carousel__track"
            drag={effectiveWidth > 0 && mode === "browse" ? "x" : false}
            dragConstraints={{ left: -(step * (count - 1)), right: 0 }}
            dragElastic={0.12}
            animate={{ x: -(index * step) }}
            transition={{ type: "spring", stiffness: 300, damping: 32 }}
            onDragEnd={(_, info) => {
              const threshold = step * 0.2;
              if (info.offset.x < -threshold) goTo(index + 1);
              else if (info.offset.x > threshold) goTo(index - 1);
            }}
          >
            {images.map((image, i) => (
              <motion.div
                className="exhibition-carousel__slide"
                key={`${image.src}-${i}`}
                id={id ? `${id}-room-${image.room ?? i + 1}` : undefined}
                animate={{ scale: i === index ? 1 : 0.97, opacity: i === index ? 1 : 0.85 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Ken Burns on the active slide */}
                <motion.div
                  className="exhibition-carousel__kenburns"
                  animate={i === index ? { scale: [1, 1.08], x: [0, 8] } : { scale: 1, x: 0 }}
                  transition={i === index ? { duration: 7, ease: "easeInOut" } : { duration: 0.5 }}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="100vw"
                    className={`exhibition-carousel__image${variant === "custom" && image.display === "full" ? " exhibition-carousel__image--cover" : ""}`}
                    priority={false}
                    placeholder="blur"
                    blurDataURL={GALLERY_BLUR}
                  />
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          {index > 0 && (
            <button type="button" className="exhibition-carousel__arrow exhibition-carousel__arrow--prev" aria-label="Previous room" onClick={() => goTo(index - 1)}>
              <ChevronIcon direction="left" />
            </button>
          )}
          {index < count - 1 && (
            <button type="button" className="exhibition-carousel__arrow exhibition-carousel__arrow--next" aria-label="Next room" onClick={() => goTo(index + 1)}>
              <ChevronIcon direction="right" />
            </button>
          )}

          <motion.div
            className={`exhibition-carousel__caption-group exhibition-carousel__caption-group--${currentImage?.notePosition ?? "bottom-left"}`}
            key={`caption-${index}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {currentImage?.wing && (
              <p className="exhibition-carousel__wing">{currentImage.wing}</p>
            )}
            {currentImage?.note && <p className="exhibition-carousel__note">{currentImage.note}</p>}
            {currentImage?.storyFacts && currentImage.storyFacts.length > 0 && (
              <div className="exhibition-carousel__storyfacts">
                {currentImage.storyFacts.map((fact) => (
                  <span key={fact.label} className="exhibition-carousel__storyfact">
                    <span className="exhibition-carousel__storyfact-label">{fact.label}</span>
                    <span className="exhibition-carousel__storyfact-value">{fact.value}</span>
                  </span>
                ))}
              </div>
            )}
            <p className="exhibition-carousel__placard">
              {roomLabel} · {pad(index + 1)} / {pad(count)}
            </p>
          </motion.div>

          <div className="sr-only" aria-live="polite">
            {prefersReducedMotion ? "" : `${index + 1} of ${count}: ${currentImage?.wing ?? roomLabel}`}
          </div>
        </motion.div>
      </div>

{/* Zoom-to-inspect modal */}
      <AnimatePresence>
        {inspect && currentImage?.pieces && currentImage.pieces.length > 0 && (
          <motion.div
            className="exhibition-inspect"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label={`${currentImage.wing} — inspect pieces`}
          >
            <motion.div
              className="exhibition-inspect__panel"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <button type="button" className="exhibition-inspect__close" onClick={() => setInspect(false)} aria-label="Close inspect">
                ✕
              </button>
              <p className="eyebrow">{currentImage.wing}</p>
              <h3 className="exhibition-inspect__title">
                {isGallery ? "Inspect this room" : "The pieces behind this commission"}
              </h3>
              <p className="exhibition-inspect__intro">{currentImage.note}</p>
              {currentImage.curatorNotes && currentImage.curatorNotes.length > 0 && (
                <div className="exhibition-inspect__curatornotes">
                  <p className="exhibition-inspect__curatornotes-label">CURATOR&apos;S NOTES</p>
                  {currentImage.curatorNotes.map((note, i) => (
                    <p key={i} className="exhibition-inspect__curatornote">{note}</p>
                  ))}
                </div>
              )}
              {currentImage.testimonial && (
                <p className="exhibition-inspect__testimonial">“{currentImage.testimonial}”</p>
              )}
              {currentImage.clientNotes && currentImage.clientNotes.length > 0 && (
                <div className="exhibition-inspect__clientnotes">
                  <p className="exhibition-inspect__clientnotes-label">NOTES FROM THE CLIENT</p>
                  {currentImage.clientNotes.map((note) => (
                    <p key={note} className="exhibition-inspect__clientnote">
                      “{note}”
                    </p>
                  ))}
                </div>
              )}
                <div className="exhibition-inspect__grid">
                  {currentImage.pieces.map((piece: ExhibitionPiece) => {
                    const storyHref = getExhibitionPieceStoryHref(piece);
                    return (
                      <div key={piece.src} className="exhibition-inspect__piece">
                        <div className="exhibition-inspect__thumb">
                          <Image src={piece.src} alt={piece.title} fill sizes="220px" style={{ objectFit: "cover" }} />
                        </div>
                        <div className="exhibition-inspect__info">
                          <h4>{piece.title}</h4>
                          <p className="exhibition-inspect__medium">{piece.medium} · {piece.size}</p>
                          <p className="exhibition-inspect__price">{piece.price}</p>
                          <Link
                            href={storyHref}
                            className="exhibition-inspect__cta exhibition-inspect__cta--link"
                          >
                            Read the full story →
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
