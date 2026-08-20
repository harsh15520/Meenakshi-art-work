import { resolvePersonByName, getJournalPerson } from "./journalPeople";

/**
 * JournalCategory - Categories for journal entries.
 * Each category represents a different type of content in the studio journal.
 */
export type JournalCategory =
  | "business-insight"
  | "journey-diary"
  | "student-story"
  | "behind-the-scenes"
  | "past-project";

/**
 * JournalStatus - Publication status of journal entries.
 * - active: Currently being updated or part of an active thread
 * - completed: Finished work, no longer being updated
 * - evergreen: Timeless content that remains relevant
 */
export type JournalStatus = "active" | "completed" | "evergreen";

/**
 * WorkType - Type of work represented in journal threads.
 */
export type WorkType = "custom-commission" | "academy-student" | "school-assistance" | "studio-operations";

/**
 * JournalStream - The content stream an entry belongs to.
 * Each stream maps directly to a site section and powers its live strips.
 * - commission: Custom commission work (custom-orders page + home strip)
 * - academy: Academy student work (academy page + home strip)
 * - gallery: Gallery paintings (gallery page + home strip)
 * - studio: General behind-the-scenes / business content
 */
export type JournalStream = "commission" | "academy" | "gallery" | "studio";

/**
 * CommissionStage - Pipeline stages for custom commission work.
 */
export type CommissionStage = "reference" | "approved" | "painting" | "finishing" | "delivered";

/**
 * PaintingStage - Pipeline stages for gallery paintings in the studio.
 */
export type PaintingStage = "finishing-varnish" | "drying" | "framing";

/**
 * JournalThread - Represents an ongoing or completed work stream.
 * Threads group related journal entries together to show progress over time.
 * 
 * @property slug - URL-friendly identifier for the thread
 * @property title - Display title of the thread
 * @property workType - Type of work represented
 * @property status - Current status of the thread
 * @property statusNote - Brief description of current state
 * @property statusUpdatedOn - Date when status was last updated
 * @property startedOn - Date when work began
 * @property completedOn - Optional date when work was completed
 * @property mentionedPeople - Array of person slugs mentioned in this thread
 * @property relatedEntrySlugs - Array of journal entry slugs in this thread
 */
export type JournalThread = {
  slug: string;
  title: string;
  workType: WorkType;
  status: "active" | "completed";
  statusNote: string;
  statusUpdatedOn: string;
  startedOn: string;
  completedOn?: string;
  mentionedPeople: string[];
  relatedEntrySlugs: string[];
};

/**
 * JournalImage - Image embedded within a journal entry.
 * 
 * @property afterParagraph - Index of paragraph after which to insert the image
 * @property src - Path to the image file
 * @property alt - Alt text for accessibility
 * @property caption - Optional caption for the image
 */
export type JournalImage = {
  afterParagraph: number;
  src: string;
  alt: string;
  caption?: string;
};

/**
 * JournalEntry - A single article or post in the studio journal.
 * 
 * @property slug - URL-friendly identifier for the entry
 * @property title - Display title
 * @property category - Category classification for the entry
 * @property format - Optional format type (essay or snapshot)
 * @property excerpt - Brief summary for listings
 * @property body - Array of paragraph strings forming the content
 * @property images - Optional array of embedded images
 * @property publishedOn - ISO date string when published
 * @property readTimeMinutes - Estimated reading time in minutes
 * @property status - Publication status
 * @property threadSlug - Optional thread this entry belongs to
 * @property tags - Array of topic tags
 * @property mentionedPeople - Array of person slugs mentioned
 * @property coverImage - Optional cover image path
 */
export type JournalEntry = {
  slug: string;
  title: string;
  category: JournalCategory;
  format?: "essay" | "snapshot";
  excerpt: string;
  body: string[];
  images?: JournalImage[];
  publishedOn: string;
  readTimeMinutes: number;
  status: JournalStatus;
  threadSlug?: string;
  tags: string[];
  mentionedPeople: string[];
  coverImage?: string;
  /** Content stream this entry belongs to — powers the live strips */
  stream: JournalStream;
  /** Optional pipeline stage for in-progress work */
  stage?: CommissionStage | PaintingStage;
  /** Emoji shown in strip cards */
  emoji?: string;
  /** Two-line strip label for live strip cards */
  stripLabel?: string;
};

/**
 * Get the title of the most recent entry in a category.
 * 
 * @param category - The category to search
 * @returns Title of the latest entry, or placeholder text
 */
export function getLatestEntryPreview(category: JournalCategory) {
  const bucket = entriesByCategory.get(category);
  const latestEntry = bucket?.[0];
  return latestEntry ? latestEntry.title : "A new story is on the way.";
}

export const STUDIO_STATUS = {
  headline: "Two threads active right now.",
  detail: "Bhavya's weekly academy sessions are ongoing. The fabric-paint research is in testing phase — samples arrive this week.",
  updatedOn: "2026-07-21",
};

export const CADENCE_NOTES: Record<JournalCategory, string> = {
  "business-insight": "Published when real business moments happen — not forced to a schedule.",
  "journey-diary": "Reflective essays, irregular but whenever there's something worth thinking through.",
  "student-story": "Updated as students progress and milestones unfold.",
  "behind-the-scenes": "Quick snapshots from the studio, published as things happen.",
  "past-project": "Documented once work is wrapped and lessons are clear.",
};

// ==== THREADS (live work-streams) ====

export const journalThreads: JournalThread[] = [
  {
    slug: "textile-painting-research",
    title: "Hand-Painting on Delicate Fabrics",
    workType: "custom-commission",
    status: "active",
    statusNote:
      "Jacquard Neopaque samples in transit from Mumbai. Testing for opaqueness, dry-clean durability, and stiffness on actual fabric—expected this week.",
    statusUpdatedOn: "2026-07-21",
    startedOn: "2026-06-15",
    mentionedPeople: ["ambala-textile-client"],
    relatedEntrySlugs: ["textile-fabric-research-begins"],
  },
  {
    slug: "bhavya-academy-sessions",
    title: "Bhavya Jain's Academy Journey",
    workType: "academy-student",
    status: "active",
    statusNote: "Weekly sessions, 4:30–6:15 PM most days. Currently working on shadow and perspective techniques.",
    statusUpdatedOn: "2026-07-21",
    startedOn: "2026-07-01",
    mentionedPeople: ["bhavya-jain"],
    relatedEntrySlugs: ["bhavya-first-week", "bhavya-breakthrough"],
  },
  {
    slug: "school-25-sheets",
    title: "25 Art Sheets for Board Exam",
    workType: "school-assistance",
    status: "completed",
    statusNote: "All sheets completed and delivered in time for 12th-grade submission.",
    statusUpdatedOn: "2026-07-10",
    startedOn: "2026-06-01",
    completedOn: "2026-07-10",
    mentionedPeople: [],
    relatedEntrySlugs: ["school-25-sheets-project"],
  },
];

// ==== ENTRIES (feed articles) ====

import aarnaFeatured from "./journal/entries/aarna-featured";
import shreyaJourney from "./journal/entries/shreya-journey";
import keshavFocus from "./journal/entries/keshav-focus";
import harshBansalStory from "./journal/entries/harsh-bansal-story";
import prishaDedication from "./journal/entries/prisha-dedication";
import veenuDiscovery from "./journal/entries/veenu-discovery";
import meghaQuietTalent from "./journal/entries/megha-quiet-talent";
import snigdhaBeginning from "./journal/entries/snigdha-beginning";
import jhanviNewStudent from "./journal/entries/jhanvi-new-student";
import merenReturning from "./journal/entries/meren-returning";
import bhavyaFirstWeek from "./journal/entries/bhavya-first-week";
import school25SheetsProject from "./journal/entries/school-25-sheets-project";
import commissionGalleryOne from "./journal/entries/commission-gallery-one";
import commissionLandscapeStudy from "./journal/entries/commission-landscape-study";
import textileFabricResearchBegins from "./journal/entries/textile-fabric-research-begins";
import pricingCustomWork from "./journal/entries/pricing-custom-work";
import sayingNoToCommissions from "./journal/entries/saying-no-to-commissions";
import whyBuildThisJournal from "./journal/entries/why-build-this-journal";
import whatTextileResearchTaught from "./journal/entries/what-textile-research-taught";
import teachingVersusMaking from "./journal/entries/teaching-versus-making";
import studioMorningLight from "./journal/entries/studio-morning-light";
import thePaletteToday from "./journal/entries/the-palette-today";
import waitingForSupplies from "./journal/entries/waiting-for-supplies";
import rosesForTheHallwayInProgress from "./journal/entries/roses-for-the-hallway-in-progress";
import eveningLightAtThePondCompleted from "./journal/entries/evening-light-at-the-pond-completed";
import sevenHorsesMonthlyFavourite from "./journal/entries/seven-horses-monthly-favourite";
import colourPortraitInProgress from "./journal/entries/colour-portrait-in-progress";
import textileFabricResearchTesting from "./journal/entries/textile-fabric-research-testing";
import familyPortraitsDeliveredGhaziabad from "./journal/entries/family-portraits-delivered-ghaziabad";
import bhavyaBreakthrough from "./journal/entries/bhavya-breakthrough";
import newAcrylicBatchStarted from "./journal/entries/new-acrylic-batch-started";
import exhibitionFramesFinished from "./journal/entries/exhibition-frames-finished";

export const journalEntries: JournalEntry[] = [
  aarnaFeatured,
  shreyaJourney,
  keshavFocus,
  harshBansalStory,
  prishaDedication,
  veenuDiscovery,
  meghaQuietTalent,
  snigdhaBeginning,
  jhanviNewStudent,
  merenReturning,
  bhavyaFirstWeek,
  school25SheetsProject,
  commissionGalleryOne,
  commissionLandscapeStudy,
  textileFabricResearchBegins,
  pricingCustomWork,
  sayingNoToCommissions,
  whyBuildThisJournal,
  whatTextileResearchTaught,
  teachingVersusMaking,
  studioMorningLight,
  thePaletteToday,
  waitingForSupplies,
  rosesForTheHallwayInProgress,
  eveningLightAtThePondCompleted,
  sevenHorsesMonthlyFavourite,
  colourPortraitInProgress,
  textileFabricResearchTesting,
  familyPortraitsDeliveredGhaziabad,
  bhavyaBreakthrough,
  newAcrylicBatchStarted,
  exhibitionFramesFinished,
];

// ==== INDEXES (built once at module load) ====
// O(1) slug lookups + adjacency maps so the helper functions below never
// re-scan the full arrays. Data is static, so these are computed a single time.

const entryBySlug = new Map<string, JournalEntry>(journalEntries.map((e) => [e.slug, e]));
const threadBySlug = new Map<string, JournalThread>(journalThreads.map((t) => [t.slug, t]));

const entriesByThread = new Map<string, JournalEntry[]>();
for (const entry of journalEntries) {
  if (!entry.threadSlug) continue;
  const bucket = entriesByThread.get(entry.threadSlug);
  if (bucket) bucket.push(entry);
  else entriesByThread.set(entry.threadSlug, [entry]);
}

// Pre-sorted date-desc view reused by the "latest *" helpers.
const entriesByDateDesc: JournalEntry[] = [...journalEntries].sort(
  (a, b) => new Date(b.publishedOn).getTime() - new Date(a.publishedOn).getTime()
);

// ---- T1: Stream-partitioned index (pre-sorted by date desc) ----
// Eliminates the O(n) .find() on entriesByDateDesc that the getLatest* helpers
// were doing on every call.  Each bucket is pre-sorted so the first element is
// always the most recent entry for that stream.
const entriesByStream = new Map<JournalStream, JournalEntry[]>();
for (const entry of entriesByDateDesc) {
  const bucket = entriesByStream.get(entry.stream);
  if (bucket) bucket.push(entry);
  else entriesByStream.set(entry.stream, [entry]);
}

// ---- T1: Stream + status partitioned index ----
// Key is "${stream}|${status}".  Lets getLatestCompletedCommissions and
// getLatestGalleryEntry(status) jump straight to the right slice in O(1).
const entriesByStreamAndStatus = new Map<string, JournalEntry[]>();
for (const entry of entriesByDateDesc) {
  const key = `${entry.stream}|${entry.status}`;
  const bucket = entriesByStreamAndStatus.get(key);
  if (bucket) bucket.push(entry);
  else entriesByStreamAndStatus.set(key, [entry]);
}

// ---- T1: Category-partitioned index (pre-sorted by date desc) ----
// Powers getLatestEntryPreview(category) and "more from journal" lookups.
const entriesByCategory = new Map<JournalCategory, JournalEntry[]>();
for (const entry of entriesByDateDesc) {
  const bucket = entriesByCategory.get(entry.category);
  if (bucket) bucket.push(entry);
  else entriesByCategory.set(entry.category, [entry]);
}

// ---- T3: Inverted index — tag → entries ----
// Lets filterEntries({ tag }) skip the per-entry .includes() scan.
const entriesByTag = new Map<string, JournalEntry[]>();
for (const entry of journalEntries) {
  for (const tag of entry.tags) {
    const bucket = entriesByTag.get(tag);
    if (bucket) bucket.push(entry);
    else entriesByTag.set(tag, [entry]);
  }
}

// ---- T3: Inverted index — person → entries ----
// Lets filterEntries({ person }) skip the per-entry .includes() scan.
const entriesByPerson = new Map<string, JournalEntry[]>();
for (const entry of journalEntries) {
  for (const personSlug of entry.mentionedPeople) {
    const bucket = entriesByPerson.get(personSlug);
    if (bucket) bucket.push(entry);
    else entriesByPerson.set(personSlug, [entry]);
  }
}

// ---- T2: Thread entries pre-sorted by date desc ----
// Avoids re-sorting getEntriesForThread() results on every render in
// JournalThreadCard and LatestEntries.
const entriesByThreadSorted: Map<string, JournalEntry[]> = new Map();
for (const [threadSlug, entries] of entriesByThread) {
  entriesByThreadSorted.set(
    threadSlug,
    [...entries].sort(
      (a, b) => new Date(b.publishedOn).getTime() - new Date(a.publishedOn).getTime()
    )
  );
}

// ---- T3: Thread navigation (doubly-linked, within active+completed threads) ----
// Ordered by statusUpdatedOn desc.  Each thread maps to its predecessor and
// successor, enabling "next thread / previous thread" navigation on the journal.
const sortedThreads = [...journalThreads].sort(
  (a, b) =>
    new Date(b.statusUpdatedOn).getTime() - new Date(a.statusUpdatedOn).getTime()
);
const threadNavigation = new Map<string, { prev: string | null; next: string | null }>();
sortedThreads.forEach((t, i) => {
  threadNavigation.set(t.slug, {
    prev: i > 0 ? sortedThreads[i - 1]!.slug : null,
    next: i < sortedThreads.length - 1 ? sortedThreads[i + 1]!.slug : null,
  });
});

// ---- T3: Category entry navigation (doubly-linked, date-sorted within category) ----
// Lets a journal detail page offer "next article in this category" in O(1).
const categoryNavigation = new Map<string, { next: string | null }>();
for (const [category, catEntries] of entriesByCategory) {
  for (let i = 0; i < catEntries.length; i++) {
    categoryNavigation.set(catEntries[i]!.slug, {
      next: i < catEntries.length - 1 ? catEntries[i + 1]!.slug : null,
    });
  }
}

// ==== HELPER FUNCTIONS ====

/**
 * Retrieve a single journal entry by slug.
 * 
 * @param slug - The entry's slug identifier
 * @returns The journal entry if found, undefined otherwise
 */
export function getJournalEntry(slug: string) {
  return entryBySlug.get(slug);
}

/**
 * Retrieve a journal thread by slug.
 * 
 * @param slug - The thread's slug identifier
 * @returns The thread if found, undefined otherwise
 */
export function getThread(slug: string) {
  return threadBySlug.get(slug);
}

/**
 * Get all currently active journal threads.
 * 
 * @returns Array of active threads
 */
export function getActiveThreads() {
  return activeThreadsCache ??= journalThreads.filter((t) => t.status === "active");
}
let activeThreadsCache: JournalThread[] | undefined;

/**
 * Get all completed journal threads.
 * 
 * @returns Array of completed threads
 */
export function getCompletedThreads() {
  return completedThreadsCache ??= journalThreads.filter((t) => t.status === "completed");
}
let completedThreadsCache: JournalThread[] | undefined;

/**
 * Get all journal entries belonging to a specific thread.
 * 
 * @param threadSlug - The thread's slug identifier
 * @returns Array of entries in the thread
 */
export function getEntriesForThread(threadSlug: string) {
  return entriesByThread.get(threadSlug) ?? [];
}

/**
 * Get all tags used across journal entries with their counts.
 * 
 * @returns Array of tags sorted by frequency (descending)
 */
export function getAllTags(): { tag: string; count: number }[] {
  if (allTagsCache) return allTagsCache;
  const tagMap = new Map<string, number>();
  journalEntries.forEach((entry) => {
    entry.tags.forEach((tag) => {
      tagMap.set(tag, (tagMap.get(tag) || 0) + 1);
    });
  });
  allTagsCache = Array.from(tagMap.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
  return allTagsCache;
}
let allTagsCache: { tag: string; count: number }[] | undefined;

/**
 * Get mention statistics for all people referenced in journal entries.
 * 
 * @returns Array of mention data sorted by frequency (descending)
 */
export function getMentionCounts(): { person: string; count: number; slug: string; lastMentionedOn: string }[] {
  if (mentionCountsCache) return mentionCountsCache;
  const mentionMap = new Map<string, { count: number; slug: string; lastDate: string }>();
  journalEntries.forEach((entry) => {
    entry.mentionedPeople.forEach((slug) => {
      const existing = mentionMap.get(slug) || { count: 0, slug, lastDate: "" };
      mentionMap.set(slug, {
        count: existing.count + 1,
        slug,
        lastDate: entry.publishedOn > existing.lastDate ? entry.publishedOn : existing.lastDate,
      });
    });
  });
    mentionCountsCache = Array.from(mentionMap.entries())
    .map(([slug, data]) => ({
      person: getJournalPerson(slug)?.name || slug,
      ...data,
      lastMentionedOn: data.lastDate,
    }))
    .sort((a, b) => b.count - a.count);
  return mentionCountsCache;
}
let mentionCountsCache: { person: string; count: number; slug: string; lastMentionedOn: string }[] | undefined;

/**
 * Get overall statistics about the journal.
 * 
 * @returns Object containing total entries, thread counts, and category breakdowns
 */
export interface JournalStats {
  totalEntries: number;
  activeThreads: number;
  completedThreads: number;
  studentsMentioned: number;
  lastUpdated: string;
  categoryCounts: Record<JournalCategory, number>;
}

export function getJournalStats(): JournalStats {
  if (journalStatsCache) return journalStatsCache;
  const allEntries = journalEntries;
  const mentionedSlugs = new Set<string>();
  allEntries.forEach((e) => {
    e.mentionedPeople.forEach((p) => mentionedSlugs.add(p));
  });

  journalStatsCache = {
    totalEntries: allEntries.length,
    activeThreads: getActiveThreads().length,
    completedThreads: getCompletedThreads().length,
    studentsMentioned: mentionedSlugs.size,
    lastUpdated: entriesByDateDesc[0]?.publishedOn || new Date().toISOString(),
        categoryCounts: {
      "business-insight": entriesByCategory.get("business-insight")?.length ?? 0,
      "journey-diary": entriesByCategory.get("journey-diary")?.length ?? 0,
      "student-story": entriesByCategory.get("student-story")?.length ?? 0,
      "behind-the-scenes": entriesByCategory.get("behind-the-scenes")?.length ?? 0,
      "past-project": entriesByCategory.get("past-project")?.length ?? 0,
    },
  };
  return journalStatsCache;
}
let journalStatsCache: JournalStats | undefined;

/**
 * Filter journal entries by various criteria.
 * 
 * @param params - Filter parameters (category, person, tag, or search query)
 * @returns Filtered and sorted array of journal entries
 */
export type FilterParams = {
  category?: string;
  person?: string;
  tag?: string;
  q?: string;
  /** 1-based page. When omitted (or pageSize omitted), returns the full filtered set. */
  page?: number;
  /** Page size. Pagination only applies when BOTH page and pageSize are provided. */
  pageSize?: number;
};

export function filterEntries(params: FilterParams): JournalEntry[] {
    // T1/T3: Use inverted indexes for single-key filters to avoid O(n) scans.
  // For composite filters or text search, start from the most selective
  // available index then narrow with remaining conditions.
  let filtered: JournalEntry[];

  if (!params.q && params.category && !params.person && !params.tag) {
    // Pure category filter — O(1) Map lookup
    filtered = entriesByCategory.get(params.category as JournalCategory) ?? [];
  } else if (!params.q && params.person && !params.category && !params.tag) {
    // Pure person filter — O(1) inverted index lookup
    filtered = entriesByPerson.get(params.person) ?? [];
  } else if (!params.q && params.tag && !params.category && !params.person) {
    // Pure tag filter — O(1) inverted index lookup
    filtered = entriesByTag.get(params.tag) ?? [];
  } else {
    // Composite filter or text search: start from the most selective single-key
    // index, or entriesByDateDesc if no single-key filter is present.
    if (params.category) {
      filtered = entriesByCategory.get(params.category as JournalCategory) ?? [];
    } else if (params.person) {
      filtered = entriesByPerson.get(params.person) ?? [];
    } else if (params.tag) {
      filtered = entriesByTag.get(params.tag) ?? [];
    } else {
      filtered = [...entriesByDateDesc];
    }
    // Apply remaining filters not covered by the starting index
    if (params.category) {
      filtered = filtered.filter((e) => e.category === params.category);
    }
    if (params.person) {
      filtered = filtered.filter((e) => e.mentionedPeople.includes(params.person!));
    }
    if (params.tag) {
      filtered = filtered.filter((e) => e.tags.includes(params.tag!));
    }
    if (params.q) {
      const q = params.q.toLowerCase();
      const resolvedPerson = resolvePersonByName(params.q);
      filtered = filtered.filter(
        (e) =>
          e.title.toLowerCase().includes(q) ||
          e.excerpt.toLowerCase().includes(q) ||
          e.tags.some((t) => t.toLowerCase().includes(q)) ||
          (resolvedPerson ? e.mentionedPeople.includes(resolvedPerson) : false)
      );
    }
  }

  // Sort: active threads first (by statusUpdatedOn via relatedEntrySlugs), then by publishedOn desc
  filtered.sort((a, b) => {
    const aThreadSlug = a.threadSlug;
    const bThreadSlug = b.threadSlug;

    if (aThreadSlug && bThreadSlug) {
      const aThread = threadBySlug.get(aThreadSlug);
      const bThread = threadBySlug.get(bThreadSlug);
      if (aThread?.status === "active" && bThread?.status !== "active") return -1;
      if (aThread?.status !== "active" && bThread?.status === "active") return 1;
      if (aThread?.status === "active" && bThread?.status === "active") {
        return new Date(bThread!.statusUpdatedOn).getTime() - new Date(aThread!.statusUpdatedOn).getTime();
      }
    } else if (aThreadSlug && aThreadSlug) {
      const aThread = threadBySlug.get(aThreadSlug);
      if (aThread?.status === "active") return -1;
    } else if (bThreadSlug) {
      const bThread = threadBySlug.get(bThreadSlug);
      if (bThread?.status === "active") return 1;
    }

    return new Date(b.publishedOn).getTime() - new Date(a.publishedOn).getTime();
  });

  // Pagination (LIMIT/OFFSET equivalent). Backward compatible: callers that pass
  // no page/pageSize still receive the full filtered + sorted array.
  if (params.page && params.pageSize && params.pageSize > 0) {
    const start = (params.page - 1) * params.pageSize;
    return filtered.slice(start, start + params.pageSize);
  }

  return filtered;
}

/**
 * Generate static params for Next.js dynamic routes.
 * Used by [slug] pages to generate static paths at build time.
 * 
 * @returns Array of params objects for each entry
 */
export function generateStaticParams() {
  return journalEntries.map((entry) => ({
    slug: entry.slug,
  }));
}

/**
 * Get the latest active commission entry for the home page strip.
 * Powers Home portion 1 and Custom Orders card 1.
 * 
 * @returns The most recent active commission entry, or undefined
 */
export function getLatestActiveCommission() {
  return entriesByStreamAndStatus.get("commission|active")?.[0];
}

/**
 * Get the second latest active commission entry.
 * Powers Home portion 3.
 * 
 * @returns The 2nd most recent active commission entry, or undefined
 */
export function getSecondLatestActiveCommission() {
  return entriesByStreamAndStatus.get("commission|active")?.[1];
}

/**
 * Get the latest completed commission entries (up to 3).
 * Powers Custom Orders card 2 (Recently Delivered).
 * 
 * @param count - Number of entries to return (default 3)
 * @returns Array of completed commission entries, sorted by date desc
 */
export function getLatestCompletedCommissions(count = 3) {
  return entriesByStreamAndStatus.get("commission|completed")?.slice(0, count) ?? [];
}

/**
 * Get the latest academy update.
 * Powers Home portion 2 and Academy card 1.
 * 
 * @returns The most recent academy entry, or undefined
 */
export function getLatestAcademyUpdate() {
  return entriesByStream.get("academy")?.[0];
}

/**
 * Get the latest gallery entry (active or completed).
 * Powers Gallery cards 1 and 2, and Home portion 5.
 * 
 * @param status - Optional status filter ("active" or "completed")
 * @returns The most recent gallery entry matching the status, or undefined
 */
export function getLatestGalleryEntry(status?: "active" | "completed") {
  return status
    ? entriesByStreamAndStatus.get(`gallery|${status}`)?.[0]
    : entriesByStream.get("gallery")?.[0];
}

/**
 * Get the latest studio/general update.
 * Powers Home portion 5.
 * 
 * @returns The most recent studio entry, or undefined
 */
export function getLatestStudioUpdate() {
  return entriesByStream.get("studio")?.[0];
}

// ---- T1: New indexed helpers ----

/**
 * Get all entries in a category, pre-sorted by date desc.
 * Replaces per-call filter+sort with O(1) Map lookup.
 */
export function getEntriesByCategory(category: JournalCategory): JournalEntry[] {
  return entriesByCategory.get(category) ?? [];
}

/**
 * Get all entries sharing a tag, via the inverted tag→entries index.
 */
export function getEntriesByTag(tag: string): JournalEntry[] {
  return entriesByTag.get(tag) ?? [];
}

/**
 * Get all entries mentioning a person, via the inverted person→entries index.
 */
export function getEntriesByPerson(personSlug: string): JournalEntry[] {
  return entriesByPerson.get(personSlug) ?? [];
}

/**
 * Get all entries in a specific thread, pre-sorted by date desc.
 */
export function getEntriesForThreadSorted(threadSlug: string): JournalEntry[] {
  return entriesByThreadSorted.get(threadSlug) ?? [];
}

/**
 * Get thread navigation neighbors (prev/next by recency).
 */
export function getThreadNavigation(
  slug: string
): { prev: string | null; next: string | null } | undefined {
  return threadNavigation.get(slug);
}

/**
 * Get the next entry in the same category (by date desc).
 * Useful for "next article in this category" navigation on detail pages.
 */
export function getNextEntryInCategory(entrySlug: string): string | null {
  return categoryNavigation.get(entrySlug)?.next ?? null;
}

/**
 * Get the latest entries across all streams, pre-sorted by date desc.
 * @param count - Number of entries to return (default 5)
 */
export function getLatestEntries(count = 5): JournalEntry[] {
  return entriesByDateDesc.slice(0, count);
}
