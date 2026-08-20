import Link from "next/link";
import Image from "next/image";
import {
  galleryLiveUpdated,
  type PaintingStage,
} from "@/data/galleryLive";
import {
  getLatestGalleryEntry,
  getLatestStudioUpdate,
} from "@/data/journal";
import CollapsibleStrip from "./CollapsibleStrip";

const STAGE_LABELS = {
  "finishing-varnish": "Finishing varnish",
  drying: "Drying",
  framing: "Framing",
} as const;

const STAGE_ORDER: PaintingStage[] = ["finishing-varnish", "drying", "framing"];

/**
 * GalleryLiveStrip — 4-card live-data strip placed directly below the gallery hero.
 *
 * Card 1: Recently Added (#10)   — NEW chip + emotional title + relative date
 * Card 2: In the Studio (#21)    — painting + varnish/drying/framing pipeline
 * Card 3: This Month's Favourite (#12) — Meenakshi's photo + personal note
 * Card 4: From the Journal (#22) — latest entry cover + "read how it evolved" link
 *
 * Designed so the 4 cards can later collapse into a horizontal sliding track
 * (same pattern as the home-page EditorialStrip) on mobile. Server component.
 */
export default function GalleryLiveStrip() {
  const latestCompleted = getLatestGalleryEntry("completed");
  const latestActive = getLatestGalleryEntry("active");

  return (
    <section className="gallery-live-strip" aria-label="Live gallery status">
      {/* Full-width header — spans the entire strip */}
      <div className="gallery-live-strip__header">
        <span className="gallery-live-strip__dot" aria-hidden="true" />
        <span className="gallery-live-strip__title">LIVE AT THE GALLERY</span>
        <span className="gallery-live-strip__updated">{galleryLiveUpdated}</span>
      </div>

      <CollapsibleStrip className="gallery-live-strip__grid" ariaLabel="Live gallery status">
        {/* ── Card 1: Recently Added ── */}
        <Link href="/gallery#exhibition" className="gallery-live-card gallery-live-card--added">
          <p className="gallery-live-card__eyebrow">RECENTLY ADDED</p>
          <div className="gallery-live-card__media">
            <div className="gallery-live-card__photo">
              <Image
                src={latestCompleted?.coverImage || "/images/painting/oil-painting-50.webp"}
                alt={latestCompleted?.title || "Latest painting"}
                fill
                style={{ objectFit: "cover" }}
                sizes="120px"
              />
            </div>
            <div className="gallery-live-card__content">
              <span className="gallery-live-card__new-chip">NEW</span>
              <h3 className="gallery-live-card__title">{latestCompleted?.stripLabel || latestCompleted?.title || "New Painting"}</h3>
              <p className="gallery-live-card__meta">
                {latestCompleted ? new Date(latestCompleted.publishedOn).toLocaleDateString("en-US", { month: "short", day: "numeric" }) : ""} ↓ Available now
              </p>
              <span className="gallery-live-card__link">
                See in gallery <span>→</span>
              </span>
            </div>
          </div>
        </Link>

        {/* ── Card 2: In the Studio ── */}
        {latestActive ? (
          <Link href={`/journal/${latestActive.slug}`} className="gallery-live-card gallery-live-card--studio">
            <p className="gallery-live-card__eyebrow">IN THE STUDIO</p>
            <div className="gallery-live-card__media">
              <div className="gallery-live-card__photo">
                <Image
                  src={latestActive.coverImage || "/images/painting/oil-painting-49.webp"}
                  alt={latestActive.title}
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="120px"
                />
              </div>
              <div className="gallery-live-card__content">
                <h3 className="gallery-live-card__title">{latestActive.title}</h3>
                <div className="gallery-live-card__pipeline">
                  {STAGE_ORDER.map((stage, i) => {
                    const activeStage = latestActive.stage as PaintingStage | undefined;
                    const reached = activeStage ? STAGE_ORDER.indexOf(activeStage) >= i : false;
                    return (
                      <div key={stage} className="gallery-live-card__pipeline-step">
                        <span
                          className={`gallery-live-card__pipeline-dot${reached ? " gallery-live-card__pipeline-dot--on" : ""}`}
                          aria-hidden="true"
                        />
                        <span className="gallery-live-card__pipeline-label">{STAGE_LABELS[stage]}</span>
                      </div>
                    );
                  })}
                </div>
                <p className="gallery-live-card__meta">Check back when it&apos;s framed.</p>
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

        {/* ── Card 3: This Month's Favourite ── */}
        <Link href="/gallery#exhibition" className="gallery-live-card gallery-live-card--favourite">
          <p className="gallery-live-card__eyebrow">THIS MONTH&apos;S FAVOURITE</p>
          <div className="gallery-live-card__favourite-inner">
            <div className="gallery-live-card__favourite-painting">
              <Image
                src={latestCompleted?.coverImage || "/images/painting/oil-painting-66.webp"}
                alt={latestCompleted?.title || "Monthly favourite"}
                fill
                style={{ objectFit: "cover" }}
                sizes="240px"
              />
            </div>
            <p className="gallery-live-card__quote">
              &ldquo;{latestCompleted?.stripLabel || latestCompleted?.excerpt || "A special piece from the gallery."}&rdquo;
            </p>
            <span className="gallery-live-card__signature">
              <span className="gallery-live-card__attribution">— Meenakshi</span>
              <span className="gallery-live-card__teacher-photo">
                <Image
                  src="/images/founder-meena.webp"
                  alt="Meenakshi, Founder & Lead Artist"
                  fill
                  style={{ objectFit: "cover", objectPosition: "50% 15%" }}
                  sizes="40px"
                />
              </span>
            </span>
          </div>
        </Link>

        {/* ── Card 4: From the Journal ── */}
        {(() => {
          const studioUpdate = getLatestStudioUpdate();
          return (
            <Link href={studioUpdate ? `/journal/${studioUpdate.slug}` : "/journal"} className="gallery-live-card gallery-live-card--journal">
              <p className="gallery-live-card__eyebrow">FROM THE JOURNAL</p>
              {studioUpdate ? (
                <div className="gallery-live-card__media">
                  {studioUpdate.coverImage && (
                    <div className="gallery-live-card__photo">
                      <Image
                        src={studioUpdate.coverImage}
                        alt={studioUpdate.title}
                        fill
                        style={{ objectFit: "cover" }}
                        sizes="120px"
                      />
                    </div>
                  )}
                  <div className="gallery-live-card__content">
                    <h3 className="gallery-live-card__title">{studioUpdate.title}</h3>
                    <p className="gallery-live-card__meta">
                      Read how this painting evolved
                    </p>
                    <span className="gallery-live-card__link">
                      Studio Journal <span>→</span>
                    </span>
                  </div>
                </div>
              ) : (
                <p className="gallery-live-card__meta">A new story is on the way.</p>
              )}
            </Link>
          );
        })()}
      </CollapsibleStrip>
    </section>
  );
}

