/**
 * Shared placeholder assets for student profiles that don't yet have real
 * photography. Every student page reuses this one set instead of copying
 * per-student placeholder files. Swap in real images later by updating the
 * relevant path in the student's ArtistProfile.
 */
export const PLACEHOLDERS = {
  hero: "/images/placeholders/hero.svg",
  artwork: "/images/placeholders/artwork.svg",
  studio: "/images/placeholders/studio.svg",
  galleryWall: "/images/placeholders/gallery-wall.svg",
  teacherNote: "/images/placeholders/teacher-note.svg",
} as const;

/**
 * Returns the provided image path, or the shared placeholder when the value is
 * empty. Keeps ArtistProfile authoring simple: omit a path and get a branded
 * "coming soon" tile instead of a broken image.
 */
export function imgOrPlaceholder(path: string | undefined, kind: keyof typeof PLACEHOLDERS): string {
  return path && path.trim().length > 0 ? path : PLACEHOLDERS[kind];
}
