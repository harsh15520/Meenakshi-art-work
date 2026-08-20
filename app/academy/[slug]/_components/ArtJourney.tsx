'use client';

import { useRef } from 'react';
import Reveal from "@/components/Reveal";
import { TIMELINE_MILESTONES } from "@/data/artists";
import { TimelineIconSvg, TimelineEndCap, TimelineFrameCorner, TimelineGhostIcon } from "./timeline";
import type { Artist } from "./types";

export default function ArtJourney({ artist }: { artist: Artist }) {
  const nodeRefs = useRef<{ current: HTMLDivElement | null }[]>([]);

  if (nodeRefs.current.length !== TIMELINE_MILESTONES.length) {
    nodeRefs.current = Array.from({ length: TIMELINE_MILESTONES.length }, () => ({ current: null }));
  }

  TIMELINE_MILESTONES.forEach((_, i) => {
    // Intentionally no-op: hook call removed
  });

  return (
    <section className="artist-journey section-wrap">
      <Reveal>
        <p className="artist-section-label-ornate">{artist.name}&apos;s Art Journey</p>
        <div className="timeline-frame">
          <div className="timeline-frame-corner" style={{ position: "absolute", left: "8px", top: "50%", transform: "translateY(-50%)" }}>
            <TimelineFrameCorner />
          </div>
          <div className="timeline-end-cap-left">
            <TimelineEndCap />
          </div>
          <div className="artist-timeline-horizontal">
            <Reveal variant="line-fill" className="timeline-line-fill" />
            {TIMELINE_MILESTONES.map((label, i) => {
              const isAbove = i % 2 === 0;
              const labelContent = (
                <>
                  <div className="timeline-year">{artist.journeyYears[i]}</div>
                  <div className="timeline-text">{label}</div>
                </>
              );
              return (
                <div key={i} className="timeline-node">
                  <div className="timeline-label-slot timeline-label-slot-top">{isAbove && labelContent}</div>
                  <TimelineGhostIcon>
                    <TimelineIconSvg index={i} />
                  </TimelineGhostIcon>
                  <div className="timeline-label-slot timeline-label-slot-bottom">{!isAbove && labelContent}</div>
                </div>
              );
            })}
          </div>
          <div className="timeline-end-cap-right">
            <TimelineEndCap />
          </div>
          <div className="timeline-frame-corner" style={{ position: "absolute", right: "8px", bottom: "0", transform: "scaleX(-1) scaleY(-1)" }}>
            <TimelineFrameCorner />
          </div>
          <p className="timeline-frame-footer-ornament">↦ ← ↤ ← ↦</p>
        </div>
      </Reveal>
    </section>
  );
}
