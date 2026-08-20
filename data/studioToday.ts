/**
 * StudioTodayItem — a single live activity entry for the "Today at the Studio" strip.
 *
 * Update these whenever something real happens in the studio.
 * Keep 4–6 items. The strip scrolls horizontally on mobile.
 *
 * @property id       - Unique key (used as React key)
 * @property emoji    - Single emoji shown as the item icon
 * @property title    - Short two-line label (use \n to split lines)
 * @property time     - Time string shown below the title, e.g. "10:30 AM"
 * @property href     - Optional internal link (e.g. to a journal entry)
 */
export type StudioTodayItem = {
  id: string;
  emoji: string;
  title: string;
  time: string;
  href?: string;
};

/**
 * Live studio activity items. Edit this list to keep the strip current.
 * Displayed left-to-right in the order listed here.
 */
export const studioTodayItems: StudioTodayItem[] = [
  {
    id: "fabric-wash",
    emoji: "🎨",
    title: "Fabric wash test\ncompleted",
    time: "Research update",
    href: "/journal/textile-fabric-research-begins",
  },
  {
    id: "bhavya-lesson",
    emoji: "👩‍🎨",
    title: "Bhavya finished\nLesson 8",
    time: "Academy update",
    href: "/journal/bhavya-first-week",
  },
  {
    id: "commission-delivered",
    emoji: "🖼",
    title: "New commission\ndelivered",
    time: "Commission update",
  },
  {
    id: "journal-updated",
    emoji: "📖",
    title: "Studio Journal\nupdated today",
    time: "Journal note",
    href: "/journal",
  },
  {
    id: "village-landscape",
    emoji: "🌿",
    title: "Working on a new\nvillage landscape",
    time: "In progress",
  },
];

/**
 * Last-updated label shown next to the "TODAY AT THE STUDIO" heading.
 * Update whenever you refresh the items above.
 */
export const studioTodayUpdated = "Updated 2 hours ago";
