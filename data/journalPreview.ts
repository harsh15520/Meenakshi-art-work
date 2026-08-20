import { journalEntries, type JournalEntry } from "./journal";

/**
 * JournalPreviewCard - A journal entry prepared for the homepage editorial strip.
 *
 * @property entry - The underlying journal entry
 * @property displayOrder - Zero-based order of appearance in the strip
 * @property featured - Whether this card should receive featured styling (first card)
 */
export interface JournalPreviewCard {
  entry: JournalEntry;
  displayOrder: number;
  featured: boolean;
}

/**
 * Returns the most recently published journal entries formatted for the editorial strip.
 *
 * @param count - Number of cards to return (default: 3)
 * @returns Array of preview cards sorted newest-first
 */
export function getJournalPreviewCards(count: number = 3): JournalPreviewCard[] {
  const sorted = [...journalEntries]
    .sort((a, b) => new Date(b.publishedOn).getTime() - new Date(a.publishedOn).getTime())
    .slice(0, count);

  return sorted.map((entry, index) => ({
    entry,
    displayOrder: index,
    featured: index === 0,
  }));
}
