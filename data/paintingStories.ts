import { ExhibitionPiece, PaintingStory, galleryExhibitionImages, customOrdersExhibitionImages } from "./exhibitionImages";
import { NarrativeModule, EmotionalSignature } from "./narrativeModules";
import { paintingStorySlug } from "../lib/paintingStorySlug";

/**
 * Painting stories data - documentary narratives for individual paintings.
 * Each story transforms a painting from a product into a life story.
 */

import morningCornerKrishnaStory from "./paintingStories/morning-corner-krishna";
import farewellMuralSamudraStory from "./paintingStories/farewell-mural-samudra";
import tigerFamilyQuietHourStory from "./paintingStories/tiger-family-quiet-hour";
import motherAndChildBlessingStory from "./paintingStories/mother-and-child-blessing";
import radhaKrishnaGoldAndBlueStory from "./paintingStories/radha-krishna-gold-and-blue";
import villageWellBanyanStory from "./paintingStories/village-well-banyan";
import cranesAtSunsetStory from "./paintingStories/cranes-at-sunset";
import graphitePortraitStory from "./paintingStories/graphite-portrait";
import lionPopArtStory from "./paintingStories/lion-pop-art";
import elephantPatternArtStory from "./paintingStories/elephant-pattern-art";
import peacockCourtyardGateStory from "./paintingStories/peacock-courtyard-gate";
import familyKeepsakesGraphiteStory from "./paintingStories/family-keepsakes-graphite";
import occasionPortraitsWeddingStory from "./paintingStories/occasion-portraits-wedding";
import madeForTheTableStory from "./paintingStories/made-for-the-table";
import shravanabelagolaHeritageStory from "./paintingStories/shravanabelagola-heritage";
import marigoldTempleDeityStory from "./paintingStories/marigold-temple-deity";

export const paintingStories: PaintingStory[] = [
  morningCornerKrishnaStory,
  farewellMuralSamudraStory,
  tigerFamilyQuietHourStory,
  motherAndChildBlessingStory,
  radhaKrishnaGoldAndBlueStory,
  villageWellBanyanStory,
  cranesAtSunsetStory,
  graphitePortraitStory,
  lionPopArtStory,
  elephantPatternArtStory,
  peacockCourtyardGateStory,
  familyKeepsakesGraphiteStory,
  occasionPortraitsWeddingStory,
  madeForTheTableStory,
  shravanabelagolaHeritageStory,
  marigoldTempleDeityStory,
];

function fallbackSignature(piece: ExhibitionPiece, context: PaintingStory["storyContext"]): EmotionalSignature {
  if (piece.medium.toLowerCase().includes("graphite")) return "quiet";
  if (/krishna|temple|deity|apsara|mother & child/i.test(piece.title)) return "sacred";
  if (/village|well|shravanabelagola/i.test(piece.title)) return "grounded";
  if (/lion|elephant|pop/i.test(piece.title)) return "intense";
  return context === "commission" ? "tender" : "airy";
}

function createStandardStory(
  piece: ExhibitionPiece,
  room: { src: string; note?: string; wing?: string },
  context: PaintingStory["storyContext"]
): PaintingStory {
  const isCommission = context === "commission";
  const roomName = room.wing ?? "the collection";
  const title = piece.title.replace(/\s*·\s*/g, " ");

  return {
    slug: paintingStorySlug(piece.title),
    contextualTitle: title,
    pieceId: piece.title,
    storyContext: context,
    emotionalSignature: fallbackSignature(piece, context),
    openingScene: {
      image: room.src,
      narrative: isCommission
        ? `${title} began with a personal idea and became a hand-finished ${piece.medium.toLowerCase()} made for a particular place.`
        : `${title} belongs to ${roomName}, where colour, material and scale are allowed to set the mood of a room.`,
    },
    modules: [
      {
        type: "the-problem",
        title: "The intention",
        content: {
          type: "the-problem",
          problem: isCommission
            ? "The work needed to feel personal rather than generic, while remaining right for its intended space."
            : `The challenge was to give ${title} a distinct presence without overwhelming the room around it.`,
          whyItMattered: room.note ?? `The detail, scale and finish make this ${piece.medium.toLowerCase()} feel considered in real life.`,
        },
        order: 1,
      },
      {
        type: "the-solution",
        title: "How it took shape",
        content: {
          type: "the-solution",
          solution: `A ${piece.medium.toLowerCase()} at ${piece.size} gives the composition room to breathe while keeping the subject close and readable.`,
          howWeGotThere: "The final work was developed around the balance of subject, surrounding space and the small details that reward a closer look.",
        },
        order: 2,
      },
      {
        type: "future-home",
        title: isCommission ? "Made for its place" : "A place it could belong",
        content: {
          type: "future-home",
          imaginedContext: isCommission
            ? "This piece was conceived as more than an object: a lasting part of the daily life of the people who asked for it."
            : `We imagine ${title} becoming the quiet focal point of a room where people notice something new each time they pass it.`,
          potentialSettings: isCommission ? ["A meaningful personal space", "A gift-worthy setting"] : ["Living room", "Study", "Entryway"],
        },
        order: 3,
      },
      {
        type: "ideal-owner",
        title: "For someone who notices",
        content: {
          type: "ideal-owner",
          description: `${title} is for someone drawn to hand-made work, patient detail and a story that continues after the painting leaves the studio.`,
          traits: ["Values original work", "Notices detail", "Wants a personal space"],
        },
        order: 4,
      },
    ],
    inquiryMethod: "whatsapp",
  };
}

/** Every exhibition piece receives a route; bespoke stories remain unchanged. */
export function getAllPaintingStories(): PaintingStory[] {
  if (allPaintingStoriesCache) return allPaintingStoriesCache;
  const bespokeTitles = new Set(paintingStories.map((story) => story.pieceId));
  const generated: PaintingStory[] = [];
  const seen = new Set<string>();

  for (const [rooms, context] of [
    [galleryExhibitionImages, "gallery"],
    [customOrdersExhibitionImages, "commission"],
  ] as const) {
    rooms.forEach((room) => room.pieces?.forEach((piece) => {
      if (bespokeTitles.has(piece.title) || seen.has(piece.title)) return;
      seen.add(piece.title);
      generated.push(createStandardStory(piece, room, context));
    }));
  }

  const all = [...paintingStories, ...generated];
  allPaintingStoriesCache = all;
  return all;
}
let allPaintingStoriesCache: PaintingStory[] | undefined;

/** O(1) slug lookup + journalSlug adjacency, built once from the combined set. */
const storyBySlug = new Map<string, PaintingStory>();
const storiesByJournalSlug = new Map<string, PaintingStory[]>();
// T1: Context-partitioned index — avoids a full .filter() scan on every
// getPaintingStoriesByContext() call.
const storiesByContext = new Map<'commission' | 'gallery' | 'student', PaintingStory[]>();
// T1: O(1) lookup of a story by its exhibition piece title (pieceId).
const storiesByPieceId = new Map<string, PaintingStory>();
for (const story of getAllPaintingStories()) {
  storyBySlug.set(story.slug, story);
  const ctx = storiesByContext.get(story.storyContext);
  if (ctx) ctx.push(story);
  else storiesByContext.set(story.storyContext, [story]);
  if (!storiesByPieceId.has(story.pieceId)) storiesByPieceId.set(story.pieceId, story);
  for (const module of story.modules) {
    const content = module.content as Record<string, any> | undefined;
    const entries = content?.entries;
    if (!Array.isArray(entries)) continue;
    for (const entry of entries) {
      const journalSlug = entry?.journalSlug;
      if (!journalSlug) continue;
      const bucket = storiesByJournalSlug.get(journalSlug);
      if (bucket) {
        if (!bucket.includes(story)) bucket.push(story);
      } else {
        storiesByJournalSlug.set(journalSlug, [story]);
      }
    }
  }
}

/** Get one bespoke or standard painting story by its URL slug. */
export function getPaintingStory(slug: string): PaintingStory | undefined {
  return storyBySlug.get(slug);
}

/**
 * Get all painting stories for a specific context.
 * T1: Memoized — uses the pre-built context-partitioned index instead of
 * re-filtering the full combined array on every call.
 */
export function getPaintingStoriesByContext(
  context: 'commission' | 'gallery' | 'student'
): PaintingStory[] {
  return storiesByContext.get(context) ?? [];
}

/**
 * Get the story for a specific exhibition piece, by its `pieceId` (title).
 * O(1) lookup — avoids scanning every story for a matching pieceId.
 */
export function getPaintingStoryByPieceId(pieceId: string): PaintingStory | undefined {
  return storiesByPieceId.get(pieceId);
}

/**
 * Get related painting stories for a journal entry.
 * Journal connections now live inside narrative modules of type
 * 'studio-journal-chronology' / 'behind-the-scenes' / 'technical-journal'
 * / 'client-journal' — search the module content for the journal slug.
 */
export function getRelatedPaintingStories(journalSlug: string): PaintingStory[] {
  return storiesByJournalSlug.get(journalSlug) ?? [];
}
