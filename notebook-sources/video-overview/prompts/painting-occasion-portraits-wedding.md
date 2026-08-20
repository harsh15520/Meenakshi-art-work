# Occasion Portrait — Video Overview Prompt

**Format:** Cinematic (option 1) · **Language:** English · **Length:** Standard
**Sources to feed NotebookLM:**
- `notebook-sources/video-overview/sources/painting-occasion-portraits-wedding.md` (primary)
- `notebook-sources/painting/occasion-portraits-wedding/occasion-portraits-wedding-curator-report.md` (story backup)

## What should the video focus on?

Create an immersive, cinematic walkthrough of the commissioned **"Occasion Portrait — The Way She Looked That Day"** (graphite on warm-toned paper, 12 × 16 in, made for a daughter's wedding). Open with the idea that some portraits capture a person while these were made to capture a day — the jewellery, the embroidery, the pinned hair of a daughter on her wedding, held longer than a photograph could hold them. Weave in the mother's own words: she wanted portraits that felt like the way her daughter looked that day. Establish why the occasion mattered — not a generic pretty face, but a specific, once-in-a-life look to be preserved exactly.

Explain the central problem: a wedding portrait fails if the jhumkas, the embroidery and the hairpin disappear into "suggested" detail, so the work was to render the occasion, not just the person.

Make **the festive detail and the warm wash the visual stars.** Come in close on the gold jhumkas (`#c9a227`) — drawn first because they set the whole festive read — and hold on the sangeet earrings as a named detail rather than a generic stud. Then run a slow macro pass along the bridal embroidery thread (`#b86b7a`), stitch by stitch, so the hand behind it is unmistakable and clearly not printed. Contrast a cold studio-grey ground against the warm paper (`#f3e6d2`) to show the difference between a passport photo and a portrait of a day, and let the single emerald bangle (`#2f6b4f`) land as the one cool note that makes all the warmth read as celebration.

Cover the material reasoning — graphite keeps it intimate and drawn, warm paper and fine white highlights keep it from reading as a cold ID sketch, while full colour, pure charcoal and digital were each set aside. Compress the three-week build into a time-lapse (reference and likeness → jewellery and embroidery → warm wash and finishing, delivered before the memories faded). End on the finished portrait holding that once-in-a-life look, with the studio's "story it carries never does" line. Keep it tender and unhurried.

---

## Provenance (prompt beat → source)

| Beat | Source (`data/paintingStories.ts` → `occasion-portraits-wedding`) |
|---|---|
| Opening (capture a day, not a person) | `openingScene.narrative` |
| The mother's words | `modules` → `the-brief` + `exhibitionImages.ts` room 4 `testimonial` |
| Why the occasion mattered | `modules` → `occasion-context` |
| Central problem (suggested detail) | `modules` → `the-problem` |
| Festive detail + warm wash focus | `modules` → `client-collaboration` + `artists-notebook` |
| Named jhumkas / hand-drawn embroidery | `modules` → `details-people-almost-miss` |
| Palette hexes (gold, rose, warm paper, emerald) | `signatureInteraction` (color-palette-explorer) |
| Material reasoning + rejected alternatives | `modules` → `material-choice` |
| Three-week time-lapse | `modules` → `process-timeline` |

> **COMMISSION piece:** client voice from `exhibitionImages.ts` room 4 — `testimonial`, `clientNotes`, and `storyFacts` (Occasion: Wedding · Gift from: A mother · Completed in: 3 weeks).
