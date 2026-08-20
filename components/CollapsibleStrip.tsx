"use client";

import { useState, useEffect, useId } from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
  ariaLabel?: string;
};

/**
 * CollapsibleStrip — mobile-only "Peek & Expand" wrapper for live-data strips.
 *
 * On desktop/tablet (>620px): renders children directly — no toggle, no collapse.
 * On mobile (≤620px): only the first card is visible, with a glowing etched
 * down-arrow at the bottom centre. Tapping it smoothly expands to reveal all
 * cards. At the bottom of the expanded state, an up-arrow collapses back.
 *
 * The arrow has a continuous gold pulse glow + an etched (inset-shadow) look
 * so it's impossible to ignore on small screens.
 */
export default function CollapsibleStrip({ children, className, ariaLabel }: Props) {
  const [expanded, setExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const id = useId();
  const controlId = `collapsible-${id.replace(/[^a-zA-Z0-9]/g, "")}`;

  // Detect mobile via matchMedia
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 620px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // On desktop/tablet — render children directly, no toggle
  if (!isMobile) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div className={`collapsible-strip${expanded ? " is-expanded" : ""}`}>
            <div
        id={controlId}
        aria-label={ariaLabel}
        className={`collapsible-strip__grid${className ? ` ${className}` : ""}`}
      >
        {children}
      </div>

      <button
        type="button"
        className="collapsible-strip__toggle"
        onClick={() => setExpanded((v) => !v)}
        aria-expanded={expanded}
        aria-controls={controlId}
        aria-label={expanded ? "Show less" : "Show more"}
      >
        <span className="collapsible-strip__label">{expanded ? "LESS" : "MORE"}</span>
        <span className="collapsible-strip__arrow" aria-hidden="true">
          {expanded ? "▲" : "▼"}
        </span>
      </button>
    </div>
  );
}