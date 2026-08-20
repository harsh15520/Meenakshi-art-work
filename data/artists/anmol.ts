import type { ArtistProfile } from "../artists";

const entry: ArtistProfile = {
    slug: "anmol",
    name: "Anmol Gupta",
    joinedYear: 2023,
    headline: "Every painting begins with one fearless brushstroke.",
    isSample: false,
    heroImage: "/images/placeholders/hero.svg",
    featuredArtworkSlug: "pianist-portrait",
    artworks: [
      {
        artworkSlug: "pianist-portrait",
        title: "Pianist Portrait",
        image: "/images/academy/anmol/oil-painting-91.webp",
        displayImage: "/images/academy/anmol/oil-painting-91.webp",
        medium: "Acrylic on Canvas",
        size: "14 × 16",
        year: 2024,
        description: "A pianist captured in acrylic portrait.",
        story: "Anmol's four-week portrait study.",
        exploredSkills: ["Portrait", "Music Theme"],
        macroShots: [{ label: "Hand Detail", image: "/images/academy/anmol/oil-painting-91.webp" }],
        roomMockups: [{ label: "In the home", image: "/images/placeholders/artwork.svg" }]
      },
      {
        artworkSlug: "second-study",
        title: "Second Study",
        image: "/images/academy/anmol/oil-painting-97.webp",
        displayImage: "/images/academy/anmol/oil-painting-97.webp",
        medium: "Acrylic on Canvas",
        size: "12 × 14",
        year: 2024,
        description: "Anmol's follow-up acrylic study.",
        story: "A second piece exploring portraiture.",
        exploredSkills: ["Portrait", "Layering"],
        macroShots: [{ label: "Detail", image: "/images/academy/anmol/oil-painting-97.webp" }],
        roomMockups: [{ label: "In the home", image: "/images/placeholders/artwork.svg" }]
      }
    ],
    journeyYears: [2023, 2023, 2023, 2024, 2024, 2024],
    featuredArtwork: {
      title: "Pianist Portrait",
      image: "/images/academy/anmol/oil-painting-91.webp",
      medium: "Acrylic on Canvas",
      size: "14 × 16 inches",
      yearCompleted: 2024,
      daysTaken: 28,
      description: "A pianist captured in acrylic portrait.",
      teacherQuote: "Anmol paints with patience and a clear sense of mood."
    },
    stats: {
      artworksCreated: 2,
      creativeHours: 26,
      favoriteColors: ["Indigo", "Bronze"],
      currentMedium: "Acrylic",
      dreamGoal: "Paint musicians"
    },
    studioMoments: [
      { image: "/images/placeholders/studio.svg", alt: "Studio practice session" },
      { image: "/images/placeholders/studio.svg", alt: "Studio learning environment" },
      { image: "/images/placeholders/studio.svg", alt: "Creative process at work" }
    ],
    teacherNote: {
      text: "Anmol is thoughtful and steady — his portraits carry quiet feeling.",
      attribution: "Meenakshi Ma'am"
    },
    galleryWallImage: "/images/placeholders/gallery-wall.svg",
    teacherNoteImage: "/images/placeholders/teacher-note.svg",
    certificate: {
      text: "This is to certify that Anmol has successfully completed the foundational phases of art training and is an active student of Meenakshi Art Work Academy.",
      certificateId: "MAW-ANMOL-2024-010",
      issuedDate: new Date().toISOString().split("T")[0]
    },
    shareCode: "ANMOL24"
  };

export default entry;
