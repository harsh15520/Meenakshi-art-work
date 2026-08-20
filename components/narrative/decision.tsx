import Image from "next/image";
import type {
  ArtistsNotebookContent,
  ReferenceBoardContent,
  ColorTestsContent,
  CompositionStudiesContent,
  ProcessTimelineContent,
  TheAlmostContent,
  MidCourseChangeContent,
  ClientCollaborationContent,
} from "@/data/narrativeModules";
import { LotusDividerIcon, HandDrawingIcon, RoseFlourish } from "@/components/KrishnaPageIcons";

export function ArtistsNotebookModule({ content }: { content: ArtistsNotebookContent }) {
  return (
    <div className="artists-notebook-module">
      <div className="painting-lotus-divider" aria-hidden="true"><LotusDividerIcon /></div>
      {content.intro && <p className="notebook-intro">{content.intro}</p>}
      <div className="notebook-body">
        {content.heroImage && (
          <div className="notebook-hero">
            <div className="notebook-hero-frame">
              <Image src={content.heroImage} alt="" fill sizes="(min-width: 980px) 38vw, 90vw" style={{ objectFit: "cover" }} />
              <span className="notebook-hero-feather" aria-hidden="true"><RoseFlourish /></span>
              <span className="notebook-hero-smear" aria-hidden="true" />
            </div>
          </div>
        )}
        <div className="notebook-cards">
          {content.entries.map((entry, index: number) => (
            <div key={index} className={`notebook-card ${entry.date === "Day 12" ? "notebook-card--quote" : ""}`}>
              <span className="notebook-card-binding" aria-hidden="true" />
              <div className="notebook-card-inner">
                {entry.date && <span className="notebook-day">{entry.date}</span>}
                {entry.sketch && (
                  <div className="notebook-card-sketch">
                    <Image src={entry.sketch} alt="" width={320} height={240} className="notebook-card-img" />
                  </div>
                )}
                <p className="notebook-card-notes">{entry.notes}</p>
                {entry.date === "Day 12" && <span className="notebook-card-quote" aria-hidden="true">&ldquo;</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
      {content.closingLine && (
        <p className="notebook-closing">
          <span className="notebook-closing-icon"><HandDrawingIcon /></span>
          {content.closingLine}
        </p>
      )}
    </div>
  );
}

export function ReferenceBoardModule({ content }: { content: ReferenceBoardContent }) {
  return (
    <div className="reference-board-module">
      <div className="reference-board-grid">
        {content.references.map((ref, index: number) => (
          <div key={index} className="board-reference">
            <div className="board-reference-image">
              <Image src={ref.image} alt={ref.caption} width={200} height={150} className="board-ref-img" />
            </div>
            <p className="board-reference-caption">{ref.caption}</p>
            <p className="board-reference-influence">{ref.influence}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ColorTestsModule({ content }: { content: ColorTestsContent }) {
  return (
    <div className="color-tests-module">
      <div className="color-tests-grid">
        {content.tests.map((test, index: number) => (
          <div key={index} className={`color-test ${test.chosen ? 'color-test--chosen' : ''}`}>
            <div className="color-test-image">
              <Image src={test.image} alt={test.description} width={150} height={150} className="color-test-img" />
            </div>
            <p className="color-test-description">{test.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function CompositionStudiesModule({ content }: { content: CompositionStudiesContent }) {
  return (
    <div className="composition-studies-module">
      <div className="composition-studies-grid">
        {content.studies.map((study, index: number) => (
          <div key={index} className={`composition-study ${study.rejected ? 'composition-study--rejected' : 'composition-study--chosen'}`}>
            <div className="composition-study-image">
              <Image src={study.image} alt={study.description} width={200} height={150} className="composition-study-img" />
            </div>
            <p className="composition-study-description">{study.description}</p>
            {study.rejected && <p className="composition-study-reason">Rejected: {study.reason}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}

export function ProcessTimelineModule({ content }: { content: ProcessTimelineContent }) {
  return (
    <div className="process-timeline-module">
      <div className="timeline">
        {content.timeline.map((item, index: number) => (
          <div key={index} className="timeline-item">
            <div className="timeline-marker">{index + 1}</div>
            <div className="timeline-content">
              <p className="timeline-date">{item.date}</p>
              <h4 className="timeline-milestone">{item.milestone}</h4>
              <p className="timeline-description">{item.description}</p>
              {item.image && (
                <div className="timeline-image">
                  <Image src={item.image} alt={item.milestone} width={300} height={200} className="timeline-img" />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function TheAlmostModule({ content }: { content: TheAlmostContent }) {
  return (
    <div className="the-almost-module">
      <p className="almost-happened"><strong>What almost happened:</strong> {content.whatAlmostHappened}</p>
      <p className="almost-change"><strong>Why it changed:</strong> {content.whyItChanged}</p>
    </div>
  );
}

export function MidCourseChangeModule({ content }: { content: MidCourseChangeContent }) {
  return (
    <div className="mid-course-change-module">
      <p className="original-direction"><strong>Original direction:</strong> {content.originalDirection}</p>
      <p className="change-trigger"><strong>What triggered the change:</strong> {content.whatTriggeredChange}</p>
      <p className="new-direction"><strong>New direction:</strong> {content.newDirection}</p>
    </div>
  );
}

export function ClientCollaborationModule({ content }: { content: ClientCollaborationContent }) {
  return (
    <div className="client-collaboration-module">
      {content.moments.map((moment, index: number) => (
        <div key={index} className="collaboration-moment">
          <h4 className="collaboration-moment">{moment.moment}</h4>
          <p className="collaboration-input"><strong>Client input:</strong> {moment.clientInput}</p>
          <p className="collaboration-impact"><strong>How it changed the work:</strong> {moment.howItChangedTheWork}</p>
        </div>
      ))}
    </div>
  );
}
