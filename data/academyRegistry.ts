/**
 * academyRegistry.ts
 * The "Academy Artists Registry" — identity-driven entries that scroll behind
 * the Student Locker chest. Emphasises WHO each student becomes (artist level +
 * a single signature), not what they painted. Museum-style, not a leaderboard.
 *
 * Edit freely — these are illustrative, drawn from the real student names used
 * across the academy page. Each artist gets exactly ONE signature.
 */

export type AcademyArtistLevel =
  | "Foundation Artist"
  | "Developing Artist"
  | "Studio Artist"
  | "Advanced Artist"
  | "Portfolio Artist";

export type AcademyRegistryEntry = {
  id: string;
  name: string;
  level: AcademyArtistLevel;
  /** A single signature — "Known for …" or "Currently …" focus. */
  signature: string;
};

export const academyRegistry: AcademyRegistryEntry[] = [
  { id: "aarna", name: "Aarna", level: "Portfolio Artist", signature: "Known for a quiet, confident touch" },
  { id: "shreya", name: "Shreya", level: "Advanced Artist", signature: "Currently building a landscape series" },
  { id: "bhavya", name: "Bhavya", level: "Developing Artist", signature: "Known for finishing with patience" },
  { id: "niyati", name: "Niyati", level: "Portfolio Artist", signature: "Known for traditional Radha-Krishna work" },
  { id: "muskan", name: "Muskan", level: "Advanced Artist", signature: "Currently exploring autumn landscapes" },
  { id: "sanchi", name: "Sanchi", level: "Studio Artist", signature: "Known for wildlife studies" },
  { id: "prisha", name: "Prisha", level: "Studio Artist", signature: "Known for playful cubist experiments" },
  { id: "veenu", name: "Veenu", level: "Portfolio Artist", signature: "Known for commissioned oil portraits" },
  { id: "snigdha", name: "Snigdha", level: "Advanced Artist", signature: "Currently mastering decorative patterns" },
  { id: "megha", name: "Megha", level: "Advanced Artist", signature: "Known for light in seascapes" },
  { id: "kartik", name: "Kartik", level: "Studio Artist", signature: "Known for mosaic wildlife pieces" },
  { id: "pranav", name: "Pranav", level: "Foundation Artist", signature: "Currently finding his line" },
  { id: "keshav", name: "Keshav", level: "Portfolio Artist", signature: "Known for exacting graphite portraits" },
  { id: "gayen", name: "Raj Kumar Gayen", level: "Portfolio Artist", signature: "Known for violin portraits" },
  { id: "anmol", name: "Anmol", level: "Advanced Artist", signature: "Currently mastering figure paint" },
  { id: "harsh", name: "Harsh", level: "Studio Artist", signature: "Known for bold pop-art portraits" },
];

// T1: O(1) registry lookup by artist id, replacing the would-be .find() scan.
const academyRegistryById = new Map<string, AcademyRegistryEntry>(
  academyRegistry.map((a) => [a.id, a])
);

export function getAcademyArtistById(id: string): AcademyRegistryEntry | undefined {
  return academyRegistryById.get(id);
}
