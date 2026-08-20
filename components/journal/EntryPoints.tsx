import Reveal from "@/components/Reveal";
import { CATEGORY_ENTRY_POINTS, getLatestEntryPreviewFor, STATS_ICONS } from "./shared";
import { JournalEntryPointLink } from "@/components/ghosts";

export default function EntryPoints() {
  const { findYourself: FindYourselfIcon } = STATS_ICONS;
  return (
    <section className="journal-entry-points section-wrap">
      <Reveal>
        <p className="section-heading-label journal-entry-points-label">WHAT BRINGS YOU HERE TODAY?</p>
        <div className="journal-entry-points-grid">
          {CATEGORY_ENTRY_POINTS.map((point) => {
            const preview = getLatestEntryPreviewFor(point.category);

            return (
              <JournalEntryPointLink key={point.category} href={`/journal?category=${point.category}#all-entries`} className="journal-entry-point-card">
                <div className="journal-entry-point-card-head">
                  <span className="journal-entry-point-icon"><point.Icon /></span>
                  <h3>{point.label}</h3>
                </div>
                <p>{point.description}</p>
                <div className="journal-entry-point-card-preview">
                  <span className="journal-entry-point-card-preview-label">Latest</span>
                  <span>{preview}</span>
                </div>
              </JournalEntryPointLink>
            );
          })}
          <a href="#find-yourself" className="journal-entry-point-card journal-entry-point-card--find">
            <div className="journal-entry-point-card-head">
              <span className="journal-entry-point-icon"><FindYourselfIcon /></span>
              <h3>Find Yourself</h3>
            </div>
            <p>Search for your name if you&apos;re a student, client, or someone mentioned here.</p>
          </a>
        </div>
      </Reveal>
    </section>
  );
}
