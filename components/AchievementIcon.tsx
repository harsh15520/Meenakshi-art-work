import type { AchievementIconKey } from "@/data/academyToday";

// The icon key type now exists in data/academyToday (trophy | medal | star | laurel).

/**
 * AchievementIcon — hand-drawn gold SVG icons for the hero achievement badge.
 *
 * Replaces the flat emoji (🏆) with a small ceremonial gold set that matches the
 * certificate-seal language already used across the site. Rendered inline so the
 * badge keeps crisp edges on any display.
 *
 * Keys: trophy, medal, star, laurel. Falls back to trophy for unknown keys.
 */
export function AchievementIcon({ icon = "trophy" }: { icon?: AchievementIconKey }) {
  switch (icon) {
    case "medal":
      return (
        <svg viewBox="0 0 32 32" width="28" height="28" fill="none" aria-hidden="true">
          <defs>
            <linearGradient id="medalGold" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#f7dd99" />
              <stop offset="1" stopColor="#c98f3d" />
            </linearGradient>
          </defs>
          <circle cx="16" cy="13" r="7" fill="url(#medalGold)" stroke="#a06c2a" strokeWidth="1" />
          <circle cx="16" cy="13" r="4.6" fill="none" stroke="#fff2cd" strokeWidth="0.9" opacity="0.85" />
          <path d="M16 9.6l1 2.1 2.3.3-1.7 1.6.4 2.3-2-1.1-2 1.1.4-2.3-1.7-1.6 2.3-.3z" fill="#fff2cd" />
          <path d="M16 20v2.4" stroke="#c98f3d" strokeWidth="1.3" strokeLinecap="round" />
          <path d="M11.4 22.4h9.2l-1.4 4.2h-6.4z" fill="url(#medalGold)" stroke="#a06c2a" strokeWidth="0.9" strokeLinejoin="round" />
        </svg>
      );

    case "star":
      return (
        <svg viewBox="0 0 32 32" width="28" height="28" fill="none" aria-hidden="true">
          <defs>
            <linearGradient id="starGold" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#f7dd99" />
              <stop offset="1" stopColor="#c98f3d" />
            </linearGradient>
          </defs>
          <path d="M16 3.6l2.9 6 6.6 1-4.8 4.7 1.1 6.6-5.8-3.1-5.8 3.1 1.1-6.6L6.5 10.6l6.6-1z" fill="url(#starGold)" stroke="#a06c2a" strokeWidth="1" strokeLinejoin="round" />
          <path d="M16 8.4l1.5 3.1 3.4.5-2.4 2.3.5 3.3-3-1.6-3 1.6.5-3.3-2.4-2.3 3.4-.5z" fill="#fff2cd" opacity="0.85" />
        </svg>
      );

    case "laurel":
      return (
        <svg viewBox="0 0 32 32" width="28" height="28" fill="none" aria-hidden="true">
          <defs>
            <linearGradient id="laurelGold" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#f7dd99" />
              <stop offset="1" stopColor="#c98f3d" />
            </linearGradient>
          </defs>
          <path d="M9.5 4.5C5 6.5 4 11 5.8 15.4c1 2.5 3 4.2 5.2 5.2" stroke="#c98f3d" strokeWidth="1.4" fill="none" strokeLinecap="round" />
          <path d="M22.5 4.5C27 6.5 28 11 26.2 15.4c-1 2.5-3 4.2-5.2 5.2" stroke="#c98f3d" strokeWidth="1.4" fill="none" strokeLinecap="round" />
          <path d="M10 8.2l-3.2-1.4 2 3z" fill="url(#laurelGold)" stroke="#a06c2a" strokeWidth="0.6" strokeLinejoin="round" />
          <path d="M8.4 12.6l-3.6-.2 2.4 2.8z" fill="url(#laurelGold)" stroke="#a06c2a" strokeWidth="0.6" strokeLinejoin="round" />
          <path d="M9 17.4l-2.6 2.2 3.4.8z" fill="url(#laurelGold)" stroke="#a06c2a" strokeWidth="0.6" strokeLinejoin="round" />
          <path d="M22 8.2l3.2-1.4-2 3z" fill="url(#laurelGold)" stroke="#a06c2a" strokeWidth="0.6" strokeLinejoin="round" />
          <path d="M23.6 12.6l3.6-.2-2.4 2.8z" fill="url(#laurelGold)" stroke="#a06c2a" strokeWidth="0.6" strokeLinejoin="round" />
          <path d="M23 17.4l2.6 2.2-3.4.8z" fill="url(#laurelGold)" stroke="#a06c2a" strokeWidth="0.6" strokeLinejoin="round" />
          <circle cx="16" cy="11" r="2" fill="url(#laurelGold)" stroke="#a06c2a" strokeWidth="0.8" />
          <path d="M16 13v6M13.6 15.4h4.8" stroke="#c98f3d" strokeWidth="1.3" strokeLinecap="round" />
        </svg>
      );

    case "trophy":
    default:
      return (
        <svg viewBox="0 0 32 32" width="28" height="28" fill="none" aria-hidden="true">
          <defs>
            <linearGradient id="trophyGold" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#f7dd99" />
              <stop offset="1" stopColor="#c98f3d" />
            </linearGradient>
          </defs>
          <path d="M9 4h14l-2 6a7 7 0 0 1-10 0z" fill="url(#trophyGold)" stroke="#a06c2a" strokeWidth="1" strokeLinejoin="round" />
          <path d="M9 6.6C4.8 6.8 4.8 11.4 9.6 10.8" stroke="#c98f3d" strokeWidth="1.4" strokeLinecap="round" />
          <path d="M23 6.6C27.2 6.8 27.2 11.4 22.4 10.8" stroke="#c98f3d" strokeWidth="1.4" strokeLinecap="round" />
          <path d="M16 12v5" stroke="#c98f3d" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M11 17h10l-1.2 3.4h-7.6z" fill="url(#trophyGold)" stroke="#a06c2a" strokeWidth="1" strokeLinejoin="round" />
          <path d="M11.4 5.8c1.6-1.2 3.8-1.4 5.6-.6" stroke="#fff2cd" strokeWidth="1.1" strokeLinecap="round" opacity="0.9" />
        </svg>
      );
  }
}

