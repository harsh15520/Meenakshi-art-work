import Image from "next/image";
import Reveal from "@/components/Reveal";
import type { Artist } from "./types";

type FeaturedArtworkObj = Artist["artworks"][number];

export default function FeaturedArtwork({
  artist,
  featuredArtworkObj,
}: {
  artist: Artist;
  featuredArtworkObj: FeaturedArtworkObj | undefined;
}) {
  return (
    <section className="artist-featured section-wrap">
      <Reveal>
        <p className="artist-section-label">Featured Artwork</p>
        <div className="featured-layout">
          <div className="featured-collage">
            <div className="featured-collage-main">
              <Image
                src={artist.featuredArtwork.image}
                alt={artist.featuredArtwork.title}
                fill
                sizes="(min-width: 980px) 45vw, 90vw"
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className="featured-collage-details">
              {featuredArtworkObj?.macroShots.map((shot, i) => (
                <div key={i} className="featured-collage-detail-item">
                  <Image
                    src={shot.image}
                    alt={shot.label}
                    fill
                    sizes="150px"
                    style={{ objectFit: "cover" }}
                  />
                </div>
              ))}
            </div>
            {featuredArtworkObj?.roomMockups[0] && (
              <div className="featured-collage-room">
                <Image
                  src={featuredArtworkObj.roomMockups[0].image}
                  alt={featuredArtworkObj.roomMockups[0].label}
                  fill
                  sizes="(min-width: 980px) 45vw, 90vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
            )}
          </div>
          <div className="featured-info">
            <h2>{artist.featuredArtwork.title}</h2>
            <div className="featured-specs">
              <p><span className="spec-label">Medium</span>{artist.featuredArtwork.medium}</p>
              <p><span className="spec-label">Size</span>{artist.featuredArtwork.size}</p>
              <p><span className="spec-label">Year</span>{artist.featuredArtwork.yearCompleted}</p>
              <p><span className="spec-label">Duration</span>{artist.featuredArtwork.daysTaken} days</p>
            </div>
            <p className="featured-description">{artist.featuredArtwork.description}</p>
            <div className="featured-quote-block">
              <blockquote className="featured-quote">
                &ldquo;{artist.featuredArtwork.teacherQuote}&rdquo;
              </blockquote>
              <div className="featured-quote-author">
                <div className="teacher-avatar-crop">
                  <Image
                    src="/images/founder-meena.webp"
                    alt="Meenakshi, Founder"
                    fill
                    sizes="80px"
                    style={{ objectFit: "cover", objectPosition: "50% 15%" }}
                  />
                </div>
                <span>— Meenakshi, Founder</span>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
