import { ImageResponse } from "next/og";
import { getJournalEntry } from "@/data/journal";

const CATEGORY_LABELS: Record<string, string> = {
  "business-insight": "Business Insight",
  "journey-diary": "Journey Diary",
  "student-story": "Student Story",
  "behind-the-scenes": "Behind the Scenes",
  "past-project": "Past Project",
};

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = getJournalEntry(slug);
  if (!entry) return null;

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
          Studio Journal · {CATEGORY_LABELS[entry.category] || entry.category}
        </div>
        <div style={{ display: "flex", fontSize: 62, fontWeight: 600, color: "#292321", marginBottom: 24, maxWidth: 1000 }}>
          {entry.title}
        </div>
        <div style={{ display: "flex", fontSize: 26, fontStyle: "italic", color: "#583a35", maxWidth: 800 }}>
          {entry.excerpt}
        </div>
        <div style={{ display: "flex", fontSize: 16, color: "#976238", letterSpacing: 2, textTransform: "uppercase", marginTop: 40 }}>
          Meenakshi Art Work
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
