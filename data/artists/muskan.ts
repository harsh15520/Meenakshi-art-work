import type { ArtistProfile } from "../artists";

const entry: ArtistProfile = {
    slug: "muskan",
    name: "Muskan",
    joinedYear: 2023,
    headline: "Every painting begins with one fearless brushstroke.",
    isSample: false,
    heroImage: "/images/placeholders/hero.svg",
    featuredArtworkSlug: "landscape-1",
    artworks: [
      {
        artworkSlug: "landscape-1",
        title: "Autumn Path",
        image: "/images/placeholders/artwork.svg",
        displayImage: "/images/placeholders/artwork.svg",
        medium: "Acrylic on Canvas",
        size: "14 × 16",
        year: 2024,
        description: "A calm landscape study in warm tones.",
        story: "Muskan's first landscape, painted over two weeks in class.",
        exploredSkills: ["Perspective", "Layering"],
        macroShots: [{ label: "Path Detail", image: "/images/placeholders/artwork.svg" }],
        roomMockups: [{ label: "In the home", image: "/images/placeholders/artwork.svg" }]
      },
      {
        artworkSlug: "landscape-2",
        title: "Riverside",
        image: "/images/placeholders/artwork.svg",
        displayImage: "/images/placeholders/artwork.svg",
        medium: "Acrylic on Canvas",
        size: "12 × 14",
        year: 2024,
        description: "A second landscape exploring reflection and sky.",
        story: "Muskan's follow-up piece, building on the first.",
        exploredSkills: ["Reflection", "Sky Gradients"],
        macroShots: [{ label: "Water Detail", image: "/images/placeholders/artwork.svg" }],
        roomMockups: [{ label: "In the home", image: "/images/placeholders/artwork.svg" }]
      }
    ],
    journeyYears: [2023, 2023, 2023, 2024, 2024, 2024],
    featuredArtwork: {
      title: "Autumn Path",
      image: "/images/placeholders/artwork.svg",
      medium: "Acrylic on Canvas",
      size: "14 × 16 inches",
      yearCompleted: 2024,
      daysTaken: 14,
      description: "A calm landscape study in warm tones.",
      teacherQuote: "Muskan has a good eye for atmosphere — her skies feel quiet and real."
    },
    stats: {
      artworksCreated: 2,
      creativeHours: 20,
      favoriteColors: ["Orange", "Green"],
      currentMedium: "Acrylic",
      dreamGoal: "Paint en plein air"
    },
    studioMoments: [
      { image: "/images/placeholders/studio.svg", alt: "Studio practice session" },
      { image: "/images/placeholders/studio.svg", alt: "Studio learning environment" },
      { image: "/images/placeholders/studio.svg", alt: "Creative process at work" }
    ],
    teacherNote: {
      text: "Muskan learns quickly and applies feedback with care. Keep going!",
      attribution: "Meenakshi Ma'am"
    },
    galleryWallImage: "/images/placeholders/gallery-wall.svg",
    teacherNoteImage: "/images/placeholders/teacher-note.svg",
    certificate: {
      text: "This is to certify that Muskan has successfully completed the foundational phases of art training and is an active student of Meenakshi Art Work Academy.",
      certificateId: "MAW-MUSKAN-2024-003",
      issuedDate: new Date().toISOString().split("T")[0]
    },
    shareCode: "MUSKAN24"
  };

export default entry;
