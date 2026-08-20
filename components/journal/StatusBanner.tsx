import Reveal from "@/components/Reveal";
import { STUDIO_STATUS, CADENCE_NOTES, CATEGORY_LABELS } from "./shared";
import type { JournalCategory } from "@/data/journal";

export default function StatusBanner() {
  return (
    <section className="journal-status-banner">
      <Reveal>
        <div className="journal-status-banner-inner">
          <div className="journal-status-headline-block">
            <p className="journal-status-eyebrow">STUDIO STATUS · Updated {new Date(STUDIO_STATUS.updatedOn).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}</p>
            <h3>{STUDIO_STATUS.headline}</h3>
            <p>{STUDIO_STATUS.detail}</p>
          </div>
          <div className="journal-cadence-notes">
            {Object.entries(CADENCE_NOTES).map(([category, note]) => (
              <div key={category} className="journal-cadence-item">
                <b>{CATEGORY_LABELS[category as JournalCategory]}</b>
                <span>{note}</span>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
