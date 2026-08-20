# Audit — HOME (deep pass) (`app/page.tsx` + `EditorialStrip`, `HeroAudioPlayer`, `GuestbookCtaSticky`, `FounderNote`, `Reveal`, `InquiryLink`, `WhatsAppButton`)

> Deeper, Home-only expansion of the whole-site matrix. Builds on `../README.md` axes. Every gap cites a real file:line.

## Primary perspectives (Home)
P1 Art Buyer · P2 Gift Buyer · P3 Commission Client · P4 Parent · P7 Local · P8 NRI · P9 Press · P14 Loyal
(Home is the widest-net page, so it carries the most perspectives at once.)

## Home-unique SITUATION expansions (beyond the 9 base axes)
- **S10. Entry scroll depth** — above-the-fold (hero) vs below-the-fold (founder, journey, gallery, guestbook, FAQ, contact). Different perspectives convert at different depths.
- **S11. Audio-consent context** — visitor on mute/public device vs headphones; Hindi/Punjabi preference (audio exists, text doesn't).
- **S12. Live-content freshness** — "EditorialStrip" pulls live journal notes; a stale note hurts S5.1 trust.
- **S13. Randomness tolerance** — founder quote rotates every load; some visitors want consistency, some want freshness.

## Sub-section map (Home) — perspectives × situations per block

### HERO (`app/page.tsx:100-103`)
- P2 Gift Buyer × S3.3(urgent) × S8.4(WhatsApp) × S10(above fold): **no commission CTA in hero** — only "Join Academy" + audio. Lost conversion.
- P1 Buyer × S2.3(metered) × S10: hero `<Image priority fill>` LCP = heavy PNG; verify AVIF/weight.
- P7 Local × S4.4 × S10: hero copy "FINE ART • SAHARANPUR • EST. 2017" good; but no "visit today" CTA above fold.
- P8 NRI × S4.5 × S10: no "we ship / message from abroad" hook in hero.
- S11: `HeroAudioPlayer` (`components/HeroAudioPlayer.tsx:12-16`) offers EN/HI/PA audio — **good for S7.4 audio**, but no Hindi *text* anywhere; mismatch.

### EDITORIAL STRIP — "From the Studio" (`components/EditorialStrip.tsx`)
- P14 Loyal × S4.2 × S12: live notes (commissions/academy/studio) are a freshness signal — strength. Server component, no JS (good S2.2).
- P9 Press × S5.1 × S12: good quotable "today at studio" angle.
- P12/P10 × S2.2: horizontal scroll on mobile (`:35`) — verify not cut off / keyboard-scrollable (S7.3).
- Gap: strip label says "Selected notes" static (`:31`) — should show last-updated time for S12 trust. No link label to "all journal".

### SERVICES GRID (`app/page.tsx:18-23, 109`)
- P4 Parent × S4.1 × S5.3: 4 cards mix Academy / Paintings / Commissions / **School Projects→/contact**. "School Projects" dilutes core offer; no fee/scope hint.
- P2 Gift Buyer × S3.3: "Custom Commissions" card exists (good) but CTA "Start a Commission" → generic /custom-orders, not pre-filled WhatsApp (unlike seasonal strip). Inconsistent with S8.4 urgency.
- S7.4: all card copy English.

### FOUNDER SECTION (`app/page.tsx:111-118`)
- P9 Press × S5.1: founder portrait + bio + random quote — strong story surface.
- P3/P6.4 Sentimental × S8.4: quote + "Our story & studio → /journal" link good.
- **S13 gap:** `getRandomFounderNote()` (`:34-35`, `founderNotes.ts:86-88`) rotates fully random every load → non-deterministic brand message + hard to QA/test (P9, regression). No category pinning.
- S7.4: bio/quote English only.

### ACADEMY JOURNEY (`app/page.tsx:120`)
- P4 Parent × S5.3: 5-phase path + "Get academy details" InquiryLink (good, pre-filled). But **fees still only via WhatsApp** — no inline range.
- S7.4: English.

### GALLERY SECTION (`app/page.tsx:122`)
- P1 Buyer × S5.3 × S10(below fold): tiles link to /gallery#exhibition-room-6 etc. No price hint (consistent with site-wide price gap).
- P14 Loyal × S4.2: "View full gallery →" good.

### GUESTBOOK / TESTIMONIALS (`app/page.tsx:124`, `data/testimonials.ts`)
- P4/P2 × S6.2(skeptical) × S9.6(proof): 8 postcards + 20 sticky notes with **credibility counts** ("6 reviews", "Local Guide · 277 reviews") — strong trust signal. Strength.
- P7 Local × S8.3: "★ 4.9 · 50+ reviews on Google" + CID link (`:124`) — good local SEO surface.
- **`GuestbookCtaSticky`** (`components/GuestbookCtaSticky.tsx:35`) links to `g.page/r/CaNbqQjLp2_FEBE/review` — good review CTA, appears when guestbook in view (S10).
- Gaps: "50+ reviews" hardcoded (`:124`) — should be dynamic/structured (JSON-LD AggregateRating). Testimonial names are real local names (good for P7 trust) but no photos/schema.
- S7.4: testimonials English.

### FAQ (`app/page.tsx:126`)
- P4 Parent × S5.3: fees/timing answered but **everything deflected to WhatsApp** ("Message us on WhatsApp for the current fee structure"). No inline fee range → S5.3 drop-off.
- P7 Local × S4.4: class timing 4:30–5:30 PM stated here (good) but NOT on Academy page (see academy.md).
- S7.4: English.

### CONTACT BAND (`app/page.tsx:128`)
- P7 Local × S4.4 × S8.3: full address + "Plan your visit" InquiryLink + **generic Maps `query=` link** (weaker than CID used in guestbook/Footer/layout). Local SEO inconsistency.
- P8 NRI × S4.5 × S5.4: no "we reply within 24h / ship pan-India" note (contrast: painting page has 24h note).
- S7.4: English.

## Gaps found (consolidated, with file:line)
1. **No above-the-fold commission/gift CTA** for P2 × S3.3 × S8.4 (`app/page.tsx:101`).
2. **Hero image payload** on S2.3 — verify AVIF/weight (`app/page.tsx:102`).
3. **Founder quote fully random per load** — brand inconsistency + QA pain (`app/page.tsx:34-35`, `founderNotes.ts:86-88`).
4. **No Hindi text copy** anywhere on Home despite Hindi/Punjabi *audio* existing (`HeroAudioPlayer.tsx:12-16`) — S7.4 mismatch.
5. **Fees deferred to WhatsApp only** in FAQ + journey — no inline range (P4 × S5.3, `app/page.tsx:120,126`).
6. ✅ **FIXED** — Maps CID inconsistency resolved. Home contact band now uses verified CID (`app/page.tsx:129`) matching guestbook/Footer/layout via shared `GOOGLE_MAPS_URL` constant in `lib/site.ts:30`.
7. **"50+ reviews" hardcoded**, no JSON-LD AggregateRating (S8.3, `app/page.tsx:124`).
8. **EditorialStrip** has no "last updated" timestamp + no "all journal" link (S12, `EditorialStrip.tsx:31`).
9. **Services grid** mixes "School Projects" with core offers; commission CTA not pre-filled WhatsApp (P2 × S8.4, `app/page.tsx:18-23,109`).
10. **No 24h-response / shipping note** on Home contact for P8 NRI (contrast painting page `:130-132`).

## Recommended fixes (tickets, prioritized)
1. **Hero: add "Commission a gift" pre-filled WhatsApp CTA** beside "Join Academy" — P2 × S3.3 × S8.4 (highest value).
2. **Inline academy fee range + batch windows** in journey/FAQ — P4 × S5.3.
3. **Hindi text layer** (at least CTAs, address, founder bio) to match existing Hindi audio — S7.4.
4. **Pin founder quote** (stable default + "another note" button) instead of full random — P9, QA.
5. **Maps CID** on Home contact band — P7 × S8.3.
6. **JSON-LD LocalBusiness + AggregateRating** on Home — S8.3.
7. **EditorialStrip**: add last-updated + "Read all journal →" — S12.
8. **Verify hero AVIF/weight** on throttled 3G — S2.3.
9. **Add 24h/ship note** to Home contact for P8 NRI — parity with painting page.
10. **Services grid**: separate "School Projects" or label as sub-offer; make commission CTA pre-filled WhatsApp.
