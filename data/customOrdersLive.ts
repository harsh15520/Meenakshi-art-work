/**
 * customOrdersLive.ts
 * Live/editable data for the custom-orders live strip + marquee overlays.
 *
 * Update these whenever a commission moves through the studio, is delivered,
 * or a new client story is worth featuring. Keep the same shape — the strip
 * and the marquee read straight from here.
 */

export type CommissionStage = "reference" | "approved" | "painting" | "finishing" | "delivered";

export const COMMISSION_STAGE_LABELS: Record<CommissionStage, string> = {
  reference: "Reference received",
  approved: "Direction approved",
  painting: "Painting",
  finishing: "Finishing & varnish",
  delivered: "Delivered",
};

export const COMMISSION_STAGE_ORDER: CommissionStage[] = [
  "reference",
  "approved",
  "painting",
  "finishing",
  "delivered",
];

/**
 * CustomCommission — a commission surfaced in the custom-orders live strip.
 *
 * @property id            - Unique key
 * @property src           - Image path
 * @property alt           - Descriptive alt text (SEO/a11y)
 * @property title         - Emotional title shown in the strip
 * @property story         - Emotional copy shown when expanded
 * @property occasion      - Occasion tag (Wedding / Farewell / Family Keepsake…)
 * @property addedOn       - ISO date the commission was added/delivered
 * @property status        - "in-studio" | "delivered" | "available"
 * @property stage         - pipeline stage when in-studio
 * @property testimonial   - first-person client quote
 * @property whatsappMessage - pre-filled WhatsApp message for the CTA card
 * @property room          - anchor to the matching room in the exhibition walk
 */
export type CustomCommission = {
  id: string;
  src: string;
  alt: string;
  title: string;
  story: string;
  occasion: string;
  addedOn: string;
  status: "in-studio" | "delivered" | "available";
  stage?: CommissionStage;
  testimonial?: string;
  whatsappMessage?: string;
  room?: string;
};

/** Last-updated label for the strip header. */
export const customOrdersLiveUpdated = "Updated 2 days ago";

/** Partition 1 — In the Studio. Stage is required here. */
export const customInStudio: CustomCommission & { stage: CommissionStage } = {
  id: "colour-portrait-in-progress",
  src: "/images/custom/coloured-portrait.webp",
  alt: "A hand mid-stroke on an in-progress colour pencil portrait",
  title: "A Colour Portrait, Mid-Stroke",
  story: "A colour pencil portrait, built layer by layer — the reference is approved and the face is taking shape.",
  occasion: "Portrait",
  addedOn: "2026-07-28",
  status: "in-studio",
  stage: "painting",
  room: "commissions-room-3",
};

/** Partition 2 — A Client's Story (featured testimonial). */
export const customClientStory: {
  commission: CustomCommission;
  note: string;
} = {
  commission: {
    id: "family-keepsakes",
    src: "/images/custom/oil-painting-109.webp",
    alt: "Graphite portrait of a baby seated in overalls",
    title: "Five Likenesses, One Hallway",
    story: "Five portraits drawn from family photographs — hung the way a home hangs the people it loves.",
    occasion: "Family Keepsake",
    addedOn: "2026-06-30",
    status: "delivered",
    room: "commissions-room-3",
  },
  note: "These five are my parents and my husband's parents and the grandmother who raised us all. Every morning I pass them and remember who I come from.",
};

// ─── RECENTLY DELIVERED (multi-item feed) ────────────────────────────────────

/**
 * Recently delivered commissions — a compact list with destination + relative date.
 * Reuse CustomCommission shape; `occasion` doubles as the destination/location.
 */
export const recentlyDeliveredCommissions: CustomCommission[] = [
  {
    id: "portrait-ghaziabad",
    src: "/images/custom/oil-painting-125.webp",
    alt: "Close graphite portrait of a young woman with a soft smile",
    title: "Portrait",
    story: "A graphite portrait, shipped to Ghaziabad.",
    occasion: "Ghaziabad",
    addedOn: "2026-07-28",
    status: "delivered",
    room: "commissions-room-4",
  },
  {
    id: "temple-panel-roorkee",
    src: "/images/custom/oil-painting-31.webp",
    alt: "Marigold-garlanded deity idol beneath a temple arch",
    title: "Temple Panel",
    story: "A devotional panel, delivered in Roorkee.",
    occasion: "Roorkee",
    addedOn: "2026-07-25",
    status: "delivered",
    room: "commissions-room-7",
  },
  {
    id: "family-keepsakes-2",
    src: "/images/custom/oil-painting-109.webp",
    alt: "Graphite portrait of a baby seated in overalls",
    title: "Keepsake Set",
    story: "Another family keepsake set, collected from the studio.",
    occasion: "Studio Pickup",
    addedOn: "2026-07-21",
    status: "delivered",
    room: "commissions-room-3",
  },
];

// ─── MEENAKSHI'S MONTHLY NOTE ────────────────────────────────────────────────

/**
 * "This Month's Thought" — a short personal note from Meenakshi.
 */
export const meenakshiMonthlyNote = {
  note: "Every commission begins with listening. Some stories take longer than painting itself.",
  attribution: "— Meenakshi",
  month: "",
};

// ─── SEASONAL COMMISSIONS ────────────────────────────────────────────────────

/**
 * A seasonal commission idea card. Each deep-links to WhatsApp with a
 * pre-filled occasion message.
 * @property icon      - Emoji shown on the card
 * @property title     - Occasion name, e.g. "Wedding Season"
 * @property message   - Pre-filled WhatsApp message for that occasion
 */
export type SeasonalCommission = {
  icon: string;
  title: string;
  message: string;
};

export const seasonalCommissions: SeasonalCommission[] = [
  {
    icon: "💍",
    title: "Wedding Season",
    message:
      "Hello, I'd like to commission a wedding gift painting. Please guide me about sizes, portraits and timelines.",
  },
  {
    icon: "🏡",
    title: "Housewarming",
    message:
      "Hello, I'd like to commission a housewarming painting for a new home. Please share ideas and pricing.",
  },
  {
    icon: "🪔",
    title: "Diwali",
    message:
      "Hello, I'd like to commission a Diwali painting. Please share devotional and festive ideas available.",
  },
  {
    icon: "💞",
    title: "Anniversary",
    message:
      "Hello, I'd like to commission an anniversary painting. Please guide me about couple portraits and timelines.",
  },
  {
    icon: "🌸",
    title: "Mother's Day",
    message:
      "Hello, I'd like to commission a Mother's Day painting. Please share ideas for a heartfelt gift.",
  },
];
