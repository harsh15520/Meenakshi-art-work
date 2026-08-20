import Image from "next/image";
import { curriculumPhases } from "@/data/curriculum";

/**
 * AcademyCurriculum — 5-phase curriculum card grid for the academy page.
 *
 * Carries id="curriculum" so the hero "View Curriculum →" CTA anchor-scrolls here.
 * Phase 1 receives the active/highlighted card treatment.
 * Phase 5 shows "Personal Projects" and "Portfolio Building" instead of an exercise count.
 *
 * Server component — no client JS needed.
 */
export default function AcademyCurriculum() {
  return (
    <section className="academy-curriculum section-wrap">
      <div className="academy-curriculum__header">
        <div>
          <p className="eyebrow">OUR 5-PHASE CURRICULUM</p>
          <h2>
            A clear path from first line<br />to <em>signature style.</em>
          </h2>
        </div>
        <a href="#curriculum" className="academy-curriculum__view-all">
          View all phases <span>→</span>
        </a>
      </div>

      <div className="academy-curriculum__track">
        {curriculumPhases.map((phase, i) => (
          <div
            key={phase.num}
            className={`academy-curriculum__card${i === 0 ? " academy-curriculum__card--active" : ""}`}
          >
            <p className="academy-curriculum__phase-label">PHASE {phase.num}</p>

            <div className="academy-curriculum__image">
              <Image
                src={phase.image}
                alt={`${phase.title} — example student work`}
                fill
                style={{ objectFit: "cover" }}
                sizes="260px"
              />
            </div>

            <h3 className="academy-curriculum__title">{phase.title}</h3>

            <ul className="academy-curriculum__stats">
              {phase.num === "05" ? (
                <>
                  <li>Personal Projects</li>
                  <li>Portfolio Building</li>
                  <li>{phase.studentExamples} student examples</li>
                </>
              ) : (
                <>
                  <li>{phase.exercises} exercises</li>
                  <li>{phase.weeks}</li>
                  <li>{phase.studentExamples} student examples</li>
                </>
              )}
            </ul>

            <a
              href={`/academy/curriculum/${phase.num}`}
              className="academy-curriculum__cta"
            >
              View Exercises <span>→</span>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
