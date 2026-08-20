// Maps each academy phase (by zero-padded num) to its generated NotebookLM
// Slide Deck PDF in public/slides/. One deck per phase (P1–P5).
// Paths must match the files prepared in public/slides/.
export const curriculumSlides: Record<string, string> = {
  "01": "/slides/phase-01-slide-deck.pdf",
  "02": "/slides/phase-02-slide-deck.pdf",
  "03": "/slides/phase-03-slide-deck.pdf",
  "04": "/slides/phase-04-slide-deck.pdf",
  "05": "/slides/phase-05-slide-deck.pdf",
};
