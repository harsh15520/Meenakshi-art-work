/**
 * JournalPerson - Person referenced in journal entries.
 * 
 * @property slug - URL-friendly identifier for the person
 * @property name - Display name of the person
 * @property role - Relationship to the studio (student, client, etc.)
 * @property academySlug - Optional cross-link to ArtistProfile.slug for students with full profiles
 * @property isAnonymized - Flag indicating identity is withheld pending consent
 */
export type JournalPerson = {
  slug: string;
  name: string;
  role: "student" | "client" | "prospective-client" | "family" | "other";
  academySlug?: string; // cross-link to ArtistProfile.slug when a full profile exists
  isAnonymized?: boolean; // withheld identity pending consent
};

/**
 * Array of all people referenced in journal entries.
 * Includes students, clients, and other individuals mentioned in the studio journal.
 */
export const journalPeople: JournalPerson[] = [
  // Academy students with full profiles
  { slug: "aarna", name: "Aarna", role: "student", academySlug: "aarna" },
  { slug: "shreya", name: "Shreya", role: "student" },
  { slug: "keshav", name: "Keshav", role: "student" },
  { slug: "harsh-bansal", name: "Harsh Bansal", role: "student" },
  { slug: "prisha", name: "Prisha", role: "student" },
  { slug: "veenu", name: "Veenu", role: "student" },
  { slug: "megha", name: "Megha", role: "student" },
  { slug: "snigdha", name: "Snigdha", role: "student" },
  { slug: "jhanvi", name: "Jhanvi", role: "student" },
  { slug: "meren", name: "Meren", role: "student" },

  // Current/recent students
  { slug: "bhavya-jain", name: "Bhavya Jain", role: "student" },

  // Clients
  { slug: "ambala-textile-client", name: "A textile shop owner (Ambala)", role: "prospective-client", isAnonymized: true },
];

/**
 * Retrieve a person by slug.
 * 
 * @param slug - The person's slug identifier
 * @returns The person if found, undefined otherwise
 */
const personBySlug = new Map<string, JournalPerson>(journalPeople.map((p) => [p.slug, p]));

export function getJournalPerson(slug: string) {
  return personBySlug.get(slug);
}

/**
 * Resolve a free-text name query to a person slug. Matches case-insensitively
 * against the display name, and also against the reverse of a "First Last" name
 * so both "Bhavya Jain" and "Jain Bhavya" resolve. Returns undefined when no
 * person matches.
 */
export function resolvePersonByName(query: string): string | undefined {
  const q = query.trim().toLowerCase();
  if (!q) return undefined;
  const person = journalPeople.find((p) => p.name.toLowerCase() === q);
  if (person) return person.slug;

  const reversed = q.split(/\s+/).reverse().join(" ");
  const byReversed = journalPeople.find((p) => p.name.toLowerCase() === reversed);
  if (byReversed) return byReversed.slug;

  return undefined;
}

/**
 * Convert an array of person slugs to their display names.
 * 
 * @param slugs - Array of person slug identifiers
 * @returns Array of person names (or slugs if person not found)
 */
export function getMentionedPersonNames(slugs: string[]) {
  return slugs.map((slug) => getJournalPerson(slug)?.name || slug);
}
