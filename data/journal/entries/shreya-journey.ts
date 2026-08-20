import type { JournalEntry } from "../../journal";

const entry: JournalEntry = {
    slug: "shreya-journey",
    title: "Shreya's Exploration of Color Theory",
    category: "student-story",
    excerpt: "A student discovering how understanding color relationships transforms every piece she creates.",
    body: [
      "Shreya came to us interested in painting but without formal training. Over months of steady practice, she moved from copying techniques to developing her own visual language.",
      "The turning point came when we focused on color theory—not as rules to follow, but as a toolkit for expression. Now every piece shows a deliberate understanding of how colors speak to each other.",
    ],
    images: [
      {
        afterParagraph: 1,
        src: "/images/academy/shreya/oil-painting-117.webp",
        alt: "Shreya's painting work",
      },
    ],
    publishedOn: "2026-07-14",
    readTimeMinutes: 3,
    status: "evergreen",
    tags: ["Students", "Color Theory", "Academy", "Exploration"],
    mentionedPeople: ["shreya"],
    coverImage: "/images/academy/shreya/oil-painting-121.webp",
    stream: "academy",
    emoji: "🎨",
    stripLabel: "Shreya's color theory\nFinding her palette",
  };

export default entry;
