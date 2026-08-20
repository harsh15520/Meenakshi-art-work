import Image from "next/image";
import Reveal from "@/components/Reveal";
import { ArtistHeroActions } from "@/components/ArtistHeroActions";
import { HERO_BLUR } from "@/lib/image-optimization";
import type { Artist } from "./types";

export default function ArtistHero({ artist }: { artist: Artist }) {
  return (
    <section>
      <Reveal>
        <div className="artist-hero">
          <div className="artist-hero-content">
            <p className="artist-eyebrow-ornate">Young Artist</p>
            <h1 className="artist-name">{artist.name}</h1>
            <p className="artist-since">Since {artist.joinedYear}</p>
            <p className="artist-headline">&ldquo;{artist.headline}&rdquo;</p>
            <div className="artist-hero-stats">
              <div className="artist-stat">
                <span className="stat-number">{artist.stats.artworksCreated}</span>
                <span className="stat-label">Original Paintings</span>
              </div>
              <div className="artist-stat">
                <span className="stat-number">{artist.stats.creativeHours}+</span>
                <span className="stat-label">Creative Hours</span>
              </div>
              <div className="artist-stat">
                <span className="stat-number">{artist.stats.currentMedium}</span>
                <span className="stat-label">Current Medium</span>
              </div>
            </div>
            <ArtistHeroActions artistName={artist.name} artistHeadline={artist.headline} />
          </div>
          <div className="artist-hero-portrait">
            <Image src={artist.heroImage} alt={artist.name} fill priority style={{ objectFit: "cover" }} className="photo-lifestyle" placeholder="blur" blurDataURL={HERO_BLUR} />
          </div>
        </div>
      </Reveal>
    </section>
  );
}
