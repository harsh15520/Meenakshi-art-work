import type { ArtistProfile } from "../artists";

const entry: ArtistProfile = {
    slug: "sanchi",
    name: "Sanchi",
    joinedYear: 2022,
    headline: "Every painting begins with one fearless brushstroke.",
    isSample: false,
    heroImage: "/images/placeholders/hero.svg",
    featuredArtworkSlug: "wildlife-1",
    artworks: [
      {
        artworkSlug: "wildlife-1",
        title: "Cranes at Sunset",
        image: "/images/placeholders/artwork.svg",
        displayImage: "/images/placeholders/artwork.svg",
        medium: "Acrylic on Canvas",
        size: "14 × 16",
        year: 2024,
        description: "A wildlife study of cranes in warm light.",
        story: "Sanchi's first wildlife piece, built over two weeks.",
        exploredSkills: ["Proportion", "Warm Palette"],
        macroShots: [{ label: "Crane Detail", image: "/images/placeholders/artwork.svg" }],
        roomMockups: [{ label: "In the home", image: "/images/placeholders/artwork.svg" }]
      },
      {
        artworkSlug: "wildlife-2",
        title: "Forest Deer",
        image: "/images/placeholders/artwork.svg",
        displayImage: "/images/placeholders/artwork.svg",
        medium: "Acrylic on Canvas",
        size: "12 × 14",
        year: 2024,
        description: "A second wildlife study with a deer in foliage.",
        story: "Sanchi's follow-up piece exploring animals in habitat.",
        exploredSkills: ["Foliage", "Texture"],
        macroShots: [{ label: "Foliage Detail", image: "/images/placeholders/artwork.svg" }],
        roomMockups: [{ label: "In the home", image: "/images/placeholders/artwork.svg" }]
      },
      {
        artworkSlug: "wildlife-3",
        title: "River Heron",
        image: "/images/placeholders/artwork.svg",
        displayImage: "/images/placeholders/artwork.svg",
        medium: "Acrylic on Canvas",
        size: "12 × 14",
        year: 2024,
        description: "A heron by the water, practising reflection.",
        story: "Sanchi's third piece, focusing on water and stillness.",
        exploredSkills: ["Reflection", "Stillness"],
        macroShots: [{ label: "Water Detail", image: "/images/placeholders/artwork.svg" }],
        roomMockups: [{ label: "In the home", image: "/images/placeholders/artwork.svg" }]
      }
    ],
    journeyYears: [2022, 2022, 2022, 2023, 2024, 2024],
    featuredArtwork: {
      title: "Cranes at Sunset",
      image: "/images/placeholders/artwork.svg",
      medium: "Acrylic on Canvas",
      size: "14 × 16 inches",
      yearCompleted: 2024,
      daysTaken: 14,
      description: "A wildlife study of cranes in warm light.",
      teacherQuote: "Sanchi's love for animals shows in every feathered detail."
    },
    stats: {
      artworksCreated: 3,
      creativeHours: 30,
      favoriteColors: ["Amber", "Teal"],
      currentMedium: "Acrylic",
      dreamGoal: "Illustrate a children's book"
    },
    studioMoments: [
      { image: "/images/placeholders/studio.svg", alt: "Studio practice session" },
      { image: "/images/placeholders/studio.svg", alt: "Studio learning environment" },
      { image: "/images/placeholders/studio.svg", alt: "Creative process at work" }
    ],
    teacherNote: {
      text: "Sanchi observes nature closely and translates it gently onto canvas.",
      attribution: "Meenakshi Ma'am"
    },
    galleryWallImage: "/images/placeholders/gallery-wall.svg",
    teacherNoteImage: "/images/placeholders/teacher-note.svg",
    certificate: {
      text: "This is to certify that Sanchi has successfully completed the foundational phases of art training and is an active student of Meenakshi Art Work Academy.",
      certificateId: "MAW-SANCHI-2024-005",
      issuedDate: new Date().toISOString().split("T")[0]
    },
    shareCode: "SANCHI24"
  };

export default entry;
