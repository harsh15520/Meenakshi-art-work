import Image from "next/image";
import type {
  HiddenSymbolismContent,
  DetailsPeopleAlmostMissContent,
  ColorPsychologyContent,
  CulturalReferencesContent,
  PersonalEasterEggsContent,
  TechniqueDetailsContent,
} from "@/data/narrativeModules";

interface DetailCardItem {
  element: string;
  text: string;
  image?: string;
  coordinates?: { x: number; y: number };
}

function DetailCardGrid({ items }: { items: DetailCardItem[] }) {
  return (
    <div className="detail-stories">
      {items.map((item, index: number) => (
        <div key={index} className="detail-story">
          {item.image && (
            <div className="detail-image">
              <Image src={item.image} alt={item.element} fill sizes="(min-width: 980px) 45vw, 90vw" className="detail-img" style={{ objectFit: "cover" }} />
              {item.coordinates && (
                <span
                  className="detail-explorer-marker"
                  style={{ left: `${item.coordinates.x}%`, top: `${item.coordinates.y}%` }}
                  aria-hidden="true"
                >
                  +
                </span>
              )}
            </div>
          )}
          <p className="detail-element"><strong>{item.element}</strong></p>
          <p className="detail-story">{item.text}</p>
        </div>
      ))}
    </div>
  );
}

export function HiddenSymbolismModule({ content }: { content: HiddenSymbolismContent }) {
  return (
    <div className="hidden-symbolism-module">
      <DetailCardGrid
        items={content.symbols.map((symbol) => ({
          element: symbol.element,
          text: symbol.meaning,
          image: symbol.image,
          coordinates: symbol.coordinates,
        }))}
      />
    </div>
  );
}

export function DetailsPeopleAlmostMissModule({ content }: { content: DetailsPeopleAlmostMissContent }) {
  return (
    <div className="details-people-almost-miss-module">
      <DetailCardGrid
        items={content.details.map((detail) => ({
          element: detail.element,
          text: detail.story,
          image: detail.image,
          coordinates: detail.coordinates,
        }))}
      />
    </div>
  );
}

export function ColorPsychologyModule({ content }: { content: ColorPsychologyContent }) {
  return (
    <div className="color-psychology-module">
      {content.colors.map((color, index: number) => (
        <div key={index} className="color-psychology-item">
          <div className="color-psychology-swatch" style={{ backgroundColor: color.color }}></div>
          <p className="color-psychology-effect">{color.psychologicalEffect}</p>
        </div>
      ))}
    </div>
  );
}

export function CulturalReferencesModule({ content }: { content: CulturalReferencesContent }) {
  return (
    <div className="cultural-references-module">
      {content.references.map((ref, index: number) => (
        <div key={index} className="cultural-reference">
          <p className="cultural-ref"><strong>{ref.reference}</strong></p>
          <p className="cultural-connection">{ref.connection}</p>
        </div>
      ))}
    </div>
  );
}

export function PersonalEasterEggsModule({ content }: { content: PersonalEasterEggsContent }) {
  return (
    <div className="personal-easter-eggs-module">
      {content.eggs.map((egg, index: number) => (
        <div key={index} className="easter-egg">
          <p className="egg-element"><strong>{egg.element}</strong></p>
          <p className="egg-meaning">{egg.meaning}</p>
        </div>
      ))}
    </div>
  );
}

export function TechniqueDetailsModule({ content }: { content: TechniqueDetailsContent }) {
  return (
    <div className="technique-details-module">
      {content.techniques.map((technique, index: number) => (
        <div key={index} className="technique-detail">
          <p className="technique-name"><strong>{technique.technique}</strong></p>
          <p className="technique-how"><strong>How:</strong> {technique.how}</p>
          <p className="technique-why"><strong>Why:</strong> {technique.why}</p>
        </div>
      ))}
    </div>
  );
}
