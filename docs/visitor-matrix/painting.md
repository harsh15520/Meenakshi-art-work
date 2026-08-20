# Audit — PAINTING DETAIL (`app/painting/[slug]`, `PaintingHero.tsx`, `data/paintingStories.ts`)

## Primary perspectives
P1 Art Buyer · P3 Commission Client · P10 Peer/Art Student · P11 Interior Designer · P6 Family (pride)

## Prioritized combos
1. **P1 Buyer × S5.3 (price/authenticity) × S5.4 (decision) × S2.3** — must find price + buy/enquire path fast on mobile data.
2. **P11 Interior Designer × S5.2 × S1.1** — needs room mockups, dimensions, "commission a series" path.
3. **P10 Peer × S5.6 × S7.4** — wants process ("behind the canvas"), materials; Hindi helpful.
4. **P3 Commission Client × S6.4 (sentimental) × S9.6 (proof)** — story + testimonial build trust.
5. **P6 Family × S8.6 (share deep link) × S6.5 (pride)** — lands to feel proud, maybe screenshot.

## Gaps found (verified in `app/painting/[slug]/page.tsx`)
- **No price/size/medium shown to buyers.** `originalPiece` in data carries `price`/`medium`/`size` (`exhibitionImages.ts`), but the page only uses `originalPiece.title` (`:51`, `:121`). Price is never displayed — P1 × S5.3 must ask on WhatsApp to learn cost. Weak self-qualification.
- **WhatsApp CTA exists and is strong**: contextual pre-filled message + explicit **"We'll respond within 24 hours"** note (`:130-132`). Good for P8 NRI × S6.2 (anxiety) — keep this.
- **No room mockups / behind-the-canvas / macro shots on the buyer painting page.** Those live in `data/artists.ts` (student works) and are not surfaced here. P11 (interior fit) and P10 (process) miss them on the purchase page.
- **No availability / "sold" / "commissioned" badge** — P14 Loyal × S5.1 can't tell if buyable; context band only says "FROM THE GALLERY COLLECTION" (`:74`).
- **No Hindi copy** on painting detail (S7.4).
- **Hero `alt` = `contextualTitle`** (`PaintingHero.tsx:16`) — acceptable, but generic titles weaken SR context (S7.1).
- **Signature interaction / narrative modules** are rich (good for P1 × S6.4 sentimental, P9 story) — strength to preserve.

## Recommended fixes
1. Add price + size + medium + "Enquire on WhatsApp" CTA to `PaintingHero` — P1 × S5.3/S5.4.
2. Surface room mockups + "commission something similar" CTA for P11 × S5.2.
3. Surface behind-the-canvas / macro shots for buyers too (P10 research) — confirm render path.
4. Add availability badge — P14 × S5.1.
5. Add Hindi sub-labels for medium/size — S7.4.
6. Ensure deep-linked painting (S8.6) resolves and previews correctly.
