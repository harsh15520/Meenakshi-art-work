import type { ArtistProfile } from "../artists";

const entry: ArtistProfile = {
    slug: "keshav",
    name: "Keshav",
    joinedYear: 2022,
    headline: "Every painting begins with one fearless brushstroke.",
    isSample: false,
    heroImage: "/images/placeholders/hero.svg",
    featuredArtworkSlug: "graphite-portrait",
    artworks: [
      {
        artworkSlug: "graphite-portrait",
        title: "Graphite Portrait Study",
        image: "/images/academy/keshav/oil-painting-158.webp",
        displayImage: "/images/academy/keshav/oil-painting-158.webp",
        medium: "Graphite Pencil",
        size: "11 × 14",
        year: 2024,
        description: "A graphite pencil portrait study.",
        story: "Keshav's first portrait in graphite.",
        exploredSkills: ["Line Work", "Shading"],
        macroShots: [{ label: "Eye Detail", image: "/images/academy/keshav/oil-painting-158.webp" }],
        roomMockups: [{ label: "In the home", image: "/images/placeholders/artwork.svg" }]
      },
      {
        artworkSlug: "realistic-portrait",
        title: "Realistic Portrait",
        image: "/images/academy/keshav/oil-painting-46.webp",
        displayImage: "/images/academy/keshav/oil-painting-46.webp",
        medium: "Graphite Pencil",
        size: "11 × 14",
        year: 2024,
        description: "A realistic graphite pencil portrait.",
        story: "Keshav's two-session portrait study.",
        exploredSkills: ["Realism", "Contrast"],
        macroShots: [{ label: "Skin Tone Detail", image: "/images/academy/keshav/oil-painting-46.webp" }],
        roomMockups: [{ label: "In the home", image: "/images/placeholders/artwork.svg" }]
      },
      {
        artworkSlug: "deer-sunset",
        title: "Deer at Sunset",
        image: "/images/academy/keshav/oil-painting-5322.webp",
        displayImage: "/images/academy/keshav/oil-painting-5322.webp",
        medium: "Acrylic on Canvas",
        size: "12 × 14",
        year: 2024,
        description: "A deer at sunset, acrylic landscape.",
        story: "Keshav's three-week wildlife landscape.",
        exploredSkills: ["Landscape", "Warm Light"],
        macroShots: [{ label: "Deer Detail", image: "/images/academy/keshav/oil-painting-5322.webp" }],
        roomMockups: [{ label: "In the home", image: "/images/placeholders/artwork.svg" }]
      },
      {
        artworkSlug: "character-portrait",
        title: "Character Portrait",
        image: "/images/academy/keshav/oil-painting-83.webp",
        displayImage: "/images/academy/keshav/oil-painting-83.webp",
        medium: "Graphite Pencil",
        size: "11 × 14",
        year: 2024,
        description: "A character portrait in graphite.",
        story: "Keshav's character study, two sessions.",
        exploredSkills: ["Character", "Expression"],
        macroShots: [{ label: "Face Detail", image: "/images/academy/keshav/oil-painting-83.webp" }],
        roomMockups: [{ label: "In the home", image: "/images/placeholders/artwork.svg" }]
      }
    ],
    journeyYears: [2022, 2022, 2022, 2023, 2024, 2024],
    featuredArtwork: {
      title: "Graphite Portrait Study",
      image: "/images/academy/keshav/oil-painting-158.webp",
      medium: "Graphite Pencil",
      size: "11 × 14 inches",
      yearCompleted: 2024,
      daysTaken: 7,
      description: "A graphite pencil portrait study.",
      teacherQuote: "Keshav's graphite work is precise and confident — his shading is excellent."
    },
    stats: {
      artworksCreated: 4,
      creativeHours: 35,
      favoriteColors: ["Charcoal", "Sienna"],
      currentMedium: "Graphite Pencil",
      dreamGoal: "Master portrait realism"
    },
    studioMoments: [
      { image: "/images/placeholders/studio.svg", alt: "Studio practice session" },
      { image: "/images/placeholders/studio.svg", alt: "Studio learning environment" },
      { image: "/images/placeholders/studio.svg", alt: "Creative process at work" }
    ],
    teacherNote: {
      text: "Keshav is focused and detail-oriented — his portraits keep getting stronger.",
      attribution: "Meenakshi Ma'am"
    },
    galleryWallImage: "/images/placeholders/gallery-wall.svg",
    teacherNoteImage: "/images/placeholders/teacher-note.svg",
    certificate: {
      text: "This is to certify that Keshav has successfully completed the foundational phases of art training and is an active student of Meenakshi Art Work Academy.",
      certificateId: "MAW-KESHAV-2024-009",
      issuedDate: new Date().toISOString().split("T")[0]
    },
    shareCode: "KESHAV24"
  };

export default entry;
