import type { ArtistProfile } from "../artists";

const entry: ArtistProfile = {
    slug: "raj-kumar-gayen",
    name: "Raj Kumar Gayen",
    joinedYear: 2023,
    headline: "Every painting begins with one fearless brushstroke.",
    isSample: false,
    heroImage: "/images/placeholders/hero.svg",
    featuredArtworkSlug: "violinist-portrait",
    artworks: [
      {
        artworkSlug: "violinist-portrait",
        title: "Violinist Portrait",
        image: "/images/academy/Raj-kumar-gayen/oil-painting-114.webp",
        displayImage: "/images/academy/Raj-kumar-gayen/oil-painting-114.webp",
        medium: "Acrylic on Canvas",
        size: "14 × 16",
        year: 2024,
        description: "A violinist captured in acrylic portrait.",
        story: "Raj Kumar's four-week portrait study.",
        exploredSkills: ["Portrait", "Music Theme"],
        macroShots: [{ label: "Bow Detail", image: "/images/academy/Raj-kumar-gayen/oil-painting-114.webp" }],
        roomMockups: [{ label: "In the home", image: "/images/placeholders/artwork.svg" }]
      }
    ],
    journeyYears: [2023, 2023, 2023, 2024, 2024, 2024],
    featuredArtwork: {
      title: "Violinist Portrait",
      image: "/images/academy/Raj-kumar-gayen/oil-painting-114.webp",
      medium: "Acrylic on Canvas",
      size: "14 × 16 inches",
      yearCompleted: 2024,
      daysTaken: 28,
      description: "A violinist captured in acrylic portrait.",
      teacherQuote: "Raj Kumar's portrait has lovely musical feeling and clean lines."
    },
    stats: {
      artworksCreated: 1,
      creativeHours: 24,
      favoriteColors: ["Violet", "Gold"],
      currentMedium: "Acrylic",
      dreamGoal: "Paint musicians"
    },
    studioMoments: [
      { image: "/images/placeholders/studio.svg", alt: "Studio practice session" },
      { image: "/images/placeholders/studio.svg", alt: "Studio learning environment" },
      { image: "/images/placeholders/studio.svg", alt: "Creative process at work" }
    ],
    teacherNote: {
      text: "Raj Kumar works with quiet concentration — a pleasure to teach.",
      attribution: "Meenakshi Ma'am"
    },
    galleryWallImage: "/images/placeholders/gallery-wall.svg",
    teacherNoteImage: "/images/placeholders/teacher-note.svg",
    certificate: {
      text: "This is to certify that Raj Kumar has successfully completed the foundational phases of art training and is an active student of Meenakshi Art Work Academy.",
      certificateId: "MAW-RAJKUMAR-2024-014",
      issuedDate: new Date().toISOString().split("T")[0]
    },
    shareCode: "RAJKUMAR24"
  };

export default entry;
