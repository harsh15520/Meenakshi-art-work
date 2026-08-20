/**
 * Narrative Module Types for Painting Micro-Documentaries
 *
 * A library of 60 narrative building blocks:
 * - 53 narrative modules (content chapters)
 * - 7 signature interactions (unique per-painting mechanics)
 *
 * Each painting selects 6–10 narrative modules that fit its specific story.
 */

/** Where the painting lives in the collection — drives module selection patterns */
export type StoryContext = 'commission' | 'gallery' | 'student';

/** Eight module categories in the library */
export type ModuleCategory =
  | 'origin-decision'
  | 'process-tension'
  | 'decision-documentation'
  | 'physicality-artifact'
  | 'detail-symbolism'
  | 'installation-living'
  | 'future-possibility'
  | 'journal-integration';

// Module type identifiers
export type NarrativeModuleType =
  // Origin & Decision Modules
  | 'client-memory'
  | 'the-brief'
  | 'reference-evolution'
  | 'artists-initial-reaction'
  | 'the-moment-of-yes'
  | 'family-connection'
  | 'occasion-context'
  | 'space-problem'
  
  // Process & Tension Modules
  | 'failed-experiments'
  | 'the-problem'
  | 'the-solution'
  | 'material-choice'
  | 'color-decisions'
  | 'technique-challenge'
  | 'scale-struggle'
  | 'light-study'
  
  // Decision Documentation Modules
  | 'artists-notebook'
  | 'reference-board'
  | 'color-tests'
  | 'composition-studies'
  | 'process-timeline'
  | 'the-almost'
  | 'mid-course-change'
  | 'client-collaboration'
  
  // Physicality & Artifact Modules
  | 'the-palette-used'
  | 'brush-choices'
  | 'surface-preparation'
  | 'studio-conditions'
  | 'paint-stains'
  | 'drying-process'
  | 'framing-decision'
  
  // Detail & Symbolism Modules
  | 'hidden-symbolism'
  | 'details-people-almost-miss'
  | 'color-psychology'
  | 'cultural-references'
  | 'personal-easter-eggs'
  | 'technique-details'
  
  // Installation & Living Modules
  | 'installation-day'
  | 'room-transformation'
  | 'living-observations'
  | 'time-based-updates'
  | 'owners-ritual'
  | 'light-interaction'
  | 'seasonal-changes'
  
  // Future & Possibility Modules (Gallery-specific)
  | 'future-home'
  | 'ideal-owner'
  | 'potential-placements'
  | 'light-scenarios'
  | 'companion-pieces'
  
  // Journal Integration Modules
  | 'studio-journal-chronology'
  | 'behind-the-scenes'
  | 'technical-journal'
  | 'client-journal';

// Emotional signature types for different painting personalities
export type EmotionalSignature =
  | 'sacred'      // Krishna: Sacred, Golden, Morning, Light
  | 'protective'  // Tiger: Warm, Protective, Heavy, Grounded
  | 'free'        // Mountain: Open, Air, Freedom, Distance
  | 'tender'      // Mother & Child: Soft, Close, Tender, Intimate
  | 'grounded'    // Rural: Earth, Warm, Stable, Rooted
  | 'airy'        // Landscape: Light, Breezy, Expansive, Distant
  | 'intense'     // Pop: Bold, Graphic, Modern, Striking
  | 'quiet'       // Graphite: Subtle, Detailed, Intimate, Precise;

// Content structures for each module type
export type ModuleContent =
  | ClientMemoryContent
  | TheBriefContent
  | ReferenceEvolutionContent
  | ArtistsInitialReactionContent
  | TheMomentOfYesContent
  | FamilyConnectionContent
  | OccasionContextContent
  | SpaceProblemContent
  | FailedExperimentsContent
  | TheProblemContent
  | TheSolutionContent
  | MaterialChoiceContent
  | ColorDecisionsContent
  | TechniqueChallengeContent
  | ScaleStruggleContent
  | LightStudyContent
  | ArtistsNotebookContent
  | ReferenceBoardContent
  | ColorTestsContent
  | CompositionStudiesContent
  | ProcessTimelineContent
  | TheAlmostContent
  | MidCourseChangeContent
  | ClientCollaborationContent
  | ThePaletteUsedContent
  | BrushChoicesContent
  | SurfacePreparationContent
  | StudioConditionsContent
  | PaintStainsContent
  | DryingProcessContent
  | FramingDecisionContent
  | HiddenSymbolismContent
  | DetailsPeopleAlmostMissContent
  | ColorPsychologyContent
  | CulturalReferencesContent
  | PersonalEasterEggsContent
  | TechniqueDetailsContent
  | InstallationDayContent
  | RoomTransformationContent
  | LivingObservationsContent
  | TimeBasedUpdatesContent
  | OwnersRitualContent
  | LightInteractionContent
  | SeasonalChangesContent
  | FutureHomeContent
  | IdealOwnerContent
  | PotentialPlacementsContent
  | LightScenariosContent
  | CompanionPiecesContent
  | StudioJournalChronologyContent
  | BehindTheScenesContent
  | TechnicalJournalContent
  | ClientJournalContent;

// Origin & Decision Module Contents
export interface ClientMemoryContent {
  type: 'client-memory';
  text: string;
  audio?: string;
  clientName?: string;
  heroImage?: string;
  intro?: string;
  omRakhiImage?: string;
  paperCuttingImage?: string;
}

export interface TheBriefContent {
  type: 'the-brief';
  originalRequest: string;
  clientWords?: string;
}

export interface ReferenceEvolutionContent {
  type: 'reference-evolution';
  references: Array<{
    image: string;
    caption: string;
    rejected: boolean;
    reason?: string;
  }>;
  studyThumbnails?: string[];
}

export interface ArtistsInitialReactionContent {
  type: 'artists-initial-reaction';
  reaction: string;
  firstThoughts: string;
}

export interface TheMomentOfYesContent {
  type: 'the-moment-of-yes';
  moment: string;
  whatChanged: string;
}

export interface FamilyConnectionContent {
  type: 'family-connection';
  connection: string;
  generations?: string;
}

export interface OccasionContextContent {
  type: 'occasion-context';
  occasion: string;
  significance: string;
}

export interface SpaceProblemContent {
  type: 'space-problem';
  problem: string;
  howPaintingSolvedIt: string;
}

// Process & Tension Module Contents
export interface FailedExperimentsContent {
  type: 'failed-experiments';
  experiments: Array<{
    version: string;
    image?: string;
    description: string;
    rejected: boolean;
    reason: string;
  }>;
}

export interface TheProblemContent {
  type: 'the-problem';
  problem: string;
  whyItMattered: string;
  pullQuote?: string;
}

export interface TheSolutionContent {
  type: 'the-solution';
  solution: string;
  howWeGotThere: string;
}

export interface MaterialChoiceContent {
  type: 'material-choice';
  material: string;
  whyThisMaterial: string;
  alternativesConsidered: string[];
}

export interface ColorDecisionsContent {
  type: 'color-decisions';
  palette: Array<{
    color: string;
    role: string;
    reasoning: string;
  }>;
}

export interface TechniqueChallengeContent {
  type: 'technique-challenge';
  challenge: string;
  solution: string;
  learned: string;
}

export interface ScaleStruggleContent {
  type: 'scale-struggle';
  challenge: string;
  adaptation: string;
}

export interface LightStudyContent {
  type: 'light-study';
  lightConditions: Array<{
    condition: string;
    image: string;
    effect: string;
  }>;
}

// Decision Documentation Module Contents
export interface ArtistsNotebookContent {
  type: 'artists-notebook';
  entries: Array<{
    sketch: string;
    notes: string;
    date?: string;
  }>;
  heroImage?: string;
  intro?: string;
  closingLine?: string;
}

export interface ReferenceBoardContent {
  type: 'reference-board';
  references: Array<{
    image: string;
    caption: string;
    influence: string;
  }>;
}

export interface ColorTestsContent {
  type: 'color-tests';
  tests: Array<{
    image: string;
    description: string;
    chosen: boolean;
  }>;
}

export interface CompositionStudiesContent {
  type: 'composition-studies';
  studies: Array<{
    image: string;
    description: string;
    rejected: boolean;
    reason?: string;
  }>;
}

export interface ProcessTimelineContent {
  type: 'process-timeline';
  timeline: Array<{
    date: string;
    milestone: string;
    description: string;
    image?: string;
  }>;
}

export interface TheAlmostContent {
  type: 'the-almost';
  whatAlmostHappened: string;
  whyItChanged: string;
}

export interface MidCourseChangeContent {
  type: 'mid-course-change';
  originalDirection: string;
  whatTriggeredChange: string;
  newDirection: string;
}

export interface ClientCollaborationContent {
  type: 'client-collaboration';
  moments: Array<{
    moment: string;
    clientInput: string;
    howItChangedTheWork: string;
  }>;
}

// Physicality & Artifact Module Contents
export interface ThePaletteUsedContent {
  type: 'the-palette-used';
  materials: Array<{
    material: string;
    brand?: string;
    why: string;
  }>;
  image?: string;
}

export interface BrushChoicesContent {
  type: 'brush-choices';
  brushes: Array<{
    brush: string;
    use: string;
    why: string;
  }>;
}

export interface SurfacePreparationContent {
  type: 'surface-preparation';
  process: string[];
  image?: string;
}

export interface StudioConditionsContent {
  type: 'studio-conditions';
  timeOfDay: string;
  environment: string;
  music?: string;
  duration: string;
}

export interface PaintStainsContent {
  type: 'paint-stains';
  description: string;
  image?: string;
}

export interface DryingProcessContent {
  type: 'drying-process';
  process: string;
  howItAffectedTheWork: string;
}

export interface FramingDecisionContent {
  type: 'framing-decision';
  frameChoice: string;
  reasoning: string;
  alternativesConsidered: string[];
}

// Detail & Symbolism Module Contents
export interface HiddenSymbolismContent {
  type: 'hidden-symbolism';
  symbols: Array<{
    element: string;
    meaning: string;
    image?: string;
    coordinates?: { x: number; y: number };
  }>;
}

export interface DetailsPeopleAlmostMissContent {
  type: 'details-people-almost-miss';
  details: Array<{
    element: string;
    story: string;
    image: string;
    coordinates?: { x: number; y: number };
  }>;
}

export interface ColorPsychologyContent {
  type: 'color-psychology';
  colors: Array<{
    color: string;
    psychologicalEffect: string;
  }>;
}

export interface CulturalReferencesContent {
  type: 'cultural-references';
  references: Array<{
    reference: string;
    connection: string;
  }>;
}

export interface PersonalEasterEggsContent {
  type: 'personal-easter-eggs';
  eggs: Array<{
    element: string;
    meaning: string;
  }>;
}

export interface TechniqueDetailsContent {
  type: 'technique-details';
  techniques: Array<{
    technique: string;
    how: string;
    why: string;
  }>;
}

// Installation & Living Module Contents
export interface InstallationDayContent {
  type: 'installation-day';
  narrative: string;
  time?: string;
  images?: string[];
  heroImage?: string;
  emblemImage?: string;
}

export interface RoomTransformationContent {
  type: 'room-transformation';
  before: string;
  after: string;
  beforeImage?: string;
  afterImage?: string;
}

export type LivingObservationItem =
  | string
  | { text: string; icon?: 'pin' | 'flower' | 'temple'; image?: string };

export interface LivingObservationsContent {
  type: 'living-observations';
  observations: LivingObservationItem[];
}

export interface TimeBasedUpdatesContent {
  type: 'time-based-updates';
  updates: Array<{
    date: string;
    observation: string;
    image?: string;
  }>;
  intro?: string;
  closingLeft?: string;
  closingRight?: string;
}

export interface OwnersRitualContent {
  type: 'owners-ritual';
  ritual: string;
  howItDeveloped: string;
}

export interface LightInteractionContent {
  type: 'light-interaction';
  description: string;
  heroImage?: string;
  closingLine?: string;
  timesOfDay?: Array<{
    time: string;
    effect: string;
    headline?: string;
    image?: string;
  }>;
}

export interface SeasonalChangesContent {
  type: 'seasonal-changes';
  seasons: Array<{
    season: string;
    effect: string;
  }>;
}

// Future & Possibility Module Contents
export type FutureHomeSetting =
  | string
  | { label: string; image?: string; icon?: 'sofa' | 'book' | 'star' };

export interface FutureHomeContent {
  type: 'future-home';
  imaginedContext: string;
  heroImage?: string;
  pullQuote?: string;
  potentialSettings?: FutureHomeSetting[];
}

export type IdealOwnerTrait =
  | string
  | { label: string; icon?: 'sun' | 'people' | 'lotus' };

export interface IdealOwnerContent {
  type: 'ideal-owner';
  description: string;
  heroImage?: string;
  pullQuote?: string;
  traits?: IdealOwnerTrait[];
}

export interface PotentialPlacementsContent {
  type: 'potential-placements';
  placements: Array<{
    room: string;
    why: string;
  }>;
}

export interface LightScenariosContent {
  type: 'light-scenarios';
  scenarios: Array<{
    scenario: string;
    effect: string;
  }>;
}

export interface CompanionPiecesContent {
  type: 'companion-pieces';
  companions: Array<{
    type: string;
    why: string;
  }>;
}

// Journal Integration Module Contents
export interface StudioJournalChronologyContent {
  type: 'studio-journal-chronology';
  entries: Array<{
    journalSlug: string;
    title: string;
    timestamp: string;
    preview: string;
  }>;
}

export interface BehindTheScenesContent {
  type: 'behind-the-scenes';
  entries: Array<{
    journalSlug: string;
    title: string;
    relevance: string;
  }>;
}

export interface TechnicalJournalContent {
  type: 'technical-journal';
  entries: Array<{
    journalSlug: string;
    title: string;
    technique: string;
  }>;
}

export interface ClientJournalContent {
  type: 'client-journal';
  entries: Array<{
    journalSlug: string;
    title: string;
    relationshipMoment: string;
  }>;
}

// Combined narrative module structure
export type NarrativeModuleIconKey = 'paw' | 'sun' | 'frame' | 'gaze' | 'clock' | 'om' | 'crown' | 'marigold' | 'temple' | 'lotus' | 'heart';

export interface NarrativeModule {
  type: NarrativeModuleType;
  title: string; // Custom chapter heading for this specific painting
  content: ModuleContent;
  order: number; // Display order on the page
  icon?: NarrativeModuleIconKey;
  layoutGroup?: string;
}

// Signature interaction types
export type SignatureInteractionType =
  | 'light-simulator'
  | 'ambient-sound'
  | 'artist-commentary'
  | 'season-switch'
  | 'detail-explorer'
  | 'before-after-slider'
  | 'color-palette-explorer';

export interface LightSimulatorData {
  timeStates: { time: string; description: string; image: string }[];
}

export interface AmbientSoundData {
  sounds: { type: string; description: string; synth?: 'wind' | 'birds' | 'leaves' }[];
}

export interface BeforeAfterSliderData {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
}

export interface SeasonSwitchData {
  seasons: { season: string; description: string; image: string }[];
}

export interface DetailExplorerData {
  details: { element: string; story: string; image: string; coordinates?: { x: number; y: number } }[];
}

export interface ArtistCommentaryData {
  text: string;
  context?: string;
  attribution?: string;
}

export interface ColorPaletteExplorerData {
  colors: { color: string; name?: string; role: string; reasoning: string }[];
}

export type SignatureInteractionData =
  | LightSimulatorData
  | AmbientSoundData
  | BeforeAfterSliderData
  | SeasonSwitchData
  | DetailExplorerData
  | ArtistCommentaryData
  | ColorPaletteExplorerData;

export interface SignatureInteraction {
  type: SignatureInteractionType;
  data: SignatureInteractionData; // Shape varies by interaction type — narrow with a cast keyed to `type`
}
