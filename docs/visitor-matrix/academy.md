# Audit — ACADEMY (deep pass) (`app/academy/page.tsx`, `app/academy/[slug]/page.tsx` + `AcademyLiveStrip`, `AcademyCurriculum`, `CurriculumCanvas`, `MeetStudentsWall`, `StudentLocker`, `CertificateDownloadButton`, `AcademyAudioPlayer`, `MarqueeAudioPlayer`, `AcademyRegistryMarquee`, `data/academyToday.ts`)

> Deeper, Academy-only expansion of the whole-site matrix. Builds on `../README.md` axes. Every gap cites a real file:line.

## Primary perspectives (Academy)
P4 Parent · P5 Student · P6 Family (share-code) · P10 Peer · P14 Loyal Parent · P7 Local

## Academy-unique SITUATION expansions (beyond base 9 axes)
- **S10. Parent anxiety level** — calm researcher vs S6.2 anxious parent (safety/fees). The "Doubt Buster" audio targets the latter.
- **S11. Child presence** — P5 student browsing on a shared/parent device vs P4 parent alone.
- **S12. Live-strip trust signals** — attendance (blurred by design), parent reviews, teacher credibility.
- **S13. Scroll-cost** — CurriculumCanvas is a scroll-driven 4-image framer-motion sequence; heavy on S2.2/S2.3.
- **S14. Language of reassurance** — Hindi/Punjabi audio exists; English text dominates.

## Sub-section map (Academy) — perspectives × situations per block

### ACADEMY HERO (`app/academy/page.tsx:18-29`, `InteriorPage.tsx`)
- P4 Parent × S5.3(hero) × S10: hero CTA = "Ask on WhatsApp" with pre-filled "enrollment details including fees, timings…" — but **no fee/timing shown inline** (S5.3 gap confirmed: `data/academyToday.ts` has NO fee field).
- P4 × S6.2 × S14: `AcademyAudioPlayer` "Doubt Buster" (parent↔instructor roleplay, EN/HI/PA, `AcademyAudioPlayer.tsx:12-16`) — **excellent** for anxious parent + Hindi. Strength.
- P4 × S7.4: Hindi audio exists; but hero *text* English (consistent site-wide gap).

### ACADEMY LIVE STRIP (`components/AcademyLiveStrip.tsx`)
- P4 Parent × S12 × S6.2: 5 cards — Inside Class, Attendance (blurred count by design, `:115-130`, `academyToday.ts:66-88`), Current Focus (Acrylic, Beginner-Intermediate, `:132-140`), Your Teacher (Meenakshi, 15+ yrs, `:142-163`), Parent Review (★4.9 · 50+ Google, `:165-173`). **Strong trust wall.**
- P6/P4 trust: attendance count is **intentionally obfuscated** (`academyToday.ts:60-68`) — good privacy, but P4 × S5.3 can't gauge class size/busyness.
- P4 × S5.3: "Current Focus" shows medium/level but **not fees/batches/schedule** — defers to WhatsApp.
- S13: wrapped in `CollapsibleStrip` (mobile peek/expand) — good S1.1/S7.3.
- Gaps: live-strip `studioPresenceUpdated` static "Updated 2 hours ago" (`academyToday.ts:74`) — not dynamic (S12). Parent review quote rotates randomly (`:51`) — fine for freshness, but attribution also random (`:54`) — a quote could mismatch its real reviewer (minor trust nit).

### MEET THE STUDENTS WALL (`components/MeetStudentsWall.tsx`)
- P5 Student × S11 × S6.5: polaroid wall; clickable hotspots → `/academy/[slug]`. Good pride/recognition.
- P6 Family × S8.6: arrives via share code, may not land here; separate locker path.
- **A11y:** hotspots have `tabIndex`, `aria-label="Meet {name}"`, keyboard focus + tooltip (`:86-121`) — good S7.3. Filters `isSample` (`:11-15`) so demo profiles never link. Strength.
- S2.3: wall image is `priority` (`:70`) — heavy PNG above fold; verify weight.

### STUDENT LOCKER (`components/StudentLocker.tsx`, covered in base academy.md)
- P6 Family × S8.6 × S1.5: name+code unlock, case-insensitive, keyboard-accessible. Strengths: privacy-first copy, "UNLOCKED RECENTLY" social proof (names only).
- Gaps: no rate-limit (code guessing), reveal text English only (S7.4), no denied-attempt guidance beyond message.

### CURRICULUM (`components/AcademyCurriculum.tsx` + `CurriculumCanvas.tsx`)
- P4 Parent × S5.3 × S10: 5-phase grid shows exercises/weeks/student-examples (`:48-62`) — good structure, but **"View all phases" and "View Exercises" are dead `href="#"`** (`:23,64`) — weak for P10/P4 wanting depth.
- P4/P10 × S13: `CurriculumCanvas` scroll-driven sketch→final animation (`:39-121`) — beautiful "experience" demo, but 4 stacked images + framer-motion scroll; **no `prefers-reduced-motion` guard**; heavy on S2.2/S2.3.
- P4 × S6.2: canvas narrative ("what it feels like to learn here") reassures — strength.

### STUDENT PAGE (`app/academy/[slug]/page.tsx`)
- P5 Student × S6.5 × S11: full portfolio, behind-the-canvas, studio moments, gallery wall, **certificate + QR** (`:60`, QR to profile). Strong pride/share surface.
- P6 Family × S8.6: locker → "Visit {name}'s page" → this page. Certificate download (`CertificateDownloadButton.tsx`) works (download attr) — good for S6.5.
- P14 Loyal Parent × S4.2: returning to see child's progress — good.
- Gaps: certificate text English only (S7.4). QR links to public profile (fine).

### AUDIO (Marquee + Hero)
- `MarqueeAudioPlayer.tsx:5` = Hindi-only overlay ("हिंदी में सुनें"); `AcademyAudioPlayer.tsx` = EN/HI/PA. **Hindi/Punjabi reassurance present in audio** — but **no transcripts** for S7.6 (deaf/hoh). Confirm no autoplay: both are click-to-play (verified, no autoplay props). Strength on S6.6.

## Gaps found (consolidated, with file:line)
1. **No fee/timing/schedule shown inline** — deferred to WhatsApp only; `academyToday.ts` has no fee field (P4 × S5.3, `app/academy/page.tsx:23`).
2. **Curriculum dead links** "View all phases"/"View Exercises" = `href="#"` (`AcademyCurriculum.tsx:23,64`) — P10/P4 depth gap.
3. **CurriculumCanvas no `prefers-reduced-motion`** + heavy 4-image scroll sequence (S2.2/S2.3, `CurriculumCanvas.tsx:39-121`).
4. **No audio transcripts** for Academy/Hero/Marquee players (S7.6) — Hindi/Punjabi audio exists but inaccessible to deaf/hoh.
5. **Static "Updated 2 hours ago"** live-strip timestamp (S12, `academyToday.ts:74`).
6. **Attendance count obfuscated** (by design) — P4 × S5.3 can't gauge class size (may want a "small batches" statement instead).
7. **Locker**: no rate-limit; reveal English only (S7.4).
8. **Certificate/student-page text English only** (S7.4).
9. **Meet-students wall image `priority`** — verify AVIF/weight on S2.3 (`:70`).

## Recommended fixes (tickets, prioritized)
1. **Publish a fee *range* + batch windows + class timing inline** on Academy (hero or a "Fees & Batches" block) — P4 × S5.3 (highest value; currently zero inline info).
2. **Fix curriculum dead links** → real curriculum detail / phase pages — P10/P4.
3. **Guard CurriculumCanvas with `prefers-reduced-motion`** + lazy-load offscreen images — S2.2/S2.3.
4. **Add audio transcripts** (collapsible) for Academy/Hero/Marquee players — S7.6.
5. **Make live-strip timestamp dynamic** (true last-updated) — S12.
6. **Add "small, focused batches" statement** to substitute for obfuscated attendance count — P4 × S5.3.
7. **Locker**: add gentle rate-limit; Hindi reveal text — S7.4.
8. **Hindi certificate + student-page copy** — S7.4.
9. **Verify meet-students wall AVIF/weight** — S2.3.
