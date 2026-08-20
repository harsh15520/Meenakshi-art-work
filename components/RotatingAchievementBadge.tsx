"use client";
import { useEffect, useState } from "react";
import type { AchievementBadge } from "@/data/academyToday";
import { AchievementIcon } from "./AchievementIcon";

type Props = {
  /** Set of pre-written achievements — one shown at a time, then rotated */
  badges: AchievementBadge[];
  /** Milliseconds between rotations (default 4000) */
  interval?: number;
};

/**
 * RotatingAchievementBadge — floating hero badge that cycles through a set of
 * student achievements (school wins, medals, milestones, recognition).
 *
 * Mirrors the rotating-statement pattern used across the academy live strip:
 * a fixed glass panel whose inner content (icon + title + subtitle) crossfades
 * to the next pre-written achievement on a timer. Because the academy has many
 * students earning recognitions over time, the set can be edited freely in
 * `data/academyToday.ts` — the badge never goes stale.
 *
 * Client component — rotation requires useState/useEffect.
 */
export default function RotatingAchievementBadge({ badges, interval = 4000 }: Props) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (badges.length <= 1) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % badges.length);
    }, interval);
    return () => clearInterval(id);
  }, [badges.length, interval]);

  const badge = badges[index] ?? badges[0];
  if (!badge) return null;

  return (
    <div className="interior-achievement-badge">
      <div key={index} className="interior-achievement-badge__content">
        <span className="interior-achievement-icon" aria-hidden="true">
          <AchievementIcon icon={badge.icon} />
        </span>
        <div>
          <p className="interior-achievement-title">{badge.title}</p>
          <p className="interior-achievement-sub">{badge.subtitle}</p>
        </div>
      </div>
    </div>
  );
}

