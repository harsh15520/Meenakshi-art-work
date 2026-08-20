import type { JournalEntry } from "../../journal";

// === BEHIND-THE-SCENES (3 entries) ===
const entry: JournalEntry = {
    slug: "studio-morning-light",
    title: "Studio Light at Dawn",
    category: "behind-the-scenes",
    format: "snapshot",
    excerpt: "The golden hour before anyone arrives. The studio gets its best light at 6 AM.",
    body: [
      "The easels are empty, the brushes are waiting, and the light comes in at exactly the angle that makes everything visible. 6 AM in the studio is a different world from 4 PM.",
      "This is when the work happens most smoothly.",
    ],
    publishedOn: "2026-07-19",
    readTimeMinutes: 1,
    status: "evergreen",
    tags: ["Studio", "Light", "Process", "Morning"],
    mentionedPeople: [],
    coverImage: "/images/painting/oil-painting-80.webp",
    stream: "studio",
    emoji: "🌅",
    stripLabel: "Morning light\nGolden hour in the studio",
  };

export default entry;
