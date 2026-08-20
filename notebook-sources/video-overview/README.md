# Video Overview Prompts — NotebookLM Feature #3

> Generated from `NOTEBOOKLM_FEATURE_MAP.md` Step 2 (row 3: Video Overview).
> These are ready-to-paste prompts for NotebookLM's **Video Overview** feature.
> Per confirmed roadmap: **P3, P4 first** (most visual → Cinematic), then **P1, P2, P5** (Explainer).

## Format decisions
| Phase | Title | Format | Rationale |
|-------|-------|--------|-----------|
| 01 | Hand Control | Explainer (option 2) | conceptual, build-on-build |
| 02 | Proportions | Explainer (option 2) | conceptual, measurement logic |
| 03 | Acrylic Techniques | **Cinematic (option 1)** | most visual — colour, brush, texture |
| 04 | Oil Painting Basics | **Cinematic (option 1)** | most visual — light, edges, finish |
| 05 | Signature Style | Explainer (option 2) | narrative / portfolio arc |

- **Cinematic** prompt style: immersive, sensory, storytelling.
- **Explainer** carousel sub-style: set to **Classic** by default; alternatives available in NotebookLM — Custom, Whiteboard, Kawaii, Anime, Watercolor, Retro print, Heritage, Paper-craft. Pick per brand mood.
- **Short (option 3)** is also available if a bite-sized cut is wanted later (not generated now).

## How to run (per phase)
1. In NotebookLM, open (or create) the notebook for the phase.
2. **Sources** → upload the file(s) listed in each phase prompt file (`sources/phase-0X-*.md` is primary; the `curriculum-phase-0X` / `academy-phase-0X` files are optional backups).
3. Studio → **Video Overview** → Customize.
4. Set Format per the table above (Cinematic / Explainer), Language = **English**, Length = **Standard** (or Short for a teaser).
5. Paste the "What should the video focus on?" prompt from the matching `prompts/phase-0X-*.md`.
6. Generate → download for the YouTube walkthrough / phase page.

## Files
- `sources/phase-01-hand-control.md` … `phase-05-signature-style.md` — the source docs to feed NotebookLM.
- `prompts/phase-01-hand-control.md` … `phase-05-signature-style.md` — format + focus prompt per phase.

## Notes
- Sources consolidate `data/curriculum.ts` (exercises, tools, focus areas, outcome), the `curriculumCanvasReflections` narratives (sensory student voice), and the existing `academy-phase-0X` / `curriculum-phase-0X` source files, restructured with explicit **Visual cues** so the video generator has concrete moments to depict.
- P3/P4 are the visual-heavy targets; their sources lean hardest on texture, light, and edge footage cues.
