import type { ArtistProfile } from "../artists";

const entry: ArtistProfile = {
    slug: "kartik",
    name: "Kartik",
    joinedYear: 2023,
    headline: "Every painting begins with one fearless brushstroke.",
    isSample: false,
    heroImage: "/images/placeholders/hero.svg",
    featuredArtworkSlug: "wildlife-elephant",
    artworks: [
      {
        artworkSlug: "wildlife-elephant",
        title: "Mosaic Elephant",
        image: "/images/placeholders/artwork.svg",
        displayImage: "/images/placeholders/artwork.svg",
        medium: "Acrylic on Canvas",
        size: "14 × 16",
        year: 2024,
        description: "A decorative mosaic-style elephant study.",
        story: "Kartik's first piece, exploring pattern and repetition.",
        exploredSkills: ["Pattern", "Repetition"],
        macroShots: [{ label: "Pattern Detail", image: "/images/placeholders/artwork.svg" }],
        roomMockups: [{ label: "In the home", image: "/images/placeholders/artwork.svg" }]
      },
      {
        artworkSlug: "wildlife-tiger",
        title: "Stripes",
        image: "/images/placeholders/artwork.svg",
        displayImage: "/images/placeholders/artwork.svg",
        medium: "Acrylic on Canvas",
        size: "12 × 14",
        year: 2024,
        description: "A tiger study focusing on stripes and form.",
        story: "Kartik's follow-up piece on big cats.",
        exploredSkills: ["Form", "Contrast"],
        macroShots: [{ label: "Stripe Detail", image: "/images/placeholders/artwork.svg" }],
        roomMockups: [{ label: "In the home", image: "/images/placeholders/artwork.svg" }]
      }
    ],
    journeyYears: [2023, 2023, 2023, 2024, 2024, 2024],
    featuredArtwork: {
      title: "Mosaic Elephant",
      image: "/images/placeholders/artwork.svg",
      medium: "Acrylic on Canvas",
      size: "14 × 16 inches",
      yearCompleted: 2024,
      daysTaken: 14,
      description: "A decorative mosaic-style elephant study.",
      teacherQuote: "Kartik enjoys pattern work — his patience with detail is growing."
    },
    stats: {
      artworksCreated: 2,
      creativeHours: 22,
      favoriteColors: ["Blue", "Gold"],
      currentMedium: "Acrylic",
      dreamGoal: "Paint a mural"
    },
    studioMoments: [
      { image: "/images/placeholders/studio.svg", alt: "Studio practice session" },
      { image: "/images/placeholders/studio.svg", alt: "Studio learning environment" },
      { image: "/images/placeholders/studio.svg", alt: "Creative process at work" }
    ],
    teacherNote: {
      text: "Kartik is steady and curious — I look forward to his bigger pieces.",
      attribution: "Meenakshi Ma'am"
    },
    galleryWallImage: "/images/placeholders/gallery-wall.svg",
    teacherNoteImage: "/images/placeholders/teacher-note.svg",
    certificate: {
      text: "This is to certify that Kartik has successfully completed the foundational phases of art training and is an active student of Meenakshi Art Work Academy.",
      certificateId: "MAW-KARTIK-2024-006",
      issuedDate: new Date().toISOString().split("T")[0]
    },
    shareCode: "KARTIK24"
  };

export default entry;
