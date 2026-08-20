import Image from "next/image";
import Reveal from "@/components/Reveal";
import type { Artist } from "./types";

export default function BehindTheCanvas({ artist, featuredArtworkObj }: { artist: Artist; featuredArtworkObj: Artist["artworks"][number] | undefined }) {
  if (!featuredArtworkObj?.behindTheCanvas || featuredArtworkObj.behindTheCanvas.length === 0) return null;
  return (
    <section className="artist-behind-canvas section-wrap">
      <Reveal>
        <p className="artist-section-label-ornate">Behind the Canvas</p>
        <p className="artist-process-intro">See how {artist.name}&apos;s artwork comes to life through every creative step</p>
        <div className="process-strip">
          {featuredArtworkObj.behindTheCanvas.map((step, i) => (
            <div key={i} className="process-step">
              <div className="process-image">
                <Image
                  src={step.image}
                  alt={step.label}
                  fill
                  sizes="180px"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <p className="process-label">{step.label}</p>
              {i < featuredArtworkObj.behindTheCanvas!.length - 1 && <div className="process-arrow">→</div>}
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
