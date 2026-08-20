/**
 * curriculumAudio — maps each academy phase to its generated NotebookLM
 * Audio Overview files, keyed by style.
 *
 * Styles:
 *   - "deep-dive"  → Deep Dive (two-host unpacking)
 *   - "brief"      → Brief / hero-section (bite-sized overview)
 *   - "debate"     → Debate (two-host perspectives)
 *   - "critique"   → Critique (expert review)
 *
 * Only Hindi variants exist today; add `en`/`pa` keys when generated.
 * Paths must match the files prepared in public/audio/.
 */
export type CurriculumAudioStyle = "deep-dive" | "brief" | "debate" | "critique";

export const curriculumAudio: Record<
  string,
  Partial<Record<CurriculumAudioStyle, string>>
> = {
  "01": {
    "deep-dive": "/audio/curriculum-phase-1-deep-dive-hindi.opus",
    brief: "/audio/curriculum-phase-1-hero-section-hindi.opus",
  },
  "02": {
    "deep-dive": "/audio/curriculum-phase-2-deep-dive-hindi.opus",
    debate: "/audio/curriculum-phase-2-debate-hindi.opus",
  },
  "03": {
    brief: "/audio/curriculum-phase-3-hero-section-hindi.opus",
    "deep-dive": "/audio/curriculum-phase-3-deep-dive-hindi.opus",
  },
  "04": {
    debate: "/audio/curriculum-phase-4-debate-hindi.opus",
    "deep-dive": "/audio/curriculum-phase-4-deep-dive-hindi.opus",
  },
  "05": {
    critique: "/audio/curriculum-phase-5-critique-hindi.opus",
    "deep-dive": "/audio/curriculum-phase-5-deep-dive-hindi.opus",
  },
};

export const curriculumAudioLabels: Record<CurriculumAudioStyle, string> = {
  "deep-dive": "Deep Dive",
  brief: "Brief",
  debate: "Debate",
  critique: "Critique",
};
