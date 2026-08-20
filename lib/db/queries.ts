/**
 * Consolidated data-access API for the content layer.
 *
 * The relational model (PK uniqueness, FK/referential integrity, normalized M:N,
 * indexes, CHECK-style constraints) is ENFORCED at build time by the Prisma SQLite
 * layer in prisma/seed.ts: that script imports the same data/*.ts objects and fails
 * the build on duplicate PKs or orphan FKs, and it splits the embedded
 * `mentionedPeople[]` / `tags[]` arrays into normalized junction tables
 * (EntryMention, EntryTag) — the SQL-shaped equivalent of the in-memory index maps
 * built below.
 *
 * Read side: this module re-exports the synchronous, indexed, memoized helper
 * functions already implemented in data/journal.ts / data/journalComments.ts /
 * data/journalPeople.ts / data/artists.ts so page/component imports can also go
 * through a single "db" boundary. It adds the Prisma-backed extras that the
 * enforcement layer makes possible (commissions, gallery paintings, painting
 * stories, locker entries).
 */

// ── Journal query surface (indexed + memoized; see data/journal.ts) ──────────
export {
  getJournalEntry,
  getThread,
  getActiveThreads,
  getCompletedThreads,
  getEntriesForThread,
  getEntriesForThreadSorted,
  getEntriesByCategory,
  getEntriesByTag,
  getEntriesByPerson,
  getNextEntryInCategory,
  getThreadNavigation,
  getLatestEntries,
  getAllTags,
  getMentionCounts,
  getJournalStats,
  filterEntries,
  generateStaticParams,
  getLatestActiveCommission,
  getSecondLatestActiveCommission,
  getLatestCompletedCommissions,
  getLatestAcademyUpdate,
  getLatestGalleryEntry,
  getLatestStudioUpdate,
  type FilterParams,
  type JournalStats,
} from "../../data/journal";

// ── People / names ───────────────────────────────────────────────────────────
export { getJournalPerson, resolvePersonByName, getMentionedPersonNames } from "../../data/journalPeople";

// ── Trending (memoized scored query; see data/journalComments.ts) ────────────
export { getTrendingEntries, getCommentCountsByEntry, getLatestComments, getCommentPersonName } from "../../data/journalComments";

// ── Student locker (client-side UX gate; codes are public on certificates) ──
// Returns only the fields the client chest needs. No access-control claim.
import { artistProfiles } from "../../data/artists";
export function getStudentLockerEntries() {
  return artistProfiles
    .filter((p) => !p.isSample && p.shareCode)
    .map((p) => ({
      name: p.name,
      code: p.shareCode as string,
      reveal: `${p.name}'s full journey — artworks, behind-the-canvas process and teacher's note.`,
      slug: p.slug,
    }));
}

// ── Prisma-backed reads (used by the build-time validation layer / tooling) ──
// These require a generated client + a populated dev.db (see `npm run db:seed`).
// They are NOT imported by render-time code; kept here as the relational API.
export async function getEntryMentions(entrySlug: string) {
  const { prisma } = await import("./client");
  return prisma.entryMention.findMany({ where: { entrySlug }, include: { person: true } });
}

export async function getEntryTags(entrySlug: string) {
  const { prisma } = await import("./client");
  return prisma.entryTag.findMany({ where: { entrySlug } });
}
