/**
 * Timeline milestone labels shared across all student profiles.
 * These labels remain constant; only the associated dates change per student.
 */
export const TIMELINE_MILESTONES = [
  "First Day at Studio",
  "First Artwork Completed",
  "First Appreciation from Ma'am",
  "Exploring New Styles",
  "Creating with Confidence",
  "The Journey Continues..."
] as const;

/**
 * Achievement badges shared across all student profiles.
 * Each student receives the same four achievement types.
 */
export const STATIC_ACHIEVEMENTS = [
  { icon: "🏛️", title: "Consistent Learner", description: "Never misses a class" },
  { icon: "🎨", title: "Creative Explorer", description: "Tries new techniques fearlessly" },
  { icon: "⭐", title: "Improvement Star", description: "Progresses significantly each month" },
  { icon: "🎁", title: "Inspiration to Others", description: "Encourages fellow students" }
] as const;

/**
 * ArtistProfile - Interface for student artist profiles in the academy.
 * 
 * @property slug - URL-friendly identifier for the artist
 * @property name - Full display name of the artist
 * @property joinedYear - Year the student joined the academy
 * @property headline - Featured quote or tagline for the artist
 * @property bio - Optional biographical information
 * @property isSample - Flag for sample/demo data (should not be published)
 * @property heroImage - Path to the hero/featured image
 * @property artworks - Array of artwork entries created by the student
 * @property journeyYears - Array of years corresponding to TIMELINE_MILESTONES
 * @property featuredArtwork - The student's most notable artwork
 * @property stats - Statistics about the student's progress
 * @property studioMoments - Array of studio session photos
 * @property teacherNote - Personal note from the instructor
 * @property galleryWallImage - Optional pre-composed gallery wall image
 * @property teacherNoteImage - Optional pre-composed teacher note image
 * @property certificate - Certificate information for the student
 * 
 * @example
 * import { artistProfiles, getArtistProfile } from '@/data/artists';
 * 
 * const artist = getArtistProfile('aarna');
 * if (artist?.isSample) {
 *   console.warn('Sample data should not be published');
 * }
 */
export type ArtistProfile = {
  slug: string;
  name: string;
  joinedYear: number;
  headline: string;
  bio?: string;
  isSample?: boolean;
  heroImage: string;
  /** Slug of the artwork to feature in the Featured Artwork + Behind the Canvas sections. Falls back to the first artwork if omitted. */
  featuredArtworkSlug?: string;
  artworks: {
    artworkSlug: string;
    title: string;
    image: string;
    displayImage: string;
    medium: string;
    size: string;
    year: number;
    description?: string;
    story: string;
    exploredSkills: string[];
    macroShots: { label: string; image: string }[];
    roomMockups: { label: string; image: string }[];
    behindTheCanvas?: {
      label: string;
      image: string;
    }[];
  }[];
  // One year per entry in TIMELINE_MILESTONES, matched by position.
  journeyYears: number[];
  featuredArtwork: {
    title: string;
    image: string;
    medium: string;
    size: string;
    yearCompleted: number;
    daysTaken: number;
    description: string;
    teacherQuote: string;
  };
  stats: {
    artworksCreated: number;
    creativeHours: number;
    favoriteColors: string[];
    currentMedium: string;
    dreamGoal: string;
  };
  studioMoments: { image: string; alt: string }[];
  // In the final production version, this whole block becomes a single
  // pre-composed image designed per student (see Gallery Wall / Ma'am's Note
  // note below) — kept as text+photo here since no real composed graphic
  // exists yet for the sample.
  teacherNote: {
    text: string;
    attribution: string;
  };
  // galleryWallImage / teacherNoteImage: optional single flat image per student
  // (designed once, e.g. in Canva/Photoshop) — when present, the page should
  // render that image directly instead of assembling the section from code.
  galleryWallImage?: string;
  teacherNoteImage?: string;
  certificate: {
    text: string;
    certificateId: string;
    issuedDate: string;
  };
  /**
   * Shared code revealed on the student's own page & certificate so the family
   * can open their "chest" on the academy page. Omit for students not yet
   * published to the success-stories locker.
   */
  shareCode?: string;
};

/**
 * Array of all artist profiles in the academy.
 * 
 * Entries marked with isSample: true are fictional examples for design
 * preview only and are excluded from public pages. Aarna is the first
 * fully built, real, publishable profile (isSample: false).
 */
import aarna from "./artists/aarna";
import niyati from "./artists/niyati";
import muskan from "./artists/muskan";
import pranav from "./artists/pranav";
import sanchi from "./artists/sanchi";
import kartik from "./artists/kartik";
import prisha from "./artists/prisha";
import shreya from "./artists/shreya";
import keshav from "./artists/keshav";
import anmol from "./artists/anmol";
import megha from "./artists/megha";
import snigdha from "./artists/snigdha";
import veenu from "./artists/veenu";
import rajKumarGayen from "./artists/raj-kumar-gayen";
import harsh from "./artists/harsh";

export const artistProfiles: ArtistProfile[] = [
  aarna,
  niyati,
  muskan,
  pranav,
  sanchi,
  kartik,
  prisha,
  shreya,
  keshav,
  anmol,
  megha,
  snigdha,
  veenu,
  rajKumarGayen,
  harsh,
];

/**
 * Retrieve a single artist profile by slug.
 * 
 * @param slug - The URL-friendly identifier of the artist
 * @returns The artist profile if found, undefined otherwise
 * 
 * @example
 * const artist = getArtistProfile('aarna');
 * if (artist) {
 *   console.log(artist.name);
 * }
 */
export function getArtistProfile(slug: string): ArtistProfile | undefined {
  return artistProfiles.find((profile) => profile.slug === slug);
}

/**
 * Artist profiles safe to publish — excludes entries marked `isSample: true`
 * (fictional design-preview data). Use this instead of `artistProfiles` for
 * anything that generates public routes or public listings.
 */
export const publicArtistProfiles: ArtistProfile[] = artistProfiles.filter(
  (profile) => !profile.isSample
);

/**
 * Retrieve a specific artwork from an artist's collection.
 * 
 * @param slug - The artist's slug identifier
 * @param artworkSlug - The artwork's slug identifier
 * @returns The artwork if found, undefined otherwise
 * 
 * @example
 * const artwork = getArtwork('aarna', 'princess-dream');
 * if (artwork) {
 *   console.log(artwork.title);
 * }
 */
export function getArtwork(slug: string, artworkSlug: string) {
  const artist = getArtistProfile(slug);
  if (!artist) return undefined;
  return artist.artworks.find((a) => a.artworkSlug === artworkSlug);
}
