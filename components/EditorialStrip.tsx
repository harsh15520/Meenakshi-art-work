import Link from "next/link";
import {
  getLatestActiveCommission,
  getLatestAcademyUpdate,
  getSecondLatestActiveCommission,
  getLatestStudioUpdate,
  getJournalStats,
  type JournalEntry,
} from "@/data/journal";

function relativeUpdatedLabel(dateStr: string) {
  const days = Math.floor((Date.now() - new Date(dateStr).getTime()) / 86400000);
  if (days <= 0) return "Updated today";
  if (days === 1) return "Updated yesterday";
  if (days < 30) return `Updated ${days} days ago`;
  const months = Math.floor(days / 30);
  return `Updated ${months} ${months === 1 ? "month" : "months"} ago`;
}

/**
 * EditorialStrip — "Today at the Studio" live activity bar.
 *
 * A compact horizontal strip placed between the trust strip and the
 * services section. Shows 4–6 short live items (emoji + title + time).
 * Scrolls horizontally on mobile. Server component — no JS needed.
 */
export default function EditorialStrip() {
  const items = [
    getLatestActiveCommission(),
    getLatestAcademyUpdate(),
    getSecondLatestActiveCommission(),
    getLatestStudioUpdate(),
  ].filter((e): e is JournalEntry => e !== undefined);

  const lastUpdated = relativeUpdatedLabel(getJournalStats().lastUpdated);

  return (
    <section className="studio-today" aria-label="Studio notes">
      <div className="studio-today__inner">
        {/* Header label */}
        <div className="studio-today__label">
          <span className="studio-today__heading">FROM THE STUDIO</span>
          <span className="studio-today__dot" aria-hidden="true" />
          <span className="studio-today__updated">{lastUpdated}</span>
        </div>

        {/* Scrollable items row */}
        <div className="studio-today__track" role="list">
          {items.map((entry, i) => {
            const inner = (
              <>
                <span className="studio-today__emoji" aria-hidden="true">{entry.emoji || "✨"}</span>
                <span className="studio-today__text">
                  {(entry.stripLabel || entry.title).split("\n").map((line, j) => (
                    <span key={j} className="studio-today__line">{line}</span>
                  ))}
                  <span className="studio-today__time">
                    {new Date(entry.publishedOn).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                  </span>
                </span>
              </>
            );

            return (
              <div key={entry.slug} className="studio-today__item" role="listitem">
                <Link href={`/journal/${entry.slug}`} className="studio-today__item-link">
                  {inner}
                </Link>
                {i < items.length - 1 && (
                  <div className="studio-today__divider" aria-hidden="true" />
                )}
              </div>
            );
          })}
        </div>
        <Link href="/journal" className="studio-today__all-link">All journal entries <span>→</span></Link>
      </div>
    </section>
  );
}
