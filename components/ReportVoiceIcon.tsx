// Small per-report-type SVG marks for the letter card's masthead — one per
// REPORT_SIGNPOST voice (app/academy/curriculum/[num]/page.tsx). Same
// minimal line-art language as the artist timeline icons (thin stroke,
// var(--wine)/var(--gold), 32x32 viewBox) but a standalone set scoped to
// the curriculum report letter rather than importing a slug-page component.

import type { ReactNode } from "react";

export type ReportVoice = "For parents" | "For students" | "For you" | "From the journal";

const ICONS: Record<ReportVoice, ReactNode> = {
  // A quill, for the parent letter.
  "For parents": (
    <g>
      <path d="M10 27Q14 18 21 7" fill="none" stroke="var(--wine)" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M21 7C25 9 24 15 17 18C19 13 19 10 21 7Z" fill="var(--gold)" stroke="var(--wine)" strokeWidth="0.6" strokeLinejoin="round" />
      <path d="M8 28c2.5 2 5.5 2 7.5 0" fill="none" stroke="var(--gold)" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="8" cy="28.5" r="1.2" fill="var(--gold)" />
    </g>
  ),
  // An open book with a magnifying glass, for the study guide.
  "For students": (
    <g>
      <path d="M16 10c-2.5-1.6-6-2-9-1v15c3-1 6.5-0.6 9 1c2.5-1.6 6-2 9-1V9c-3-1-6.5-0.6-9 1Z" fill="none" stroke="var(--wine)" strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M16 10v15" fill="none" stroke="var(--wine)" strokeWidth="1" />
      <circle cx="22.5" cy="21.5" r="3.4" fill="var(--ivory)" stroke="var(--gold)" strokeWidth="1.3" />
      <path d="M25 24l2.4 2.4" fill="none" stroke="var(--gold)" strokeWidth="1.4" strokeLinecap="round" />
    </g>
  ),
  // A compass rose, for the readiness/decision briefing doc.
  "For you": (
    <g>
      <circle cx="16" cy="16" r="12" fill="none" stroke="var(--gold)" strokeWidth="0.9" />
      <path d="M16 16L14 5L16 8L18 5Z" fill="var(--gold)" />
      <path d="M16 16L14 27L16 24L18 27Z" fill="var(--gold)" />
      <path d="M16 16L27 14L24 16L27 18Z" fill="none" stroke="var(--wine)" strokeWidth="1" strokeLinejoin="round" />
      <path d="M16 16L5 14L8 16L5 18Z" fill="none" stroke="var(--wine)" strokeWidth="1" strokeLinejoin="round" />
      <circle cx="16" cy="16" r="1.6" fill="var(--gold)" />
    </g>
  ),
  // A folded page corner, for the studio journal entry.
  "From the journal": (
    <g>
      <path d="M7 6h14l4 4v16H7Z" fill="none" stroke="var(--wine)" strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M21 6v4h4" fill="none" stroke="var(--gold)" strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M11 15h10M11 19h10M11 23h6" stroke="var(--wine)" strokeWidth="1" strokeLinecap="round" />
    </g>
  ),
};

export default function ReportVoiceIcon({ voice }: { voice: string }) {
  const graphic = ICONS[voice as ReportVoice] ?? ICONS["From the journal"];
  return (
    <svg viewBox="0 0 32 32" className="report-voice-icon" aria-hidden="true">
      {graphic}
    </svg>
  );
}
