# Gallery Page & Exhibition "Inspect" Tiger Painting Card — Codebase Research

> **Purpose:** Traceable, consolidated NotebookLM source for the tiger painting's presence on the Gallery collection page and its "Inspect this room" card, plus the linked full-story page. Built from a careful read of the real code (not assumed).
> **Subject painting:** `Tiger Family` → slug `tiger-family-quiet-hour` (gallery context, emotional signature `protective`).
> **Created:** 2026-08-17

---

## 1. Analysis — where the tiger actually lives in the codebase

The tiger is **not** a standalone gallery card. It is surfaced in exactly two places, both driven by `data/exhibitionImages.ts` and rendered by one component:

1. **The Gallery page** (`app/gallery/page.tsx`) mounts `<ExhibitionWalk images={galleryExhibitionImages} />` inside an `<InteriorPage>`. `ExhibitionWalk` is a room-by-room carousel. The tiger sits in **Room 4 — "The Wildlife Room"** (an `ExhibitionImage` object whose `pieces` array contains the tiger).
2. Inside that room, the **"Inspect this room"** button (`.exhibition-tourbar__inspect`) opens a modal (`exhibition-inspect`). The tiger appears there as a **piece card** (`.exhibition-inspect__piece`): a thumbnail of `/images/painting/oil-painting-51.webp`, the title **"Tiger Family"**, the line **"Acrylic · 24 × 30 in"**, the price **"₹22,000"**, and a CTA **"Read the full story →"** that links to **`/painting/tiger-family-quiet-hour`**.
3. That CTA target is the **painting story page** (`app/painting/[slug]/page.tsx`), which pulls `getPaintingStory("tiger-family-quiet-hour")` from `data/paintingStories.ts` and renders its modules + the `ambient-sound` signature interaction + a WhatsApp inquiry.

So the "tiger painting card" = the piece card inside the Wildlife Room's inspect modal, and its narrative source of truth = the `tiger-family-quiet-hour` entry in `paintingStories.ts`. The room's `curatorNotes` (exhibition data) is the *gallery's own* short reading of the tiger; the story page is the long-form version.

Key wiring detail: the piece→story link is built in `ExhibitionWalk` via `piece.paintingSlug ? /painting/${piece.paintingSlug} : /painting/${paintingStorySlug(piece.title)}`. The tiger piece explicitly sets `paintingSlug: "tiger-family-quiet-hour"`, so the link is stable.

---

## 2. Source: `app/gallery/page.tsx` (the page that mounts the exhibition)

Relevant lines (the whole file is 52 lines; the decisive bit):

```tsx
import ExhibitionWalk from "@/components/ExhibitionWalk";
import { galleryExhibitionImages } from "@/data/exhibitionImages";
// ...InteriorPage wraps hero, marquee, live strip, then:
<ExhibitionWalk id="exhibition" images={galleryExhibitionImages} />
```

- `galleryExhibitionImages` is the array of 6 room objects. Room 4 is the Wildlife Room containing the tiger.
- The page also renders a global `GalleryHeroAudioPlayer` and a Hindi `MarqueeAudioPlayer`, but those are gallery-wide, not tiger-specific.

---

## 3. Source: `components/ExhibitionWalk.tsx` — the inspect modal (the tiger card lives here)

The decisive logic (lines 219–223) shows the inspect button only appears when a room has `pieces`:

```tsx
{currentImage?.pieces && currentImage.pieces.length > 0 && (
  <button type="button" className="exhibition-tourbar__inspect" onClick={() => setInspect(true)}>
    {isGallery ? "Inspect this room" : "See the pieces"} <span>↗</span>
  </button>
)}
```

The modal itself (lines 318–394) renders, in order: wing label, "Inspect this room" title, the room `note`, **curator's notes** (`currentImage.curatorNotes`), **testimonial** (if present), **client notes** (if present), then the **pieces grid**. The tiger card is one grid cell:

```tsx
<div className="exhibition-inspect__grid">
  {currentImage.pieces.map((piece) => {
    const storyHref = piece.paintingSlug
      ? `/painting/${piece.paintingSlug}`
      : piece.href || `/painting/${paintingStorySlug(piece.title)}`;
    return (
      <div key={piece.src} className="exhibition-inspect__piece">
        <div className="exhibition-inspect__thumb">
          <Image src={piece.src} alt={piece.title} fill sizes="220px" style={{ objectFit: "cover" }} />
        </div>
        <div className="exhibition-inspect__info">
          <h4>{piece.title}</h4>
          <p className="exhibition-inspect__medium">{piece.medium} · {piece.size}</p>
          <p className="exhibition-inspect__price">{piece.price}</p>
          <Link href={storyHref} className="exhibition-inspect__cta exhibition-inspect__cta--link">
            Read the full story →
          </Link>
        </div>
      </div>
    );
  })}
</div>
```

For the tiger, `piece` = `{ src: "/images/painting/oil-painting-51.webp", title: "Tiger Family", medium: "Acrylic", size: "24 × 30 in", price: "₹22,000", href: "/gallery", paintingSlug: "tiger-family-quiet-hour", storyContext: "gallery" }`, so `storyHref` = `/painting/tiger-family-quiet-hour`.

The room also has a Ken-Burns active-slide animation and a per-room ambient hue; the Wildlife Room uses `theme: "wildlife"` → hue `#2f3f33`.

---

## 4. Source: `data/exhibitionImages.ts` — Room 4 (The Wildlife Room) with the tiger

```ts
{
  src: "/images/exhibition/5.webp",
  alt: "Gallery room with a tiger family painting, paired sunset wildlife scenes, and a tiger close-up portrait",
  note: "Nature observed with patience — not decoration, but genuine study of animals in their own light.",
  curatorNotes: [
    "The Tiger Family at the centre is the room's quiet engine — read its full story separately, but in the room notice how the mother's stripes were painted to lead your eye away from the cubs and back to her watchful gaze. That redirection is the composition, not a detail.",
    "The Close Portrait beside it was an exercise in restraint: no background, no story, just one animal filling the frame. Look at the whisker dots — each was dotted with the handle end of the brush, never the tip, so they stay round.",
    "Cranes at Sunset on the right is the room's exhale. The water was laid in one wash and never touched again, so the cranes float on top of stillness rather than standing in it. It's the only painting here with no hard edge anywhere.",
  ],
  notePosition: "bottom-center",
  wing: "The Wildlife Room",
  theme: "wildlife",
  room: 4,
  pieces: [
    { src: "/images/painting/oil-painting-51.webp", title: "Tiger Family", medium: "Acrylic", size: "24 × 30 in", price: "₹22,000", href: "/gallery", paintingSlug: "tiger-family-quiet-hour", storyContext: "gallery" },
    { src: "/images/painting/oil-painting-6.webp", title: "Tiger · Close Portrait", medium: "Acrylic", size: "2 × 3 ft", price: "₹12,000", href: "/gallery" },
    { src: "/images/painting/oil-painting-113.webp", title: "Cranes at Sunset", medium: "Acrylic", size: "2 × 1.5 ft", price: "₹5,000", href: "/gallery", paintingSlug: "cranes-at-sunset", storyContext: "gallery" },
  ],
}
```

Note: the tiger piece has **no `testimonial` and no `clientNotes`** on its room (those fields are for commission rooms). The gallery "living part" is therefore carried by `curatorNotes` + the painting story page, not a client quote.

---

## 5. Source: `app/styles/academy.css` — inspect-card styling (lines 314–393)

The button and modal are styled here (shared across the site):

```css
.exhibition-tourbar__inspect{font:600 10px var(--font-body);letter-spacing:.1em;text-transform:uppercase;color:var(--gold);background:transparent;border:1px solid rgba(214,163,111,.5);padding:9px 16px;border-radius:99px;cursor:pointer;transition:.25s;animation:exhibition-inspect-breathe 2.4s ease-in-out infinite}
@keyframes exhibition-inspect-breathe{0%,100%{box-shadow:0 0 0 0 rgba(214,163,111,0);border-color:rgba(214,163,111,.5)}50%{box-shadow:0 0 0 6px rgba(214,163,111,.16);border-color:var(--gold)}}

.exhibition-inspect{position:fixed;inset:0;z-index:70;background:rgba(20,14,12,.72);backdrop-filter:blur(6px);display:flex;align-items:center;justify-content:center;padding:24px}
.exhibition-inspect__panel{position:relative;width:min(920px,100%);max-height:90vh;overflow:auto;background:var(--paper);border-radius:12px;padding:32px;box-shadow:0 24px 70px rgba(0,0,0,.5)}
.exhibition-inspect__curatornotes{margin:0 0 24px;padding:18px 20px;background:rgba(182,120,62,.07);border:1px solid rgba(182,120,62,.22);border-radius:10px;max-width:640px}
.exhibition-inspect__testimonial{font:italic 15px/1.7 var(--font-hand);color:#583a35;padding-left:16px;border-left:2px solid var(--gold);background:rgba(182,120,62,.06);padding:12px 16px;border-radius:0 8px 8px 0}
.exhibition-inspect__grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
.exhibition-inspect__piece{display:flex;flex-direction:column;gap:10px;background:#f8f2e9;border:1px solid var(--line);border-radius:10px;overflow:hidden;transition:.25s;text-decoration:none;color:inherit}
.exhibition-inspect__piece:hover{transform:translateY(-4px);box-shadow:0 14px 30px rgba(41,35,33,.14);border-color:var(--gold)}
.exhibition-inspect__thumb{position:relative;width:100%;aspect-ratio:4/3;overflow:hidden;background:var(--blush)}
.exhibition-inspect__price{font:600 13px var(--font-display);color:var(--wine);margin:4px 0 0}
.exhibition-inspect__cta{font-size:10px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--gold);border-bottom:1px solid var(--gold);padding-bottom:3px;width:max-content}
```
Mobile (≤720px): the grid collapses to 1 column and the panel padding shrinks.

---

## 6. Source: `app/painting/[slug]/page.tsx` — the "full story" target (lines 38–147)

The tiger card's CTA lands here. The page resolves the story, finds the original piece (for the WhatsApp link), sorts modules by `order`, and renders:

```tsx
<PaintingHero image={story.openingScene.image} contextualTitle={story.contextualTitle} narrative={story.openingScene.narrative} />
// context band: "FROM THE GALLERY COLLECTION"
{orderedModules.map((module) => <NarrativeModule key={...} module={module} />)}
// signature interaction (tiger = ambient-sound)
{story.signatureInteraction && <SignatureInteraction interaction={story.signatureInteraction} />}
// WhatsApp inquiry -> wa.me link prefilled with contextualTitle + piece title
// Back link -> /gallery
```

So the tiger story page = hero (openingScene) → context band → 8 `NarrativeModule`s (the modules below, in `order`) → ambient-sound interaction → WhatsApp → back to gallery.

`lib/paintingStorySlug.ts` (the fallback link builder): lowercases, strips diacritics, replaces non-alphanumerics with `-`. The tiger uses the explicit `paintingSlug`, so the fallback is unused for it.

---

## 7. Source: `data/paintingStories.ts` — the tiger's full narrative (`tiger-family-quiet-hour`)

This is the long-form content the card points to. Verbatim from the data:

- **slug:** `tiger-family-quiet-hour` · **contextualTitle:** "The Quiet Hour Before Sunset" · **pieceId:** "Tiger Family" · **storyContext:** gallery · **emotionalSignature:** protective
- **openingScene.narrative:** "Some paintings capture what they see. This one captures what they feel. The moment when light changes, when activity slows, when the world holds its breath—that's the hour this tiger family lives in."
- **Modules (by `order`):**
  1. `the-problem` — "Tiger paintings often focus on power and aggression—bared teeth, hunting poses, dominance. But that's not the whole story of tigers." / whyItMattered: "We wanted to show a different side: protection, family bonds, quiet strength. The problem was avoiding the cliché while still capturing the essence of these animals."
  2. `the-solution` — "The solution was in the eyes. We directed the mother's gaze away from confrontation—she's not looking at the viewer or her cubs, but into the distance. This is the watchfulness of protection, constant but calm." / howWeGotThere: "Multiple studies explored different eye directions. The final choice creates a sense of calm vigilance rather than aggressive confrontation."
  3. `color-decisions` — palette: Warm oranges and golds (Late afternoon light / golden hour); Cool blues in shadows (Atmospheric depth); Deep earth tones (Grounding).
  4. `hidden-symbolism` — Mother's positioning: "She stands between the viewer and her cubs—not aggressive, but protective."; Cub's partial hiding: "instinctive protection, but also curiosity. The tension between safety and exploration."
  5. `future-home` — imaginedContext: "a quiet reading room where late afternoon light reaches the canvas for an hour each day…"; potentialSettings: ["West-facing living room", "Quiet study", "Reading nook with evening light"].
  6. `ideal-owner` — "values stillness, who understands that strength doesn't always need to be loud"; traits: ["Values quiet moments", "Appreciates family bonds", "Seeks calm in their space"].
  7. `light-interaction` — "Designed to catch warm evening light… glow during the hour before sunset"; timesOfDay: 4 PM (flat/muted), 6 PM (golden hour glow), 7 PM (deep shadows / protective atmosphere).
  8. `details-people-almost-miss` — Mother's gaze direction (into the distance = watchfulness of protection); Cub's protective positioning (partially hidden behind mother = safety vs exploration).
- **signatureInteraction:** `ambient-sound` — sounds: gentle wind through leaves, distant bird calls at sunset, leaves rustling in evening breeze.
- **inquiryMethod:** whatsapp.

---

## 8. File map (provenance)

| Concern | File | Lines |
|---|---|---|
| Gallery page mounts the exhibition | `app/gallery/page.tsx` | 46 (ExhibitionWalk) |
| Tiger card + inspect modal | `components/ExhibitionWalk.tsx` | 219–223 (button), 318–394 (modal/piece grid) |
| Wildlife Room + tiger piece + curatorNotes | `data/exhibitionImages.ts` | 139–157 (room 4) |
| Inspect-card + button styling | `app/styles/academy.css` | 314–393 |
| Full-story target page | `app/painting/[slug]/page.tsx` | 38–147 |
| Slug fallback builder | `lib/paintingStorySlug.ts` | 1–9 |
| Tiger's long-form narrative | `data/paintingStories.ts` | `tiger-family-quiet-hour` entry (slug at line 319) |

> **Note for NotebookLM:** the gallery's *own* short reading of the tiger is the `curatorNotes` in §4 (3 notes, the first is tiger-specific). The full narrative is §7. Both should be fed. The tiger piece has no testimonial/clientNotes (gallery, not commission) — its "living part" comes from `future-home` / `ideal-owner` / `light-interaction`, exactly as the existing `audio-scripts/painting-tiger-family-quiet-hour.md` already reflects.
