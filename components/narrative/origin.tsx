import Image from "next/image";
import type {
  ClientMemoryContent,
  TheBriefContent,
  ReferenceEvolutionContent,
  ArtistsInitialReactionContent,
  TheMomentOfYesContent,
  FamilyConnectionContent,
  OccasionContextContent,
  SpaceProblemContent,
} from "@/data/narrativeModules";
import { CrownIcon } from "@/components/KrishnaPageIcons";

export function ClientMemoryModule({ content }: { content: ClientMemoryContent }) {
  return (
    <div className="client-memory-module">
      <div className="client-memory-grid">
        {content.heroImage && (
          <div className="client-memory-media">
            <Image src={content.heroImage} alt="" fill sizes="(min-width: 980px) 38vw, 90vw" style={{ objectFit: "cover" }} />
          </div>
        )}
        <div className="client-memory-copy">
          <div className="client-memory-iconline" aria-hidden="true" />
          {content.intro && <p className="client-memory-intro">{content.intro}</p>}
          <p className="client-memory-text">{content.text}</p>
          {content.clientName && <p className="client-memory-name">— {content.clientName}</p>}
          {content.omRakhiImage && (
            <span className="client-memory-rakhi" aria-hidden="true">
              <Image src={content.omRakhiImage} alt="" width={120} height={120} style={{ objectFit: "contain" }} />
            </span>
          )}
        </div>
      </div>
      {content.paperCuttingImage && (
        <div className="client-memory-papercut" aria-hidden="true">
          <Image src={content.paperCuttingImage} alt="" width={520} height={60} style={{ objectFit: "contain", width: "100%", height: "auto" }} />
        </div>
      )}
    </div>
  );
}

export function TheBriefModule({ content }: { content: TheBriefContent }) {
  return (
    <div className="the-brief-module">
      <p className="the-brief-request">&ldquo;{content.originalRequest}&rdquo;</p>
      {content.clientWords && <p className="the-brief-client-words">{content.clientWords}</p>}
    </div>
  );
}

export function ReferenceEvolutionModule({ content }: { content: ReferenceEvolutionContent }) {
  const chosen = content.references.filter((ref) => !ref.rejected);
  return (
    <div className="reference-evolution-module">
      <div className="reference-split">
        <div className="reference-left">
          {content.studyThumbnails && content.studyThumbnails.length > 0 && (
            <div className="reference-study-grid">
              {content.studyThumbnails.map((thumb, index: number) => (
                <div key={index} className="reference-study-thumb">
                  <Image src={thumb} alt={`Reference study ${index + 1}`} width={80} height={60} className="reference-study-img" />
                  <span className="reference-study-number">{index + 1}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="reference-right">
          {chosen.map((ref, index: number) => (
            <div key={index} className="reference-item reference-item--chosen">
              <div className="reference-image">
                <Image src={ref.image} alt={ref.caption} width={200} height={150} className="reference-img" />
              </div>
              <p className="reference-caption">{ref.caption}</p>
              <div className="reference-chosen-callout">
                <span className="reference-chosen-callout-icon"><CrownIcon /></span>
                <div className="reference-chosen-callout-body">
                  <div className="reference-chosen-label"><span className="om-dot" />The Chosen One<span className="om-dot" /></div>
                  {ref.reason && <p className="reference-chosen-desc">{ref.reason}</p>}
                </div>
                <div className="reference-chosen-thumb">
                  <Image src={ref.image} alt="" width={64} height={48} className="reference-chosen-thumb-img" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ArtistsInitialReactionModule({ content }: { content: ArtistsInitialReactionContent }) {
  return (
    <div className="artists-initial-reaction-module">
      <p className="artists-reaction">{content.reaction}</p>
      <p className="artists-thoughts">{content.firstThoughts}</p>
    </div>
  );
}

export function TheMomentOfYesModule({ content }: { content: TheMomentOfYesContent }) {
  return (
    <div className="the-moment-of-yes-module">
      <p className="moment-description">{content.moment}</p>
      <p className="moment-change">{content.whatChanged}</p>
    </div>
  );
}

export function FamilyConnectionModule({ content }: { content: FamilyConnectionContent }) {
  return (
    <div className="family-connection-module">
      <p className="family-connection">{content.connection}</p>
      {content.generations && <p className="family-generations">{content.generations}</p>}
    </div>
  );
}

export function OccasionContextModule({ content }: { content: OccasionContextContent }) {
  return (
    <div className="occasion-context-module">
      <p className="occasion">{content.occasion}</p>
      <p className="occasion-significance">{content.significance}</p>
    </div>
  );
}

export function SpaceProblemModule({ content }: { content: SpaceProblemContent }) {
  return (
    <div className="space-problem-module">
      <p className="space-problem"><strong>Problem:</strong> {content.problem}</p>
      <p className="space-solution"><strong>How the painting solved it:</strong> {content.howPaintingSolvedIt}</p>
    </div>
  );
}
