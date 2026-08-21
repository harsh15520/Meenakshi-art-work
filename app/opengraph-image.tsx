import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
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
        <div style={{ display: "flex", fontSize: 20, letterSpacing: 4, color: "#7f5029", textTransform: "uppercase", marginBottom: 30 }}>
          Fine Art Academy &amp; Studio
        </div>
        <div style={{ display: "flex", fontSize: 84, fontWeight: 600, color: "#292321", marginBottom: 24 }}>
          Meenakshi Oil Painting
        </div>
        <div style={{ display: "flex", fontSize: 30, fontStyle: "italic", color: "#583a35", marginBottom: 34, maxWidth: 860 }}>
          Where passion becomes art.
        </div>
        <div style={{ display: "flex", fontSize: 20, color: "#7f5029", letterSpacing: 2, textTransform: "uppercase" }}>
          Saharanpur &middot; Since 2017
        </div>
      </div>
    ),
    size
  );
}
