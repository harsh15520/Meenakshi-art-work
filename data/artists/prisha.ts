import type { ArtistProfile } from "../artists";

const entry: ArtistProfile = {
    slug: "prisha",
    name: "Prisha",
    joinedYear: 2023,
    headline: "Every painting begins with one fearless brushstroke.",
    isSample: false,
    heroImage: "/images/placeholders/hero.svg",
    featuredArtworkSlug: "cubist-cat",
    artworks: [
      {
        artworkSlug: "cubist-cat",
        title: "Cubist Cat",
        image: "/images/academy/prisha/oil-painting-15.webp",
        displayImage: "/images/academy/prisha/oil-painting-15.webp",
        medium: "Acrylic on Canvas",
        size: "12 × 14",
        year: 2024,
        description: "A cubist-style cat portrait study in bold colour.",
        story: "Prisha's first cubist study, exploring geometry and colour.",
        exploredSkills: ["Geometric Form", "Colour Blocking"],
        macroShots: [{ label: "Face Detail", image: "/images/academy/prisha/oil-painting-15.webp" }],
        roomMockups: [{ label: "In the home", image: "/images/placeholders/artwork.svg" }]
      },
      {
        artworkSlug: "cherry-blossom",
        title: "Cherry Blossom Tree",
        image: "/images/academy/prisha/Screenshot\ 2026-07-30\ 183041.webp",
        displayImage: "/images/academy/prisha/Screenshot\ 2026-07-30\ 183041.webp",
        medium: "Acrylic on Canvas",
        size: "12 × 14",
        year: 2024,
        description: "A cherry blossom tree reflected over water.",
        story: "Prisha's landscape study, built in a single week.",
        exploredSkills: ["Reflection", "Soft Palette"],
        macroShots: [{ label: "Blossom Detail", image: "/images/academy/prisha/Screenshot\ 2026-07-30\ 183041.webp" }],
        roomMockups: [{ label: "In the home", image: "/images/placeholders/artwork.svg" }]
      },
      {
        artworkSlug: "pointillism-tree",
        title: "Pointillism Autumn Tree",
        image: "/images/academy/prisha/oil-painting-144.webp",
        displayImage: "/images/academy/prisha/oil-painting-144.webp",
        medium: "Acrylic on Canvas",
        size: "12 × 14",
        year: 2024,
        description: "An autumn tree rendered in pointillism.",
        story: "Prisha's pointillism project, studying dotted texture.",
        exploredSkills: ["Pointillism", "Texture"],
        macroShots: [{ label: "Leaf Detail", image: "/images/academy/prisha/oil-painting-144.webp" }],
        roomMockups: [{ label: "In the home", image: "/images/placeholders/artwork.svg" }]
      },
      {
        artworkSlug: "floral-still-life",
        title: "Floral Still Life",
        image: "/images/academy/prisha/oil-painting-42.webp",
        displayImage: "/images/academy/prisha/oil-painting-42.webp",
        medium: "Acrylic on Canvas",
        size: "12 × 14",
        year: 2024,
        description: "A calm floral still life arrangement.",
        story: "Prisha's still life study of flowers and form.",
        exploredSkills: ["Composition", "Soft Light"],
        macroShots: [{ label: "Flower Detail", image: "/images/academy/prisha/oil-painting-42.webp" }],
        roomMockups: [{ label: "In the home", image: "/images/placeholders/artwork.svg" }]
      }
    ],
    journeyYears: [2023, 2023, 2023, 2024, 2024, 2024],
    featuredArtwork: {
      title: "Cubist Cat",
      image: "/images/academy/prisha/oil-painting-15.webp",
      medium: "Acrylic on Canvas",
      size: "12 × 14 inches",
      yearCompleted: 2024,
      daysTaken: 7,
      description: "A cubist-style cat portrait study in bold colour.",
      teacherQuote: "Prisha experiments bravely with style — her cubist cats have real character."
    },
    stats: {
      artworksCreated: 4,
      creativeHours: 28,
      favoriteColors: ["Magenta", "Teal"],
      currentMedium: "Acrylic",
      dreamGoal: "Try every art style"
    },
    studioMoments: [
      { image: "/images/placeholders/studio.svg", alt: "Studio practice session" },
      { image: "/images/placeholders/studio.svg", alt: "Studio learning environment" },
      { image: "/images/placeholders/studio.svg", alt: "Creative process at work" }
    ],
    teacherNote: {
      text: "Prisha is curious and willing to try new techniques every week.",
      attribution: "Meenakshi Ma'am"
    },
    galleryWallImage: "/images/placeholders/gallery-wall.svg",
    teacherNoteImage: "/images/placeholders/teacher-note.svg",
    certificate: {
      text: "This is to certify that Prisha has successfully completed the foundational phases of art training and is an active student of Meenakshi Art Work Academy.",
      certificateId: "MAW-PRISHA-2024-007",
      issuedDate: new Date().toISOString().split("T")[0]
    },
    shareCode: "PRISHA24"
  };

export default entry;
