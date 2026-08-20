import Image from "next/image";
import Reveal from "@/components/Reveal";
import { HERO_BLUR } from "@/lib/image-optimization";
import {
  CATEGORY_LABELS,
  STATS_ICONS,
  STUDIO_STATUS,
  relativeUpdatedLabel,
} from "./shared";
import { getJournalStats } from "@/data/journal";

type JournalStats = ReturnType<typeof getJournalStats>;

export default function JournalHero({ stats }: { stats: JournalStats }) {
  const { book: BookIcon, easel: EaselIcon, people: PeopleGroupIcon, calendar: UpdatedCalendarIcon } = STATS_ICONS;
  return (
    <section className="journal-hero">
      <div className="journal-hero-copy">
        <Reveal>
          <h1>THE STUDIO <em>JOURNAL</em></h1>
          <p className="hero-sub hero-sub--editorial">
            Every painting has a story before it reaches the wall.
          </p>
          <p className="hero-sub">
            Building an art studio in public.<br />Real stories. Real learnings. Real people.
          </p>
          <div className="journal-hero-stats">
            <div className="journal-stat-pill">
              <span className="journal-stat-icon-badge">
                <BookIcon />
              </span>
              <span className="journal-stat-number">{stats.totalEntries}</span>
              <span className="journal-stat-label">Entries</span>
            </div>
            <div className="journal-stat-pill">
              <span className="journal-stat-icon-badge">
                <EaselIcon />
              </span>
              <span className="journal-stat-number">{stats.activeThreads}</span>
              <span className="journal-stat-label">Active Threads</span>
            </div>
            <div className="journal-stat-pill">
              <span className="journal-stat-icon-badge">
                <PeopleGroupIcon />
              </span>
              <span className="journal-stat-number">{stats.studentsMentioned}</span>
              <span className="journal-stat-label">People Mentioned</span>
            </div>
            <div className="journal-stat-pill">
              <span className="journal-stat-icon-badge">
                <UpdatedCalendarIcon />
              </span>
              <span className="journal-stat-number journal-stat-number--sm">{relativeUpdatedLabel(STUDIO_STATUS.updatedOn)}</span>
              <span className="journal-stat-label">Updated</span>
            </div>
          </div>
        </Reveal>
      </div>
      <div className="journal-hero-image">
        <Reveal variant="fade" delay={0.1} className="journal-hero-image-reveal">
            <div className="journal-hero-image-wrap">
              <Image
                src="/images/painting/oil-painting-141.webp"
                alt="Inside the Meenakshi Art Work studio"
                fill
                style={{ objectFit: "cover", objectPosition: "center 34%" }}
                sizes="(min-width: 980px) 45vw, 100vw"
                priority
                placeholder="blur"
                blurDataURL={HERO_BLUR}
              />
            </div>
        </Reveal>
      </div>
    </section>
  );
}

export { CATEGORY_LABELS };
