import type { JournalEntry } from "../../journal";

// === BUSINESS INSIGHT (3 entries) ===
const entry: JournalEntry = {
    slug: "textile-fabric-research-begins",
    title: "A New Direction: Hand-Painted Fabric",
    category: "business-insight",
    excerpt: "A client wants painted fabrics. Here's the problem we're solving—and the materials we're testing.",
    body: [
      "A textile shop owner in Ambala reached out with a specific request: hand-painted designs on delicate fabrics (lachka, armani suiting, cotton, china silk).",
      "The conversation was promising. They loved the artistic quality and the attention to detail. But a problem emerged: how do we ensure the paint stays opaque on fabric, survives dry cleaning, and doesn't stiffen the material?",
      "Canvas paint won't work. We started researching specialty options and found Jacquard Neopaque, a paint specifically formulated for fabric. It arrived this week, and we're in the testing phase.",
      "This is what happens in real business: a genuine opportunity emerges, but it requires problem-solving and experimentation before work begins. We're not rushing; we're getting it right.",
    ],
    images: [
      { afterParagraph: 2, src: "/images/painting/oil-painting-101.webp", alt: "Fabric swatches and paint samples on the studio table" },
    ],
    publishedOn: "2026-07-15",
    readTimeMinutes: 5,
    status: "active",
    threadSlug: "textile-painting-research",
    tags: ["Business", "Sales Pipeline", "Problem Solving", "Materials Research", "Custom Work"],
    mentionedPeople: ["ambala-textile-client"],
    coverImage: "/images/custom/oil-painting-125.webp",
    stream: "commission",
    stage: "approved",
    emoji: "🧵",
    stripLabel: "Fabric painting research\nTesting Jacquard Neopaque",
  };

export default entry;
