import { describe, it, expect } from "vitest";
import {
  journalEntries,
  journalThreads,
  getEntriesByCategory,
  getEntriesByTag,
  getEntriesByPerson,
  getEntriesForThreadSorted,
  getThreadNavigation,
  getNextEntryInCategory,
  getLatestEntries,
  getLatestEntryPreview,
  type JournalCategory,
} from "../data/journal";
import {
  getAllPaintingStories,
  getPaintingStoryByPieceId,
} from "../data/paintingStories";
import {
  getExhibitionPieceByTitle,
  getExhibitionPieceStoryHref,
  getExhibitionPiecesByRoom,
  getExhibitionRoomByTitle,
  galleryExhibitionImages,
  customOrdersExhibitionImages,
  type ExhibitionPiece,
} from "../data/exhibitionImages";
import {
  curriculumPhases,
  getCurriculumPhase,
  getNextCurriculumPhase,
  getPrevCurriculumPhase,
  getReflectionForPhase,
  curriculumCanvasReflections,
} from "../data/curriculum";
import {
  founderNotes,
  getFounderNoteById,
  getFounderNotesByCategory,
  type FounderNote,
} from "../data/founderNotes";

// A tiny local slug helper mirroring lib/paintingStorySlug for the href test.
describe("T1 — O(1) Hash Map lookups match prior linear-scan behavior", () => {
  it("getCurriculumPhase returns the same object as a linear scan", () => {
    for (const p of curriculumPhases) {
      expect(getCurriculumPhase(p.num)).toBe(p);
    }
    expect(getCurriculumPhase("99")).toBeUndefined();
  });

  it("getReflectionForPhase matches curriculumCanvasReflections.find by phaseNum", () => {
    for (const r of curriculumCanvasReflections) {
      expect(getReflectionForPhase(r.phaseNum)).toBe(r.narrative);
    }
    expect(getReflectionForPhase("missing")).toBeUndefined();
  });

  it("getNext/PrevCurriculumPhase traverse the ordered path", () => {
    for (let i = 0; i < curriculumPhases.length; i++) {
      const num = curriculumPhases[i]!.num;
      const expectedPrev = i > 0 ? curriculumPhases[i - 1] : undefined;
      const expectedNext =
        i < curriculumPhases.length - 1 ? curriculumPhases[i + 1] : undefined;
      expect(getPrevCurriculumPhase(num)).toBe(expectedPrev);
      expect(getNextCurriculumPhase(num)).toBe(expectedNext);
    }
  });

  it("getPaintingStoryByPieceId matches a manual scan by pieceId", () => {
    const all = getAllPaintingStories();
    for (const s of all) {
      const indexed = getPaintingStoryByPieceId(s.pieceId);
      if (indexed) expect(indexed).toBe(s);
    }
    expect(getPaintingStoryByPieceId("no-such-piece")).toBeUndefined();
  });

  it("getExhibitionPieceByTitle matches a flatMap + find scan", () => {
    for (const p of allExhibitionPieces.slice(0, 20)) {
      expect(getExhibitionPieceByTitle(p.title)).toBe(
        allExhibitionPieces.find((piece) => piece.title === p.title)
      );
    }
    expect(getExhibitionPieceByTitle("does-not-exist")).toBeUndefined();
  });

  it("getExhibitionPieceStoryHref preserves paintingSlug→href→slug precedence", () => {
    for (const p of allExhibitionPieces.slice(0, 30)) {
      const expected = p.paintingSlug
        ? `/painting/${p.paintingSlug}`
        : p.href || `/painting/${toSlug(p.title)}`;
      expect(getExhibitionPieceStoryHref(p)).toBe(expected);
    }
  });

  it("getFounderNoteById / getFounderNotesByCategory match linear scans", () => {
    for (const n of founderNotes) {
      expect(getFounderNoteById(n.id)).toBe(n);
    }
    const categories = new Set<FounderNote["category"] | undefined>(
      founderNotes.map((n) => n.category)
    );
    for (const c of categories) {
      if (!c) continue;
      expect(getFounderNotesByCategory(c)).toEqual(
        founderNotes.filter((n) => n.category === c)
      );
    }
    expect(getFounderNoteById("missing")).toBeUndefined();
  });

  it("getLatestEntryPreview matches a category-sorted first title", () => {
    const cats: JournalCategory[] = [
      "business-insight",
      "journey-diary",
      "student-story",
      "behind-the-scenes",
      "past-project",
    ];
    for (const cat of cats) {
      const expected =
        [...journalEntries]
          .filter((e) => e.category === cat)
          .sort(
            (a, b) =>
              new Date(b.publishedOn).getTime() - new Date(a.publishedOn).getTime()
          )[0]?.title ?? "A new story is on the way.";
      expect(getLatestEntryPreview(cat)).toBe(expected);
    }
  });
});
function toSlug(title: string) {
  return title
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// All exhibition pieces (gallery + custom orders) as a flat array for scans.
const galleryExhibitionPieces: ExhibitionPiece[] = galleryExhibitionImages.flatMap(
  (r) => r.pieces ?? []
);
const customExhibitionPieces: ExhibitionPiece[] = customOrdersExhibitionImages.flatMap(
  (r) => r.pieces ?? []
);
const allExhibitionPieces: ExhibitionPiece[] = [
  ...galleryExhibitionPieces,
  ...customExhibitionPieces,
];
describe("T3 — Inverted indexes match prior filtered scans", () => {
  it("getEntriesByCategory matches journalEntries.filter by category", () => {
    const cats = new Set(journalEntries.map((e) => e.category));
    for (const cat of cats) {
      const indexed = getEntriesByCategory(cat).map((e) => e.slug).sort();
      const scanned = journalEntries
        .filter((e) => e.category === cat)
        .map((e) => e.slug)
        .sort();
      expect(indexed).toEqual(scanned);
    }
  });

  it("getEntriesByTag matches journalEntries.filter by tags.includes", () => {
    const tags = new Set<string>();
    journalEntries.forEach((e) => e.tags.forEach((t) => tags.add(t)));
    for (const tag of tags) {
      const indexed = getEntriesByTag(tag).map((e) => e.slug).sort();
      const scanned = journalEntries
        .filter((e) => e.tags.includes(tag))
        .map((e) => e.slug)
        .sort();
      expect(indexed).toEqual(scanned);
    }
  });

  it("getEntriesByPerson matches journalEntries.filter by mentionedPeople.includes", () => {
    const persons = new Set<string>();
    journalEntries.forEach((e) => e.mentionedPeople.forEach((p) => persons.add(p)));
    for (const person of persons) {
      const indexed = getEntriesByPerson(person).map((e) => e.slug).sort();
      const scanned = journalEntries
        .filter((e) => e.mentionedPeople.includes(person))
        .map((e) => e.slug)
        .sort();
      expect(indexed).toEqual(scanned);
    }
  });

  it("getEntriesForThreadSorted matches a redundant re-sort of filter", () => {
    for (const t of journalThreads) {
      const indexed = getEntriesForThreadSorted(t.slug).map((e) => e.slug);
      const scanned = journalEntries
        .filter((e) => e.threadSlug === t.slug)
        .sort(
          (a, b) =>
            new Date(b.publishedOn).getTime() - new Date(a.publishedOn).getTime()
        )
        .map((e) => e.slug);
      expect(indexed).toEqual(scanned);
    }
  });

  it("getThreadNavigation links prev/next by recency", () => {
    const sorted = [...journalThreads].sort(
      (a, b) =>
        new Date(b.statusUpdatedOn).getTime() - new Date(a.statusUpdatedOn).getTime()
    );
    sorted.forEach((t, i) => {
      const nav = getThreadNavigation(t.slug);
      expect(nav?.prev).toBe(i > 0 ? sorted[i - 1]!.slug : null);
      expect(nav?.next).toBe(i < sorted.length - 1 ? sorted[i + 1]!.slug : null);
    });
  });

  it("getExhibitionPiecesByRoom / getExhibitionRoomByTitle match room scans", () => {
    for (const piece of allExhibitionPieces) {
      const room = getExhibitionRoomByTitle(piece.title);
      if (room === undefined) continue;
      const piecesInRoom = getExhibitionPiecesByRoom(room);
      expect(piecesInRoom).toContain(getExhibitionPieceByTitle(piece.title));
      const allRoomPieces: ExhibitionPiece[] = [
        ...(galleryExhibitionImages.find((r) => r.room === room)?.pieces ?? []),
        ...(customOrdersExhibitionImages.find((r) => r.room === room)?.pieces ?? []),
      ];
      expect(allRoomPieces.some((p) => p.title === piece.title)).toBe(true);
    }
  });
});

describe("T3 — Navigation / adjacency helpers", () => {
  it("getNextEntryInCategory stays within the same category", () => {
    for (const e of journalEntries) {
      const nextSlug = getNextEntryInCategory(e.slug);
      if (nextSlug === null) continue;
      const next = journalEntries.find((x) => x.slug === nextSlug);
      expect(next).toBeDefined();
      expect(next!.category).toBe(e.category);
    }
  });

  it("getLatestEntries returns the latest n by date desc", () => {
    const byDateDesc = [...journalEntries].sort(
      (a, b) =>
        new Date(b.publishedOn).getTime() - new Date(a.publishedOn).getTime()
    );
    expect(getLatestEntries(3).map((e) => e.slug)).toEqual(
      byDateDesc.slice(0, 3).map((e) => e.slug)
    );
  });
});