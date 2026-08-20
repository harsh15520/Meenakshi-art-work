// Maps each academy phase (zero-padded num) to its generated NotebookLM
// Report PDF in public/reports/. One report per phase (P1–P5).
// Paths must match the files prepared in public/reports/.
export const curriculumReports: Record<string, string> = {
  "01": "/reports/phase-01-parent-handout.pdf",
  "02": "/reports/phase-02-study-guide.pdf",
  "03": "/reports/phase-03-study-guide.pdf",
  "04": "/reports/phase-04-briefing-doc.pdf",
  "05": "/reports/phase-05-blog-post.pdf",
};

// Eyebrow/title/intro shown above each report, matched to its artifact format.
export const curriculumReportLabels: Record<
  string,
  { eyebrow: string; title: string; intro: string }
> = {
  "01": {
    eyebrow: "PARENT HANDBOOK",
    title: "Parent handout for this phase",
    intro:
      "What your daughter will do, how long it takes, and how you can help at home.",
  },
  "02": {
    eyebrow: "STUDY GUIDE",
    title: "Study guide for this phase",
    intro:
      "Key concepts, a short quiz, essay questions, and a glossary to revise between classes.",
  },
  "03": {
    eyebrow: "STUDY GUIDE",
    title: "Study guide for this phase",
    intro:
      "Key concepts, a short quiz, essay questions, and a glossary for the acrylic batch.",
  },
  "04": {
    eyebrow: "BRIEFING DOC",
    title: "Briefing doc for this phase",
    intro:
      "A plain-language overview of what this phase covers, who it's for, and how we judge readiness.",
  },
  "05": {
    eyebrow: "STUDIO JOURNAL",
    title: "Read the studio journal entry",
    intro:
      "A written piece on finding a personal voice — also published in the studio journal.",
  },
};
