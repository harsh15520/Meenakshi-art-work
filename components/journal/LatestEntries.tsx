import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import ViewAllEntriesButton from "@/components/ViewAllEntriesButton";
import JournalAvatar from "@/components/JournalAvatar";
import { CATEGORY_LABELS, STATS_ICONS, getEntryPreview, getTrending, getLatestCommentsFor, getCommenterName, relativeUpdatedLabel } from "./shared";
import { getMentionCounts, type JournalEntry, type JournalThread } from "@/data/journal";
import type { JournalComment } from "@/data/journalComments";
import type { JournalCategory } from "@/data/journal";
import { TrendingLink } from "@/components/ghosts";

type MentionCount = ReturnType<typeof getMentionCounts>[number];

export default function LatestEntries({
  latestEntries,
  threads,
  mentionCounts,
  allTags,
}: {
  latestEntries: JournalEntry[];
  threads: Map<string, JournalThread>;
  mentionCounts: MentionCount[];
  allTags: { tag: string; count: number }[];
}) {
  const { arrowRight: ArrowRightIcon } = STATS_ICONS;

  const getThread = (slug: string) => threads.get(slug);
    const getEntriesForThread = (slug: string): JournalEntry[] =>
    latestEntries.filter((e) => e.threadSlug === slug);

  return (
    <section className="journal-latest section-wrap">
      <Reveal>
        <div className="journal-latest-layout">
          <div className="journal-latest-column">
            <p className="section-heading-label">LATEST ENTRIES</p>
            <div className="journal-latest-list">
              {latestEntries.map((entry, index) => {
                const preview = getEntryPreview(entry);
                const image = preview.src;
                const imageAlt = preview.alt;
                const thread = entry.threadSlug ? getThread(entry.threadSlug) : undefined;
                const threadEntries = thread ? [...getEntriesForThread(thread.slug)].sort((a, b) => new Date(b.publishedOn).getTime() - new Date(a.publishedOn).getTime()) : [];
                const projectLabel = thread?.title || CATEGORY_LABELS[entry.category];
                const projectStatus = thread?.status === "active" ? "Active project" : "Studio story";
                const threadUpdates = threadEntries.length;
                const currentThreadPosition = threadEntries.findIndex((threadEntry) => threadEntry.slug === entry.slug) + 1;
                const imageCount = entry.images?.length || 0;
                const isFeatured = index === 0;

                return (
                  <Link
                    key={entry.slug}
                    href={`/journal/${entry.slug}`}
                    className={`journal-latest-item ${isFeatured ? "journal-latest-item--featured" : ""} journal-latest-item--${entry.category}`}
                  >
                    <div className="journal-latest-item-image">
                      {image ? (
                        <Image src={image} alt={imageAlt} width={isFeatured ? 320 : 200} height={isFeatured ? 220 : 140} className="journal-latest-item-img" />
                      ) : (
                        <div className="journal-entry-card-placeholder">{CATEGORY_LABELS[entry.category]}</div>
                      )}
                    </div>
                    <div className="journal-latest-item-body">
                      {isFeatured && <p className="journal-latest-item-featured">Featured this week</p>}
                      <div className="journal-latest-item-project">
                        <span>{projectLabel}</span>
                        <em>{projectStatus}</em>
                      </div>
                      <p className={`journal-latest-item-category journal-latest-item-category--${entry.category}`}>{CATEGORY_LABELS[entry.category]}</p>
                      <h3>{entry.title}</h3>
                      <p className="journal-latest-item-excerpt">{entry.excerpt}</p>
                      {thread && (
                        <div className="journal-latest-item-thread">
                          <span className="journal-latest-item-thread-label">Continue this thread</span>
                          <span className="journal-latest-item-thread-value">
                            {currentThreadPosition > 0 ? `Update ${currentThreadPosition} of ${threadUpdates}` : `${threadUpdates} update${threadUpdates === 1 ? "" : "s"}`}
                          </span>
                        </div>
                      )}
                      <div className="journal-latest-item-meta">
                        <div className="journal-latest-item-meta-line">
                          <span>{relativeUpdatedLabel(entry.publishedOn)}</span>
                          <span>{entry.readTimeMinutes} min</span>
                          <span>{imageCount} photo{imageCount === 1 ? "" : "s"}</span>
                          {thread && <span>{threadUpdates} update{threadUpdates === 1 ? "" : "s"}</span>}
                        </div>
                        <span className="journal-latest-item-read-more">Continue Reading <ArrowRightIcon /></span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
            <div className="journal-view-all-wrap">
              <ViewAllEntriesButton />
            </div>
          </div>

          <aside className="journal-sidebar" id="find-yourself">
            <div className="journal-sidebar-block">
              <p className="section-heading-label">Find Yourself</p>
              <form method="GET" action="/journal#all-entries" className="journal-search-bar journal-search-bar--compact">
                <input type="text" name="q" placeholder="Search your name..." className="journal-search-input" />
                <button type="submit" className="button-outline journal-search-button">Go</button>
              </form>
            </div>

            {mentionCounts.length > 0 && (
              <div className="journal-sidebar-block">
                <p className="section-heading-label">Recently Mentioned</p>
                <ul className="journal-mentioned-list">
                  {mentionCounts.slice(0, 5).map((m) => (
                    <li key={m.slug}>
                      <Link href={`/journal?person=${m.slug}`}>
                        <JournalAvatar name={m.person} />
                        <span className="journal-mentioned-name">{m.person}</span>
                        <span className="journal-mentioned-count">{m.count} {m.count === 1 ? "mention" : "mentions"}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="journal-sidebar-block">
              <p className="section-heading-label">Trending This Week</p>
              <ul className="journal-sidebar-trending-list">
                {getTrending(2).map(({ entry, score, commentCount }, i) => {
                  const heatLevel = score > 80 ? 3 : score > 45 ? 2 : 1;
                  return (
                    <li key={entry.slug} className="journal-sidebar-trending-item">
                      <TrendingLink href={`/journal/${entry.slug}`} className="journal-sidebar-trending-link">
                        <div className="journal-sidebar-trending-top">
                          <span className="journal-sidebar-trending-rank">#{i + 1}</span>
                          <span className="journal-sidebar-trending-heat-icon" aria-hidden="true">🔥</span>
                          <span className="journal-sidebar-trending-title">{entry.title}</span>
                        </div>
                        <div className="journal-sidebar-trending-meta">
                          <span className="journal-sidebar-trending-cat">{CATEGORY_LABELS[entry.category as JournalCategory]}</span>
                          <span className="journal-sidebar-trending-heat">
                            <span className="journal-sidebar-trending-heat-dots">
                              {[1, 2, 3].map((d) => (
                                <i key={d} style={{ opacity: d <= heatLevel ? 1 : 0.2 }} />
                              ))}
                            </span>
                            {commentCount > 0 && <span>· {commentCount} comment{commentCount === 1 ? "" : "s"}</span>}
                          </span>
                        </div>
                      </TrendingLink>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="journal-sidebar-block">
              <p className="section-heading-label">Latest Comments</p>
              <ul className="journal-sidebar-comments-list">
                {getLatestCommentsFor(1).map((comment: JournalComment) => {
                  const personName = getCommenterName(comment);
                  return (
                    <li key={comment.id} className="journal-sidebar-comment">
                      <div className="journal-sidebar-comment-head">
                        <JournalAvatar name={personName} />
                        <div className="journal-sidebar-comment-meta">
                          <div className="journal-sidebar-comment-name">
                            {personName}
                            {comment.roleTag && <em className="journal-sidebar-comment-role">{comment.roleTag}</em>}
                          </div>
                          <span className="journal-sidebar-comment-time">{relativeUpdatedLabel(comment.postedOn)}</span>
                        </div>
                      </div>
                      <p className="journal-sidebar-comment-text">{comment.text}</p>
                      <Link href={`/journal/${comment.entrySlug}`} className="journal-sidebar-comment-on">
                        On that story →
                      </Link>
                      {comment.replyBy && (
                        <span className="journal-sidebar-comment-reply">↩ {comment.replyBy}</span>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="journal-sidebar-block">
              <p className="section-heading-label">Topics</p>
              <div className="journal-topic-cloud">
                {allTags.slice(0, 8).map(({ tag, count }) => (
                  <Link
                    key={tag}
                    href={`/journal?tag=${encodeURIComponent(tag)}`}
                    className={`journal-tag-link ${count >= 8 ? "journal-tag-link--lg" : count >= 3 ? "journal-tag-link--md" : ""}`.trim()}
                  >
                    {tag} <span>({count})</span>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </Reveal>
    </section>
  );
}
