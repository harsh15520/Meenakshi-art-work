import { describe, it, expect } from "vitest";
import {
  journalEntries,
  journalThreads,
  getJournalEntry,
  getThread,
  getEntriesForThread,
  getActiveThreads,
  getCompletedThreads,
  getAllTags,
  getMentionCounts,
  getJournalStats,
  getLatestActiveCommission,
  getLatestAcademyUpdate,
  getLatestGalleryEntry,
  getLatestStudioUpdate,
} from "../data/journal";
import { paintingStories, getAllPaintingStories, getPaintingStory, getRelatedPaintingStories } from "../data/paintingStories";
import { getJournalPerson, journalPeople } from "../data/journalPeople";

describe("slug indexes (T1) — O(1) lookups match prior .find behavior", () => {
  it("getJournalEntry returns the same object as a linear scan", () => {
    for (const e of journalEntries.slice(0, 5)) {
      expect(getJournalEntry(e.slug)).toBe(e);
    }
    expect(getJournalEntry("does-not-exist")).toBeUndefined();
  });

  it("getThread returns the same object as a linear scan", () => {
    for (const t of journalThreads.slice(0, 3)) {
      expect(getThread(t.slug)).toBe(t);
    }
    expect(getThread("does-not-exist")).toBeUndefined();
  });

  it("getPaintingStory returns the same object as a linear scan", () => {
    const all = getAllPaintingStories();
    for (const s of all.slice(0, 5)) {
      expect(getPaintingStory(s.slug)).toBe(s);
    }
    expect(getPaintingStory("does-not-exist")).toBeUndefined();
  });

  it("getJournalPerson returns the same object as a linear scan", () => {
    for (const p of journalPeople.slice(0, 3)) {
      expect(getJournalPerson(p.slug)).toBe(p);
    }
  });
});

describe("graph/adjacency indexes (T3) — match prior filtered scans", () => {
  it("getEntriesForThread matches journalEntries.filter by threadSlug", () => {
    for (const t of journalThreads) {
      const indexed = getEntriesForThread(t.slug).map((e) => e.slug).sort();
      const scanned = journalEntries
        .filter((e) => e.threadSlug === t.slug)
        .map((e) => e.slug)
        .sort();
      expect(indexed).toEqual(scanned);
    }
    expect(getEntriesForThread("no-such-thread")).toEqual([]);
  });

  it("getRelatedPaintingStories matches the prior nested module scan", () => {
    const all = getAllPaintingStories();
    for (const entry of journalEntries) {
      const indexed = getRelatedPaintingStories(entry.slug)
        .map((s) => s.slug)
        .sort();
      const scanned = paintingStories
        .filter((story) =>
          story.modules.some((module) => {
            const content = module.content as Record<string, any>;
            const entries = content?.entries;
            return Array.isArray(entries) && entries.some((en: any) => en?.journalSlug === entry.slug);
          })
        )
        .map((s) => s.slug)
        .sort();
      expect(indexed).toEqual(scanned);
    }
  });
});

describe("memoization (T2) — derived data is stable across calls", () => {
  it("getAllTags returns the same reference on repeated calls", () => {
    expect(getAllTags()).toBe(getAllTags());
    expect(Array.isArray(getAllTags())).toBe(true);
  });

  it("getMentionCounts returns the same reference on repeated calls", () => {
    expect(getMentionCounts()).toBe(getMentionCounts());
  });

  it("getJournalStats returns the same reference on repeated calls", () => {
    expect(getJournalStats()).toBe(getJournalStats());
  });

  it("getActiveThreads / getCompletedThreads are stable references", () => {
    expect(getActiveThreads()).toBe(getActiveThreads());
    expect(getCompletedThreads()).toBe(getCompletedThreads());
  });

  it("getLatest* helpers are deterministic and match a fresh sort", () => {
    const byDateDesc = [...journalEntries].sort(
      (a, b) => new Date(b.publishedOn).getTime() - new Date(a.publishedOn).getTime()
    );
    expect(getLatestActiveCommission()).toBe(
      byDateDesc.find((e) => e.stream === "commission" && e.status === "active")
    );
    expect(getLatestAcademyUpdate()).toBe(byDateDesc.find((e) => e.stream === "academy"));
    expect(getLatestStudioUpdate()).toBe(byDateDesc.find((e) => e.stream === "studio"));
    expect(getLatestGalleryEntry()).toBe(byDateDesc.find((e) => e.stream === "gallery"));
    expect(getLatestGalleryEntry("active")).toBe(
      byDateDesc.find((e) => e.stream === "gallery" && e.status === "active")
    );
  });

  it("getAllPaintingStories is memoized", () => {
    expect(getAllPaintingStories()).toBe(getAllPaintingStories());
  });
});
