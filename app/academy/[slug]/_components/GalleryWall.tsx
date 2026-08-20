import Image from "next/image";
import Reveal from "@/components/Reveal";
import { GallerySpotlight } from "@/components/GallerySpotlight";
import { GalleryWallCtaLink } from "@/components/ghosts";
import type { Artist } from "./types";

export default function GalleryWall({ artist }: { artist: Artist }) {
  return (
    <section className="artist-gallery-wall">
      <Reveal>
        <GallerySpotlight>
          <div className="gallery-backdrop">
            {artist.galleryWallImage ? (
              <div className="gallery-wall-image-container">
                <div className="gallery-wall-image-wrap">
                  <Image
                    src={artist.galleryWallImage}
                    alt="Aarna's Gallery Wall"
                    width={1200}
                    height={509}
                    style={{ objectFit: "contain" }}
                    className="gallery-wall-image"
                  />
                  <GalleryWallCtaLink href="#portfolio" className="gallery-wall-cta-overlay" aria-label="View Full Gallery" />
                </div>
              </div>
            ) : (
              <div className="gallery-frames">
                {artist.artworks.slice(0, 6).map((artwork, i) => (
                  <div key={i} className="gallery-frame">
                    <div className="frame-inner">
                      <Image
                        src={artwork.image}
                        alt={artwork.title}
                        fill
                        sizes="(min-width: 980px) 16vw, 33vw"
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </GallerySpotlight>
      </Reveal>
    </section>
  );
}
