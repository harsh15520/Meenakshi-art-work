/**
 * academyToday.ts
 * All live/editable data for the academy page dynamic sections.
 * Update these whenever the studio situation changes.
 */

// ─── TODAY IN CLASS ──────────────────────────────────────────────────────────

/**
 * A single item in the "Today in Class" card.
 * @property icon  - Emoji icon shown to the left
 * @property text  - Full text of the item
 * @property bold  - Substring of text that should be rendered bold
 */
export type TodayInClassItem = {
  icon: string;
  text: string;
  bold?: string;
};

export const todayInClassItems: TodayInClassItem[] = [
  { icon: "🎓", text: "Bhavya completed Lesson 8",    bold: "Lesson 8"      },
  { icon: "🎨", text: "New acrylic batch started",    bold: "acrylic batch" },
  { icon: "🖼",  text: "3 exhibition frames finished", bold: "3 exhibition"  },
  { icon: "✏️", text: "Oil glazing demo at 5 PM",     bold: "Oil glazing"   },
];

export const todayInClassUpdated = "Updated today";

// ─── INSIDE TODAY'S CLASS (editorial card — left panel of Live Strip card 1) ─

/**
 * Editorial snapshot of the current lesson shown in the live strip.
 * @property lessonTitle    - Short lesson name, e.g. "Perspective correction"
 * @property lessonNote     - One or two sentences about what happened
 * @property photo          - Path to a behind-the-canvas placeholder image
 * @property photoAlt       - Alt text for the photo
 * @property seePhotosHref  - Link for "SEE PHOTOS →" (# until a real page exists)
 */
export type InsideTodaysClass = {
  lessonTitle: string;
  lessonNote: string;
  photo: string;
  photoAlt: string;
  seePhotosHref: string;
};

export const insideTodaysClass: InsideTodaysClass = {
  lessonTitle: "Perspective correction",
  lessonNote:
    "Students struggled with horizon lines. Interesting breakthrough today.",
  photo:
    "/images/academy/aarna/behind-the-canvas/princess-dream/sketch-layout.webp",
  photoAlt: "Student working on perspective line drawing in the studio",
  seePhotosHref: "/journal",
};

// ─── ATTENDANCE ──────────────────────────────────────────────────────────────

/**
 * Digits shown on the "In the studio now" card.
 * The displayed digit rotates continuously between 1–9 (random jump on each
 * swap) and is rendered heavily blurred + crossfading, so a visitor senses a
 * count exists but can never pin down the actual figure.
 */
export const attendanceBlurDigits: string[] = [
  "1", "2", "3", "4", "5", "6", "7", "8", "9",
];

/**
 * "Updated X ago" label shown beside the green live dot on the studio card.
 * Refresh whenever you update the live signals below.
 */
export const studioPresenceUpdated = "Updated 2 hours ago";

/**
 * Rotating qualitative "session signal" lines shown in the Attendance card.
 * One is picked at random per page load. These describe *presence and activity*
 * without ever stating how many students are in the studio.
 */
export const attendanceSignals: string[] = [
  "A student is deep in her piece right now.",
  "A brush is moving in the studio this moment.",
  "Fresh paint is still drying from today's session.",
  "Quiet, focused one-to-one guidance is underway.",
  "A canvas is being corrected stroke by stroke, right now.",
  "A young artist is finishing her composition today.",
];

// ─── CURRENT BATCH ───────────────────────────────────────────────────────────

export type CurrentBatch = {
  medium: string;  // e.g. "Acrylic"
  level: string;   // e.g. "Beginner to Intermediate"
};

export const currentBatch: CurrentBatch = {
  medium: "Acrylic",
  level: "Beginner to Intermediate",
};

/** Stable editorial note shown beside Meenakshi's profile. */
export const featuredTeacherNote = "Watching students discover their own style never gets old.";

/** A reviewed, complete testimonial. Quote and attribution are intentionally stored together. */
export const featuredParentReview = {
  quote: "My daughter used to rush through everything. Now she sits with one painting until it's truly done — I barely recognise her patience.",
  attribution: "Parent of Aarna",
};

// ─── STUDENT LOCKER — recently unlocked names ─────────────────────────────────

/**
 * Names shown in the "UNLOCKED RECENTLY" strip above the chest.
 * Only first names — no content revealed. Creates social proof / curiosity.
 */
export const recentlyUnlockedNames: string[] = ["Aarna", "Shreya", "Bhavya"];

// ─── HERO ACHIEVEMENT BADGE (rotating set) ───────────────────────────────────

/**
 * Icon key for the hand-drawn gold achievement icons.
 * trophy | medal | star | laurel
 */
export type AchievementIconKey = "trophy" | "medal" | "star" | "laurel";

/**
 * Floating achievement overlay on the academy page hero image.
 * Shown bottom-left of the image panel. The hero badge cycles through the
 * `heroAchievementBadges` set — one at a time, crossfading like the live strip.
 *
 * @property icon    - AchievementIconKey (trophy/medal/star/laurel)
 * @property title   - Short headline, e.g. "School Competition Winner"
 * @property subtitle - Detail line, e.g. "Aarna won 1st place (Age 11 Category)"
 */
export type AchievementBadge = {
  icon: AchievementIconKey;
  title: string;
  subtitle: string;
};

/**
 * Rotating set of student achievements shown in the academy hero badge.
 * Since the academy has dozens of students who earn recognitions over time,
 * this list can be extended as new wins happen — the badge never goes stale.
 * One entry is shown at a time and crossfades to the next on a timer.
 */
export const heroAchievementBadges: AchievementBadge[] = [
  { icon: "trophy", title: "School Competition Winner", subtitle: "Aarna won 1st place (Age 11 Category)" },
  { icon: "star", title: "Rising Star", subtitle: "Bhavya completed Lesson 8 in record time" },
  { icon: "medal", title: "Exhibition Feature", subtitle: "Student work featured in the annual showcase" },
  { icon: "laurel", title: "Craftsmanship", subtitle: "Niyati's Radha-Krishna piece earned a ma'am's note" },
  { icon: "star", title: "Creative Explorer", subtitle: "Prisha explored cubism with her cat study" },
  { icon: "trophy", title: "Competition Winner", subtitle: "Aarna secured 1st place in her age category" },
];

// ─── PARENT REVIEW (5th card of the academy live strip) ──────────────────────

/**
 * Rotating parent-review statements shown in the "Parent Review" card.
 * One quote is picked at random per page load.
 * Written from a parent's perspective about the academy experience.
 */
export const parentReviewQuotes: string[] = [
  "My daughter used to rush through everything. Now she sits with one painting until it's truly done — I barely recognise her patience.",
  "We came for the discipline and stayed for the confidence. The way corrections are explained one-on-one makes all the difference.",
  "What I value most is that every artwork is genuinely hers — no shortcuts, no teacher finishing it, just honest, patient practice.",
  "My daughter looks forward to class every single day. She's learning far more than painting; she's learning how to see.",
  "The academy feels like a safe, focused space. As a parent, that matters as much as the art itself.",
  "Her progress has been remarkable, but the real change is inside — she carries herself with a quiet confidence now.",
];

/**
 * Rotating "Parent of X" attribution names for the parent-review card.
 * Picked at random alongside the quote.
 */
export const parentReviewStudents: string[] = [
  "Aarna",
  "Shreya",
  "Bhavya",
  "Niyati",
  "Muskan",
  "Sanchi",
  "Prisha",
];

/**
 * Static credibility value shown at the top of the parent-review card.
 */
export const parentReviewRating = "★ 4.9 · 50+ Google reviews";
