# Visitor Matrix Audit — Index

This folder applies the whole-site **Perspective × Situation** matrix (see plan `1786466521823-visitor-perspectives-situations-matrix.md`) as concrete **audit docs with gaps** for each section.

Each file follows the same shape:
1. **Primary perspectives** for the section
2. **Prioritized combos** (Perspective × Situation) that matter most
3. **Gaps found** (referencing real files/lines)
4. **Recommended fixes** (no code changes yet — these are the tickets)

## Files
- [home.md](./home.md) — Home / landing
- [gallery.md](./gallery.md) — Gallery grid + Exhibition Walk
- [painting.md](./painting.md) — Painting detail pages
- [academy.md](./academy.md) — Academy, student wall, locker, curriculum
- [custom-orders.md](./custom-orders.md) — Commissions, live strip, seasonal
- [journal.md](./journal.md) — Journal/search/feed
- [contact.md](./contact.md) — Contact, WhatsApp, Maps

## Axis recap
- **Situations (S1–S9):** device, connection, time/urgency, familiarity, intent, emotion, accessibility, channel, outcome.
- **Perspectives (P1–P14):** Art Buyer, Gift Buyer, Commission Client, Parent, Student, Family, Local, NRI, Press, Peer, Interior Designer, Journal Reader, Competitor, Loyal.

## Status — deep passes complete
All seven sections have both a base matrix row and a **deep pass** (Home, Gallery, Academy, Custom Orders, Journal, Contact). Each deep-pass file expands Home-unique situations (S10–S14) and maps perspectives × situations sub-section by sub-section with real `file:line` gaps + prioritized tickets.

## Cross-cutting findings (appear in every section)
- **No Hindi text copy** anywhere (S7.4) — though Hindi/Punjabi *audio* exists on Home/Academy. Uniform gap.
- **Maps CID inconsistency** — Footer + layout JSON-LD use verified CID (`lib/site.ts:30`); Home contact band + Contact page use generic `query=` link. Local SEO should consolidate on CID.
- **Floating WhatsApp button is generic + untracked** vs `InquiryLink` (tracked) — CTA consistency/analytics gap.
- **No response-time / shipping note** on Home/Contact (present only on painting page).
- **Auto-advance + aria-live** in ExhibitionWalk lacks `prefers-reduced-motion` guard (Gallery/Custom Orders).
- **No structured JSON-LD** (LocalBusiness/AggregateRating) beyond layout — review scope.

## Top tickets across all sections (by business value)
1. **Inline academy fee range + batch windows** (Academy) — currently zero inline fee info (P4 × S5.3).
2. **Above-the-fold gift/commission CTA** on Home (P2 × S3.3 × S8.4).
3. **Surface price/size/medium in gallery carousel caption** (data already exists; only in inspect modal) (P1 × S5.3).
4. **Pan-India shipping + 24h-response note** on Custom Orders & Contact (P8 × S4.5).
5. **Per-entry share button** in Journal (P12 × S5.5).
6. **Hindi text layer** across all sections (S7.4).
7. **Maps CID consistency** (Home/Contact use CID) (P7 × S8.3).
8. **Context-aware + tracked floating WhatsApp** (P2/P3 × S8.4).
9. **Replace fake Timeline counts** with real data (Journal, S14).
10. **prefers-reduced-motion** guard on ExhibitionWalk (S7.1/S7.3).

## How to use
Pick a section file → read its prioritized combos → turn each "Recommended fix" into a ticket. Highest business value combos are listed first. The Top-10 list above is the cross-section prioritized backlog.
