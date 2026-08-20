import Image from "next/image";
import Reveal from "@/components/Reveal";
import { ArtworkCardLink } from "@/components/ghosts";
import type { Artist } from "./types";

export default function PortfolioGrid({ artist, slug }: { artist: Artist; slug: string }) {
  return (
    <section id="portfolio" className="artist-portfolio section-wrap">
      <Reveal>
        <p className="artist-section-label-ornate">{artist.name}&apos;s Portfolio</p>
        <div className="artist-portfolio-grid">
          {artist.artworks.map((artwork, i) => (
            <ArtworkCardLink key={i} href={`/academy/${slug}/${artwork.artworkSlug}`} className="artist-artwork-card">
              <div className="artwork-image">
                <Image
                  src={artwork.image}
                  alt={artwork.title}
                  fill
                  sizes="(min-width: 980px) 25vw, 50vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="artwork-info">
                <h4>{artwork.title}</h4>
                <p className="artwork-medium">{artwork.medium}</p>
                <p className="artwork-size">{artwork.size}</p>
              </div>
            </ArtworkCardLink>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
