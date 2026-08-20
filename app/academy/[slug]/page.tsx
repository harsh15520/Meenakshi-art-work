import type { Metadata } from "next";
import { notFound } from "next/navigation";
import QRCode from "qrcode";
import { publicArtistProfiles, getArtistProfile } from "@/data/artists";
import StudentReviewBadge from "@/components/StudentReviewBadge";
import { buildAbsoluteUrl } from "@/lib/site";
import ArtistHero from "./_components/ArtistHero";
import ArtJourney from "./_components/ArtJourney";
import PortfolioGrid from "./_components/PortfolioGrid";
import FeaturedArtwork from "./_components/FeaturedArtwork";
import BehindTheCanvas from "./_components/BehindTheCanvas";
import StudioMoments from "./_components/StudioMoments";
import GalleryWall from "./_components/GalleryWall";
import NoteAchievementsCertificate from "./_components/NoteAchievementsCertificate";
import FinalCta from "./_components/FinalCta";

export function generateStaticParams() {
  // Sample/demo profiles (isSample: true) are excluded so they 404 in production.
  return publicArtistProfiles.map((profile) => ({ slug: profile.slug }));
}

// Regenerate at most every 60s so content updates propagate without a full redeploy (ISR).
export const revalidate = 60;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const artist = getArtistProfile(slug);
  if (!artist || artist.isSample) return {};
  return {
    title: `${artist.name} — Artist`,
    description: artist.headline,
  };
}

export default async function ArtistPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const artist = getArtistProfile(slug);
  // Sample/demo profiles are fictional design-preview data and must never be publicly reachable.
  if (!artist || artist.isSample) notFound();

  const profileUrl = buildAbsoluteUrl(`/academy/${slug}`);
  const qrDataUrl = await QRCode.toDataURL(profileUrl, { margin: 1, width: 200, color: { dark: "#583a35", light: "#00000000" } });

  // The featured artwork section + "Behind the Canvas" strip should follow the
  // student's actual featured (or first) artwork — not a hardcoded slug — so the
  // template works for any student with any number of artworks.
  const featuredArtworkObj =
    artist.artworks.find((a) => a.artworkSlug === artist.featuredArtworkSlug) ?? artist.artworks[0];

  return (
    <main className="artist-page">
      <ArtistHero artist={artist} />
      <ArtJourney artist={artist} />
      <PortfolioGrid artist={artist} slug={slug} />
      <FeaturedArtwork artist={artist} featuredArtworkObj={featuredArtworkObj} />
      <BehindTheCanvas artist={artist} featuredArtworkObj={featuredArtworkObj} />
      <StudioMoments artist={artist} />
      <GalleryWall artist={artist} />
      <NoteAchievementsCertificate artist={artist} slug={slug} qrDataUrl={qrDataUrl} />
      <FinalCta artist={artist} />
      <StudentReviewBadge name={artist.name} />
    </main>
  );
}
