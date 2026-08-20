"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  currentBatch,
  featuredTeacherNote,
  featuredParentReview,
  parentReviewRating,
} from "@/data/academyToday";
import { getLatestAcademyUpdate } from "@/data/journal";
import CollapsibleStrip from "./CollapsibleStrip";

/**
 * AcademyLiveStrip — 5-card live-data strip placed directly below the academy hero.
 *
 * Card 1: Inside Today's Class — lesson photo + title + note + link
 * Card 2: Session Presence    — painted dots hidden under a wet paint smear + rotating signal line (no number revealed)
 * Card 3: Current Batch       — medium + level (slim card)
 * Card 4: Your Teacher        — Meenakshi photo + bio + rotating quote
 * Card 5: Parent Review       — ★ rating + rotating parent quote + rotating student name
 *
 * "use client" is required only for the rotating content (useState/useEffect).
 */
export default function AcademyLiveStrip() {
  const latestUpdate = getLatestAcademyUpdate();
  const [teacherQuote] = useState(featuredTeacherNote);
  const [parentQuote] = useState(
    "My daughter used to rush through everything. Now she sits with one painting until it's truly done — I barely recognise her patience."
  );
  const [parentStudent] = useState(featuredParentReview.attribution);
  const [attendanceSignal] = useState(
    "A student is deep in her piece right now."
  );
  const [blurDigit] = useState("3");

  // Rotate the blurred digit continuously so the count can never be pinned.
  // Each swap jumps to a *different* random digit (never repeats the same).
  // Interval is deliberately uneven/slow (~1.4–2.2s) so the switching feels
  // organic rather than mechanical — the blur hides the moment of change.
  return (
    <section className="academy-live-strip" aria-label="Academy notes">
      {/* Full-width header — spans the entire strip */}
      <div className="academy-live-strip__header">
        <span className="studio-presence__dot" aria-hidden="true" />
        <span className="studio-presence__title">AT THE ACADEMY</span>
        <span className="studio-presence__updated">A women-only fine-art studio</span>
      </div>

      <CollapsibleStrip className="academy-live-strip__grid" ariaLabel="Academy notes">


        {/* ── Card 1: Inside Today's Class → studio journal ── */}
        {latestUpdate ? (
          <Link href={`/journal/${latestUpdate.slug}`} className="academy-live-card academy-live-card--class">
            <p className="academy-live-card__eyebrow">
              INSIDE THE CLASS
            </p>
            <div className="academy-today-class__layout">
              {latestUpdate.coverImage && (
                <div className="academy-today-class__photo">
                  <Image
                    src={latestUpdate.coverImage}
                    alt={latestUpdate.title}
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="120px"
                  />
                </div>
              )}
              <div className="academy-today-class__content">
                <p className="academy-today-class__lesson-label">Class Note</p>
                <h3 className="academy-today-class__lesson-title">
                  {latestUpdate.stripLabel?.split("\n")[0] || latestUpdate.title}
                </h3>
                <p className="academy-today-class__note">
                  {latestUpdate.excerpt}
                </p>
                <span className="academy-today-class__link">
                  READ MORE <span>↗</span>
                </span>
              </div>
            </div>
          </Link>
        ) : (
          <div className="academy-live-card academy-live-card--class">
            <p className="academy-live-card__eyebrow">INSIDE THE CLASS</p>
            <p className="academy-today-class__note">A new session is on the way.</p>
          </div>
        )}

        {/* ── Card 2: Studio presence (continuously rotating blurred digit — count never readable) ── */}
        <div className="academy-live-card academy-live-card--attendance">
{/* A count exists — but the digit keeps rotating + heavily blurred so it can never be pinned down */}
          <div className="attendance-top">
            <div className="attendance-blurred" aria-label="Students are present in the studio — the count is intentionally hidden.">
              <span key={blurDigit} className="attendance-blurred__num" aria-hidden="true">{blurDigit}</span>
            </div>
            <p className="attendance-signal">&ldquo;{attendanceSignal}&rdquo;</p>
          </div>
          <p className="attendance-sub">
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M8 1a4.5 4.5 0 1 0 0 9A4.5 4.5 0 0 0 8 1ZM2 14.5C2 12 4.7 10 8 10s6 2 6 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
            Girls &amp; Women Only Studio
          </p>
        </div>

{/* ── Card 3: Current Batch ── */}
        <div className="academy-live-card academy-live-card--batch">
          <p className="academy-live-card__eyebrow">CURRENT FOCUS</p>
          <span className="batch-emoji" aria-hidden="true">🎨</span>
          <div className="batch-text">
            <p className="batch-medium">{currentBatch.medium}</p>
            <p className="batch-level">{currentBatch.level}</p>
          </div>
        </div>

{/* ── Card 4: Your Teacher → home "Meet the artist" section ── */}
        <Link href="/#meet-the-artist" className="academy-live-card academy-live-card--teacher">
          <p className="academy-live-card__eyebrow">YOUR TEACHER</p>
          <div className="teacher-meta">
            <div className="teacher-photo-wrap">
              <Image
                src="/images/founder-meena.webp"
                alt="Meenakshi, Founder & Lead Instructor"
                fill
                style={{ objectFit: "cover", objectPosition: "50% 15%" }}
                sizes="64px"
              />
            </div>
            <div className="teacher-details">
              <p className="teacher-name">Meenakshi</p>
              <p className="teacher-role">Founder &amp; Lead Instructor</p>
              <p className="teacher-years">15+ years of teaching</p>
            </div>
          </div>
          <hr className="teacher-quote-rule" />
          <p className="teacher-quote-text">&ldquo;{teacherQuote}&rdquo;</p>
        </Link>

        {/* ── Card 5: Parent Review → home "Words from our community" section ── */}
        <Link href="/#guestbook" className="academy-live-card academy-live-card--review">
          <p className="academy-live-card__eyebrow">PARENT REVIEW</p>
          <p className="parent-review-rating" aria-label={parentReviewRating}>
            <span aria-hidden="true">★</span> {parentReviewRating}
          </p>
          <p className="parent-review-quote">&ldquo;{parentQuote}&rdquo;</p>
          <p className="parent-review-attribution">{parentStudent}</p>
        </Link>

      </CollapsibleStrip>
    </section>
  );
}
