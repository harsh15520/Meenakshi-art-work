import Image from "next/image";
import Reveal from "@/components/Reveal";
import type { Artist } from "./types";

export default function StudioMoments({ artist }: { artist: Artist }) {
  return (
    <section className="studio-moments-section section-wrap">
      <Reveal>
        <div className="studio-glance-row">
          <div className="studio-column">
            <p className="artist-section-label">Studio Moments</p>
            <div className="studio-grid">
              {artist.studioMoments.map((moment, i) => (
                <div key={i} className="studio-photo">
                  <Image
                    src={moment.image}
                    alt={moment.alt}
                    fill
                    sizes="(min-width: 980px) 30vw, 45vw"
                    style={{ objectFit: "cover" }}
                    className="photo-lifestyle"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="glance-card">
            <p className="artist-section-label">{artist.name} at a Glance</p>
            <div className="glance-row">
              <span className="glance-icon">🎨</span>
              <span className="glance-label">Artworks Created</span>
              <span className="glance-value">{artist.stats.artworksCreated}</span>
            </div>
            <div className="glance-row">
              <span className="glance-icon">⏱️</span>
              <span className="glance-label">Creative Hours</span>
              <span className="glance-value">{artist.stats.creativeHours}+</span>
            </div>
            <div className="glance-row">
              <span className="glance-icon">🌈</span>
              <span className="glance-label">Favourite Colours</span>
              <span className="glance-value">{artist.stats.favoriteColors.join(", ")}</span>
            </div>
            <div className="glance-row">
              <span className="glance-icon">🖌️</span>
              <span className="glance-label">Current Medium</span>
              <span className="glance-value">{artist.stats.currentMedium}</span>
            </div>
            <div className="glance-row">
              <span className="glance-icon">✨</span>
              <span className="glance-label">Dream Goal</span>
              <span className="glance-value">{artist.stats.dreamGoal}</span>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
