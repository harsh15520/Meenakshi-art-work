import { describe, it, expect } from "vitest";
import {
  filterEntries,
  getJournalStats,
  getMentionCounts,
  journalEntries,
  journalThreads,
  getThread,
} from "../data/journal";

describe("getJournalStats", () => {
  it("returns correct counts for entries, categories, people, tags", () => {
    const stats = getJournalStats();

    expect(stats.totalEntries).toBe(32);

    expect(stats.activeThreads).toBe(2);
    expect(stats.completedThreads).toBe(1);

    expect(stats.studentsMentioned).toBe(12);

    expect(stats.categoryCounts).toEqual({
      "business-insight": 5,
      "journey-diary": 3,
      "student-story": 13,
      "behind-the-scenes": 5,
      "past-project": 6,
    });

    expect(stats.lastUpdated).toBeDefined();
    expect(typeof stats.lastUpdated).toBe("string");
  });
});

describe("getMentionCounts", () => {
  it("returns array with personSlug keys and numeric counts", () => {
    const counts = getMentionCounts();

    expect(Array.isArray(counts)).toBe(true);

    counts.forEach((item) => {
      expect(item).toHaveProperty("slug");
      expect(item).toHaveProperty("count");
      expect(item).toHaveProperty("person");
      expect(item).toHaveProperty("lastMentionedOn");
      expect(typeof item.slug).toBe("string");
      expect(typeof item.count).toBe("number");
      expect(typeof item.person).toBe("string");
      expect(typeof item.lastMentionedOn).toBe("string");
      expect(item.count).toBeGreaterThan(0);
    });

    const slugs = counts.map((c) => c.slug);
    expect(slugs).toContain("aarna");
    expect(slugs).toContain("bhavya-jain");
    expect(slugs).toContain("ambala-textile-client");

    const aarnaCount = counts.find((c) => c.slug === "aarna");
    expect(aarnaCount?.count).toBe(1);
  });
});

describe("filterEntries", () => {
  it("with no filters returns all entries sorted by date desc (active threads prioritized)", () => {
    const result = filterEntries({});

    expect(result.length).toBe(journalEntries.length);
    expect(result.length).toBe(32);

    const entriesWithGroup = result.map((e) => {
      const thread = e.threadSlug ? getThread(e.threadSlug) : null;
      const isActiveThread = thread?.status === "active";
      return { entry: e, isActiveThread };
    });

    const activeThreadEntries = entriesWithGroup.filter((g) => g.isActiveThread);
    const nonActiveThreadEntries = entriesWithGroup.filter((g) => !g.isActiveThread);

    expect(activeThreadEntries.length).toBeGreaterThan(0);
    expect(nonActiveThreadEntries.length).toBeGreaterThan(0);

    const firstActiveIndex = result.indexOf(activeThreadEntries[0].entry);
    const firstNonActiveIndex = result.indexOf(nonActiveThreadEntries[0].entry);
    expect(firstActiveIndex).toBeLessThan(firstNonActiveIndex);

    const lastActiveIndex = result.indexOf(
      activeThreadEntries[activeThreadEntries.length - 1].entry
    );
    expect(lastActiveIndex).toBeLessThan(firstNonActiveIndex);

    const nonActiveOnly = nonActiveThreadEntries.map((g) => g.entry);
    for (let i = 0; i < nonActiveOnly.length - 1; i++) {
      const a = nonActiveOnly[i];
      const b = nonActiveOnly[i + 1];
      expect(new Date(a.publishedOn).getTime()).toBeGreaterThanOrEqual(
        new Date(b.publishedOn).getTime()
      );
    }
  });

  it("with a category filters by category", () => {
    const studentStories = filterEntries({ category: "student-story" });

    expect(studentStories.length).toBe(13);
    studentStories.forEach((entry) => {
      expect(entry.category).toBe("student-story");
    });

    const businessInsights = filterEntries({ category: "business-insight" });
    expect(businessInsights.length).toBe(5);
    businessInsights.forEach((entry) => {
      expect(entry.category).toBe("business-insight");
    });

    const pastProjects = filterEntries({ category: "past-project" });
    expect(pastProjects.length).toBe(6);
  });

  it("with aThreadSlug prioritizes thread-related entries first", () => {
    const allResults = filterEntries({});

    const threadRelated = allResults.filter((e) => e.threadSlug !== undefined);
    const nonThreadRelated = allResults.filter((e) => e.threadSlug === undefined);

    if (threadRelated.length > 0 && nonThreadRelated.length > 0) {
      const firstThreadIndex = allResults.indexOf(threadRelated[0]);
      const firstNonThreadIndex = allResults.indexOf(nonThreadRelated[0]);

      const activeThreadRelated = threadRelated.filter(
        (e) => getThread(e.threadSlug!)?.status === "active"
      );
      if (activeThreadRelated.length > 0) {
        const firstActiveThreadIndex = allResults.indexOf(activeThreadRelated[0]);
        expect(firstActiveThreadIndex).toBeLessThan(firstNonThreadIndex);
      }
    }

    const bhavyaEntries = allResults.filter(
      (e) => e.threadSlug === "bhavya-academy-sessions"
    );
    expect(bhavyaEntries.length).toBeGreaterThan(0);
    bhavyaEntries.forEach((e) => {
      expect(e.threadSlug).toBe("bhavya-academy-sessions");
    });

    const activeThread = journalThreads.find((t) => t.slug === "textile-painting-research");
    expect(activeThread?.status).toBe("active");
    const textileEntries = allResults.filter((e) => e.threadSlug === "textile-painting-research");
    if (textileEntries.length > 0 && nonThreadRelated.length > 0) {
      const firstTextileIdx = allResults.indexOf(textileEntries[0]);
      const firstNonThreadIdx = allResults.indexOf(nonThreadRelated[0]);
      expect(firstTextileIdx).toBeLessThan(firstNonThreadIdx);
    }
  });

  it("with q search text filters by title/excerpt/tags or mentioned person", () => {
    const byTitle = filterEntries({ q: "Aarna" });
    expect(byTitle.length).toBeGreaterThan(0);
    byTitle.forEach((entry) => {
      const titleMatch = entry.title.toLowerCase().includes("aarna");
      const excerptMatch = entry.excerpt.toLowerCase().includes("aarna");
      const tagMatch = entry.tags.some((t) => t.toLowerCase().includes("aarna"));
      const personMatch = entry.mentionedPeople.includes("aarna");
      expect(titleMatch || excerptMatch || tagMatch || personMatch).toBe(true);
    });

    const byExcerpt = filterEntries({ q: "portraiture" });
    expect(byExcerpt.length).toBeGreaterThan(0);
    byExcerpt.forEach((entry) => {
      const titleMatch = entry.title.toLowerCase().includes("portraiture");
      const excerptMatch = entry.excerpt.toLowerCase().includes("portraiture");
      const tagMatch = entry.tags.some((t) => t.toLowerCase().includes("portraiture"));
      const personMatch = entry.mentionedPeople.includes("portraiture");
      expect(titleMatch || excerptMatch || tagMatch || personMatch).toBe(true);
    });

    const byTag = filterEntries({ q: "Confidence" });
    expect(byTag.length).toBeGreaterThan(0);
    byTag.forEach((entry) => {
      const titleMatch = entry.title.toLowerCase().includes("confidence");
      const excerptMatch = entry.excerpt.toLowerCase().includes("confidence");
      const tagMatch = entry.tags.some((t) => t.toLowerCase().includes("confidence"));
      const personMatch = entry.mentionedPeople.includes("confidence");
      expect(titleMatch || excerptMatch || tagMatch || personMatch).toBe(true);
    });

    const fabricSearch = filterEntries({ q: "fabric" });
    expect(fabricSearch.length).toBeGreaterThanOrEqual(1);

    const noMatch = filterEntries({ q: "zzzzzzzz-not-found-12345" });
    expect(noMatch.length).toBe(0);
  });
});
