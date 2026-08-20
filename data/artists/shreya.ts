import type { ArtistProfile } from "../artists";

const entry: ArtistProfile = {
    slug: "shreya",
    name: "Shreya",
    joinedYear: 2022,
    headline: "Every painting begins with one fearless brushstroke.",
    isSample: false,
    heroImage: "/images/academy/shreya/shreya's identity/hero-image-1.webp",
    featuredArtworkSlug: "flamenco-dancer",
    artworks: [
      {
        artworkSlug: "flamenco-dancer",
        title: "Flamenco Dancer",
        image: "/images/academy/shreya/oil-painting-117.webp",
        displayImage: "/images/academy/shreya/oil-painting-117.webp",
        medium: "Acrylic on Canvas",
        size: "14 × 16",
        year: 2024,
        description: "A flamenco dancer captured mid-movement.",
        story: "Shreya's figure study, built over three weeks.",
        exploredSkills: ["Figure", "Movement"],
        macroShots: [{ label: "Dress Detail", image: "/images/academy/shreya/oil-painting-117.webp" }],
        roomMockups: [{ label: "In the home", image: "/images/placeholders/artwork.svg" }]
      },
      {
        artworkSlug: "village-river",
        title: "Village River Landscape",
        image: "/images/academy/shreya/oil-painting-121.webp",
        displayImage: "/images/academy/shreya/oil-painting-121.webp",
        medium: "Acrylic on Canvas",
        size: "14 × 16",
        year: 2024,
        description: "A quiet village river landscape.",
        story: "Shreya's longest landscape piece, four weeks of layering.",
        exploredSkills: ["Landscape", "Layering"],
        macroShots: [{ label: "Water Detail", image: "/images/academy/shreya/oil-painting-121.webp" }],
        roomMockups: [{ label: "In the home", image: "/images/placeholders/artwork.svg" }]
      },
      {
        artworkSlug: "tropical-beach",
        title: "Tropical Beach Hut",
        image: "/images/academy/shreya/oil-painting-2000.webp",
        displayImage: "/images/academy/shreya/oil-painting-2000.webp",
        medium: "Acrylic on Canvas",
        size: "12 × 14",
        year: 2024,
        description: "A tropical beach hut scene in warm light.",
        story: "Shreya's two-week landscape study.",
        exploredSkills: ["Warm Palette", "Scenery"],
        macroShots: [{ label: "Hut Detail", image: "/images/academy/shreya/oil-painting-2000.webp" }],
        roomMockups: [{ label: "In the home", image: "/images/placeholders/artwork.svg" }]
      },
      {
        artworkSlug: "exotic-bird",
        title: "Exotic Bird",
        image: "/images/academy/shreya/oil-painting-67.webp",
        displayImage: "/images/academy/shreya/oil-painting-67.webp",
        medium: "Acrylic on Canvas",
        size: "12 × 14",
        year: 2024,
        description: "A colourful bird perched on a branch.",
        story: "Shreya's wildlife study in acrylic.",
        exploredSkills: ["Wildlife", "Colour"],
        macroShots: [{ label: "Feather Detail", image: "/images/academy/shreya/oil-painting-67.webp" }],
        roomMockups: [{ label: "In the home", image: "/images/placeholders/artwork.svg" }]
      }
    ],
    journeyYears: [2022, 2022, 2022, 2023, 2024, 2024],
    featuredArtwork: {
      title: "Flamenco Dancer",
      image: "/images/academy/shreya/oil-painting-117.webp",
      medium: "Acrylic on Canvas",
      size: "14 × 16 inches",
      yearCompleted: 2024,
      daysTaken: 21,
      description: "A flamenco dancer captured mid-movement.",
      teacherQuote: "Shreya's figures have real energy — she draws the eye with every pose."
    },
    stats: {
      artworksCreated: 4,
      creativeHours: 40,
      favoriteColors: ["Crimson", "Gold"],
      currentMedium: "Acrylic",
      dreamGoal: "Paint dance in every form"
    },
    studioMoments: [
      { image: "/images/academy/shreya/shreya's identity/studio-image-1.webp", alt: "Studio practice session" },
      { image: "/images/placeholders/studio.svg", alt: "Studio learning environment" },
      { image: "/images/placeholders/studio.svg", alt: "Creative process at work" }
    ],
    teacherNote: {
      text: "Shreya brings grace and discipline to her work — a joy to guide.",
      attribution: "Meenakshi Ma'am"
    },
    galleryWallImage: "/images/placeholders/gallery-wall.svg",
    teacherNoteImage: "/images/placeholders/teacher-note.svg",
    certificate: {
      text: "This is to certify that Shreya has successfully completed the foundational phases of art training and is an active student of Meenakshi Art Work Academy.",
      certificateId: "MAW-SHREYA-2024-008",
      issuedDate: new Date().toISOString().split("T")[0]
    },
    shareCode: "SHREYA24"
  };

export default entry;
