# Audit — JOURNAL (deep pass) (`app/journal/page.tsx` + `JournalHero`, `EntryPoints`, `WorkingOnGrid`, `LatestEntries`, `VirtualJournalFeed`, `TimelineSection`, `StatusBanner`, `FilterBanner`, `JournalThreadCard`, `ClosingBand`, `JournalSearchForm`, `shared.ts`, `data/journal.ts`)

> Deeper, Journal-only expansion of the whole-site matrix. Builds on `../README.md` axes. Every gap cites a real file:line.

## Primary perspectives (Journal)
P12 Journal Reader · P9 Press · P10 Peer · P1 Buyer (inspiration) · P14 Loyal · P6 Family (Find Yourself) · P4 Parent

## Journal-unique SITUATION expansions (beyond base 9 axes)
- **S10. Archive collapse state** — "All Entries" is collapsed by default without a filter (`FeedSection.tsx:13` `journal-all-entries--collapsed`); discovery depends on expand affordance.
- **S11. Find-Yourself intent** — P6/P4 searching their own name → single-entry redirect (`app/journal/page.tsx:43-51`).
- **S12. Thread-following** — P14 Loyal wants to follow one commission/student thread over time (progress %, updates).
- **S13. Trending/social proof** — sidebar Trending + Latest Comments + Recently Mentioned drive return visits (S5.5 word-of-mouth).
- **S14. Data freshness vs placeholder** — real computed years vs hardcoded placeholder counts in Timeline.

## Sub-section map (Journal) — perspectives × situations per block

### JOURNAL HERO (`components/journal/JournalHero.tsx`)
- P12 Reader × S1.1 × S5.6: stats pills (Entries/Active Threads/People Mentioned/Updated) — good overview; `relativeUpdatedLabel` dynamic (`:53`). Strength.
- P9 Press × S5.1: hero copy "Building an art studio in public" — strong angle.
- S7.4: all English.

### ENTRY POINTS (`components/journal/EntryPoints.tsx`)
- P12 × S5.6 × S10: 5 category cards (Business Insight, Journey Diary, Student Story, Behind Scenes, Past Project) each with latest preview + deep link (`shared.ts:31-62`, `:16`). Good discovery.
- P6 Family × S11: "Find Yourself" card anchor to `#find-yourself` search (`:29-35`).
- S7.4: English only.

### WORKING ON GRID (`components/journal/WorkingOnGrid.tsx`, `JournalThreadCard.tsx`)
- P14 Loyal × S12: active threads with **progress %** + status (In studio/Archived) + "N updates so far" (`JournalThreadCard.tsx:50-94`). Strong follow-along surface.
- P3 Commission Client × S11: a commission thread shows its progress — reassuring proof (mirrors custom-orders pipeline).
- Gaps: progress % is **synthetic** (`getProgressValue` hardcoded per workType + entry boost, `:31-43`) — not real milestone data; P14/P3 may over/under-read true stage. Minor trust nuance.

### LATEST ENTRIES + SIDEBAR (`components/journal/LatestEntries.tsx`)
- P12 × S13 × S5.5: sidebar = Find Yourself search, Recently Mentioned, **Trending This Week** (heat dots, `:128-154`), **Latest Comments** (`:156-184`), Topics tag-cloud (`:186-199`). Rich, server-rendered (good S2.2).
- P6/P4 × S11: "Find Yourself" search form (GET, `:102-105`) → server redirect to single entry (`app/journal/page.tsx:43-51`). Excellent for P6 arriving named.
- Gaps: **no per-entry share button** (WhatsApp/copy) — P12 × S5.5 word-of-mouth blocked. Sidebar search is `compact` "Go" only (`:103`) — fine.

### VIRTUAL FEED (`components/VirtualJournalFeed.tsx`, `FeedSection.tsx`)
- P12 × S2.2 × S10: **IntersectionObserver windowing** (pageSize 9, preload 400px, `:32-51`) — excellent perf for large archives. ErrorBoundary fallback (`:57`). Strength.
- **S10 gap:** without a filter, `FeedSection` adds `journal-all-entries--collapsed` (`:13`) — if CSS hides content until expand, discoverability suffers (verify expand affordance exists). Flag for S5.6.
- Resets visibleCount on filter change (`:27-29`) — good.

### TIMELINE (`components/journal/TimelineSection.tsx`)
- P14 Loyal × S14 × S5.1: browse by year, real computed counts for current year (`:35-41`).
- **S14 gap:** `PLACEHOLDER_PAST_YEARS` (`:7-26`) hardcodes 2023/2024/2025 counts (52/76/84) + blurbs — **static fake numbers** mixed with real data. P9/P14 could be misled; also drifts from reality over time. Flag for trust.
- Minor: row has "Reading archive: {year} is currently in view." text (`:62`) — slightly odd a11y phrasing.

### STATUS + FILTER BANNERS (`StatusBanner.tsx`, `FilterBanner.tsx`)
- P12 × S5.1: `STUDIO_STATUS` headline + per-category cadence notes (real, dynamic date `:11`). Strength.
- P12 × S7.1: `FilterBanner` announces "{count} results" + "Bookmark this view" (`:17-21`) — good SR + S5.6.

### CLOSING BAND (`ClosingBand.tsx`)
- P9/P3 × S6.4: "This is not our marketing. It's the actual work, as it happens." — strong authenticity close. Strength.

## Gaps found (consolidated, with file:line)
1. **No per-entry share button** (WhatsApp/copy link) — P12 × S5.5 word-of-mouth blocked (`LatestEntries.tsx`, no share UI).
2. **Timeline placeholder years hardcoded** (52/76/84 counts + blurbs) — static/fake mixed with real (`TimelineSection.tsx:7-26`). S14 trust.
3. **"All Entries" collapsed by default** without filter — verify expand affordance; possible S5.6 discoverability loss (`FeedSection.tsx:13`).
4. **Synthetic thread progress %** (hardcoded per workType, not real milestones) — P14/P3 may misread stage (`JournalThreadCard.tsx:31-43`).
5. **No Hindi copy** anywhere in journal (S7.4) — all English, including search/sidebar.
6. **No Hindi summaries** for key entries (P12 local readers S7.4).
7. **"Reading archive: {year} is currently in view"** odd a11y phrasing (`TimelineSection.tsx:62`).

## Recommended fixes (tickets, prioritized)
1. **Add per-entry share (WhatsApp + copy link)** on entry cards + detail — P12 × S5.5 (highest value for organic reach).
2. **Replace Timeline placeholder counts** with real computed historical counts (or mark clearly as illustrative) — S14 trust.
3. **Ensure "All Entries" expand affordance** is obvious when collapsed — S5.6.
4. **Compute thread progress from real milestones** (or relabel as "activity") — P14/P3 trust.
5. **Add Hindi option/summaries** for journal (at least search UI + key entries) — S7.4.
6. **Fix Timeline a11y phrasing** — S7.1.
