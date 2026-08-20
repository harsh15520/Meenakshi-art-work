import Link from "next/link";
import { JournalThread, getEntriesForThreadSorted } from "@/data/journal";

interface JournalThreadCardProps {
  thread: JournalThread;
}

function formatRelativeUpdated(dateStr: string) {
  const ms = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(ms / 86400000);

  if (days <= 0) return "Updated today";
  if (days === 1) return "Updated yesterday";
  if (days < 30) return `Updated ${days} days ago`;

  const months = Math.floor(days / 30);
  return `Updated ${months} ${months === 1 ? "month" : "months"} ago`;
}

function getWorkTypeLabel(workType: JournalThread["workType"]) {
  const labels = {
    "custom-commission": "Custom commission",
    "academy-student": "Academy student",
    "school-assistance": "School assistance",
    "studio-operations": "Studio operations",
  } as const;

  return labels[workType];
}

function getProgressValue(thread: JournalThread, relatedEntriesLength: number) {
  // Derive progress from real signals rather than hardcoded per-workType
  // guesses: a completed thread is 100%; an active one reflects how many
  // documented updates exist (more updates = further along), capped so an
  // in-progress thread never reads as "done".
  if (thread.status === "completed") return 100;
  if (relatedEntriesLength <= 0) return 35;
  return Math.min(90, 35 + Math.min(55, relatedEntriesLength * 11));
}

export default function JournalThreadCard({ thread }: JournalThreadCardProps) {
    const relatedEntries = getEntriesForThreadSorted(thread.slug);

  const progress = getProgressValue(thread, relatedEntries.length);
  const statusLabel = thread.status === "active" ? "In studio" : "Archived";
  const statusType = thread.status === "active" ? "active" : "completed";
  const relativeUpdated = formatRelativeUpdated(thread.statusUpdatedOn);

  return (
    <article className="journal-thread-card">
      <div className="journal-thread-card-top">
        <div className="journal-thread-image">
          <span>{getWorkTypeLabel(thread.workType)}</span>
        </div>

        <div className="journal-thread-card-main">
          <div className="journal-thread-header">
            <h3 className="journal-thread-title">{thread.title}</h3>
            <div className="journal-thread-status">
              <span className={`journal-thread-status-indicator journal-thread-status-indicator--${statusType}`}>
                {statusLabel}
              </span>
            </div>
          </div>

          <div className="journal-thread-latest-update">
            <span className="journal-thread-latest-update-label">{relativeUpdated}</span>
            <p>{thread.statusNote}</p>
          </div>

          <div className="journal-thread-progress" aria-label={`${thread.title} progress`}>
            <div className="journal-thread-progress-track">
              <span className="journal-thread-progress-fill" style={{ width: `${progress}%` }} />
            </div>
            <div className="journal-thread-progress-meta">
              <span>Progress</span>
              <strong>{progress}%</strong>
            </div>
          </div>
        </div>
      </div>

      <div className="journal-thread-meta">
        <time className="journal-thread-updated">Started {new Date(thread.startedOn).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</time>
        {relatedEntries.length > 0 && (
          <span className="journal-thread-entry-count">{relatedEntries.length} update{relatedEntries.length === 1 ? "" : "s"} so far</span>
        )}
      </div>

      {relatedEntries.length > 0 && (
        <div className="journal-thread-entries">
          <p className="journal-thread-entries-label">Studio feed</p>
          <ul className="journal-thread-entries-list">
            {relatedEntries.map((entry) => (
              <li key={entry.slug}>
                <Link href={`/journal/${entry.slug}`} className="journal-thread-entry-link">
                  {entry.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </article>
  );
}
