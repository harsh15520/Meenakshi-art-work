import Link from "next/link";
import Image from "next/image";
import { JournalEntry } from "@/data/journal";
import JournalStatusBadge from "./JournalStatusBadge";
import JournalShareButton from "./journal/JournalShareButton";

interface JournalEntryCardProps {
  entry: JournalEntry;
}

const categoryLabel: Record<string, string> = {
  "business-insight": "Business Insight",
  "journey-diary": "Journey Diary",
  "student-story": "Student Story",
  "behind-the-scenes": "Behind the Scenes",
  "past-project": "Past Project",
};

const categoryColor: Record<string, string> = {
  "business-insight": "var(--wine)",
  "journey-diary": "var(--gold)",
  "student-story": "var(--ink)",
  "behind-the-scenes": "var(--blush)",
  "past-project": "var(--ivory)",
};

function getEntryPreview(entry: JournalEntry) {
  const processFirstCategories = new Set(["business-insight", "journey-diary", "behind-the-scenes"]);
  const leadImage = entry.images?.[0];

  if (processFirstCategories.has(entry.category) && leadImage?.src) {
    return {
      src: leadImage.src,
      alt: leadImage.alt || entry.title,
    };
  }

  return {
    src: entry.coverImage || leadImage?.src,
    alt: entry.coverImage ? entry.title : leadImage?.alt || entry.title,
  };
}

export default function JournalEntryCard({ entry }: JournalEntryCardProps) {
  const label = categoryLabel[entry.category] || entry.category;
  const color = categoryColor[entry.category];
  const preview = getEntryPreview(entry);
  const image = preview.src;
  const imageAlt = preview.alt;

  return (
    <article className="journal-entry-card">
      <Link href={`/journal/${entry.slug}`} className="journal-entry-card-image-wrapper">
        {image ? (
          <Image src={image} alt={imageAlt} width={360} height={270} className="journal-entry-card-image" />
        ) : (
          <div className="journal-entry-card-placeholder">{label}</div>
        )}
        <div className="journal-entry-card-header">
          <div className="journal-category-tag" style={{ borderColor: color, color }}>
            {label}
          </div>
          <JournalStatusBadge status={entry.status} />
        </div>
      </Link>

      <Link href={`/journal/${entry.slug}`} className="journal-entry-card-link">
        <h3 className="journal-entry-card-title">{entry.title}</h3>
        <p className="journal-entry-card-excerpt">{entry.excerpt}</p>

        <div className="journal-entry-card-meta">
          <time className="journal-entry-date">
            {new Date(entry.publishedOn).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </time>
          <span className="journal-entry-read-time">{entry.readTimeMinutes} min read</span>
        </div>
      </Link>

      <JournalShareButton slug={entry.slug} title={entry.title} />
    </article>
  );
}
