import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { publicArtistProfiles, getArtistProfile, getArtwork } from "@/data/artists";
import Reveal from "@/components/Reveal";
import { ArtistHeroActions } from "@/components/ArtistHeroActions";

export async function generateStaticParams() {
  const params: Array<{ slug: string; artwork: string }> = [];

  // Generate params from data (sample/demo profiles are excluded from public routes)
  for (const profile of publicArtistProfiles) {
    for (const artwork of profile.artworks) {
      params.push({
        slug: profile.slug,
        artwork: artwork.artworkSlug,
      });
    }
  }
  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string; artwork: string }> }): Promise<Metadata> {
  const { slug, artwork } = await params;
  const artistForMeta = getArtistProfile(slug);
  const art = getArtwork(slug, artwork);
  if (!art || artistForMeta?.isSample) return {};
  return {
    title: `${art.title} — Artwork`,
    description: art.description,
  };
}

export default async function ArtworkPage({ params }: { params: Promise<{ slug: string; artwork: string }> }) {
  const { slug, artwork } = await params;
  const artist = getArtistProfile(slug);
  const art = getArtwork(slug, artwork);

  // Sample/demo profiles are fictional design-preview data and must never be publicly reachable.
  if (!artist || !art || artist.isSample) notFound();

  return (
    <main className="artwork-detail-page">
      {/* Hero Section */}
      <section className="artwork-hero">
        <Reveal>
          <Link href={`/academy/${slug}`} className="back-link">← Back to {artist.name}&apos;s Profile</Link>
          <h1 className="artwork-title">{art.title}</h1>
          <p className="artwork-artist">by {artist.name}</p>
        </Reveal>
      </section>

      {/* Main Image */}
      <section className="artwork-main section-wrap">
        <Reveal>
          <div className="artwork-main-image">
            <Image
              src={art.displayImage}
              alt={art.title}
              fill
              style={{ objectFit: "contain" }}
              sizes="(min-width: 980px) 80vw, 100vw"
            />
          </div>
          <div className="artwork-specs-sidebar">
            <div className="spec-item">
              <span className="spec-label">Medium</span>
              <span className="spec-value">{art.medium}</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Size</span>
              <span className="spec-value">{art.size}</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Year</span>
              <span className="spec-value">{art.year}</span>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Macro Closeups */}
      <section className="artwork-macro section-wrap">
        <Reveal>
          <p className="section-heading">Artistic Details</p>
          <div className="macro-grid">
            {art.macroShots.map((shot, i) => (
              <div key={i} className="macro-card">
                <div className="macro-image">
                  <Image
                    src={shot.image}
                    alt={shot.label}
                    fill
                    sizes="(min-width: 980px) 33vw, 100vw"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <p className="macro-label">{shot.label}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Room Visualizations */}
      <section className="artwork-rooms section-wrap">
        <Reveal>
          <p className="section-heading">Imagine in Your Space</p>
          <div className="rooms-grid">
            {art.roomMockups.map((room, i) => (
              <div key={i} className="room-card">
                <div className="room-image">
                  <Image
                    src={room.image}
                    alt={room.label}
                    fill
                    sizes="(min-width: 980px) 45vw, 100vw"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <p className="room-label">{room.label}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Reveal Animation */}
      <section className="artwork-reveal section-wrap">
        <Reveal>
          <p className="section-heading">The Masterpiece Unfolds</p>
          <div className="reveal-container">
            <div className="reveal-image">
              <Image
                src={art.image}
                alt={`${art.title} artwork`}
                fill
                sizes="(min-width: 980px) 70vw, 100vw"
                style={{ objectFit: "contain" }}
              />
            </div>
          </div>
        </Reveal>
      </section>

      {/* Explored Skills + Story */}
      <section className="artwork-story-skills section-wrap">
        <Reveal>
          <p className="section-heading">What {artist.name} Explored</p>
          <div className="skills-tags">
            {art.exploredSkills.map((skill, i) => (
              <span key={i} className="skill-tag">{skill}</span>
            ))}
          </div>
          <p className="section-heading story-heading">The Story</p>
          <p className="story-text">{art.story}</p>
        </Reveal>
      </section>

      {/* Share Section */}
      <section className="artwork-share section-wrap">
        <Reveal>
          <p className="share-heading">Share This Artwork</p>
          <ArtistHeroActions artistName={`${art.title} by ${artist.name}`} artistHeadline={art.description || art.title} />
        </Reveal>
      </section>

      {/* Back to Profile */}
      <section className="artwork-footer section-wrap">
        <Reveal>
          <Link href={`/academy/${slug}`} className="back-button">
            ← Back to {artist.name}&apos;s Full Profile
          </Link>
        </Reveal>
      </section>
    </main>
  );
}
