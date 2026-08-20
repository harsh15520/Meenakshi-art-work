import type { JournalEntry } from "../../journal";

// === PAST PROJECT (3 entries) ===
const entry: JournalEntry = {
    slug: "school-25-sheets-project",
    title: "25 Art Sheets: Board Exam Completed",
    category: "past-project",
    excerpt: "A 12th-grade student completed her entire board exam art submission—25 sheets in 6 weeks.",
    body: [
      "A family reached out in early June. Their daughter had an art requirement for her 12th-grade board exams: 25 completed art sheets covering specific techniques and concepts.",
      "We structured a 6-week intensive, balancing theory with practice, technique with creativity. The student came in most days, worked focused sessions, and pushed through the inevitable moments of doubt.",
      "By early July, all 25 sheets were complete, reviewed, and ready for submission. The work shows real growth—not just technique, but confidence in handling different mediums and compositions.",
    ],
    images: [
      { afterParagraph: 1, src: "/images/school/oil-painting-105.webp", alt: "Board exam art sheet, early stage" },
      { afterParagraph: 2, src: "/images/school/oil-painting-111.webp", alt: "Board exam art sheet, mid progress" },
      { afterParagraph: 3, src: "/images/school/oil-painting-131.webp", alt: "Completed board exam art sheet" },
    ],
    publishedOn: "2026-07-10",
    readTimeMinutes: 5,
    status: "completed",
    threadSlug: "school-25-sheets",
    tags: ["School Projects", "Deadlines", "Completion", "Intensive"],
    mentionedPeople: [],
    coverImage: "/images/school/oil-painting-10.webp",
    stream: "academy",
    emoji: "📚",
    stripLabel: "Board exam completed\n25 sheets delivered",
  };

export default entry;
