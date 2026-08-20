import type { ArtistProfile } from "../artists";

const entry: ArtistProfile = {
    slug: "veenu",
    name: "Veenu",
    joinedYear: 2022,
    headline: "Every painting begins with one fearless brushstroke.",
    isSample: false,
    heroImage: "/images/placeholders/hero.svg",
    featuredArtworkSlug: "portrait-commission",
    artworks: [
      {
        artworkSlug: "portrait-commission",
        title: "Portrait Commission",
        image: "/images/academy/veenu/oil-painting-110.webp",
        displayImage: "/images/academy/veenu/oil-painting-110.webp",
        medium: "Oil on Canvas",
        size: "16 × 20",
        year: 2024,
        description: "A realistic portrait commission in oil.",
        story: "Veenu's five-week oil portrait commission.",
        exploredSkills: ["Oil", "Portraiture"],
        macroShots: [{ label: "Face Detail", image: "/images/academy/veenu/oil-painting-110.webp" }],
        roomMockups: [{ label: "In the home", image: "/images/placeholders/artwork.svg" }]
      },
      {
        artworkSlug: "traditional-procession",
        title: "Traditional Procession",
        image: "/images/academy/veenu/oil-painting-35.webp",
        displayImage: "/images/academy/veenu/oil-painting-35.webp",
        medium: "Acrylic on Canvas",
        size: "14 × 16",
        year: 2024,
        description: "A traditional procession scene.",
        story: "Veenu's three-week traditional art study.",
        exploredSkills: ["Traditional Art", "Narrative"],
        macroShots: [{ label: "Detail", image: "/images/academy/veenu/oil-painting-35.webp" }],
        roomMockups: [{ label: "In the home", image: "/images/placeholders/artwork.svg" }]
      },
      {
        artworkSlug: "surrealist-composition",
        title: "Surrealist Composition",
        image: "/images/academy/veenu/oil-painting-48.webp",
        displayImage: "/images/academy/veenu/oil-painting-48.webp",
        medium: "Acrylic on Canvas",
        size: "12 × 14",
        year: 2024,
        description: "A surrealist acrylic composition.",
        story: "Veenu's four-week surrealist study.",
        exploredSkills: ["Surrealism", "Imagination"],
        macroShots: [{ label: "Detail", image: "/images/academy/veenu/oil-painting-48.webp" }],
        roomMockups: [{ label: "In the home", image: "/images/placeholders/artwork.svg" }]
      }
    ],
    journeyYears: [2022, 2022, 2022, 2023, 2024, 2024],
    featuredArtwork: {
      title: "Portrait Commission",
      image: "/images/academy/veenu/oil-painting-110.webp",
      medium: "Oil on Canvas",
      size: "16 × 20 inches",
      yearCompleted: 2024,
      daysTaken: 35,
      description: "A realistic portrait commission in oil.",
      teacherQuote: "Veenu handles oils with maturity — her commissions are refined and finished."
    },
    stats: {
      artworksCreated: 3,
      creativeHours: 50,
      favoriteColors: ["Maroon", "Gold"],
      currentMedium: "Oil",
      dreamGoal: "Professional portrait artist"
    },
    studioMoments: [
      { image: "/images/placeholders/studio.svg", alt: "Studio practice session" },
      { image: "/images/placeholders/studio.svg", alt: "Studio learning environment" },
      { image: "/images/placeholders/studio.svg", alt: "Creative process at work" }
    ],
    teacherNote: {
      text: "Veenu is dedicated and detailed — her finished works are gallery-ready.",
      attribution: "Meenakshi Ma'am"
    },
    galleryWallImage: "/images/placeholders/gallery-wall.svg",
    teacherNoteImage: "/images/placeholders/teacher-note.svg",
    certificate: {
      text: "This is to certify that Veenu has successfully completed the foundational phases of art training and is an active student of Meenakshi Art Work Academy.",
      certificateId: "MAW-VEENU-2024-013",
      issuedDate: new Date().toISOString().split("T")[0]
    },
    shareCode: "VEENU24"
  };

export default entry;
