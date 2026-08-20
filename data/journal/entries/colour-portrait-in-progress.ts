import type { JournalEntry } from "../../journal";

// === NEW: ACTIVE COMMISSION ENTRIES ===
const entry: JournalEntry = {
    slug: "colour-portrait-in-progress",
    title: "Colour Portrait: Mid-Stroke",
    category: "business-insight",
    excerpt: "A colour pencil portrait is in progress — the face is taking shape and the reference is approved.",
    body: [
      "The reference photo was approved last week. The foundation is laid and now the face is taking shape — layer by layer, stroke by stroke.",
      "This is the kind of commission that happens quietly in the studio, built over several sessions.",
    ],
    publishedOn: "2026-07-21",
    readTimeMinutes: 2,
    status: "active",
    threadSlug: "textile-painting-research",
    tags: ["Commissions", "Portrait", "In Progress"],
    mentionedPeople: [],
    coverImage: "/images/custom/coloured-portrait.webp",
    stream: "commission",
    stage: "painting",
    emoji: "✏️",
    stripLabel: "Colour portrait in progress\nFace taking shape",
  };

export default entry;
