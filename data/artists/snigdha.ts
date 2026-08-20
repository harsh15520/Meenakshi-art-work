import type { ArtistProfile } from "../artists";

const entry: ArtistProfile = {
    slug: "snigdha",
    name: "Snigdha",
    joinedYear: 2022,
    headline: "Every painting begins with one fearless brushstroke.",
    isSample: false,
    heroImage: "/images/placeholders/hero.svg",
    featuredArtworkSlug: "balcony-reader",
    artworks: [
      {
        artworkSlug: "balcony-reader",
        title: "Woman Reading on a Balcony",
        image: "/images/academy/snigdha/2.webp",
        displayImage: "/images/academy/snigdha/2.webp",
        medium: "Acrylic on Canvas",
        size: "14 × 16",
        year: 2024,
        description: "An illustrative scene of a woman reading on a balcony.",
        story: "Snigdha's two-week illustrative piece.",
        exploredSkills: ["Illustrative", "Scene"],
        macroShots: [{ label: "Figure Detail", image: "/images/academy/snigdha/2.webp" }],
        roomMockups: [{ label: "In the home", image: "/images/placeholders/artwork.svg" }]
      },
      {
        artworkSlug: "wildflowers",
        title: "Wildflowers Still Life",
        image: "/images/academy/snigdha/3.webp",
        displayImage: "/images/academy/snigdha/3.webp",
        medium: "Acrylic on Canvas",
        size: "12 × 14",
        year: 2024,
        description: "A wildflowers still life.",
        story: "Snigdha's one-week still life study.",
        exploredSkills: ["Still Life", "Florals"],
        macroShots: [{ label: "Flower Detail", image: "/images/academy/snigdha/3.webp" }],
        roomMockups: [{ label: "In the home", image: "/images/placeholders/artwork.svg" }]
      },
      {
        artworkSlug: "abstract-pattern",
        title: "Abstract Pattern",
        image: "/images/academy/snigdha/4.webp",
        displayImage: "/images/academy/snigdha/4.webp",
        medium: "Acrylic on Canvas",
        size: "12 × 14",
        year: 2024,
        description: "An abstract pattern composition.",
        story: "Snigdha's two-week abstract study.",
        exploredSkills: ["Pattern", "Abstraction"],
        macroShots: [{ label: "Pattern Detail", image: "/images/academy/snigdha/4.webp" }],
        roomMockups: [{ label: "In the home", image: "/images/placeholders/artwork.svg" }]
      },
      {
        artworkSlug: "decorative-elephant",
        title: "Decorative Elephant",
        image: "/images/academy/snigdha/5.webp",
        displayImage: "/images/academy/snigdha/5.webp",
        medium: "Acrylic on Canvas",
        size: "12 × 14",
        year: 2024,
        description: "A decorative patterned elephant.",
        story: "Snigdha's decorative pattern study.",
        exploredSkills: ["Decoration", "Pattern"],
        macroShots: [{ label: "Trunk Detail", image: "/images/academy/snigdha/5.webp" }],
        roomMockups: [{ label: "In the home", image: "/images/placeholders/artwork.svg" }]
      },
      {
        artworkSlug: "umbrella-parent-child",
        title: "Parent and Child Under an Umbrella",
        image: "/images/academy/snigdha/oil-painting-104.webp",
        displayImage: "/images/academy/snigdha/oil-painting-104.webp",
        medium: "Acrylic on Canvas",
        size: "14 × 16",
        year: 2024,
        description: "A tender figure-and-landscape scene.",
        story: "Snigdha's two-week figure study.",
        exploredSkills: ["Figure", "Narrative"],
        macroShots: [{ label: "Figure Detail", image: "/images/academy/snigdha/oil-painting-104.webp" }],
        roomMockups: [{ label: "In the home", image: "/images/placeholders/artwork.svg" }]
      }
    ],
    journeyYears: [2022, 2022, 2022, 2023, 2024, 2024],
    featuredArtwork: {
      title: "Woman Reading on a Balcony",
      image: "/images/academy/snigdha/2.webp",
      medium: "Acrylic on Canvas",
      size: "14 × 16 inches",
      yearCompleted: 2024,
      daysTaken: 14,
      description: "An illustrative scene of a woman reading on a balcony.",
      teacherQuote: "Snigdha tells little stories with her paintings — warm and human."
    },
    stats: {
      artworksCreated: 5,
      creativeHours: 42,
      favoriteColors: ["Rose", "Sage"],
      currentMedium: "Acrylic",
      dreamGoal: "Illustrate stories"
    },
    studioMoments: [
      { image: "/images/placeholders/studio.svg", alt: "Studio practice session" },
      { image: "/images/placeholders/studio.svg", alt: "Studio learning environment" },
      { image: "/images/placeholders/studio.svg", alt: "Creative process at work" }
    ],
    teacherNote: {
      text: "Snigdha's imagination is rich — every piece has a little world in it.",
      attribution: "Meenakshi Ma'am"
    },
    galleryWallImage: "/images/placeholders/gallery-wall.svg",
    teacherNoteImage: "/images/placeholders/teacher-note.svg",
    certificate: {
      text: "This is to certify that Snigdha has successfully completed the foundational phases of art training and is an active student of Meenakshi Art Work Academy.",
      certificateId: "MAW-SNIGDHA-2024-012",
      issuedDate: new Date().toISOString().split("T")[0]
    },
    shareCode: "SNIGDHA24"
  };

export default entry;
