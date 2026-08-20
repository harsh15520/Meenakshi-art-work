import type { Metadata } from "next";
import { redirect } from "next/navigation";
import {
  getJournalStats,
  getActiveThreads,
  filterEntries,
  getAllTags,
  getMentionCounts,
  getLatestEntries,
  type JournalEntry,
} from "@/data/journal";
import { resolvePersonByName } from "@/data/journalPeople";
import JournalHero from "@/components/journal/JournalHero";
import EntryPoints from "@/components/journal/EntryPoints";
import WorkingOnGrid from "@/components/journal/WorkingOnGrid";
import StatusBanner from "@/components/journal/StatusBanner";
import LatestEntries from "@/components/journal/LatestEntries";
import FilterBanner from "@/components/journal/FilterBanner";
import FeedSection from "@/components/journal/FeedSection";
import TimelineSection from "@/components/journal/TimelineSection";
import ClosingBand from "@/components/journal/ClosingBand";
import { CATEGORY_LABELS } from "@/components/journal/shared";
import type { JournalCategory } from "@/data/journal";

export const metadata: Metadata = {
  title: "Studio Journal — Meenakshi Art Work",
  description:
    "A real record of how the studio actually runs: commissions in progress, academy students learning, school projects delivered, and the business thinking behind it all.",
};

type SearchParams = Promise<{ category?: string; person?: string; tag?: string; q?: string }>;

export default async function JournalPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const stats = getJournalStats();
  const activeThreads = getActiveThreads();
  const entries = filterEntries(params);
  const allTags = getAllTags();
  const mentionCounts = getMentionCounts();

  // "Find Yourself": if a name query resolves to exactly one entry, send the
  // visitor straight to that article instead of the filtered list.
  if (params.q) {
    const personSlug = resolvePersonByName(params.q);
    if (personSlug) {
      const personEntries = filterEntries({ person: personSlug });
      if (personEntries.length === 1) {
        redirect(`/journal/${personEntries[0].slug}`);
      }
    }
  }

  const hasActiveFilter = !!(params.category || params.person || params.tag || params.q);
  const activeFilterLabel = params.category
    ? CATEGORY_LABELS[params.category as JournalCategory] || params.category
    : params.person
    ? params.person
    : params.tag
    ? params.tag
    : params.q
    ? `"${params.q}"`
    : "";
  const activeFilterKind: "category" | "person" | "tag" | "search" = params.category
    ? "category"
    : params.person
    ? "person"
    : params.tag
    ? "tag"
    : "search";

    const latestEntries = getLatestEntries(5);

  const threadMap = new Map<string, JournalEntry["threadSlug"] extends string ? never : never>();
  void threadMap;

  return (
    <main className="journal-page">
      <JournalHero stats={stats} />
      <EntryPoints />
      <WorkingOnGrid threads={activeThreads} />
      <StatusBanner />
      <LatestEntries
        latestEntries={latestEntries}
        threads={new Map(activeThreads.map((t) => [t.slug, t]))}
        mentionCounts={mentionCounts}
        allTags={allTags}
      />
      {hasActiveFilter && (
        <FilterBanner label={activeFilterLabel} count={entries.length} kind={activeFilterKind} />
      )}
      <FeedSection entries={entries} hasActiveFilter={hasActiveFilter} />
      <TimelineSection entries={entries} />
      <ClosingBand />
    </main>
  );
}
