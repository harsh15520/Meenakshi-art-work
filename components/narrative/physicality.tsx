import Image from "next/image";
import type {
  ThePaletteUsedContent,
  BrushChoicesContent,
  SurfacePreparationContent,
  StudioConditionsContent,
  PaintStainsContent,
  DryingProcessContent,
  FramingDecisionContent,
} from "@/data/narrativeModules";

export function ThePaletteUsedModule({ content }: { content: ThePaletteUsedContent }) {
  return (
    <div className="palette-used-module">
      {content.image && (
        <div className="palette-image">
          <Image src={content.image} alt="Palette" width={300} height={200} className="palette-img" />
        </div>
      )}
      <div className="palette-materials">
        {content.materials.map((material, index: number) => (
          <div key={index} className="palette-material">
            <p className="material-name"><strong>{material.material}</strong></p>
            <p className="material-why">{material.why}</p>
            {material.brand && <p className="material-brand">{material.brand}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}

export function BrushChoicesModule({ content }: { content: BrushChoicesContent }) {
  return (
    <div className="brush-choices-module">
      {content.brushes.map((brush, index: number) => (
        <div key={index} className="brush-choice">
          <p className="brush-name"><strong>{brush.brush}</strong></p>
          <p className="brush-use">{brush.use}</p>
          <p className="brush-why">{brush.why}</p>
        </div>
      ))}
    </div>
  );
}

export function SurfacePreparationModule({ content }: { content: SurfacePreparationContent }) {
  return (
    <div className="surface-preparation-module">
      {content.image && (
        <div className="surface-image">
          <Image src={content.image} alt="Surface preparation" width={300} height={200} className="surface-img" />
        </div>
      )}
      <div className="surface-process">
        {content.process.map((step: string, index: number) => (
          <p key={index} className="surface-step">{index + 1}. {step}</p>
        ))}
      </div>
    </div>
  );
}

export function StudioConditionsModule({ content }: { content: StudioConditionsContent }) {
  return (
    <div className="studio-conditions-module">
      <p className="studio-time"><strong>Time of day:</strong> {content.timeOfDay}</p>
      <p className="studio-environment"><strong>Environment:</strong> {content.environment}</p>
      {content.music && <p className="studio-music"><strong>Music:</strong> {content.music}</p>}
      <p className="studio-duration"><strong>Duration:</strong> {content.duration}</p>
    </div>
  );
}

export function PaintStainsModule({ content }: { content: PaintStainsContent }) {
  return (
    <div className="paint-stains-module">
      {content.image && (
        <div className="paint-stains-image">
          <Image src={content.image} alt="Paint stains" width={300} height={200} className="paint-stains-img" />
        </div>
      )}
      <p className="paint-stains-description">{content.description}</p>
    </div>
  );
}

export function DryingProcessModule({ content }: { content: DryingProcessContent }) {
  return (
    <div className="drying-process-module">
      <p className="drying-process">{content.process}</p>
      <p className="drying-effect"><strong>How it affected the work:</strong> {content.howItAffectedTheWork}</p>
    </div>
  );
}

export function FramingDecisionModule({ content }: { content: FramingDecisionContent }) {
  return (
    <div className="framing-decision-module">
      <p className="frame-choice"><strong>Frame choice:</strong> {content.frameChoice}</p>
      <p className="frame-reasoning">{content.reasoning}</p>
      {content.alternativesConsidered.length > 0 && (
        <div className="frame-alternatives">
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
