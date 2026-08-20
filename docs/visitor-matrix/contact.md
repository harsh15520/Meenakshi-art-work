# Audit — CONTACT (deep pass) (`app/contact/page.tsx`, `InteriorPage.tsx` (final CTA), `Footer.tsx`, `WhatsAppButton.tsx`, `InquiryLink.tsx`, `PinterestEmbed.tsx`, `SocialIcons.tsx`, `lib/site.ts`)

> Deeper, Contact-only expansion of the whole-site matrix. Builds on `../README.md` axes. Every gap cites a real file:line.

## Primary perspectives (Contact)
P7 Local · P3 Commission Client · P2 Gift Buyer · P8 NRI · P4 Parent · P14 Loyal

## Contact-unique SITUATION expansions (beyond base 9 axes)
- **S10. Channel preference** — P7 wants Maps/directions; P8 wants WhatsApp; P4 wants a human reply time.
- **S11. Response-time expectation** — P8 NRI / P3 anxious need "we reply within X" (present on painting page, absent here).
- **S12. Footer as universal contact** — Footer is the always-present contact surface across every page; its correctness matters most.
- **S13. Third-party script cost** — Pinterest embed injects `pinit.js` (client) — perf/privacy on S2.2/S2.3.
- **S14. Map-link consistency** — CID vs generic `query=` (local SEO consolidation).

## Sub-section map (Contact) — perspectives × situations per block

### CONTACT PAGE (`app/contact/page.tsx`, `InteriorPage.tsx`)
- P7 Local × S4.4 × S10: page intro "Visit… or begin your inquiry on WhatsApp" — good. `items` list WhatsApp number, address, class hour, purchase visits (`:23-28`). But **no Map CID link on the page body** — only the generic one on Home (`:128`). P7 × S8.3 weaker here than Footer.
- P8 NRI × S4.5 × S11: **no response-time / shipping note** (contrast: painting page has "We'll respond within 24 hours", `painting/[slug]/page.tsx:130-132`). P8 anxiety unaddressed on Contact.
- P3/P2 × S3.3 × S10: hero CTA "Ask on WhatsApp" pre-filled "plan a studio visit" — fine, but not context-aware to commission/buy intent.
- S7.4: all English (address/hours).
- `InteriorPage` final CTA "Message 7017512686" generic message (`InteriorPage.tsx:156`) — weaker than hero pre-fill.

### FLOATING WHATSAPP (`components/WhatsAppButton.tsx`)
- P2/P3 × S8.4 × S10: persistent float, fixed generic message "I found you through the website" (`:1`). **Not context-aware per section** — a P2 on Custom Orders gets same weak message as P1 on Gallery. Inconsistent with `InquiryLink` tracking.
- S7.3: it's an `<a>` with aria-label — keyboard accessible (good).

### INQUIRY LINK (`components/InquiryLink.tsx`)
- All perspectives × S8.4: **tracked** WhatsApp (`trackWhatsAppInquiry`, `:21`) with context message — good for analytics. This is the preferred CTA pattern; float button should mirror it.

### FOOTER (`components/Footer.tsx`)
- P7 Local × S8.3 × S12: **uses `GOOGLE_MAPS_URL` (verified CID)** (`Footer.tsx:4,19`, `lib/site.ts:30`) — correct local SEO. Strength.
- P12/P9 × S13: social cards (Instagram, YouTube, Google/CID, Pinterest) + full nav (Academy/Gallery/Custom Orders/Journal) + address/hours (`:19-21`). Strong universal contact + navigation.
- P8 NRI × S10: WhatsApp "Begin on WhatsApp" with pre-filled classes/painting message (`:18`) — good, but no response-time note.
- Gaps: footer WhatsApp message is generic (classes/painting only) — not commission-aware. Pinterest embed injects third-party script (S13).

### PINTEREST EMBED (`components/PinterestEmbed.tsx`)
- P1 Buyer × S8.5: embeds Pinterest board (`meenakshiartstudio`) — good discovery surface.
- **S13 gap:** injects `https://assets.pinterest.com/js/pinit.js` client-side (`:10-18`) — third-party script, anonymous CORS (good for CSP), but adds payload on every page footer (S2.2/S2.3). No `defer`/lazy beyond `async`. Privacy: loads even for visitors who never interact.
- S7.4: embed label English.

## Gaps found (consolidated, with file:line)
1. **No Map CID link on Contact page body** — only generic on Home (`:128`); Footer has CID but page itself doesn't surface it (P7 × S8.3).
2. **No response-time / shipping note on Contact** (P8 × S11) — present on painting page, missing here (`app/contact/page.tsx`).
3. **Floating WhatsApp button generic + untracked** — fixed message, no `InquiryLink` tracking (`WhatsAppButton.tsx:1`). P2/P3 × S8.4 weak/inconsistent.
4. **Discounted from corrected finding:** Footer correctly uses CID (`lib/site.ts:30`); Home/Contact generic links are the inconsistency, not Footer.
5. **Pinterest embed third-party script** on every footer (S13, `PinterestEmbed.tsx:10-18`) — perf/privacy on S2.2/S2.3.
6. **No Hindi** for contact info/CTA (S7.4).
7. **Footer WhatsApp generic** (classes/painting only) — not commission-aware (P3 × S10).

## Recommended fixes (tickets, prioritized)
1. **Add CID Map link + "Open in Maps" on Contact page body** — P7 × S8.3 (use `GOOGLE_MAPS_URL`).
2. **Add response-time ("reply within 24h") + pan-India shipping note** to Contact — P8 × S11 (parity with painting page).
3. **Make floating WhatsApp context-aware + tracked** (mirror `InquiryLink`) — P2/P3 × S8.4.
4. **Lazy-load / defer Pinterest embed** (IntersectionObserver or click-to-load) — S13 perf/privacy.
5. **Hindi contact copy + CTA** — S7.4.
6. **Commission-aware footer WhatsApp message** — P3 × S10.
