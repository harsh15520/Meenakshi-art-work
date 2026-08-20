"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { mosaicTiles, type MosaicTile } from "@/data/studentMosaic";
import { getArtistProfile } from "@/data/artists";

// studentMosaic.ts is auto-generated and doesn't know about isSample — cross-check
// against the real profile data so fictional/demo profiles never render as clickable.
const wallTiles: MosaicTile[] = mosaicTiles.map((tile) =>
  tile.hasProfile && getArtistProfile(tile.slug)?.isSample
    ? { ...tile, hasProfile: false }
    : tile
);

/**
 * MeetStudentsWall — the "Meet the students" section.
 *
 * Renders a single scrapbook/polaroid wall composite image (built by
 * scripts/build_students_mosaic.py) and overlays invisible clickable hotspots
 * aligned to each student tile (normalised coords from data/studentMosaic.ts).
 *
 * Hotspot behaviour (option A):
 *  - hasProfile === true  → the tile links to /academy/[slug]
 *  - hasProfile === false → no link; hovering shows "Profile coming soon"
 *
 * Component is a client component only for the hover-tooltip + positioning,
 * the image itself is static.
 */
export default function MeetStudentsWall() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [tileW, setTileW] = useState(0);
  const [tileH, setTileH] = useState(0);
  const [active, setActive] = useState<MosaicTile | null>(null);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => {
      setTileW(entry.contentRect.width);
      setTileH(entry.contentRect.height);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const showTooltip = active && tileW > 0;

  return (
    <section className="meet-students-wall section-wrap" aria-labelledby="meet-students-title">
      <div className="section-heading meet-students-wall__heading">
        <div>
          <p className="eyebrow">THE FACES BEHIND THE BRUSHES</p>
          <h2 id="meet-students-title">Meet the students</h2>
        </div>
        <p>
          A few of the students who have painted with us over the years — one wall,
          every batch.
        </p>
      </div>

      <div className="meet-students-wall__frame" ref={wrapRef}>
        <Image
          src="/images/academy/meet-the-students-wall.webp"
          alt="Collage of students from Meenakshi Art Work Academy, arranged as a polaroid wall"
          fill
          sizes="(min-width: 1260px) 1260px, 100vw"
          className="meet-students-wall__image"
          priority
        />

        {/* Clickable hotspots over each polaroid tile */}
        {tileW > 0 &&
          wallTiles.map((tile) => {
            const left = tile.x * tileW;
            const top = tile.y * tileH;
            const width = tile.w * tileW;
            const height = tile.h * tileH;

            const inner = (
              <span
                className="meet-students-wall__hotspot-inner"
                onMouseEnter={() => setActive(tile)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(tile)}
                onBlur={() => setActive(null)}
                tabIndex={tile.hasProfile ? 0 : -1}
              >
                <span className="sr-only">{tile.name}</span>
              </span>
            );

            return tile.hasProfile ? (
              <Link
                key={tile.slug}
                href={`/academy/${tile.slug}`}
                className="meet-students-wall__hotspot"
                style={{ left, top, width, height }}
                aria-label={`Meet ${tile.name}`}
                onMouseEnter={() => setActive(tile)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(tile)}
                onBlur={() => setActive(null)}
              >
                {inner}
              </Link>
            ) : (
              <span
                key={tile.slug}
                className="meet-students-wall__hotspot meet-students-wall__hotspot--inert"
                style={{ left, top, width, height }}
                onMouseEnter={() => setActive(tile)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(tile)}
                onBlur={() => setActive(null)}
                tabIndex={-1}
              >
                {inner}
              </span>
            );
          })}
      </div>

      {/* Floating tooltip describing the hovered tile */}
      {showTooltip && active && (
        <div className="meet-students-wall__tooltip" aria-hidden="true">
          <span className="meet-students-wall__tooltip-name">{active.name}</span>
          {active.hasProfile ? (
            <span className="meet-students-wall__tooltip-hint">View profile →</span>
          ) : (
            <span className="meet-students-wall__tooltip-hint">Profile coming soon</span>
          )}
        </div>
      )}
    </section>
  );
}

