# Data Structures Documentation

This document describes all data structures used throughout the Meenakshi Art Work website.

## Table of Contents

- [File-Per-Record Storage Layout](#file-per-record-storage-layout)
- [Artist Profile](#artist-profile)
- [Journal Entry](#journal-entry)
- [Journal Thread](#journal-thread)
- [Testimonial](#testimonial)
- [Journal Person](#journal-person)
- [Curriculum Phases](#curriculum-phases)
- [Painting Story & Narrative Modules](#painting-story--narrative-modules)

---

## File-Per-Record Storage Layout

The three largest content sets are stored **one file per record**, not as a single
array literal, so no individual file grows unnavigably large:

| Content set | Aggregator file | Per-record files | Count |
|---|---|---|---|
| Painting stories | `data/paintingStories.ts` | `data/paintingStories/<slug>.ts` | 16 |
| Artist profiles | `data/artists.ts` | `data/artists/<slug>.ts` | 15 |
| Journal entries | `data/journal.ts` | `data/journal/entries/<slug>.ts` | 32 |

Each per-record file exports a single `default` object typed against the shared
interface (e.g. `data/paintingStories/elephant-pattern-art.ts` exports one
`PaintingStory`, via `import type { PaintingStory } from "../exhibitionImages"`). The
aggregator file imports every per-record file and reassembles the array under the
**same exported name and same query-function signatures** as before
(`getPaintingStory`, `getArtistProfile`, `getJournalEntry`, …) — every consumer
(`app/painting/[slug]/page.tsx`, `app/academy/[slug]/page.tsx`,
`app/journal/[slug]/page.tsx`, and the in-memory index-building code that follows the
array in each aggregator file) is unaffected by the split.

This is the same pattern a document-oriented or row-per-file storage engine uses —
see `docs/dbms-assessment.md`'s "sharding tie-in" note for that comparison. The
in-memory indexes described below (`storyBySlug`, `entryBySlug`, …) are still built
once, at module load, over the *reassembled* array — the split only changes where the
source text for each record lives on disk, not the runtime data structure.

## Artist Profile

**File**: `data/artists.ts` (aggregator; individual profiles in `data/artists/<slug>.ts`)

### Interface: ArtistProfile

Interface for student artist profiles in the academy.

#### Properties

- `slug: string` - URL-friendly identifier for the artist
- `name: string` - Full display name of the artist
- `joinedYear: number` - Year the student joined the academy
- `headline: string` - Featured quote or tagline for the artist
- `bio?: string` - Optional biographical information
- `isSample?: boolean` - Flag for sample/demo data (should not be published)
- `heroImage: string` - Path to the hero/featured image
- `artworks: Artwork[]` - Array of artwork entries created by the student
- `journeyYears: number[]` - Array of years corresponding to TIMELINE_MILESTONES
- `featuredArtwork: FeaturedArtwork` - The student's most notable artwork
- `stats: ArtistStats` - Statistics about the student's progress
- `studioMoments: StudioMoment[]` - Array of studio session photos
- `teacherNote: TeacherNote` - Personal note from the instructor
- `galleryWallImage?: string` - Optional pre-composed gallery wall image
- `teacherNoteImage?: string` - Optional pre-composed teacher note image
- `certificate: Certificate` - Certificate information for the student

#### Usage Example

```typescript
import { artistProfiles, getArtistProfile } from '@/data/artists';

const artist = getArtistProfile('aarna');
if (artist?.isSample) {
  console.warn('Sample data should not be published');
}
```

#### Related Functions

- `getArtistProfile(slug: string)` - Retrieve single profile by slug
- `getArtwork(slug: string, artworkSlug: string)` - Retrieve specific artwork from artist's collection
- `artistProfiles` - Array of all artist profiles

#### Constants

- `TIMELINE_MILESTONES` - Shared timeline labels across all students
- `STATIC_ACHIEVEMENTS` - Shared achievement badges across all students

---

## Journal Entry

**File**: `data/journal.ts` (aggregator; individual entries in `data/journal/entries/<slug>.ts`)

### Interface: JournalEntry

A single article or post in the studio journal.

#### Properties

- `slug: string` - URL-friendly identifier for the entry
- `title: string` - Display title
- `category: JournalCategory` - Category classification for the entry
- `format?: "essay" | "snapshot"` - Optional format type
- `excerpt: string` - Brief summary for listings
- `body: string[]` - Array of paragraph strings forming the content
- `images?: JournalImage[]` - Optional array of embedded images
- `publishedOn: string` - ISO date string when published
- `readTimeMinutes: number` - Estimated reading time in minutes
- `status: JournalStatus` - Publication status
- `threadSlug?: string` - Optional thread this entry belongs to
- `tags: string[]` - Array of topic tags
- `mentionedPeople: string[]` - Array of person slugs mentioned
- `coverImage?: string` - Optional cover image path

#### Related Types

- `JournalCategory` - Categories: "business-insight", "journey-diary", "student-story", "behind-the-scenes", "past-project"
- `JournalStatus` - Status: "active", "completed", "evergreen"
- `JournalImage` - Image embedded within a journal entry

#### Related Functions

- `getJournalEntry(slug: string)` - Retrieve single entry by slug
- `filterEntries(params)` - Filter entries by category, person, tag, or search query
- `getLatestEntryPreview(category)` - Get title of latest entry in a category
- `getAllTags()` - Get all tags with counts
- `getJournalStats()` - Get overall journal statistics

---

## Journal Thread

**File**: `data/journal.ts`

### Interface: JournalThread

Represents an ongoing or completed work stream. Threads group related journal entries together to show progress over time.

#### Properties

- `slug: string` - URL-friendly identifier for the thread
- `title: string` - Display title of the thread
- `workType: WorkType` - Type of work represented
- `status: "active" | "completed"` - Current status of the thread
- `statusNote: string` - Brief description of current state
- `statusUpdatedOn: string` - Date when status was last updated
- `startedOn: string` - Date when work began
- `completedOn?: string` - Optional date when work was completed
- `mentionedPeople: string[]` - Array of person slugs mentioned in this thread
- `relatedEntrySlugs: string[]` - Array of journal entry slugs in this thread

#### Related Types

- `WorkType` - Types: "custom-commission", "academy-student", "school-assistance", "studio-operations"

#### Related Functions

- `getThread(slug: string)` - Retrieve thread by slug
- `getActiveThreads()` - Get all currently active threads
- `getCompletedThreads()` - Get all completed threads
- `getEntriesForThread(threadSlug: string)` - Get all entries in a thread

---

## Testimonial

**File**: `data/testimonials.ts`

### Interface: Testimonial

Customer review or testimonial data.

#### Properties

- `name: string` - Name of the person providing the testimonial
- `quote: string` - The testimonial text
- `credibility?: string` - Optional credibility indicator (e.g., review count)
- `type: "postcard" | "sticky"` - Display type
- `image?: string` - Optional path to an artwork image associated with the testimonial

#### Data Arrays

- `postcards: Testimonial[]` - Featured testimonials displayed as postcards
- `stickyNotes: Testimonial[]` - Quick testimonials displayed as sticky notes

---

## Journal Person

**File**: `data/journalPeople.ts`

### Interface: JournalPerson

Person referenced in journal entries.

#### Properties

- `slug: string` - URL-friendly identifier for the person
- `name: string` - Display name of the person
- `role: "student" | "client" | "prospective-client" | "family" | "other"` - Relationship to the studio
- `academySlug?: string` - Optional cross-link to ArtistProfile.slug for students with full profiles
- `isAnonymized?: boolean` - Flag indicating identity is withheld pending consent

#### Related Functions

- `getJournalPerson(slug: string)` - Retrieve person by slug
- `getMentionedPersonNames(slugs: string[])` - Convert slugs to display names

---

## Curriculum Phases

**File**: `data/curriculum.ts`

### Constant: phases

The five-phase learning path. Each phase builds upon the previous one, progressing from foundational skills to advanced techniques.

#### Structure

Array of tuples containing `[phase number, phase title, phase description]`:

1. **Hand control** - Lines, forms and confident movement
2. **Proportions** - Observation, balance and composition
3. **Acrylic** - Color, layering and brush techniques
4. **Canvas** - From concept to a complete artwork
5. **Oil painting** - Depth, realism and a signature style

#### Usage Example

```typescript
import { phases } from '@/data/curriculum';

phases.forEach(([num, title, desc]) => {
  console.log(`${num}: ${title} - ${desc}`);
});
```

---

## Painting Story & Narrative Modules

**Files**: `data/exhibitionImages.ts` (the `PaintingStory` type itself), `data/narrativeModules.ts`
(the module/interaction type system), `data/paintingStories.ts` (aggregator — imports one file per
story from `data/paintingStories/<slug>.ts`, 16 files, each holding one painting's full narrative).
Splitting this was the single highest-priority item in the file-size cleanup: the array literal
alone was previously ~2,000 lines in one file before the split described above.

This is the largest and structurally richest data shape in the codebase — worth documenting on
its own rather than folding into the other sections above.

### Interface: PaintingStory

One entry per painting detail page (`/painting/[slug]`). Required fields: `slug`, `contextualTitle`,
`pieceId` (cross-references `ExhibitionPiece.title`), `storyContext` (`'commission' | 'gallery' |
'student'`), `emotionalSignature`, `openingScene` (hero image/narrative, optional YouTube
background video), `modules: NarrativeModule[]`, `inquiryMethod`. Optional fields:
`signatureInteraction`, `founderVideo`, and two mutually-exclusive "standalone moment" shapes —
`posterMoment` (problem → solution reveal, used by e.g. Tiger Family) and `processionMoment`
(a three-pass journey structure — ground → current → crowd — used only by Elephant · Pattern Art).
Both are deliberately different shapes for different storytelling arcs, not variants of one type.

### `NarrativeModule` — a tagged union (discriminated union)

Each painting selects 6–10 modules (of ~40 possible types) from `data/narrativeModules.ts`.
`ModuleContent` is a TypeScript discriminated union — every member interface carries a literal
`type` field (e.g. `'color-decisions'`, `'hidden-symbolism'`, `'the-problem'`) that both narrows
the type at compile time and drives runtime dispatch:

```ts
export type ModuleContent =
  | ColorDecisionsContent
  | HiddenSymbolismContent
  | InstallationDayContent
  | FutureHomeContent
  // … ~40 total members, each `{ type: '<literal>'; ...fields }`
```

`components/NarrativeModule.tsx`'s `ModuleRenderer` is a big `switch (content.type)` that maps
each literal tag to its rendering component (`components/narrative/*.tsx`, grouped by theme —
`origin.tsx`, `process.tsx`, `decision.tsx`, `physicality.tsx`, `symbolism.tsx`, `installation.tsx`,
`future.tsx`, `journal.tsx`) — the classic **sum-type + exhaustive-dispatch** pattern, giving
compile-time safety (adding a new module type without a matching `case` is a type error at the
`default:` fallthrough) without a runtime type-checking library.

`SignatureInteraction` follows the identical pattern at a smaller scale: one of 7 types
(`light-simulator`, `ambient-sound`, `artist-commentary`, `season-switch`, `detail-explorer`,
`before-after-slider`, `color-palette-explorer`), each with its own data shape, dispatched by
`components/SignatureInteraction.tsx`'s `switch (interaction.type)`.

### Related Functions

- `getPaintingStory(slug)`, `getAllPaintingStories()` — see the in-memory index table below
  (`storyBySlug`, `storiesByContext`, `storiesByPieceId`).
- `getExhibitionPieceByTitle(title)` — resolves a story's `pieceId` back to its `ExhibitionPiece`
  (price, medium, size) for the WhatsApp inquiry text on `/painting/[slug]`.

## Important Notes

### Sample Data

Several data files contain sample/demo entries marked with `isSample: true`. These are fictional examples for design preview only and must be replaced with real, verified data before publishing.

- **Artist profiles**: Check `isSample` flag before publishing profile pages
- **Journal entries**: Ensure sample entries are removed or replaced with real content

### Data Relationships

- `JournalPerson.academySlug` cross-references `ArtistProfile.slug`
- `JournalEntry.mentionedPeople` references `JournalPerson.slug`
- `JournalEntry.threadSlug` references `JournalThread.slug`
- `ArtistProfile.artworks` contains nested artwork data with their own slugs

### Static vs Dynamic Data

This project uses static data files in the `data/` directory rather than a database. This approach:
- Simplifies deployment and hosting
- Enables fast static site generation
- Provides version control for all content

**Build-time relational layer:** a normalized SQLite schema (`prisma/schema.prisma`) is populated
from these same `data/*.ts` objects on every build (`npm run prebuild`) and enforces primary-key
uniqueness and foreign-key/referential integrity that a plain array of objects cannot enforce on
its own — see `docs/dbms-assessment.md` for the full writeup. `lib/db/queries.ts` is the read-side
facade; no database connection is opened at request time.
---

## In-Memory Indexes (Data Structures & Algorithms)

The data layer builds a set of in-memory indexes **once at module load** so
repeated lookups are O(1) or O(log n) instead of re-scanning the flat arrays.

### Hash Maps (O(1) slug/key lookups)

| Index | Source | Purpose |
|-------|--------|---------|
| `entryBySlug` | `data/journal.ts` | Journal entry by slug |
| `threadBySlug` | `data/journal.ts` | Journal thread by slug |
| `entriesByStream`, `entriesByStreamAndStatus` | `data/journal.ts` | Latest-`*` helpers + recent feed queries |
| `entriesByCategory` | `data/journal.ts` | Category browse + `getLatestEntryPreview`, `getEntriesByCategory` |
| `entriesByThreadSorted` | `data/journal.ts` | Pre-sorted thread entries (`getEntriesForThreadSorted`) |
| `threadNavigation` / `categoryNavigation` | `data/journal.ts` | Doubly-linked prev/next navigation |
| `personBySlug` | `data/journalPeople.ts` | Person by slug |
| `storyBySlug`, `storiesByContext`, `storiesByPieceId` | `data/paintingStories.ts` | Painting story lookups |
| `storyBySlug` + `exhibitionPieceByTitle`/`exhibitionPiecesByRoom` | `data/exhibitionImages.ts` | O(1) piece/room lookups + precomputed story hrefs |
| `phaseByNum`, `reflectionByPhase`, `phaseNavigation` | `data/curriculum.ts` | Phase lookups + next/prev navigation |
| `founderNoteById`, `founderNotesByCategory` | `data/founderNotes.ts` | Founder note lookups |

### Inverted / Adjacency Indexes (graph-style traversals)

| Index | Source | Maps |
|-------|--------|------|
| `entriesByThread` | `data/journal.ts` | threadSlug → entries |
| `entriesByTag`, `entriesByPerson` | `data/journal.ts` | tag / personSlug → entries |
| `entriesByDateDesc` | `data/journal.ts` | date-desc ordered entries (search/feed base) |
| `storiesByJournalSlug` | `data/paintingStories.ts` | journalSlug → painting stories |
| `commentCountsByEntry` | `data/journalComments.ts` | entrySlug → comment count |

### Memoization (T2)

Module-level cache variables return stable references (never recomputed on
repeat calls): `activeThreadsCache`, `completedThreadsCache`, `allTagsCache`,
`mentionCountsCache`, `journalStatsCache`, `allPaintingStoriesCache`,
`getLatestComments` sorted cache, `trendingCache` (per-limit), and the
`getExhibitionPieceStoryHref` / `getPaintingStoriesByContext` map buckets.

### Related filters

`filterEntries` uses the inverted indexes for single-key filters (category,
person, tag) and a pre-sorted base for text search — preserving the exact
sort/pagination semantics while avoiding O(n) scans.
- Is suitable for content that changes infrequently
