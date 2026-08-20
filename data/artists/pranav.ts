import type { ArtistProfile } from "../artists";

const entry: ArtistProfile = {
    slug: "pranav",
    name: "Pranav",
    joinedYear: 2023,
    headline: "Every painting begins with one fearless brushstroke.",
    isSample: false,
    heroImage: "/images/placeholders/hero.svg",
    featuredArtworkSlug: "nature-1",
    artworks: [
      {
        artworkSlug: "nature-1",
        title: "Cherry Blossom Birds",
        image: "/images/placeholders/artwork.svg",
        displayImage: "/images/placeholders/artwork.svg",
        medium: "Acrylic on Canvas",
        size: "10 × 12",
        year: 2024,
        description: "A small nature study with birds on a branch.",
        story: "Pranav's first finished piece, completed in a single week.",
        exploredSkills: ["Brush Control", "Negative Space"],
        macroShots: [{ label: "Bird Detail", image: "/images/placeholders/artwork.svg" }],
        roomMockups: [{ label: "In the home", image: "/images/placeholders/artwork.svg" }]
      }
    ],
    journeyYears: [2023, 2023, 2023, 2024, 2024, 2024],
    featuredArtwork: {
      title: "Cherry Blossom Birds",
      image: "/images/placeholders/artwork.svg",
      medium: "Acrylic on Canvas",
      size: "10 × 12 inches",
      yearCompleted: 2024,
      daysTaken: 7,
      description: "A small nature study with birds on a branch.",
      teacherQuote: "Pranav's neat brushwork made this little piece shine."
    },
    stats: {
      artworksCreated: 1,
      creativeHours: 8,
      favoriteColors: ["Pink", "Blue"],
      currentMedium: "Acrylic",
      dreamGoal: "Paint wildlife"
    },
    studioMoments: [
      { image: "/images/placeholders/studio.svg", alt: "Studio practice session" },
      { image: "/images/placeholders/studio.svg", alt: "Studio learning environment" },
      { image: "/images/placeholders/studio.svg", alt: "Creative process at work" }
    ],
    teacherNote: {
      text: "Pranav is attentive and tidy in his approach — a pleasure to teach.",
      attribution: "Meenakshi Ma'am"
    },
    galleryWallImage: "/images/placeholders/gallery-wall.svg",
    teacherNoteImage: "/images/placeholders/teacher-note.svg",
    certificate: {
      text: "This is to certify that Pranav has successfully completed the foundational phases of art training and is an active student of Meenakshi Art Work Academy.",
      certificateId: "MAW-PRANAV-2024-004",
      issuedDate: new Date().toISOString().split("T")[0]
    },
    shareCode: "PRANAV24"
  };

export default entry;
