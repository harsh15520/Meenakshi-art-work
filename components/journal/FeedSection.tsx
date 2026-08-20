import VirtualJournalFeed from "@/components/VirtualJournalFeed";
import type { JournalEntry } from "@/data/journal";

export default function FeedSection({
  entries,
  hasActiveFilter,
}: {
  entries: JournalEntry[];
  hasActiveFilter: boolean;
}) {
  return (
    <section className={`section-wrap${hasActiveFilter ? "" : " journal-all-entries--collapsed"}`} id="all-entries">
      <div className="journal-feed-column">
        <p className="section-heading-label">{hasActiveFilter ? "Filtered Entries" : "All Entries"}</p>
        {entries.length === 0 ? (
          <p className="journal-empty-state">No entries match this filter yet.</p>
        ) : (
          <VirtualJournalFeed entries={entries} />
        )}
      </div>
    </section>
  );
}
