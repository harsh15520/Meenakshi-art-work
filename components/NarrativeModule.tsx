import type { ComponentType } from "react";
import Reveal from "./Reveal";
import type { NarrativeModule, ModuleContent, NarrativeModuleIconKey } from "@/data/narrativeModules";
import { PawPrintIcon, SunIcon, PictureFrameIcon, CompassIcon, ClockIcon } from "./TigerPageIcons";
import { OmIcon, CrownIcon, MarigoldIcon, TempleIcon, LotusDividerIcon, HeartIcon } from "./KrishnaPageIcons";
import {
  ClientMemoryModule,
  TheBriefModule,
  ReferenceEvolutionModule,
  ArtistsInitialReactionModule,
  TheMomentOfYesModule,
  FamilyConnectionModule,
  OccasionContextModule,
  SpaceProblemModule,
} from "./narrative/origin";
import {
  FailedExperimentsModule,
  TheProblemModule,
  TheSolutionModule,
  MaterialChoiceModule,
  ColorDecisionsModule,
  TechniqueChallengeModule,
  ScaleStruggleModule,
  LightStudyModule,
} from "./narrative/process";
import {
  ArtistsNotebookModule,
  ReferenceBoardModule,
  ColorTestsModule,
  CompositionStudiesModule,
  ProcessTimelineModule,
  TheAlmostModule,
  MidCourseChangeModule,
  ClientCollaborationModule,
} from "./narrative/decision";
import {
  ThePaletteUsedModule,
  BrushChoicesModule,
  SurfacePreparationModule,
  StudioConditionsModule,
  PaintStainsModule,
  DryingProcessModule,
  FramingDecisionModule,
} from "./narrative/physicality";
import {
  HiddenSymbolismModule,
  DetailsPeopleAlmostMissModule,
  ColorPsychologyModule,
  CulturalReferencesModule,
  PersonalEasterEggsModule,
  TechniqueDetailsModule,
} from "./narrative/symbolism";
import {
  InstallationDayModule,
  RoomTransformationModule,
  LivingObservationsModule,
  TimeBasedUpdatesModule,
  OwnersRitualModule,
  LightInteractionModule,
  SeasonalChangesModule,
} from "./narrative/installation";
import {
  FutureHomeModule,
  IdealOwnerModule,
  PotentialPlacementsModule,
  LightScenariosModule,
  CompanionPiecesModule,
} from "./narrative/future";
import {
  StudioJournalChronologyModule,
  BehindTheScenesModule,
  TechnicalJournalModule,
  ClientJournalModule,
} from "./narrative/journal";

interface NarrativeModuleProps {
  module: NarrativeModule;
}

const MODULE_ICONS: Record<NarrativeModuleIconKey, ComponentType> = {
  paw: PawPrintIcon,
  sun: SunIcon,
  frame: PictureFrameIcon,
  gaze: CompassIcon,
  clock: ClockIcon,
  om: OmIcon,
  crown: CrownIcon,
  marigold: MarigoldIcon,
  temple: TempleIcon,
  lotus: LotusDividerIcon,
  heart: HeartIcon,
};

export default function NarrativeModule({ module }: NarrativeModuleProps) {
  const Icon = module.icon ? MODULE_ICONS[module.icon] : null;
  const titleNode = (
    <h2 className="painting-module-title">
      {Icon && <span className="painting-module-icon-badge"><Icon /></span>}
      {module.title}
    </h2>
  );

  // light-interaction and future-home need their title inside the narrow
  // text column beside the hero photo (rather than above the full-width
  // module), so they render their own title instead of using the shared
  // placement below.
  if (module.content.type === 'light-interaction') {
    return (
      <section
        className={`painting-module painting-module--${module.type}`}
        data-layout-group={module.layoutGroup}
      >
        <Reveal>
          <LightInteractionModule content={module.content} title={titleNode} />
        </Reveal>
      </section>
    );
  }
  if (module.content.type === 'future-home') {
    return (
      <section
        className={`painting-module painting-module--${module.type}`}
        data-layout-group={module.layoutGroup}
      >
        <Reveal>
          <FutureHomeModule content={module.content} title={titleNode} />
        </Reveal>
      </section>
    );
  }
  if (module.content.type === 'installation-day') {
    return (
      <section
        className={`painting-module painting-module--${module.type}`}
        data-layout-group={module.layoutGroup}
      >
        <Reveal>
          <InstallationDayModule content={module.content} title={titleNode} />
        </Reveal>
      </section>
    );
  }

  return (
    <section
      className={`painting-module painting-module--${module.type}`}
      data-layout-group={module.layoutGroup}
    >
      <Reveal>
        {titleNode}
        <ModuleRenderer content={module.content} />
      </Reveal>
    </section>
  );
}

function ModuleRenderer({ content }: { content: ModuleContent }) {
  switch (content.type) {
    // Origin & Decision Modules
    case 'client-memory':
      return <ClientMemoryModule content={content} />;
    case 'the-brief':
      return <TheBriefModule content={content} />;
    case 'reference-evolution':
      return <ReferenceEvolutionModule content={content} />;
    case 'artists-initial-reaction':
      return <ArtistsInitialReactionModule content={content} />;
    case 'the-moment-of-yes':
      return <TheMomentOfYesModule content={content} />;
    case 'family-connection':
      return <FamilyConnectionModule content={content} />;
    case 'occasion-context':
      return <OccasionContextModule content={content} />;
    case 'space-problem':
      return <SpaceProblemModule content={content} />;

    // Process & Tension Modules
    case 'failed-experiments':
      return <FailedExperimentsModule content={content} />;
    case 'the-problem':
      return <TheProblemModule content={content} />;
    case 'the-solution':
      return <TheSolutionModule content={content} />;
    case 'material-choice':
      return <MaterialChoiceModule content={content} />;
    case 'color-decisions':
      return <ColorDecisionsModule content={content} />;
    case 'technique-challenge':
      return <TechniqueChallengeModule content={content} />;
    case 'scale-struggle':
      return <ScaleStruggleModule content={content} />;
    case 'light-study':
      return <LightStudyModule content={content} />;

    // Decision Documentation Modules
    case 'artists-notebook':
      return <ArtistsNotebookModule content={content} />;
    case 'reference-board':
      return <ReferenceBoardModule content={content} />;
    case 'color-tests':
      return <ColorTestsModule content={content} />;
    case 'composition-studies':
      return <CompositionStudiesModule content={content} />;
    case 'process-timeline':
      return <ProcessTimelineModule content={content} />;
    case 'the-almost':
      return <TheAlmostModule content={content} />;
    case 'mid-course-change':
      return <MidCourseChangeModule content={content} />;
    case 'client-collaboration':
      return <ClientCollaborationModule content={content} />;

    // Physicality & Artifact Modules
    case 'the-palette-used':
      return <ThePaletteUsedModule content={content} />;
    case 'brush-choices':
      return <BrushChoicesModule content={content} />;
    case 'surface-preparation':
      return <SurfacePreparationModule content={content} />;
    case 'studio-conditions':
      return <StudioConditionsModule content={content} />;
    case 'paint-stains':
      return <PaintStainsModule content={content} />;
    case 'drying-process':
      return <DryingProcessModule content={content} />;
    case 'framing-decision':
      return <FramingDecisionModule content={content} />;

    // Detail & Symbolism Modules
    case 'hidden-symbolism':
      return <HiddenSymbolismModule content={content} />;
    case 'details-people-almost-miss':
      return <DetailsPeopleAlmostMissModule content={content} />;
    case 'color-psychology':
      return <ColorPsychologyModule content={content} />;
    case 'cultural-references':
      return <CulturalReferencesModule content={content} />;
    case 'personal-easter-eggs':
      return <PersonalEasterEggsModule content={content} />;
    case 'technique-details':
      return <TechniqueDetailsModule content={content} />;

    // Installation & Living Modules
    case 'installation-day':
      return <InstallationDayModule content={content} />;
    case 'room-transformation':
      return <RoomTransformationModule content={content} />;
    case 'living-observations':
      return <LivingObservationsModule content={content} />;
    case 'time-based-updates':
      return <TimeBasedUpdatesModule content={content} />;
    case 'owners-ritual':
      return <OwnersRitualModule content={content} />;
    case 'light-interaction':
      return <LightInteractionModule content={content} />;
    case 'seasonal-changes':
      return <SeasonalChangesModule content={content} />;

    // Future & Possibility Modules
    case 'future-home':
      return <FutureHomeModule content={content} />;
    case 'ideal-owner':
      return <IdealOwnerModule content={content} />;
    case 'potential-placements':
      return <PotentialPlacementsModule content={content} />;
    case 'light-scenarios':
      return <LightScenariosModule content={content} />;
    case 'companion-pieces':
      return <CompanionPiecesModule content={content} />;

    // Journal Integration Modules
    case 'studio-journal-chronology':
      return <StudioJournalChronologyModule content={content} />;
    case 'behind-the-scenes':
      return <BehindTheScenesModule content={content} />;
    case 'technical-journal':
      return <TechnicalJournalModule content={content} />;
    case 'client-journal':
      return <ClientJournalModule content={content} />;

    default:
      return <div className="painting-module-unknown">Unknown module type</div>;
  }
}
