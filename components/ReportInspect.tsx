"use client";

import { useEffect, useRef, useState } from "react";
import ReportContent from "./ReportContent";
import ReportVoiceIcon from "./ReportVoiceIcon";
import type { ReportBlock } from "@/data/curriculumReportContent";

type Props = {
  blocks: ReportBlock[];
  salutation: string;
  voice: string;
  whatsappHref: string;
  title: string;
};

/**
 * ReportInspect — the letter card that sits in the "Take-away" column.
 * Renders a fixed-height preview (clipped + faded at the bottom, matching
 * the slide deck's fixed-height frame) with an "Open Report" action that
 * reveals the same content, unclipped, in the site's existing
 * `.exhibition-inspect` modal — same open/close/focus pattern as
 * ExerciseMarquee's exercise-detail modal, reused here rather than
 * reinvented.
 */
export default function ReportInspect({ blocks, salutation, voice, whatsappHref, title }: Props) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (open && closeRef.current) closeRef.current.focus();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const close = () => {
    setOpen(false);
    triggerRef.current?.focus();
  };

  const letterBody = (
    <>
      <div className="curriculum-report-letter__masthead">
        <ReportVoiceIcon voice={voice} />
        <p className="curriculum-report-letter__salutation">{salutation}</p>
      </div>
      <ReportContent blocks={blocks} />
      <div className="report-content__closing">
        <p className="report-content__signoff">
          With warmth,
          <br />
          Meenakshi Art Work
        </p>
        <a className="curriculum-phase-slide__download" href={whatsappHref} target="_blank" rel="noopener noreferrer">
          Message on WhatsApp →
        </a>
      </div>
    </>
  );

  return (
    <>
      <div className="curriculum-report-letter">
        {letterBody}
        <div className="curriculum-report-letter__fade">
          <button
            type="button"
            ref={triggerRef}
            className="curriculum-phase-slide__download"
            onClick={() => setOpen(true)}
          >
            Open Report ↗
          </button>
        </div>
      </div>

      {open && (
        <div
          className="exhibition-inspect"
          role="dialog"
          aria-modal="true"
          aria-label={title}
          onClick={(e) => {
            if (e.target === e.currentTarget) close();
          }}
        >
          <div className="exhibition-inspect__panel exhibition-inspect__panel--report">
            <button type="button" ref={closeRef} className="exhibition-inspect__close" onClick={close} aria-label="Close">
              ✕
            </button>
            <div className="curriculum-report-letter curriculum-report-letter--modal">{letterBody}</div>
          </div>
        </div>
      )}
    </>
  );
}
