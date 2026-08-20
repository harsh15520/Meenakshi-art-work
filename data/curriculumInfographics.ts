// Maps each academy phase (zero-padded num) to its generated NotebookLM
// Infographic image(s) in public/infographic/. One infographic per phase (P1-P5);
// Phase 4 has two complementary images, rendered as two blocks.
// Paths must match the files prepared in public/infographic/.
export type PhaseInfographic = {
  src: string;
  label: string;
  landscape: boolean;
};

export const curriculumInfographics: Record<string, PhaseInfographic[]> = {
  "01": [{ src: "/infographic/phase-01-infographic.png", label: "Hand Control — phase infographic", landscape: false }],
  "02": [{ src: "/infographic/phase-02-infographic.png", label: "Proportions — phase infographic", landscape: true }],
  "03": [{ src: "/infographic/phase-03-infographic.png", label: "Acrylic Techniques — phase infographic", landscape: true }],
  "04": [
    { src: "/infographic/phase-04a-infographic.png", label: "Oil Painting Basics — mastery map", landscape: true },
    { src: "/infographic/phase-04b-infographic.png", label: "Oil Painting — physics & practice", landscape: true },
  ],
  "05": [{ src: "/infographic/phase-05-infographic.png", label: "Signature Style — phase infographic", landscape: false }],
};
