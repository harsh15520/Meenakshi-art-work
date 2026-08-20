# NotebookLM Feature → Gallery Painting Decision Map (Full Rollout)

> **Scope:** Per-painting NotebookLM assets for ALL bespoke gallery + custom-orders story pages (`/painting/[slug]`) — 16 paintings (3 original pilots + 13 extended).
> **Companion to:** `NOTEBOOKLM_FEATURE_MAP.md` (curriculum phases P1–P5).
> **Phase A only:** this plan authors the **source markdown** a human feeds into NotebookLM. App code, `data/*` maps, and `public/` binaries are Phase B (separate execution).
> **Unit of work:** ONE painting × ONE feature. Files are authored one unit at a time from real `data/paintingStories.ts` (and `data/exhibitionImages.ts` for commissions) modules — no invented facts.

## All bespoke painting stories (16 — Phase A complete)

Every entry has been authored across all 6 features (audio EN+HI, slide deck, report, infographic, video source+prompt, flashcards).

| Slug | Context | Emotional signature | Defining move |
|---|---|---|---|
| `tiger-family-quiet-hour` | gallery / wildlife | protective | Gaze turned into the distance; evening light is the visual spine. |
| `farewell-mural-samudra` | commission / mural | grounded | Lead with the institution's `testimonial`; Vasuki-wrap + 8-week build. |
| `lion-pop-art` | gallery / pop | intense | Repetition-as-mane; four flat colours; hard edges. |
| `mother-and-child-blessing` | gallery / devotional | tender | Lowered gaze; the blurred blessing hand. |
| `radha-krishna-gold-and-blue` | gallery / devotional | sacred | Gold laid first, blue floated wet-on-wet; resting flute. |
| `village-well-banyan` | gallery / rural | grounded | Dry-brush "thread" banyan roots; earth not rainbow. |
| `cranes-at-sunset` | gallery / wildlife | free | Single untouched wash; no hard edge anywhere. |
| `graphite-portrait` | gallery / portrait | quiet | Pressure as pigment; one gradient carries the likeness. |
| `elephant-pattern-art` | gallery / pattern | intense | Square-by-square mapping; bending grid; trunk spiral. |
| `peacock-courtyard-gate` | commission / carved wood | tender | Neem as the frame; relief peacock eyes catch sun. |
| `family-keepsakes-graphite` | commission / portrait | tender | Five faces, one temperature; unified pressure range. |
| `occasion-portraits-wedding` | commission / portrait | tender | Named sangeet jhumkas; warm wash like the venue. |
| `made-for-the-table` | commission / woodware | grounded | Garden-matched jasmine; invisible food-safe sealant. |
| `shravanabelagola-heritage` | commission / heritage | grounded | Memory not monument; the monolith painted small. |
| `marigold-temple-deity` | commission / devotional | sacred | One composed corner; continuous gold line; diya-first. |
| `morning-corner-krishna` | commission / devotional | sacred | 6 AM install; averted reverent gaze; lotus for grandmother. |

## Feature → source-file map (Layer 1, Phase A)

All under `notebook-sources/`. Reports/Infographics live in `painting/<slug>/`; the rest mirror the curriculum subfolders.

| # | Feature | Source file(s) per slug | Notes |
|---|---------|-------------------------|-------|
| 1 | **Audio Overview** | `audio-scripts/painting-<slug>.md` (EN + HI) | Fills `template-painting-narration.md`; two-language narration, provenance table. |
| 2 | **Slide Deck** | `slide-deck/painting-<slug>.md` | "How this painting was made" deck prompt; Detailed Deck · EN · Short. |
| 3 | **Report** | `painting/<slug>/<slug>-curator-report.md` | Story + technique + living-with-it (curator's dossier). |
| 4 | **Infographic** | `painting/<slug>/<slug>-infographic.md` | Technique / material / composition cheat-sheet spec. |
| 5 | **Video Overview** | `video-overview/sources/painting-<slug>.md` + `video-overview/prompts/painting-<slug>.md` | Cinematic (option 1) · EN · Standard. |
| 6 | **Flashcards** | `flashcards/sources/painting-<slug>.md` | "What to look for" + technique cards; light / lowest priority. |

## Per-unit method (applied to all 96 painting feature-units)

1. **Analyze** the real content for the slug in `data/paintingStories.ts` (modules by `type`/`order`); for commissions also `data/exhibitionImages.ts` (`testimonial`, `clientNotes`, `storyFacts`).
2. **Map** which modules feed the feature (e.g. Audio → `the-problem`/`the-solution`/`details-people-almost-miss`/`light-interaction`; Report → technique + living; Infographic → `color-decisions`/`technique-details`/`material-choice`).
3. **Author** strictly from those modules — no invented facts.
4. **Provenance table** at the bottom of every file, citing the exact module each beat came from (QA aid).

## Per-painting feature emphasis

- **tiger-family-quiet-hour** — Audio/script lean on the gaze turn (`the-solution`), cub protection (`hidden-symbolism`/`details-people-almost-miss`), evening light (`light-interaction`). No testimonial (gallery): the "living part" uses `future-home`/`ideal-owner`.
- **farewell-mural-samudra** — lead with the institution's `testimonial` ("It had to feel monumental…") and `clientNotes` (Vasuki wrap, gradual treasures) from `customOrdersExhibitionImages` room 2; pull `the-brief`, `scale-struggle`, `process-timeline`.
- **lion-pop-art** — lead with the graphic contrast: `the-problem` (realism trap), `the-solution` (repetition as mane), `color-decisions` (4 flat colours), `technique-details` (flat fills, uniform outline). Infographic + Video shine here.
- **mother-and-child-blessing** — sweetness cliché (`the-problem`) → lowered gaze (`the-solution`); the blurred blessing hand + child's fist are the missed details.
- **radha-krishna-gold-and-blue** — the gold-first/blue-float technique (`artists-notebook`) is the star; reference-evolution chooses the glowing midday study.
- **village-well-banyan** — dry-brush "thread" roots (`the-solution`) defeat the postcard problem; chipped pot kept on purpose.
- **cranes-at-sunset** — the single untouched wash (`the-solution`); light-interaction is the visual spine.
- **graphite-portrait** — pressure-as-pigment (`the-solution`); one gradient jaw is the whole likeness.
- **elephant-pattern-art** — square-by-square mapping + bending grid (`the-solution`/`technique-details`); trunk spiral is the breath in the ornament.
- **peacock-courtyard-gate** — commission: lead with `testimonial`; carving-meets-colour (`the-problem`); neem as frame + relief eyes.
- **family-keepsakes-graphite** — commission: `testimonial` ("remember who I come from"); unified pressure + Diwali reference.
- **occasion-portraits-wedding** — commission: `testimonial`; named jhumkas + warm wash from `client-collaboration`.
- **made-for-the-table** — commission: `testimonial`; garden-matched jasmine + three-coat food-safe sealant.
- **shravanabelagola-heritage** — commission: `testimonial`; memory-not-monument; monolith painted small.
- **marigold-temple-deity** — commission: `testimonial`; one composed corner + continuous gold line, diya-first.
- **morning-corner-krishna** — commission but NO separate `testimonial` field; the client voice is the `client-memory` module (grandmother tradition); 6 AM install is the hinge.

## Phase B shape (later execution — NOT done in Phase A)

- `data/paintingAudio.ts`: `Record<slug, Partial<Record<"en"|"hi", string>>>` (language tabs EN/HI, not style tabs).
- `data/paintingSlides.ts`: `Record<slug, string>` (PDF path, e.g. `/slides/<slug>-slide-deck.pdf`).
- `data/paintingReports.ts`: `Record<slug, { src: string; label: string; intro?: string; eyebrow?: string }>`.
- `data/paintingInfographics.ts`: `Record<slug, { src: string; label: string; landscape?: boolean }[]>`.
- `data/paintingVideos.ts`: `Record<slug, { youtubeId: string; title: string }>` + reuse `YOUTUBE_CHANNEL_URL`.
- `components/PaintingAudioPlayer.tsx`: clone `PhaseAudioPlayer.tsx`, swap style tabs → `en`/`hi` language tabs, reuse `.hero-audio-player` CSS.
- Page beats reuse `LazyPdfEmbed`, `FloatingVideoShort` (bottom-LEFT), `Reveal`, and academy.css classes. Gate every beat on data presence so the non-pilot pages render unchanged.

## Constraints / risks

- Floating video must stay bottom-LEFT (opposite WhatsApp CTA bottom-RIGHT).
- Phase B artifact paths must match the data maps byte-for-byte (audio previously returned 416/404 in places).
- `next.config.mjs` has an invalid `experimental.allowedOrigins` key (known warning) — ignore unless it blocks build.
- Use `tsc --noEmit` + `next lint` for fast checks; `prebuild` runs prisma generate/push/seed.

## Open questions (out of scope for Phase A)

- The other exhibition pieces use a generic auto-generated "standard" story (`createStandardStory` in `data/paintingStories.ts`) with no real narrative modules — authoring rich sources for those would require first writing real stories, not just mirroring the template.
- Extend to the ~20 pieces missing bespoke slugs (purely exhibition-driven pages)?
- Add more NotebookLM languages (pa/ta/etc.) to painting audio? Phase B should localise Audio + Reports first per the parent map.
