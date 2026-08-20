import {
  JournalCategory,
  STUDIO_STATUS,
  CADENCE_NOTES,
  getLatestEntryPreview,
  journalEntries,
  journalThreads,
  type JournalEntry,
} from "@/data/journal";
import {
  getCommentPersonName,
  getLatestComments,
  getTrendingEntries,
} from "@/data/journalComments";
import {
  BusinessInsightIcon,
  JourneyDiaryIcon,
  StudentStoryIcon,
  BehindScenesIcon,
  PastProjectIcon,
  FindYourselfIcon,
  BookIcon,
  EaselIcon,
  PeopleGroupIcon,
  UpdatedCalendarIcon,
  ArrowRightIcon,
} from "@/components/JournalIcons";

export type SectionIcon = React.ComponentType;

export const CATEGORY_ENTRY_POINTS: { category: JournalCategory; label: string; description: string; Icon: SectionIcon }[] = [
  {
    category: "business-insight",
    label: "Business Insight",
    description: "How commissions come in, get priced, and sometimes get turned down.",
    Icon: BusinessInsightIcon,
  },
  {
    category: "journey-diary",
    label: "Journey Diary",
    description: "First-person reflections on running a small studio.",
    Icon: JourneyDiaryIcon,
  },
  {
    category: "student-story",
    label: "Student Story",
    description: "Where each academy student is in their own journey.",
    Icon: StudentStoryIcon,
  },
  {
    category: "behind-the-scenes",
    label: "Behind the Scenes",
    description: "Quick snapshots from inside the studio.",
    Icon: BehindScenesIcon,
  },
  {
    category: "past-project",
    label: "Past Project",
    description: "Commissions and school assistance work, completed and documented.",
    Icon: PastProjectIcon,
  },
];

export const CATEGORY_LABELS: Record<JournalCategory, string> = {
  "business-insight": "Business Insight",
  "journey-diary": "Journey Diary",
  "student-story": "Student Story",
  "behind-the-scenes": "Behind the Scenes",
  "past-project": "Past Project",
};

export const STATS_ICONS = {
  book: BookIcon,
  easel: EaselIcon,
  people: PeopleGroupIcon,
  calendar: UpdatedCalendarIcon,
  arrowRight: ArrowRightIcon,
  findYourself: FindYourselfIcon,
};

export function relativeUpdatedLabel(dateStr: string) {
  const days = Math.floor((Date.now() - new Date(dateStr).getTime()) / 86400000);
  if (days <= 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 30) return `${days} days ago`;
  const months = Math.floor(days / 30);
  return `${months} ${months === 1 ? "month" : "months"} ago`;
}

export function getLatestEntryPreviewFor(category: JournalCategory) {
  return getLatestEntryPreview(category);
}

const trendingCache = new Map<number, ReturnType<typeof getTrendingEntries>>();

export function getTrending(limit: number): ReturnType<typeof getTrendingEntries> {
  const cached = trendingCache.get(limit);
  if (cached) return cached;
  const result = getTrendingEntries(journalEntries, journalThreads, limit);
  trendingCache.set(limit, result);
  return result;
}

const latestCommentsCache = new Map<number, ReturnType<typeof getLatestComments>>();

export function getLatestCommentsFor(page = 1) {
  const cached = latestCommentsCache.get(page);
  if (cached) return cached;
  const result = getLatestComments(page);
  latestCommentsCache.set(page, result);
  return result;
}

export function getCommenterName(comment: Parameters<typeof getCommentPersonName>[0]) {
  return getCommentPersonName(comment);
}

export function getEntryPreview(entry: JournalEntry) {
  const processFirstCategories = new Set(["business-insight", "journey-diary", "behind-the-scenes"]);
  const leadImage = entry.images?.[0];

  if (processFirstCategories.has(entry.category) && leadImage?.src) {
    return {
      src: leadImage.src,
      alt: leadImage.alt || entry.title,
    };
  }

  return {
    src: entry.coverImage || leadImage?.src,
    alt: entry.coverImage ? entry.title : leadImage?.alt || entry.title,
  };
}

export { STUDIO_STATUS, CADENCE_NOTES, ArrowRightIcon };
