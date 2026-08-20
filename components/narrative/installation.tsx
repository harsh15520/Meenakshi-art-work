import type { ReactNode } from "react";
import Image from "next/image";
import type {
  InstallationDayContent,
  RoomTransformationContent,
  LivingObservationsContent,
  TimeBasedUpdatesContent,
  OwnersRitualContent,
  LightInteractionContent,
  SeasonalChangesContent,
  LivingObservationItem,
} from "@/data/narrativeModules";
import { ClockIcon } from "@/components/TigerPageIcons";
import { MapPinIcon, CalendarIcon } from "@/components/JournalIcons";
import { MarigoldIcon, TempleIcon, LotusDividerIcon, HeartIcon, RoseFlourish } from "@/components/KrishnaPageIcons";

const OBSERVATION_ICONS = {
  pin: MapPinIcon,
  flower: MarigoldIcon,
  temple: TempleIcon,
};

export function InstallationDayModule({ content, title }: { content: InstallationDayContent; title?: ReactNode }) {
  return (
    <div className="installation-day-module">
      {content.heroImage ? (
        <div className="installation-split">
          <div className="installation-hero">
            <Image src={content.heroImage} alt="" fill sizes="(min-width: 980px) 45vw, 90vw" style={{ objectFit: "cover" }} />
          </div>
          <div className="installation-copy">
            {content.emblemImage && (
              <div className="installation-emblem">
                <Image src={content.emblemImage} alt="" width={360} height={80} style={{ width: "100%", height: "auto" }} />
              </div>
            )}
            {title}
            <p className="installation-narrative">{content.narrative}</p>
            <div className="painting-lotus-divider painting-lotus-divider--row" aria-hidden="true"><LotusDividerIcon /></div>
            {content.time && <span className="installation-time-badge">{content.time}</span>}
          </div>
        </div>
      ) : (
        <>
          {title}
          {content.time && <p className="installation-time"><strong>Time:</strong> {content.time}</p>}
          <p className="installation-narrative">{content.narrative}</p>
        </>
      )}
      {content.images && content.images.length > 0 && (
        <div className="installation-images">
          {content.images.map((img: string, index: number) => (
            <div key={index} className="installation-image">
              <Image src={img} alt="Installation" width={300} height={200} className="installation-img" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function RoomTransformationModule({ content }: { content: RoomTransformationContent }) {
  return (
    <div className="room-transformation-module">
      <div className="transformation-comparison">
        <div className="transformation-before">
          {content.beforeImage && (
            <div className="transformation-image">
              <Image src={content.beforeImage} alt="Before" width={400} height={300} className="transformation-img" />
            </div>
          )}
          <p className="transformation-before-text"><strong>Before:</strong> {content.before}</p>
        </div>
        <div className="transformation-arrow">→</div>
        <div className="transformation-after">
          {content.afterImage && (
            <div className="transformation-image">
              <Image src={content.afterImage} alt="After" width={400} height={300} className="transformation-img" />
            </div>
          )}
          <p className="transformation-after-text"><strong>After:</strong> {content.after}</p>
        </div>
      </div>
    </div>
  );
}

export function LivingObservationsModule({ content }: { content: LivingObservationsContent }) {
  return (
    <div className="living-observations-module">
      {content.observations.map((obs: LivingObservationItem, index: number) => {
        if (typeof obs === "string") {
          return <p key={index} className="living-observation">{obs}</p>;
        }
         const Icon = obs.icon ? OBSERVATION_ICONS[obs.icon] : null;
        return (
          <div key={index} className="living-observation-item">
            {obs.image && (
              <div className="living-observation-image">
                <Image src={obs.image} alt="" fill sizes="(min-width: 980px) 30vw, 90vw" style={{ objectFit: "cover" }} />
              </div>
            )}
            <div className="living-observation-body">
              {Icon && (
                <span className="living-observation-badge" aria-hidden="true">
                  <span className="living-observation-badge-icon"><Icon /></span>
                  <span className="living-observation-badge-flourish"><RoseFlourish /></span>
                </span>
              )}
              <p className="living-observation-text">{obs.text}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function TimeBasedUpdatesModule({ content }: { content: TimeBasedUpdatesContent }) {
  return (
    <div className="time-based-updates-module">
      {content.intro && <p className="time-update-intro">{content.intro}</p>}
      {content.updates.map((update, index: number) => (
        <div key={index}>
          <div className={`time-update ${update.image ? 'time-update--with-image' : ''} ${index % 2 === 1 ? 'time-update--reverse' : ''}`}>
            <div className="time-update-body">
              <p className="update-date">
                <span className="update-date-icon"><CalendarIcon /></span>
                {update.date}
              </p>
              <p className="update-observation">{update.observation}</p>
            </div>
            {update.image && (
              <div className="time-update-image">
                <Image src={update.image} alt="" fill sizes="(min-width: 980px) 30vw, 90vw" style={{ objectFit: "cover" }} />
              </div>
            )}
          </div>
          {index < content.updates.length - 1 && (
            <div className="painting-lotus-divider painting-lotus-divider--row" aria-hidden="true"><LotusDividerIcon /></div>
          )}
        </div>
      ))}
      {content.closingLeft && content.closingRight && (
        <div className="time-update-closing">
          <p className="time-update-closing-left">{content.closingLeft}</p>
          <span className="time-update-closing-rule" aria-hidden="true" />
          <div className="time-update-closing-right">
            <span className="time-update-closing-heart" aria-hidden="true"><HeartIcon /></span>
            <p>{content.closingRight}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export function OwnersRitualModule({ content }: { content: OwnersRitualContent }) {
  return (
    <div className="owners-ritual-module">
      <p className="ritual-description"><strong>The ritual:</strong> {content.ritual}</p>
      <p className="ritual-development"><strong>How it developed:</strong> {content.howItDeveloped}</p>
    </div>
  );
}

export function LightInteractionModule({ content, title }: { content: LightInteractionContent; title?: ReactNode }) {
  const hasTimeImages = content.timesOfDay?.some((time) => time.image);
  return (
    <div className="light-interaction-module">
      {content.heroImage ? (
        <div className="light-interaction-top">
          <div className="light-interaction-top-text">
            {title}
            <div className="light-interaction-divider" aria-hidden="true"><span className="light-interaction-divider-mark" /></div>
            <p className="light-description">{content.description}</p>
          </div>
          <div className="light-interaction-hero">
            <Image src={content.heroImage} alt="" fill sizes="(min-width: 980px) 45vw, 90vw" style={{ objectFit: "cover" }} />
          </div>
        </div>
      ) : (
        <>
          {title}
          <p className="light-description">{content.description}</p>
        </>
      )}
      {content.timesOfDay && content.timesOfDay.length > 0 && (
        hasTimeImages ? (
          <div className="light-times light-times--cards">
            {content.timesOfDay.map((time, index: number) => (
              <div key={index} className="light-time-card">
                {time.image && (
                  <div className="light-time-thumb">
                    <Image src={time.image} alt={time.time} fill sizes="(min-width: 980px) 25vw, 45vw" style={{ objectFit: "cover" }} />
                  </div>
                )}
                <div className="light-time-card-body">
                  <p className="light-time-name">
                    <span className="light-time-icon"><ClockIcon /></span>
                    <strong>{time.time}</strong>
                    <span className="light-time-rule" aria-hidden="true" />
                  </p>
                  <p className="light-time-effect">
                    {time.headline && <strong className="light-time-headline">{time.headline} </strong>}
                    {time.effect}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="light-times">
            {content.timesOfDay.map((time, index: number) => (
              <div key={index} className="light-time">
                <p className="light-time-name"><strong>{time.time}</strong></p>
                <p className="light-time-effect">{time.effect}</p>
              </div>
            ))}
          </div>
        )
      )}
      {content.closingLine && (
        <p className="light-interaction-closing-line">{content.closingLine}</p>
      )}
    </div>
  );
}

export function SeasonalChangesModule({ content }: { content: SeasonalChangesContent }) {
  return (
    <div className="seasonal-changes-module">
      {content.seasons.map((season, index: number) => (
        <div key={index} className="seasonal-change">
          <p className="season-name"><strong>{season.season}</strong></p>
          <p className="season-effect">{season.effect}</p>
        </div>
      ))}
    </div>
  );
}
