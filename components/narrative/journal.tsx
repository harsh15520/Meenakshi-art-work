import Link from "next/link";
import type {
  StudioJournalChronologyContent,
  BehindTheScenesContent,
  TechnicalJournalContent,
  ClientJournalContent,
} from "@/data/narrativeModules";

export function StudioJournalChronologyModule({ content }: { content: StudioJournalChronologyContent }) {
  return (
    <div className="studio-journal-chronology-module">
      <div className="journal-timeline">
        {content.entries.map((entry, index: number) => (
          <div key={index} className="journal-timeline-item">
            <div className="journal-timeline-marker">○</div>
            <div className="journal-timeline-content">
              <p className="journal-timestamp">{entry.timestamp}</p>
              <Link href={`/journal/${entry.journalSlug}`} className="journal-title-link">
                {entry.title}
              </Link>
              <p className="journal-preview">{entry.preview}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function BehindTheScenesModule({ content }: { content: BehindTheScenesContent }) {
  return (
    <div className="behind-the-scenes-module">
      {content.entries.map((entry, index: number) => (
        <div key={index} className="behind-scenes-entry">
          <Link href={`/journal/${entry.journalSlug}`} className="behind-scenes-link">
            {entry.title}
          </Link>
          <p className="behind-scenes-relevance">{entry.relevance}</p>
        </div>
      ))}
    </div>
  );
}

export function TechnicalJournalModule({ content }: { content: TechnicalJournalContent }) {
  return (
    <div className="technical-journal-module">
      {content.entries.map((entry, index: number) => (
        <div key={index} className="technical-journal-entry">
          <Link href={`/journal/${entry.journalSlug}`} className="technical-journal-link">
            {entry.title}
          </Link>
          <p className="technical-technique"><strong>Technique:</strong> {entry.technique}</p>
        </div>
      ))}
    </div>
  );
}

export function ClientJournalModule({ content }: { content: ClientJournalContent }) {
  return (
    <div className="client-journal-module">
      {content.entries.map((entry, index: number) => (
        <div key={index} className="client-journal-entry">
          <Link href={`/journal/${entry.journalSlug}`} className="client-journal-link">
            {entry.title}
          </Link>
          <p className="client-relationship-moment"><strong>Relationship moment:</strong> {entry.relationshipMoment}</p>
        </div>
      ))}
    </div>
  );
}
