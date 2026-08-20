import { journalPeople } from "./journalPeople";

/**
 * JournalComment — a curated comment shown in the journal sidebar.
 *
 * The studio journal is a two-way conversation: students, parents, clients and
 * Meenakshi herself all appear. Each comment is attached to a journal entry
 * (by slug) and typed/styled like a real community reply.
 *
 * @property id       - unique key (used as React key)
 * @property entrySlug - the journal entry this comment replies to
 * @property personSlug - slug into journalPeople (for name + avatar)
 * @property text     - short comment text
 * @property postedOn - ISO date string when the comment was left
 * @property roleTag  - optional short label, e.g. "Student" / "Client" / "Ma'am"
 * @property replyBy  - optional short "responded by the studio" note (e.g. "Meenakshi replied")
 */
export type JournalComment = {
  id: string;
  entrySlug: string;
  personSlug: string;
  text: string;
  postedOn: string;
  roleTag?: string;
  replyBy?: string;
};

/**
 * Curated comments. Edit freely — these mirror the real people already named
 * across the journal data (students, a prospective client, and Meenakshi).
 * Only add people here who are already comfortable being mentioned publicly.
 */
export const journalComments: JournalComment[] = [
  // ── Student / parent voices ─────────────────────────────────────────────
  {
    id: "c1",
    entrySlug: "bhavya-first-week",
    personSlug: "bhavya-jain",
    text: "The first week already felt like home. I can't believe how much I learned in just a few sessions.",
    postedOn: "2026-07-19",
    roleTag: "Student",
    replyBy: "Meenakshi replied",
  },
  {
    id: "c2",
    entrySlug: "aarna-featured",
    personSlug: "aarna",
    text: "Reading this back makes me smile. I really did avoid faces for two years — now they're my favourite thing to paint.",
    postedOn: "2026-07-16",
    roleTag: "Student",
  },
  {
    id: "c3",
    entrySlug: "shreya-journey",
    personSlug: "shreya",
    text: "Colour theory changed how I see everything. My greens finally behave now!",
    postedOn: "2026-07-15",
    roleTag: "Student",
  },
  {
    id: "c4",
    entrySlug: "prisha-dedication",
    personSlug: "prisha",
    text: "Consistency really is everything. Thank you for never letting me skip steps.",
    postedOn: "2026-07-14",
    roleTag: "Student",
  },
  {
    id: "c5",
    entrySlug: "school-25-sheets-project",
    personSlug: "bhavya-jain",
    text: "I watched a friend go through this and the calm the studio brought her was unreal.",
    postedOn: "2026-07-11",
    roleTag: "Student",
  },

  // ── Client voices ───────────────────────────────────────────────────────
  {
    id: "c6",
    entrySlug: "textile-fabric-research-begins",
    personSlug: "ambala-textile-client",
    text: "So glad the samples are in. We're watching the testing with real interest — quality first, always.",
    postedOn: "2026-07-21",
    roleTag: "Client",
    replyBy: "Meenakshi replied",
  },
  {
    id: "c7",
    entrySlug: "commission-gallery-one",
    personSlug: "ambala-textile-client",
    text: "That portrait story gives me goosebumps. This is exactly why we came to the studio.",
    postedOn: "2026-06-22",
    roleTag: "Client",
  },

  // ── Studio / instructor voice ───────────────────────────────────────────
  {
    id: "c8",
    entrySlug: "why-build-this-journal",
    personSlug: "bhavya-jain",
    text: "Radical transparency is rare. This journal is going to teach more than ten galleries ever could.",
    postedOn: "2026-07-20",
    roleTag: "Studio",
  },
  {
    id: "c9",
    entrySlug: "what-textile-research-taught",
    personSlug: "bhavya-jain",
    text: "\"Information gaps, not obstacles\" — writing that phrase on my studio wall.",
    postedOn: "2026-07-19",
    roleTag: "Student",
  },
  {
    id: "c10",
    entrySlug: "teaching-versus-making",
    personSlug: "aarna",
    text: "As a student, it means everything that teaching and making feed each other for Ma'am.",
    postedOn: "2026-07-11",
    roleTag: "Student",
  },
  {
    id: "c11",
    entrySlug: "keshav-focus",
    personSlug: "keshav",
    text: "One piece at a time. That single lesson changed my whole approach.",
    postedOn: "2026-07-13",
    roleTag: "Student",
  },
  {
    id: "c12",
    entrySlug: "studio-morning-light",
    personSlug: "aarna",
    text: "The 6 AM golden hour is real. I've seen it on early exam days — magic.",
    postedOn: "2026-07-19",
    roleTag: "Student",
  },
];

/**
 * Resolve a comment's display name from journalPeople.
 */
export function getCommentPersonName(comment: JournalComment) {
  return journalPeople.find((p) => p.slug === comment.personSlug)?.name || comment.personSlug;
}

/**
 * Return all comments, newest first.
 * T2: Memoized — the sorted array is computed once and cached per count.
 */
let latestCommentsCache: JournalComment[] | undefined;
export function getLatestComments(count = 3): JournalComment[] {
  if (!latestCommentsCache) {
    latestCommentsCache = [...journalComments].sort(
      (a, b) => new Date(b.postedOn).getTime() - new Date(a.postedOn).getTime()
    );
  }
  return latestCommentsCache.slice(0, count);
}

/**
 * Return the number of comments attached to each journal entry.
 */
let commentCountsByEntryCache: Record<string, number> | undefined;

export function getCommentCountsByEntry(): Record<string, number> {
  if (commentCountsByEntryCache) return commentCountsByEntryCache;
  const counts: Record<string, number> = {};
  journalComments.forEach((comment) => {
    counts[comment.entrySlug] = (counts[comment.entrySlug] || 0) + 1;
  });
  commentCountsByEntryCache = counts;
  return counts;
}

/**
 * Return the most-discussed entries right now.
 *
 * The journal has no real engagement (views/likes) yet, so we use a transparent
 * proxy score that blends real signals we DO have:
 *   - recency bonus  (published in the last 14 days)
 *   - comment count  (real curation from journalComments)
 *   - active thread bonus (entries tied to an in-progress thread)
 *   - richness bonus (long body / more images / more tags)
 *
 * @param count - number of trending entries to return
 */
export function getTrendingEntries(
  entries: { slug: string; title: string; excerpt: string; category: string; publishedOn: string; tags: string[]; body?: string[]; images?: unknown[]; threadSlug?: string }[],
  threads: { slug: string; status: string }[],
  count = 3
) {
  const commentCounts = getCommentCountsByEntry();
  const activeThreadSlugs = new Set(threads.filter((t) => t.status === "active").map((t) => t.slug));

  const scored = entries.map((entry) => {
    const daysSince = (Date.now() - new Date(entry.publishedOn).getTime()) / 86400000;
    const recency = daysSince <= 7 ? 40 : daysSince <= 14 ? 25 : daysSince <= 30 ? 10 : 0;
    const comments = commentCounts[entry.slug] || 0;
    const activeBonus = entry.threadSlug && activeThreadSlugs.has(entry.threadSlug) ? 20 : 0;
    const richness = Math.min(20, entry.body?.length || 0) + Math.min(10, (entry.images?.length || 0) * 4) + Math.min(10, (entry.tags?.length || 0) * 2);

    return {
      entry,
      score: recency + comments * 15 + activeBonus + richness,
      commentCount: comments,
    };
  });

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, count);
}

