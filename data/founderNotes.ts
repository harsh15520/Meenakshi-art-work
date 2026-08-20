/**
 * Founder notes data structure for personal presence feature.
 * Contains authentic, personal messages from Meenakshi that rotate randomly on each page load.
 */

export interface FounderNote {
  id: string;
  content: string;
  date?: string;
  category?: 'observation' | 'technique' | 'student' | 'philosophy';
}

/**
 * Collection of founder notes - authentic personal reflections from Meenakshi.
 * These notes rotate randomly to create a personal connection with visitors.
 */
export const founderNotes: FounderNote[] = [
  {
    id: "note-1",
    content: "Today I noticed how light changes everything in the studio.",
    category: "observation"
  },
  {
    id: "note-2", 
    content: "This week's challenge: painting without using blue.",
    category: "technique"
  },
  {
    id: "note-3",
    content: "Sometimes the best paintings come from happy accidents.",
    category: "philosophy"
  },
  {
    id: "note-4",
    content: "Watching students discover their own style never gets old.",
    category: "student"
  },
  {
    id: "note-5",
    content: "The secret to good color mixing? Patience and observation.",
    category: "technique"
  },
  {
    id: "note-6",
    content: "Every canvas teaches me something new.",
    category: "philosophy"
  },
  {
    id: "note-7",
    content: "A student's breakthrough moment is better than any finished painting.",
    category: "student"
  },
  {
    id: "note-8",
    content: "Silence in the studio is where the real work happens.",
    category: "observation"
  },
  {
    id: "note-9",
    content: "The best brushes are the ones that feel like extensions of your hand.",
    category: "technique"
  },
  {
    id: "note-10",
    content: "Art is not about perfection, it's about expression.",
    category: "philosophy"
  },
  {
    id: "note-11",
    content: "When a student finally understands composition, everything changes.",
    category: "student"
  },
  {
    id: "note-12",
    content: "Morning light in the studio has a particular magic.",
    category: "observation"
  }
];

/**
 * Gets a random founder note from the collection.
 * This is called on each page load to display a different personal message.
 * 
 * @returns A random founder note
 */
export function getRandomFounderNote(): FounderNote {
  return founderNotes[Math.floor(Math.random() * founderNotes.length)];
}

/**
 * Returns a founder note different from the one passed in (or a random one if
 * only a single note exists). Used by the "read another note" affordance so
 * the home page stays deterministic on first paint but still lets visitors
 * cycle through notes without repeats.
 */
export function getAnotherFounderNote(current?: FounderNote): FounderNote {
  if (founderNotes.length <= 1) return getRandomFounderNote();
  let next = getRandomFounderNote();
  while (current && next.id === current.id) {
    next = getRandomFounderNote();
  }
  return next;
}

/**
 * Gets a founder note by its ID.
 * T1: O(1) Map lookup instead of the prior .find() scan.
 *
 * @param id - The ID of the founder note to retrieve
 * @returns The founder note with the given ID, or undefined if not found
 */
const founderNoteById = new Map<string, FounderNote>(founderNotes.map((n) => [n.id, n]));

export function getFounderNoteById(id: string): FounderNote | undefined {
  return founderNoteById.get(id);
}

// T1: Inverted index — category → notes, so getFounderNotesByCategory is O(1)
// rather than a per-call .filter() scan.
const founderNotesByCategory = new Map<FounderNote["category"], FounderNote[]>();
for (const note of founderNotes) {
  if (!note.category) continue;
  const bucket = founderNotesByCategory.get(note.category);
  if (bucket) bucket.push(note);
  else founderNotesByCategory.set(note.category, [note]);
}

/**
 * Gets founder notes filtered by category.
 * T1: Uses the pre-built category→notes index.
 *
 * @param category - The category to filter by
 * @returns Array of founder notes in the specified category
 */
export function getFounderNotesByCategory(
  category: FounderNote["category"]
): FounderNote[] {
  return category ? founderNotesByCategory.get(category) ?? [] : [];
}