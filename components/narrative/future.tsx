import type { ReactNode } from "react";
import Image from "next/image";
import type {
  FutureHomeContent,
  IdealOwnerContent,
  PotentialPlacementsContent,
  LightScenariosContent,
  CompanionPiecesContent,
} from "@/data/narrativeModules";
import { SofaIcon, OpenBookIcon, StarOutlineIcon, SunIcon, LotusIcon } from "@/components/TigerPageIcons";
import { PeopleGroupIcon } from "@/components/JournalIcons";

const SETTING_ICONS = { sofa: SofaIcon, book: OpenBookIcon, star: StarOutlineIcon };
const TRAIT_ICONS = { sun: SunIcon, people: PeopleGroupIcon, lotus: LotusIcon };

export function FutureHomeModule({ content, title }: { content: FutureHomeContent; title?: ReactNode }) {
  const settings = content.potentialSettings ?? [];
  const richSettings = settings.some((setting) => typeof setting === "object");

  return (
    <div className="future-home-module">
      {content.heroImage ? (
        <div className="future-home-top">
          <div className="future-home-top-text">
            {title}
            <div className="light-interaction-divider" aria-hidden="true"><span className="light-interaction-divider-mark" /></div>
            <p className="future-context">
              {content.imaginedContext}
              {content.pullQuote && <> <strong className="painting-text-highlight">{content.pullQuote}</strong></>}
            </p>
          </div>
          <div className="future-home-hero">
            <Image src={content.heroImage} alt="" fill sizes="(min-width: 980px) 45vw, 90vw" style={{ objectFit: "cover" }} />
          </div>
        </div>
      ) : (
        <>
          {title}
          <p className="future-context">{content.imaginedContext}</p>
          {content.pullQuote && (
            <blockquote className="painting-pull-quote">{content.pullQuote}</blockquote>
          )}
        </>
      )}
      {settings.length > 0 && (
        richSettings ? (
          <div className="potential-settings-wrap">
            <p className="potential-settings-eyebrow">Potential settings</p>
            <div className="potential-settings-grid">
              {settings.map((setting, index: number) => {
                const item = typeof setting === "string" ? { label: setting } : setting;
                const Icon = item.icon ? SETTING_ICONS[item.icon] : null;
                return (
                  <div key={index} className="potential-setting-card">
                    {item.image && (
                      <div className="potential-setting-image">
                        <Image src={item.image} alt={item.label} fill sizes="(min-width: 980px) 30vw, 90vw" style={{ objectFit: "cover" }} />
                      </div>
                    )}
                    <div className="potential-setting-body">
                      {Icon && <span className="potential-setting-icon"><Icon /></span>}
                      <p>{item.label}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="potential-settings">
            <p><strong>Potential settings:</strong></p>
            <ul>
              {settings.map((setting, index: number) => (
                <li key={index}>{typeof setting === "string" ? setting : setting.label}</li>
              ))}
            </ul>
          </div>
        )
      )}
    </div>
  );
}

export function IdealOwnerModule({ content }: { content: IdealOwnerContent }) {
  const traits = content.traits ?? [];
  const richTraits = traits.some((trait) => typeof trait === "object");

  return (
    <div className="ideal-owner-module">
      {content.heroImage && (
        <div className="ideal-owner-hero">
          <Image src={content.heroImage} alt="" fill sizes="(min-width: 980px) 60vw, 90vw" style={{ objectFit: "cover" }} />
        </div>
      )}
      {content.pullQuote && (
        <div className="ideal-owner-divider" aria-hidden="true"><span className="ideal-owner-divider-mark" /></div>
      )}
      <p className="ideal-description">
        {content.description}
        {content.pullQuote && <> <strong className="painting-text-highlight">{content.pullQuote}</strong></>}
      </p>
      {traits.length > 0 && (
        richTraits ? (
          <div className="ideal-traits-wrap">
            <p className="ideal-traits-eyebrow">Ideal owner traits</p>
            <div className="ideal-traits-grid">
              {traits.map((trait, index: number) => {
                const item = typeof trait === "string" ? { label: trait } : trait;
                const Icon = item.icon ? TRAIT_ICONS[item.icon] : null;
                return (
                  <div key={index} className="ideal-trait-item">
                    {Icon && <span className="ideal-trait-icon"><Icon /></span>}
                    <p>{item.label}</p>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="ideal-traits">
            <p><strong>Ideal owner traits:</strong></p>
            <ul>
              {traits.map((trait, index: number) => (
                <li key={index}>{typeof trait === "string" ? trait : trait.label}</li>
              ))}
            </ul>
          </div>
        )
      )}
    </div>
  );
}

export function PotentialPlacementsModule({ content }: { content: PotentialPlacementsContent }) {
  return (
    <div className="potential-placements-module">
      {content.placements.map((placement, index: number) => (
        <div key={index} className="potential-placement">
          <p className="placement-room"><strong>{placement.room}</strong></p>
          <p className="placement-why">{placement.why}</p>
        </div>
      ))}
    </div>
  );
}

export function LightScenariosModule({ content }: { content: LightScenariosContent }) {
  return (
    <div className="light-scenarios-module">
      {content.scenarios.map((scenario, index: number) => (
        <div key={index} className="light-scenario">
          <p className="scenario-name"><strong>{scenario.scenario}</strong></p>
          <p className="scenario-effect">{scenario.effect}</p>
        </div>
      ))}
    </div>
  );
}

export function CompanionPiecesModule({ content }: { content: CompanionPiecesContent }) {
  return (
    <div className="companion-pieces-module">
      {content.companions.map((companion, index: number) => (
        <div key={index} className="companion-piece">
          <p className="companion-type"><strong>{companion.type}</strong></p>
          <p className="companion-why">{companion.why}</p>
        </div>
      ))}
    </div>
  );
}
