"use client";

import { useEffect, useRef, useState } from "react";
import type { ExerciseDetail } from "@/data/curriculum";

type Props = {
  exercises: ExerciseDetail[];
};

const pad = (n: number) => String(n + 1).padStart(2, "0");

/**
 * ExerciseMarquee — two opposite-scrolling rows of text cards (exercises have
 * no images, so this is a parallel, text-only implementation of the gallery's
 * OpposingMarquee). Each card opens a detail modal that reuses the global
 * `.exhibition-inspect` chrome and the `.curriculum-work__panel` dl markup.
 * No-ops when there are no exercises (e.g. a phase with empty exercisesDetail).
 */
export default function ExerciseMarquee({ exercises }: Props) {
  const [active, setActive] = useState<ExerciseDetail | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (active && closeRef.current) closeRef.current.focus();
  }, [active]);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  if (exercises.length === 0) return null;

  const mid = Math.ceil(exercises.length / 2);
  const rowTop = exercises.slice(0, mid);
  const rowBottom = exercises.slice(mid);
  const rowBottomSafe = rowBottom.length ? rowBottom : rowTop;

  const open = (ex: ExerciseDetail, el: HTMLButtonElement | null) => {
    triggerRef.current = el;
    setActive(ex);
  };

  const close = () => {
    setActive(null);
    triggerRef.current?.focus();
  };

  const renderRow = (list: ExerciseDetail[], rowClass: string, rowIndex: number) => (
    <div className={`exercise-marquee__row ${rowClass}`}>
      <div className="exercise-marquee__track">
        {[...list, ...list].map((ex, i) => {
          const isDup = i >= list.length;
          return (
            <button
              type="button"
              key={`${rowIndex}-${i}`}
              className="exercise-marquee__card"
              aria-hidden={isDup}
              tabIndex={isDup ? -1 : undefined}
              onClick={(e) => {
                open(ex, isDup ? null : e.currentTarget);
              }}
            >
              <span className="exercise-marquee__num">{pad(i)}</span>
              <span className="exercise-marquee__name">{ex.name}</span>
              <span className="exercise-marquee__duration">{ex.duration}</span>
            </button>
          );
        })}
      </div>
    </div>
  );

  return (
    <section id="exercises" className="curriculum-beat exercise-marquee">
      <p className="curriculum-signpost">For enrolled students · what you&apos;ll actually do</p>
      <h2 className="curriculum-beat__heading">{exercises.length} exercises</h2>
      <p className="curriculum-beat__intro">
        {exercises.length} exercises — tap any one to see what to do, what you learn, and what
        success looks like.
      </p>

      <div className="exercise-marquee__rows">
        {renderRow(rowTop, "exercise-marquee__row--left", 0)}
        {renderRow(rowBottomSafe, "exercise-marquee__row--right", 1)}
      </div>

      {active && (
        <div
          className="exhibition-inspect"
          role="dialog"
          aria-modal="true"
          aria-label={active.name}
          onClick={(e) => {
            if (e.target === e.currentTarget) close();
          }}
        >
          <div className="exhibition-inspect__panel">
            <button
              type="button"
              ref={closeRef}
              className="exhibition-inspect__close"
              onClick={close}
              aria-label="Close"
            >
              ✕
            </button>
            <p className="eyebrow">{active.duration}</p>
            <h3 className="exhibition-inspect__title">{active.name}</h3>
            <dl className="curriculum-work__panel">
              <div>
                <dt>What to do</dt>
                <dd>{active.whatToDo}</dd>
              </div>
              <div>
                <dt>What you learn</dt>
                <dd>{active.whatYouLearn}</dd>
              </div>
              <div>
                <dt>Success looks like</dt>
                <dd>{active.successLooksLike}</dd>
              </div>
            </dl>
          </div>
        </div>
      )}
    </section>
  );
}
