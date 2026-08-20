import Link from "next/link";
import Image from "next/image";
import {
  customClientStory,
  meenakshiMonthlyNote,
  COMMISSION_STAGE_ORDER,
  COMMISSION_STAGE_LABELS,
  type CommissionStage,
} from "@/data/customOrdersLive";
import {
  getLatestActiveCommission,
  getLatestCompletedCommissions,
  getJournalStats,
} from "@/data/journal";

function relativeUpdatedLabel(dateStr: string) {
  const days = Math.floor((Date.now() - new Date(dateStr).getTime()) / 86400000);
  if (days <= 0) return "Updated today";
  if (days === 1) return "Updated yesterday";
  if (days < 30) return `Updated ${days} days ago`;
  const months = Math.floor(days / 30);
  return `Updated ${months} ${months === 1 ? "month" : "months"} ago`;
}
import CollapsibleStrip from "./CollapsibleStrip";

/**
 * CustomOrdersLiveStrip — 4-card live-data strip placed directly below the
 * custom-orders hero, mirroring the gallery page's GalleryLiveStrip.
 *
* Card 1: In the Studio    — in-progress commission + 5-step pipeline
 * Card 2: Recently Delivered — delivered piece + relative date
 * Card 3: A Client's Story  — featured testimonial + occasion tag
 * Card 4: This Month's Thought — Meenakshi's monthly note
 *
 * Reuses the gallery-live-strip / gallery-live-card CSS classes so the two
 * pages share the same visual language. Server component.
 */
export default function CustomOrdersLiveStrip() {
  const activeCommission = getLatestActiveCommission();
  const deliveredCommissions = getLatestCompletedCommissions(3);

  return (
    <section className="gallery-live-strip" aria-label="Live commission status">
      {/* Full-width header — spans the entire strip */}
      <div className="gallery-live-strip__header">
        <span className="gallery-live-strip__dot" aria-hidden="true" />
        <span className="gallery-live-strip__title">LIVE IN THE STUDIO</span>
        <span className="gallery-live-strip__updated">{relativeUpdatedLabel(getJournalStats().lastUpdated)}</span>
      </div>

      <CollapsibleStrip className="gallery-live-strip__grid" ariaLabel="Live commission status">
        {/* ── Card 1: In the Studio ── */}
        {activeCommission ? (
          <Link href={`/journal/${activeCommission.slug}`} className="gallery-live-card gallery-live-card--studio">
            <p className="gallery-live-card__eyebrow">IN THE STUDIO</p>
            <div className="gallery-live-card__media">
              <div className="gallery-live-card__photo">
                <Image
                  src={activeCommission.coverImage || "/images/custom/oil-painting-125.webp"}
                  alt={activeCommission.title}
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="120px"
                />
              </div>
              <div className="gallery-live-card__content">
                <h3 className="gallery-live-card__title">{activeCommission.title}</h3>
                <div className="gallery-live-card__pipeline">
                  {COMMISSION_STAGE_ORDER.map((stage, i) => {
                    const activeStage = activeCommission.stage as CommissionStage | undefined;
                    const reached = activeStage ? COMMISSION_STAGE_ORDER.indexOf(activeStage) >= i : false;
                    return (
                      <div key={stage} className="gallery-live-card__pipeline-step">
                        <span
                          className={`gallery-live-card__pipeline-dot${reached ? " gallery-live-card__pipeline-dot--on" : ""}`}
                          aria-hidden="true"
                        />
                        <span className="gallery-live-card__pipeline-label">{COMMISSION_STAGE_LABELS[stage]}</span>
                      </div>
                    );
                  })}
                </div>
                <p className="gallery-live-card__meta">{activeCommission.excerpt}</p>
                <span className="gallery-live-card__link">
                  Studio Journal <span>→</span>
                </span>
              </div>
            </div>
          </Link>
        ) : (
          <div className="gallery-live-card gallery-live-card--studio">
            <p className="gallery-live-card__eyebrow">IN THE STUDIO</p>
            <p className="gallery-live-card__meta">A new story is on the way.</p>
          </div>
        )}

        {/* ── Card 2: Recently Delivered (compact list) ── */}
        <div className="gallery-live-card gallery-live-card--added">
          <p className="gallery-live-card__eyebrow">RECENTLY DELIVERED</p>
          {deliveredCommissions.map((entry) => (
            <Link
              key={entry.slug}
              href={`/journal/${entry.slug}`}
              className="gallery-live-card__compact-item"
            >
              <div className="gallery-live-card__compact-photo">
                <Image
                  src={entry.coverImage || "/images/custom/oil-painting-7.webp"}
                  alt={entry.title}
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="48px"
                />
              </div>
              <div className="gallery-live-card__compact-content">
                <span className="gallery-live-card__compact-title">{entry.title}</span>
                <span className="gallery-live-card__compact-meta">
                  {new Date(entry.publishedOn).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* ── Card 3: A Client's Story ── */}
        <Link href={`/custom-orders#${customClientStory.commission.room}`} className="gallery-live-card gallery-live-card--favourite">
          <p className="gallery-live-card__eyebrow">A CLIENT&apos;S STORY</p>
          <div className="gallery-live-card__favourite-inner">
            <div className="gallery-live-card__favourite-painting">
              <Image
                src={customClientStory.commission.src}
                alt={customClientStory.commission.alt}
                fill
                style={{ objectFit: "cover" }}
                sizes="240px"
              />
            </div>
            <p className="gallery-live-card__quote">
              &ldquo;{customClientStory.note}&rdquo;
            </p>
            <span className="gallery-live-card__signature">
              <span className="gallery-live-card__attribution">— {customClientStory.commission.occasion}</span>
            </span>
          </div>
        </Link>

        {/* ── Card 4: This Month's Thought ── */}
        <Link href="/#meet-the-artist" className="gallery-live-card gallery-live-card--journal">
          <p className="gallery-live-card__eyebrow">FROM THE STUDIO</p>
          <div className="gallery-live-card__media gallery-live-card__media--stack">
            <div className="gallery-live-card__content">
              {meenakshiMonthlyNote.month ? (
                <p className="gallery-live-card__month">{meenakshiMonthlyNote.month}</p>
              ) : null}
              <p className="gallery-live-card__quote">&ldquo;{meenakshiMonthlyNote.note}&rdquo;</p>
<span className="gallery-live-card__signature">
                <span className="gallery-live-card__teacher-photo">
                  <Image
                    src="/images/founder-meena.webp"
                    alt="Meenakshi, Founder & Lead Artist"
                    fill
                    style={{ objectFit: "cover", objectPosition: "50% 15%" }}
                    sizes="40px"
                  />
                </span>
                <span className="gallery-live-card__attribution">{meenakshiMonthlyNote.attribution}</span>
              </span>
            </div>
          </div>
        </Link>
      </CollapsibleStrip>
    </section>
  );
}