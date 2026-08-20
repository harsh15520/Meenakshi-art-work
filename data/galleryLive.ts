/**
 * galleryLive.ts
 * Live/editable data for the gallery page live strip + curator's-choice overlays.
 *
 * Update these whenever paintings are added, sold, move through the studio,
 * or a new favourite is chosen. Keep the same shape — the strip and the
 * marquee ribbons read straight from here.
 */

export type PaintingStage = "finishing-varnish" | "drying" | "framing";

/**
 * GalleryLivePainting — a painting surfaced in the gallery live strip.
 *
 * @property id           - Unique key
 * @property src          - Image path
 * @property alt          - Descriptive alt text (kept for SEO/a11y)
 * @property title        - Emotional title shown in the strip (#24)
 * @property story        - Emotional copy shown when expanded (#24)
 * @property medium       - "Oil" / "Acrylic" — descriptive, kept for context
 * @property addedOn      - ISO date the painting was added to the gallery (#10)
 * @property status       - availability state
 * @property stage        - pipeline stage when in-studio (#21)
 * @property favouriteNote- Meenakshi's personal note for the favourite card (#12)
 * @property curatorsChoice - flag for the marquee ribbon (#16)
 * @property curatorReason  - one-line reason shown with the ribbon (#16)
 * @property journalSlug  - link to the studio journal story (#22)
 */
export type GalleryLivePainting = {
  id: string;
  src: string;
  alt: string;
  title: string;
  story: string;
  medium: string;
  addedOn: string;
  status: "available" | "in-studio";
  stage?: PaintingStage;
  favouriteNote?: string;
  curatorsChoice?: boolean;
  curatorReason?: string;
  journalSlug?: string;
};

/** Last-updated label for the strip header. */
export const galleryLiveUpdated = "Updated 2 days ago";

/** Partition 1 — Recently Added (#10). */
export const galleryRecentlyAdded: GalleryLivePainting = {
  id: "deer-at-sunset",
  src: "/images/painting/oil-painting-50.webp",
  alt: "Deer at a sunset pond with swans in warm orange and red tones",
  title: "Evening Light at the Pond",
  story:
    "Painted over six weeks, layer by layer, until the evening light finally felt right.",
  medium: "Oil",
  addedOn: "2026-07-20",
  status: "available",
};

/** Partition 2 — In the Studio (#21). Stage is required here. */
export const galleryInStudio: GalleryLivePainting & { stage: PaintingStage } = {
  id: "roses-for-the-hallway",
  src: "/images/painting/oil-painting-49.webp",
  alt: "Rose bouquet still life in warm pinks and reds",
  title: "Roses for the Hallway",
  story: "The varnish is settling. Soon it will be ready to leave the studio.",
  medium: "Acrylic",
  addedOn: "2026-07-12",
  status: "in-studio",
  stage: "drying",
};

/** Partition 3 — This Month's Favourite (#12). */
export const galleryMonthlyFavourite: {
  painting: GalleryLivePainting;
  note: string;
} = {
  painting: {
    id: "seven-horses",
    src: "/images/painting/oil-painting-66.webp",
    alt: "Seven running horses in warm browns and golds beside water",
    title: "Seven Horses",
    story: "An auspicious composition — warm, unhurried, and full of movement.",
    medium: "Oil",
    addedOn: "2026-06-28",
    status: "available",
  },
  note: "I kept this one in the studio for weeks before deciding to release it.",
};

/** Partition 4 — From the Journal (#22). Slug of the entry to feature. */
export const galleryJournalEntrySlug = "why-build-this-journal";

