import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  journalEntries,
  getJournalEntry,
  getThread,
  getEntriesByCategory,
  JournalCategory,
} from "@/data/journal";
import { getJournalPerson } from "@/data/journalPeople";
import Reveal from "@/components/Reveal";
import JournalStatusBadge from "@/components/JournalStatusBadge";
import InquiryLink from "@/components/InquiryLink";
import JournalEntryCard from "@/components/JournalEntryCard";

const CATEGORY_LABELS: Record<JournalCategory, string> = {
  "business-insight": "Business Insight",
  "journey-diary": "Journey Diary",
  "student-story": "Student Story",
  "behind-the-scenes": "Behind the Scenes",
  "past-project": "Past Project",
};

export async function generateStaticParams() {
  return journalEntries.map((entry) => ({ slug: entry.slug }));
}

// Regenerate at most every 60s so journal updates propagate without a full redeploy (ISR).
export const revalidate = 60;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const entry = getJournalEntry(slug);
  if (!entry) return {};
  return {
    title: `${entry.title} — Studio Journal`,
    description: entry.excerpt,
  };
}

export default async function JournalEntryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = getJournalEntry(slug);
  if (!entry) notFound();

  const thread = entry.threadSlug ? getThread(entry.threadSlug) : undefined;
  const mentionedPeople = entry.mentionedPeople.map((s) => getJournalPerson(s)).filter(Boolean);

  const publishedDate = new Date(entry.publishedOn).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const imagesByParagraph = new Map<number, typeof entry.images>();
  entry.images?.forEach((img) => {
    if (!imagesByParagraph.has(img.afterParagraph)) imagesByParagraph.set(img.afterParagraph, []);
    imagesByParagraph.get(img.afterParagraph)!.push(img);
  });

    const moreFromJournal = getEntriesByCategory(entry.category)
    .filter((e) => e.slug !== entry.slug)
    .slice(0, 3);

  return (
    <main className="journal-detail-page">
      <section className="journal-detail-hero">
        <Reveal>
          <Link href="/journal" className="back-link">← Back to Studio Journal</Link>
          <div className="journal-detail-eyebrow-row">
            <p className="eyebrow">{CATEGORY_LABELS[entry.category]}</p>
            <JournalStatusBadge status={entry.status} />
          </div>
          <h1 className="journal-detail-title">{entry.title}</h1>
          <p className="journal-detail-meta">
            {thread ? (
              thread.status === "active" ? (
                <>Started {new Date(thread.startedOn).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })} — ongoing</>
              ) : (
                <>Completed {thread.completedOn && new Date(thread.completedOn).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</>
              )
            ) : (
              <>Published {publishedDate}</>
            )}
            {" · "}{entry.readTimeMinutes} min read
          </p>
        </Reveal>
      </section>

      {entry.coverImage && (
        <section className="journal-detail-cover section-wrap">
          <Reveal>
            <div className="journal-detail-cover-image">
              <Image src={entry.coverImage} alt={entry.title} fill style={{ objectFit: "cover" }} sizes="(min-width: 980px) 80vw, 100vw" />
            </div>
          </Reveal>
        </section>
      )}

      <section className="journal-detail-body-section section-wrap">
        <Reveal>
          <div className="journal-detail-body">
            {entry.body.map((paragraph, i) => (
              <div key={i}>
                <p>{paragraph}</p>
                {imagesByParagraph.get(i)?.map((img) => (
                  <figure key={img.src} className="journal-detail-inline-image">
                    <div className="journal-detail-inline-image-wrap">
                      <Image src={img.src} alt={img.alt} fill style={{ objectFit: "cover" }} sizes="(min-width: 980px) 70vw, 100vw" />
                    </div>
                    {img.caption && <figcaption>{img.caption}</figcaption>}
                  </figure>
                ))}
              </div>
            ))}
          </div>

          <div className="journal-detail-tags">
            {entry.tags.map((tag) => (
              <Link key={tag} href={`/journal?tag=${encodeURIComponent(tag)}`} className="journal-tag-link">
                {tag}
              </Link>
            ))}
          </div>

          {mentionedPeople.length > 0 && (
            <div className="journal-mentioned-chips">
              <p className="journal-mentioned-label">Mentioned in this entry</p>
              <div className="journal-mentioned-chips-row">
                {mentionedPeople.map((person) => (
                  <div key={person!.slug} className="journal-mentioned-chip">
                    <Link href={`/journal?person=${person!.slug}`}>{person!.name}</Link>
                    {person!.academySlug && (
                      <Link href={`/academy/${person!.academySlug}`} className="journal-mentioned-chip-academy-link">
                        View Academy Profile →
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {thread && (
            <div className="journal-thread-callout">
              <p className="journal-thread-callout-label">Part of an ongoing thread</p>
              <h4>{thread.title}</h4>
              <p>{thread.statusNote}</p>
              <p className="journal-thread-callout-updated">
                Last updated: {new Date(thread.statusUpdatedOn).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
              </p>
            </div>
          )}
        </Reveal>
      </section>

      <section className="journal-detail-cta section-wrap">
        <Reveal>
          <p className="journal-detail-cta-text">Have a question about this, or something similar you&apos;re considering?</p>
          <InquiryLink message={`Hello Meenakshi Art Work, I read "${entry.title}" on the Studio Journal and wanted to ask...`}>
            Ask on WhatsApp
          </InquiryLink>
        </Reveal>
      </section>

      {moreFromJournal.length > 0 && (
        <section className="journal-more-section section-wrap">
          <Reveal>
            <p className="section-heading-label">More from the Journal</p>
            <div className="journal-feed">
              {moreFromJournal.map((e) => (
                <JournalEntryCard key={e.slug} entry={e} />
              ))}
            </div>
          </Reveal>
        </section>
      )}
    </main>
  );
}
