'use client';

import { useGhostHover } from '@/components/GhostHover';

export const timelineIconGraphics = [
  // 1. First Day at Studio — arched doorway with a fanned keystone flourish
  <g key="doorway">
    <path className="door-leaf-left" d="M16 28V15a6 6 0 0 0-6 0v13" fill="none" stroke="var(--wine)" strokeWidth="1.4" strokeLinecap="round" />
    <path className="door-leaf-right" d="M16 28V15a6 6 0 0 1 6 0v13" fill="none" stroke="var(--wine)" strokeWidth="1.4" strokeLinecap="round" />
    <path d="M8 28h16" fill="none" stroke="var(--wine)" strokeWidth="1.4" strokeLinecap="round" />
    <path d="M16 9V4M16 9l-4-4M16 9l4-4M16 9l-7 2M16 9l7 2" fill="none" stroke="var(--gold)" strokeWidth="1" strokeLinecap="round" />
  </g>,
  // 2. First Artwork Completed — a quill with a flourished plume (filled vane for visibility)
  <g key="quill">
    <path className="quill-shaft" d="M10 27Q14 18 21 7" fill="none" stroke="var(--wine)" strokeWidth="1.3" strokeLinecap="round" />
    <path d="M21 7C25 9 24 15 17 18C19 13 19 10 21 7Z" fill="var(--gold)" stroke="var(--wine)" strokeWidth="0.6" strokeLinejoin="round" />
    <path d="M8 28c2.5 2 5.5 2 7.5 0" fill="none" stroke="var(--gold)" strokeWidth="1.2" strokeLinecap="round" />
    <circle cx="8" cy="28.5" r="1.2" fill="var(--gold)" />
  </g>,
  // 3. First Appreciation from Ma'am — a full laurel wreath with a ribbon knot
  <g key="laurel">
    <g className="wreath-leaves">
      <path d="M15 6C9 7 5 13 5.5 19c0.3 4 2 7.5 5.5 9.5" fill="none" stroke="var(--wine)" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M17 6C23 7 27 13 26.5 19c-0.3 4-2 7.5-5.5 9.5" fill="none" stroke="var(--wine)" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M8 9L2 7L4 12Z" fill="var(--gold)" />
      <path d="M6 15L0 14.5L3 19Z" fill="var(--gold)" />
      <path d="M7 21.5L1.5 22.5L5.5 26.5Z" fill="var(--gold)" />
      <path d="M10 26.5L7 32L13.5 29.5Z" fill="var(--gold)" />
      <path d="M24 9L30 7L28 12Z" fill="var(--gold)" />
      <path d="M26 15L32 14.5L29 19Z" fill="var(--gold)" />
      <path d="M25 21.5L30.5 22.5L26.5 26.5Z" fill="var(--gold)" />
      <path d="M22 26.5L25 32L18.5 29.5Z" fill="var(--gold)" />
    </g>
    <path d="M12.5 28.5q3.5 3 7 0q-3.5-2-7 0z" fill="var(--wine)" />
  </g>,
  // 4. Exploring New Styles — antique 8-point compass rose
  <g key="compass">
    <circle cx="16" cy="16" r="13" fill="none" stroke="var(--gold)" strokeWidth="0.9" />
    <g className="compass-needle">
      <path d="M16 16L14 4L16 7L18 4Z" fill="var(--gold)" />
      <path d="M16 16L14 28L16 25L18 28Z" fill="var(--gold)" />
      <path d="M16 16L28 14L25 16L28 18Z" fill="none" stroke="var(--wine)" strokeWidth="1" strokeLinejoin="round" />
      <path d="M16 16L4 14L7 16L4 18Z" fill="none" stroke="var(--wine)" strokeWidth="1" strokeLinejoin="round" />
      <path d="M16 16L23 9M16 16L23 23M16 16L9 23M16 16L9 9" stroke="var(--wine)" strokeWidth="0.8" strokeLinecap="round" />
    </g>
    <circle cx="16" cy="16" r="1.8" fill="var(--gold)" />
  </g>,
  // 5. Creating with Confidence — wax-seal medallion with a signature flourish
  <g key="seal">
    <circle cx="16" cy="16" r="13" fill="var(--ivory)" stroke="var(--gold)" strokeWidth="1.6" />
    <circle cx="16" cy="16" r="9.5" fill="none" stroke="var(--gold)" strokeWidth="0.8" />
    <g className="seal-mark">
      <path d="M9 20c1-5 4-5 5-1c1 4 3.5 3.5 4-0.5c0.4-3.5 3-4 4.5-1" fill="none" stroke="var(--wine)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="22.5" cy="17.5" r="1.1" fill="var(--wine)" />
    </g>
  </g>,
  // 6. The Journey Continues — ornamental interlocking infinity knot
  <g key="knot">
    <path className="knot-line" d="M16 16C16 11 11 10 8 13C5 16 8 20 12 19C14.5 18.3 15.3 17 16 16" fill="none" stroke="var(--wine)" strokeWidth="1.3" strokeLinecap="round" />
    <path className="knot-line" d="M16 16C16 11 21 10 24 13C27 16 24 20 20 19C17.5 18.3 16.7 17 16 16" fill="none" stroke="var(--wine)" strokeWidth="1.3" strokeLinecap="round" />
    <path d="M6.5 11.5c-1 1-1 2.2 0 3.2" fill="none" stroke="var(--gold)" strokeWidth="1" strokeLinecap="round" />
    <path d="M25.5 11.5c1 1 1 2.2 0 3.2" fill="none" stroke="var(--gold)" strokeWidth="1" strokeLinecap="round" />
  </g>,
];

export function TimelineIconSvg({ index }: { index: number }) {
  return (
    <svg viewBox="0 0 32 32" className="timeline-icon-svg">
      {timelineIconGraphics[index % timelineIconGraphics.length]}
    </svg>
  );
}

export function TimelineEndCap() {
  return (
    <svg viewBox="0 0 24 24" className="timeline-end-cap">
      <circle cx="12" cy="12" r="10" fill="var(--ivory)" stroke="var(--gold)" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="6" fill="none" stroke="var(--wine)" strokeWidth="1" opacity="0.4" />
    </svg>
  );
}

export function TimelineFrameCorner() {
  return (
    <svg viewBox="0 0 16 16" className="timeline-frame-corner">
      <circle cx="8" cy="8" r="5" fill="var(--ivory)" stroke="var(--gold)" strokeWidth="0.8" opacity="0.6" />
      <path d="M3 8Q5 5 8 3Q11 5 13 8" fill="none" stroke="var(--wine)" strokeWidth="0.6" strokeLinecap="round" opacity="0.5" />
    </svg>
  );
}

export function TimelineGhostIcon({ children }: { children: React.ReactNode }) {
  // Shared generic ghost hover: section-triggered (not per-icon), piano-
  // sequenced one-at-a-time, holds GHOST_PLAY then releases, once per session,
  // re-trigger safe via the started/played guards in GhostHover.
  const ref = useGhostHover<HTMLDivElement>({ group: "student-timeline" });

  return (
    <div ref={ref} className="timeline-icon">
      {children}
    </div>
  );
}
