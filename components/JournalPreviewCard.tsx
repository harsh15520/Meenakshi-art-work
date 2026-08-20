import Link from "next/link";
import Image from "next/image";
import type { JournalPreviewCard } from "@/data/journalPreview";

const CATEGORY_LABELS: Record<string, string> = {
  "business-insight": "Business Insight",
  "journey-diary": "Journey Diary",
  "student-story": "Student Story",
  "behind-the-scenes": "Behind the Scenes",
  "past-project": "Past Project",
};

interface Props {
  card: JournalPreviewCard;
}

/**
 * JournalPreviewCard - A single journal entry card for the homepage editorial strip.
 *
 * Shows category label, title, excerpt, publication date, and read time.
 * The first card (featured) receives an accent border.
 * Falls back gracefully when no cover image is present.
 */
export default function JournalPreviewCard({ card }: Props) {
  const { entry, featured } = card;
  const previewImage = entry.coverImage ?? entry.images?.[0]?.src;
  const imageAlt = entry.title;

  const publishedLabel = new Date(entry.publishedOn).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  return (
    <Link href={`/journal/${entry.slug}`} className={`journal-preview-card${featured ? " journal-preview-card--featured" : ""}`}>
      {previewImage && (
        <div className="journal-preview-card__image">
          <Image
            src={previewImage}
            alt={imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            style={{ objectFit: "cover" }}
          />
          <div className="journal-preview-card__overlay" aria-hidden="true" />
        </div>
      )}
      <div className="journal-preview-card__body">
        <span className="journal-preview-card__category">
          {CATEGORY_LABELS[entry.category] ?? entry.category}
        </span>
        <h3 className="journal-preview-card__title">{entry.title}</h3>
        <p className="journal-preview-card__excerpt">{entry.excerpt}</p>
        <div className="journal-preview-card__meta">
          <span>{publishedLabel}</span>
          <span>{entry.readTimeMinutes} min read</span>
        </div>
      </div>
    </Link>
  );
}
