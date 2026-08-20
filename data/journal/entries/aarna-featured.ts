import type { JournalEntry } from "../../journal";

// === STUDENT STORY (10 entries, one per student) ===
const entry: JournalEntry = {
    slug: "aarna-featured",
    title: "Aarna: From Hesitation to Confidence",
    category: "student-story",
    excerpt: "How a student who avoided portraiture for two years finally discovered her voice through fearless experimentation.",
    body: [
      "Aarna joined the academy with a clear fear: portraiture. She avoided it for the first two years, sketching landscapes and still-life instead. But this year, something shifted.",
      "What changed wasn't technique—it was permission. When she realized that imperfection is part of the learning, she picked up the brush and painted her first portrait. Now, portraits are her favorite medium.",
      "Her work shows remarkable growth across every dimension. The technical skill is undeniable, but what's more impressive is the confidence radiating from every piece.",
    ],
    images: [
      {
        afterParagraph: 1,
        src: "/images/academy/aarna/featured-artwork/princess-dream/hero.webp",
        alt: "Aarna's portrait work",
        caption: "One of Aarna's breakthrough portraits",
      },
    ],
    publishedOn: "2026-07-15",
    readTimeMinutes: 4,
    status: "evergreen",
    tags: ["Students", "Breakthroughs", "Academy", "Confidence"],
    mentionedPeople: ["aarna"],
    coverImage: "/images/academy/aarna/featured-artwork/princess-dream/hero.webp",
    stream: "academy",
    emoji: "🎨",
    stripLabel: "Aarna's portfolio journey\nBreakthrough moment",
  };

export default entry;
