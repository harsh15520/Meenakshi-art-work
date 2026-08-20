import Image from "next/image";
import type {
  FailedExperimentsContent,
  TheProblemContent,
  TheSolutionContent,
  MaterialChoiceContent,
  ColorDecisionsContent,
  TechniqueChallengeContent,
  ScaleStruggleContent,
  LightStudyContent,
} from "@/data/narrativeModules";

export function FailedExperimentsModule({ content }: { content: FailedExperimentsContent }) {
  return (
    <div className="failed-experiments-module">
      {content.experiments.map((exp, index: number) => (
        <div key={index} className={`experiment-item ${exp.rejected ? 'experiment-item--rejected' : 'experiment-item--chosen'}`}>
          <h4 className="experiment-version">{exp.version}</h4>
          {exp.image && (
            <div className="experiment-image">
              <Image src={exp.image} alt={exp.version} width={200} height={150} className="experiment-img" />
            </div>
          )}
          <p className="experiment-description">{exp.description}</p>
          {exp.rejected && <p className="experiment-reason">Rejected: {exp.reason}</p>}
        </div>
      ))}
    </div>
  );
}

export function TheProblemModule({ content }: { content: TheProblemContent }) {
  return (
    <div className="the-problem-module">
      <p className="problem-statement"><strong>The problem:</strong> {content.problem}</p>
      <p className="problem-importance">{content.whyItMattered}</p>
      {content.pullQuote && (
        <blockquote className="painting-pull-quote">{content.pullQuote}</blockquote>
      )}
    </div>
  );
}

export function TheSolutionModule({ content }: { content: TheSolutionContent }) {
  return (
    <div className="the-solution-module">
      <p className="solution-statement"><strong>The solution:</strong> {content.solution}</p>
      <p className="solution-process">{content.howWeGotThere}</p>
    </div>
  );
}

export function MaterialChoiceModule({ content }: { content: MaterialChoiceContent }) {
  return (
    <div className="material-choice-module">
      <p className="material-choice"><strong>Material:</strong> {content.material}</p>
      <p className="material-reasoning">{content.whyThisMaterial}</p>
      {content.alternativesConsidered.length > 0 && (
        <div className="material-alternatives">
          <p><strong>Alternatives considered:</strong></p>
          <ul>
            {content.alternativesConsidered.map((alt: string, index: number) => (
              <li key={index}>{alt}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export function ColorDecisionsModule({ content }: { content: ColorDecisionsContent }) {
  return (
    <div className="color-decisions-module">
      {content.palette.map((color, index: number) => (
        <div key={index} className="color-item">
          <div className="color-swatch" style={{ backgroundColor: color.color }}></div>
          <p className="color-role">{color.role}</p>
          <p className="color-reasoning">{color.reasoning}</p>
        </div>
      ))}
    </div>
  );
}

export function TechniqueChallengeModule({ content }: { content: TechniqueChallengeContent }) {
  return (
    <div className="technique-challenge-module">
      <p className="technique-challenge"><strong>Challenge:</strong> {content.challenge}</p>
      <p className="technique-solution"><strong>Solution:</strong> {content.solution}</p>
      <p className="technique-learned"><strong>Learned:</strong> {content.learned}</p>
    </div>
  );
}

export function ScaleStruggleModule({ content }: { content: ScaleStruggleContent }) {
  return (
    <div className="scale-struggle-module">
      <p className="scale-challenge"><strong>Challenge:</strong> {content.challenge}</p>
      <p className="scale-adaptation"><strong>Adaptation:</strong> {content.adaptation}</p>
    </div>
  );
}

export function LightStudyModule({ content }: { content: LightStudyContent }) {
  return (
    <div className="light-study-module">
      {content.lightConditions.map((condition, index: number) => (
        <div key={index} className="light-condition">
          <div className="light-image">
            <Image src={condition.image} alt={condition.condition} width={300} height={200} className="light-img" />
          </div>
          <p className="light-condition-name">{condition.condition}</p>
          <p className="light-effect">{condition.effect}</p>
        </div>
      ))}
    </div>
  );
}
