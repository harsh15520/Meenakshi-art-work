# Audit — CUSTOM ORDERS (deep pass) (`app/custom-orders/page.tsx` + `CustomOrdersLiveStrip`, `CustomOrdersSeasonsStrip`, `InteriorPage`, `ExhibitionWalk`(variant=custom), `data/customOrdersLive.ts`)

> Deeper, Custom-Orders-only expansion of the whole-site matrix. Builds on `../README.md` axes. Every gap cites a real file:line.

## Primary perspectives (Custom Orders)
P2 Gift Buyer · P3 Commission Client · P8 NRI · P11 Interior Designer · P7 Local

## Custom-Orders-unique SITUATION expansions (beyond base 9 axes)
- **S10. Occasion deadline proximity** — wedding in 10 days vs "someday" (drives S3.3 urgency differently per occasion).
- **S11. Commission stage awareness** — P3 watching "their" piece move reference→approved→painting→finishing→delivered.
- **S12. Proof-of-process trust** — pipeline dots + client story + delivered feed.
- **S13. Channel of intent** — seasonal strip (pre-filled WhatsApp) vs inspecting a past commission (story) vs generic float button.
- **S14. Distance/shipping** — P8 NRI needs pan-India delivery reassurance absent for local P7.

## Sub-section map (Custom Orders) — perspectives × situations per block

### CUSTOM HERO (`app/custom-orders/page.tsx:13-21`, `InteriorPage.tsx`)
- P2 Gift Buyer × S3.3(urgent) × S13: hero CTA = "Ask on WhatsApp" pre-filled "custom painting… sizes, pricing and delivery time" — good. But **below-the-fold** (hero only); seasonal strip is the real urgency path.
- P8 NRI × S4.5 × S14: hero intro mentions "made for one person" — no explicit "we ship pan-India / abroad" reassurance (contrast: gallery hero mentions delivery; painting page has 24h note).
- P3 × S5.4: no price anchor in hero (custom work, understandable) but no "from ₹X" either.

### SEASONS STRIP (`components/CustomOrdersSeasonsStrip.tsx`)
- P2 Gift Buyer × S3.3 × S13: 5 occasions (Wedding, Housewarming, Diwali, Anniversary, Mother's Day) each → **pre-filled WhatsApp** (`customOrdersLive.ts:163-194`, `SeasonsStrip.tsx:24-28`). **Best urgency path on the site.** Strength.
- S1.1: horizontal-scroll `studio-today` pattern (like EditorialStrip) — verify mobile scroll + keyboard (S7.3).
- Gaps: only 5 occasions; no "Father's Day / Birthday / Farewell / Rakhi" for broader P2. Occasion labels English (S7.4). No price hint per occasion.
- S8.4: deep-links to WhatsApp directly (not via tracked `InquiryLink`) — analytics track differs from other CTAs (`InquiryLink` calls `trackWhatsAppInquiry`; raw `wa.me` in SeasonsStrip does not).

### CUSTOM LIVE STRIP (`components/CustomOrdersLiveStrip.tsx`)
- P3 Commission Client × S11 × S12: Card 1 "In the Studio" shows **5-step pipeline** (reference→approved→painting→finishing→delivered, `:70-84`, `customOrdersLive.ts:20-26`) with lit dots — strong process proof.
- P3 × S9.6: Card 2 "Recently Delivered" (relative dates, `:99-125`), Card 3 "A Client's Story" (featured testimonial, `:127-147`), Card 4 "This Month's Thought" (Meenakshi note, `:149-170`). **Trust wall.**
- P8 NRI × S4.5: delivered feed shows destinations (Ghaziabad, Roorkee, Studio Pickup — `customOrdersLive.ts:101-135`) but **no "we ship pan-India" copy** — P8 must infer.
- S13: `CollapsibleStrip` mobile peek/expand — good S1.1/S7.3.
- Gaps: `customOrdersLiveUpdated` static "Updated 2 days ago" (`:60`) — not dynamic (S12). "This Month's Thought" hardcodes "JULY 2026" (`customOrdersLive.ts:142-146`) — stale after July (S5.1 trust).

### EXHIBITION WALK (variant=custom) (`components/ExhibitionWalk.tsx:44-52`, `:165-379`)
- P3/P2 × S12 × S9.6: custom variant shows **testimonial + clientNotes + storyFacts** per room (`:334-346`, data `customOrdersExhibitionImages.ts:184-310`) — e.g. "Completed in 5 weeks", "Delivered: Saharanpur/Delhi". Strong social proof + delivery evidence.
- P11 Interior Designer × S5.2: pieces have `commission` pre-filled WhatsApp messages (e.g. "I'd like a carved gate like…", `exhibitionImages.ts:195,214`) — good "commission something similar" path.
- P2 × S3.3: inspect modal CTA = "Read the full story →" (`:357-371`) — **no direct "Start a commission like this" button in the modal** despite `commission` data existing; only the generic float.
- Gaps: same as gallery — price/size only in inspect; auto-advance + aria-live spam (no reduced-motion); pieces `href` mostly `/gallery` not slug.

### INTERIOR-PAGE SHARED (WHAT TO EXPECT / FINAL CTA)
- `hideWhatToExpect` true (`app/custom-orders/page.tsx:33`) — suppressed; `customClosing` = "Every painting eventually leaves the studio. The story it carries never does." — emotional closer, good for P3 × S6.4.
- Final CTA "Message 7017512686" generic message (`:156`).

## Gaps found (consolidated, with file:line)
1. **No pan-India / shipping reassurance** for P8 NRI — delivered feed implies it but no explicit copy (S14, `customOrdersLive.ts:101-135`, `app/custom-orders/page.tsx:19`).
2. **"This Month's Thought" hardcodes "JULY 2026"** — goes stale (S5.1, `customOrdersLive.ts:144`).
3. **Static "Updated 2 days ago"** live-strip timestamp (S12, `:60`).
4. **Seasons strip uses raw `wa.me`** (not tracked `InquiryLink`) — analytics gap vs other CTAs (S13, `SeasonsStrip.tsx:24-28`).
5. **Only 5 occasions**; no price hint; English only (S7.4, S10).
6. **No "Start a commission like this" button in inspect modal** despite `commission` data (P2 × S3.3, `ExhibitionWalk.tsx:357-371`).
7. **No price anchor ("from ₹X")** for custom work (P2 × S5.3 self-qualify).
8. Gallery-equivalent gaps: price in caption only in modal; auto-advance/aria-live no reduced-motion; piece `href` → `/gallery`.

## Recommended fixes (tickets, prioritized)
1. **Add explicit shipping/delivery copy** ("we deliver pan-India; most pieces ship in X weeks") — P8 × S4.5 (highest value for distant clients).
2. **De-hardcode the monthly note** — relabel "Studio Note" without a fixed month, or drive from data dynamically — S5.1.
3. **Dynamic live-strip timestamp** — S12.
4. **Route Seasons strip through tracked `InquiryLink`** (or add tracking) for consistent analytics — S13.
5. **Expand occasions** (Birthday, Farewell, Rakhi, Father's Day) + add "from ₹X" anchor — P2 × S5.3/S10.
6. **Add "Start a commission like this" CTA in inspect modal** using existing `commission` data — P2 × S3.3.
7. Apply gallery-equivalent fixes: price in caption, reduced-motion guard, correct piece `href`.
