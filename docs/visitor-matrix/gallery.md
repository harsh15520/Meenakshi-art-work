# Audit — GALLERY (deep pass) (`app/gallery/page.tsx` + `GalleryLiveStrip`, `ExhibitionWalk`, `GallerySpotlight`, `InteriorPage`, `CollapsibleStrip`, `data/exhibitionImages.ts`)

> Deeper, Gallery-only expansion of the whole-site matrix. Builds on `../README.md` axes. Every gap cites a real file:line.

## Primary perspectives (Gallery)
P1 Art Buyer · P3 Commission Client · P11 Interior Designer · P10 Peer/Art Student · P14 Loyal · P8 NRI

## Gallery-unique SITUATION expansions (beyond base 9 axes)
- **S10. Browse mode** — Exhibition Walk "Guided tour" (auto-advance 7s) vs "Browse" (drag/arrows). Affects S7.1/S7.3 and S6.6.
- **S11. Inspect depth** — casual glance vs "Inspect this room" modal (where price/size/medium live).
- **S12. Live-strip freshness** — GalleryLiveStrip shows relative dates ("Added 3 days ago"); staleness hurts S5.1.
- **S13. Mobile peek/expand** — CollapsibleStrip shows 1 card then "MORE" on ≤620px (S1.1, S7.3).

## Sub-section map (Gallery) — perspectives × situations per block

### GALLERY HERO (`app/gallery/page.tsx:13-21`, `InteriorPage.tsx:73-115`)
- P1 Buyer × S5.3 × S10(above fold): hero has "Ask on WhatsApp" (pre-filled "interested in purchasing… prices") — good. But **no price/size visible in hero**; buyer must scroll to Exhibition Walk + inspect.
- P11 Interior Designer × S5.2 × S1.1: hero image is decorative (`alt=""`, `InteriorPage.tsx:106`); no room-mockup hint above fold.
- P8 NRI × S4.5: hero message mentions "delivery options" — good nod to distant buyers.
- S7.4: hero copy English (₹ prices elsewhere are locally appropriate).

### GALLERY LIVE STRIP (`components/GalleryLiveStrip.tsx`)
- P14 Loyal × S4.2 × S12: "RECENTLY ADDED" + relative date + "↓ Available now" (`:57-80`) — strong freshness/live signal. Strength.
- P1 Buyer × S5.3 × S11: card shows title + date but **NOT price** — price only in inspect modal. P1 scanning live strip can't self-qualify.
- P3 Commission Client × S6.4 × S9.6: "IN THE STUDIO" pipeline (finishing varnish → drying → framing, `:98-112`) is proof of process — strong for trust.
- P9/P3 × S8.4: "From the Journal" card deep-links to `/journal/[slug]` — good story path.
- **S13:** wrapped in `CollapsibleStrip` (`:55`) → mobile shows 1 card + "MORE" toggle with `aria-expanded`/`aria-controls` (`:51-63`) — good a11y + S1.1.
- Gaps: live-strip `galleryLiveUpdated` is a static string (`data/galleryLive.ts`) — should reflect true last-updated (S12). "This Month's Favourite" quote is founder's, English only (S7.4).

### EXHIBITION WALK (`components/ExhibitionWalk.tsx`)
- P1 Buyer × S5.3 × S11: **price/medium/size exist in data** (`exhibitionImages.ts:11-24`, e.g. `₹10,000`, `2 × 3 ft`) but render **only inside inspect modal** (`:347-375`), not in carousel caption (`:282-299`). 3 clicks deep to learn price.
- P1 × S5.4 (decision): inspect CTA is "Read the full story →" (`:357-371`) — **no "Enquire price / buy" CTA on gallery variant**. Lost conversion vs custom variant.
- P11 Interior Designer × S5.2 × S2.3: room mockups exist in student data but NOT surfaced here; only `pieces` grid. No "see in a room" for buyers.
- P10 Peer × S5.6 × S2.2: captions + notes are text (good), but auto-advance 7s (`:98`) + `aria-live` announcement (`:301-303`) can spam SR users and fights keyboard nav (`:104-108`). Respect `prefers-reduced-motion`? Not present.
- P8 NRI × S4.5: inspect modal shows `piece.price` (real ₹) — good, but no shipping note in gallery context.
- **S7.4:** all labels English; prices in ₹ (fine for locale).
- **Bug-ish:** most `pieces[].href` = `/gallery` (`:87-90`), not the painting slug — clicking a piece returns to gallery, not its story. Only a few have `paintingSlug` (`:87,131,214`). P1 × S8.6 deep link weak.

### INTERIOR-PAGE SHARED (WHAT TO EXPECT / FINAL CTA)
- `hideWhatToExpect` is true for gallery (`app/gallery/page.tsx:22`) — so the "What to Expect" list is suppressed; only `items` (Oil/Acrylic/Student/Available) show. Good (no duplicate).
- Final CTA "Message 7017512686" (`InteriorPage.tsx:156`) — generic message; P1 × S5.4 gets weaker CTA than hero.

## Gaps found (consolidated, with file:line)
1. **Price/size/medium not in carousel caption** — only inspect modal (`ExhibitionWalk.tsx:282-299` vs `:347-375`; data `exhibitionImages.ts:11-24`). Blocks P1 × S5.3 self-qualification.
2. **No "Enquire/Buy" CTA on gallery inspect** — only "Read the full story →" (`:357-371`). P1 × S5.4 lost.
3. **Piece `href` mostly `/gallery`**, not painting slug — deep link returns to grid (`:87-90`). P1 × S8.6.
4. **Auto-advance + aria-live spam** for SR users; no `prefers-reduced-motion` guard (`:98, :301-303`). S7.1/S7.3.
5. **Room mockups not surfaced for buyers** — only in student data. P11 × S5.2.
6. **Live-strip `galleryLiveUpdated` static string** — not true last-updated (S12, `data/galleryLive.ts`).
7. **No Hindi copy** on gallery (S7.4) — prices in ₹ are locale-ok.
8. **Final CTA generic message** (`InteriorPage.tsx:156`) — weaker than hero pre-fill.

## Recommended fixes (tickets, prioritized)
1. **Show price + size + medium in the carousel caption** (not just inspect) — P1 × S5.3 (highest value; data already exists).
2. **Add "Enquire price on WhatsApp" CTA** to gallery inspect pieces, distinct from "Read the full story" — P1 × S5.4.
3. **Fix piece `href` → `/painting/[slug]`** when `paintingSlug` exists; default deep-link correctly — P1 × S8.6.
4. **Guard auto-advance with `prefers-reduced-motion`** + don't announce on auto-advance (only manual) — S7.1/S7.3.
5. **Surface room mockups** on buyer-facing painting pages / inspect for P11 × S5.2.
6. **Make `galleryLiveUpdated` dynamic** (true last-updated) — S12.
7. **Add Hindi sub-labels** for medium/size/price — S7.4.
8. **Context-aware final CTA message** for gallery — parity with hero.
