import type { ArtistProfile } from "../artists";

const entry: ArtistProfile = {
    slug: "niyati",
    name: "Niyati",
    joinedYear: 2022,
    headline: "Every painting begins with one fearless brushstroke.",
    isSample: false,
    heroImage: "/images/placeholders/hero.svg",
    featuredArtworkSlug: "traditional-art",
    artworks: [
      {
        artworkSlug: "traditional-art",
        title: "Radha Krishna",
        image: "/images/placeholders/artwork.svg",
        displayImage: "/images/placeholders/artwork.svg",
        medium: "Acrylic on Canvas",
        size: "12 × 14",
        year: 2024,
        description: "A traditional art study exploring colour and devotion.",
        story: "Niyati's first full traditional piece, built step by step in class.",
        exploredSkills: ["Line Work", "Colour Harmony"],
        macroShots: [{ label: "Detail", image: "/images/placeholders/artwork.svg" }],
        roomMockups: [{ label: "In the home", image: "/images/placeholders/artwork.svg" }]
      }
    ],
    journeyYears: [2022, 2022, 2023, 2023, 2024, 2024],
    featuredArtwork: {
      title: "Radha Krishna",
      image: "/images/placeholders/artwork.svg",
      medium: "Acrylic on Canvas",
      size: "12 × 14 inches",
      yearCompleted: 2024,
      daysTaken: 14,
      description: "A traditional art study exploring colour and devotion.",
      teacherQuote: "Niyati works with patience and a steady hand — her detailing keeps improving each week."
    },
    stats: {
      artworksCreated: 1,
      creativeHours: 12,
      favoriteColors: ["Red", "Gold"],
      currentMedium: "Acrylic",
      dreamGoal: "Paint a full festival series"
    },
    studioMoments: [
      { image: "/images/placeholders/studio.svg", alt: "Studio practice session" },
      { image: "/images/placeholders/studio.svg", alt: "Studio learning environment" },
      { image: "/images/placeholders/studio.svg", alt: "Creative process at work" }
    ],
    teacherNote: {
      text: "Niyati brings calm focus to every session. I'm excited to watch her keep growing.",
      attribution: "Meenakshi Ma'am"
    },
    galleryWallImage: "/images/placeholders/gallery-wall.svg",
    teacherNoteImage: "/images/placeholders/teacher-note.svg",
    certificate: {
      text: "This is to certify that Niyati has successfully completed the foundational phases of art training and is an active student of Meenakshi Art Work Academy.",
      certificateId: "MAW-NIYATI-2024-002",
      issuedDate: new Date().toISOString().split("T")[0]
    },
    shareCode: "NIYATI24"
  };

export default entry;
