import type { ArtistProfile } from "../artists";

const entry: ArtistProfile = {
    slug: "harsh",
    name: "Harsh",
    joinedYear: 2023,
    headline: "Every painting begins with one fearless brushstroke.",
    isSample: false,
    heroImage: "/images/placeholders/hero.svg",
    featuredArtworkSlug: "pop-art-portrait",
    artworks: [
      {
        artworkSlug: "pop-art-portrait",
        title: "Pop Art Portrait",
        image: "/images/academy/harsh\ bansal/oil-painting-3400.webp",
        displayImage: "/images/academy/harsh\ bansal/oil-painting-3400.webp",
        medium: "Acrylic on Canvas",
        size: "14 × 16",
        year: 2024,
        description: "A pop-art style acrylic portrait.",
        story: "Harsh's two-week pop art study.",
        exploredSkills: ["Pop Art", "Bold Colour"],
        macroShots: [{ label: "Detail", image: "/images/academy/harsh\ bansal/oil-painting-3400.webp" }],
        roomMockups: [{ label: "In the home", image: "/images/placeholders/artwork.svg" }]
      },
      {
        artworkSlug: "silhouette-sunset",
        title: "Silhouette Sunset",
        image: "/images/academy/harsh\ bansal/oil-painting-3463.webp",
        displayImage: "/images/academy/harsh\ bansal/oil-painting-3463.webp",
        medium: "Acrylic on Canvas",
        size: "12 × 14",
        year: 2024,
        description: "A silhouette sunset scene.",
        story: "Harsh's one-week silhouette study.",
        exploredSkills: ["Silhouette", "Sky"],
        macroShots: [{ label: "Detail", image: "/images/academy/harsh\ bansal/oil-painting-3463.webp" }],
        roomMockups: [{ label: "In the home", image: "/images/placeholders/artwork.svg" }]
      },
      {
        artworkSlug: "abstract-pattern",
        title: "Abstract Pattern",
        image: "/images/academy/harsh\ bansal/oil-painting-4322.webp",
        displayImage: "/images/academy/harsh\ bansal/oil-painting-4322.webp",
        medium: "Acrylic on Canvas",
        size: "12 × 14",
        year: 2024,
        description: "An abstract pattern composition.",
        story: "Harsh's two-week abstract study.",
        exploredSkills: ["Abstraction", "Pattern"],
        macroShots: [{ label: "Detail", image: "/images/academy/harsh\ bansal/oil-painting-4322.webp" }],
        roomMockups: [{ label: "In the home", image: "/images/placeholders/artwork.svg" }]
      }
    ],
    journeyYears: [2023, 2023, 2023, 2024, 2024, 2024],
    featuredArtwork: {
      title: "Pop Art Portrait",
      image: "/images/academy/harsh\ bansal/oil-painting-3400.webp",
      medium: "Acrylic on Canvas",
      size: "14 × 16 inches",
      yearCompleted: 2024,
      daysTaken: 14,
      description: "A pop-art style acrylic portrait.",
      teacherQuote: "Harsh enjoys bold colour and modern styles — his pop art pops."
    },
    stats: {
      artworksCreated: 3,
      creativeHours: 26,
      favoriteColors: ["Cobalt", "Yellow"],
      currentMedium: "Acrylic",
      dreamGoal: "Explore modern art"
    },
    studioMoments: [
      { image: "/images/placeholders/studio.svg", alt: "Studio practice session" },
      { image: "/images/placeholders/studio.svg", alt: "Studio learning environment" },
      { image: "/images/placeholders/studio.svg", alt: "Creative process at work" }
    ],
    teacherNote: {
      text: "Harsh is energetic and open to new ideas — fun to mentor.",
      attribution: "Meenakshi Ma'am"
    },
    galleryWallImage: "/images/placeholders/gallery-wall.svg",
    teacherNoteImage: "/images/placeholders/teacher-note.svg",
    certificate: {
      text: "This is to certify that Harsh has successfully completed the foundational phases of art training and is an active student of Meenakshi Art Work Academy.",
      certificateId: "MAW-HARSH-2024-015",
      issuedDate: new Date().toISOString().split("T")[0]
    },
    shareCode: "HARSH24"
  };

export default entry;
