import { ImageResponse } from "next/og";
import { getArtistProfile } from "@/data/artists";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const artist = getArtistProfile(slug);
  if (!artist || artist.isSample) return null;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #f8f2e9 0%, #ede0d5 100%)",
          fontFamily: "serif",
          padding: "60px",
          textAlign: "center",
        }}
      >
        <div style={{ display: "flex", fontSize: 18, letterSpacing: 4, color: "#b6783e", textTransform: "uppercase", marginBottom: 30 }}>
          Young Artist
        </div>
        <div style={{ display: "flex", fontSize: 72, fontWeight: 600, color: "#292321", marginBottom: 20 }}>
          {artist.name}
        </div>
        <div style={{ display: "flex", fontSize: 32, fontStyle: "italic", color: "#583a35", marginBottom: 30, maxWidth: 800 }}>
          &ldquo;{artist.headline}&rdquo;
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 40,
            marginBottom: 30,
            fontSize: 20,
            color: "#746b66",
          }}
        >
          <div>{artist.stats.artworksCreated} Paintings</div>
          <div>{artist.stats.creativeHours}+ Hours</div>
          <div>Since {artist.joinedYear}</div>
        </div>
        <div style={{ display: "flex", fontSize: 16, color: "#976238", letterSpacing: 2, textTransform: "uppercase" }}>
          Meenakshi Art Work Academy
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
