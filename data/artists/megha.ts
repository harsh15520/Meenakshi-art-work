import type { ArtistProfile } from "../artists";

const entry: ArtistProfile = {
    slug: "megha",
    name: "Megha",
    joinedYear: 2023,
    headline: "Every painting begins with one fearless brushstroke.",
    isSample: false,
    heroImage: "/images/placeholders/hero.svg",
    featuredArtworkSlug: "autumn-path",
    artworks: [
      {
        artworkSlug: "autumn-path",
        title: "Autumn Park Path",
        image: "/images/academy/megha/oil-painting-119.webp",
        displayImage: "/images/academy/megha/oil-painting-119.webp",
        medium: "Acrylic on Canvas",
        size: "14 × 16",
        year: 2024,
        description: "An autumn park path landscape.",
        story: "Megha's three-week landscape study.",
        exploredSkills: ["Landscape", "Autumn Palette"],
        macroShots: [{ label: "Path Detail", image: "/images/academy/megha/oil-painting-119.webp" }],
        roomMockups: [{ label: "In the home", image: "/images/placeholders/artwork.svg" }]
      },
      {
        artworkSlug: "sailboat-sunset",
        title: "Sailboat at Sunset",
        image: "/images/academy/megha/oil-painting-47.webp",
        displayImage: "/images/academy/megha/oil-painting-47.webp",
        medium: "Acrylic on Canvas",
        size: "12 × 14",
        year: 2024,
        description: "A sailboat at sunset, seascape study.",
        story: "Megha's two-week seascape study.",
        exploredSkills: ["Seascape", "Sky Gradients"],
        macroShots: [{ label: "Sail Detail", image: "/images/academy/megha/oil-painting-47.webp" }],
        roomMockups: [{ label: "In the home", image: "/images/placeholders/artwork.svg" }]
      }
    ],
    journeyYears: [2023, 2023, 2023, 2024, 2024, 2024],
    featuredArtwork: {
      title: "Autumn Park Path",
      image: "/images/academy/megha/oil-painting-119.webp",
      medium: "Acrylic on Canvas",
      size: "14 × 16 inches",
      yearCompleted: 2024,
      daysTaken: 21,
      description: "An autumn park path landscape.",
      teacherQuote: "Megha's landscapes feel calm and considered — her skies are lovely."
    },
    stats: {
      artworksCreated: 2,
      creativeHours: 22,
      favoriteColors: ["Amber", "Slate Blue"],
      currentMedium: "Acrylic",
      dreamGoal: "Paint the seasons"
    },
    studioMoments: [
      { image: "/images/placeholders/studio.svg", alt: "Studio practice session" },
      { image: "/images/placeholders/studio.svg", alt: "Studio learning environment" },
      { image: "/images/placeholders/studio.svg", alt: "Creative process at work" }
    ],
    teacherNote: {
      text: "Megha observes the world gently and it shows in her peaceful scenes.",
      attribution: "Meenakshi Ma'am"
    },
    galleryWallImage: "/images/placeholders/gallery-wall.svg",
    teacherNoteImage: "/images/placeholders/teacher-note.svg",
    certificate: {
      text: "This is to certify that Megha has successfully completed the foundational phases of art training and is an active student of Meenakshi Art Work Academy.",
      certificateId: "MAW-MEGHA-2024-011",
      issuedDate: new Date().toISOString().split("T")[0]
    },
    shareCode: "MEGHA24"
  };

export default entry;
