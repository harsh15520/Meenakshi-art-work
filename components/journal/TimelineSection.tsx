import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import { STATS_ICONS } from "./shared";
import type { JournalEntry } from "@/data/journal";

const PLACEHOLDER_PAST_YEARS = [
  {
    year: "2025",
    count: 84,
    image: "/images/custom/oil-painting-106.webp",
    blurb: "A year of steady academy growth and the studio's first big custom commissions.",
  },
  {
    year: "2024",
    count: 76,
    image: "/images/custom/oil-painting-109.webp",
    blurb: "Expanding into new techniques and taking on the first multi-week school assistance projects.",
  },
  {
    year: "2023",
    count: 52,
    image: "/images/custom/oil-painting-158.webp",
    blurb: "The early days — building the academy's reputation one student at a time.",
  },
];

const YEAR_BLURBS: Record<string, string> = {
  "2026": "Commissions in progress, academy students growing week by week, and the business decisions behind it all — documented as they happened.",
};

export default function TimelineSection({ entries }: { entries: JournalEntry[] }) {
  const { arrowRight: ArrowRightIcon } = STATS_ICONS;

  const entriesByYear = new Map<string, JournalEntry[]>();
  entries.forEach((entry) => {
    const year = new Date(entry.publishedOn).getFullYear().toString();
    if (!entriesByYear.has(year)) entriesByYear.set(year, []);
    entriesByYear.get(year)!.push(entry);
  });
  const years = Array.from(entriesByYear.keys()).sort((a, b) => Number(b) - Number(a));

  return (
    <section className="journal-timeline section-wrap">
      <Reveal>
        <p className="section-heading-label">BROWSE BY TIMELINE</p>
        <p className="journal-timeline-sub">Explore stories from different moments in our journey.</p>
        <div className="journal-timeline-zigzag">
          {years.map((year, i) => (
            <div key={year} className={`journal-timeline-row${i % 2 === 1 ? " journal-timeline-row--reverse" : ""}`}>
              <div className="journal-timeline-row-image">
                <Image src="/images/painting/oil-painting-159.webp" alt={`${year} archive`} fill sizes="(min-width: 980px) 45vw, 90vw" style={{ objectFit: "cover" }} />
              </div>
              <div className="journal-timeline-row-body">
                <h3>{year}</h3>
                <p className="journal-timeline-row-count">
                  {entriesByYear.get(year)!.length} {entriesByYear.get(year)!.length === 1 ? "entry" : "entries"}
                </p>
                <p className="journal-timeline-row-blurb">
                  {YEAR_BLURBS[year] || "Stories from this year, documented as they happened."}
                </p>
                <p className="journal-timeline-row-reading-state">Reading archive: {year} is currently in view.</p>
                <a href="#all-entries" className="journal-timeline-row-link">Browse {year} entries <ArrowRightIcon /></a>
              </div>
            </div>
          ))}
          {PLACEHOLDER_PAST_YEARS.map((p, i) => (
            <div
              key={p.year}
              className={`journal-timeline-row journal-timeline-row--placeholder${(years.length + i) % 2 === 1 ? " journal-timeline-row--reverse" : ""}`}
            >
              <div className="journal-timeline-row-image">
                <Image src={p.image} alt={`${p.year} archive`} fill sizes="(min-width: 980px) 45vw, 90vw" style={{ objectFit: "cover" }} />
              </div>
              <div className="journal-timeline-row-body">
                <h3>{p.year}</h3>
                <p className="journal-timeline-row-count">{p.count} entries</p>
                <p className="journal-timeline-row-blurb">{p.blurb}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="journal-timeline-viewall">
          <Link href="/journal" className="button-outline">View All Years</Link>
        </div>
      </Reveal>
    </section>
  );
}
