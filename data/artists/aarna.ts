import type { ArtistProfile } from "../artists";

const entry: ArtistProfile = {
    slug: "aarna",
    name: "Aarna",
    joinedYear: 2023,
    headline: "Every painting begins with one fearless brushstroke.",
    isSample: false,
    heroImage: "/images/academy/aarna/Aarna-hero-image.webp",
    featuredArtworkSlug: "princess-dream",
    artworks: [
      {
        artworkSlug: "princess-dream",
        title: "Princess Dream",
        image: "/images/academy/aarna/oil-painting-36.webp",
        displayImage: "/images/academy/aarna/featured-artwork/princess-dream/hero.webp",
        medium: "Acrylic on Canvas",
        size: "14 × 16",
        year: 2024,
        description: "Inspired by fantasy storybook illustrations.",
        story: "Created in February 2024, this piece explores Aarna's love for fantasy worlds and refined technique with layering and color harmony.",
        exploredSkills: ["Color Harmony", "Layering", "Character Design", "Gold Accents"],
        macroShots: [
          { label: "Crown Detail", image: "/images/academy/aarna/featured-artwork/princess-dream/face-detail.webp" },
          { label: "Dress Folds", image: "/images/academy/aarna/featured-artwork/princess-dream/dress-detail.webp" },
          { label: "Decorative Detail", image: "/images/academy/aarna/featured-artwork/princess-dream/decorative-detail.webp" }
        ],
        roomMockups: [
          { label: "Interior Mockup", image: "/images/academy/aarna/featured-artwork/princess-dream/interior-mockup.webp" }
        ],
        behindTheCanvas: [
          { label: "Sketch Layout", image: "/images/academy/aarna/behind-the-canvas/princess-dream/sketch-layout.webp" },
          { label: "Color Blocking", image: "/images/academy/aarna/behind-the-canvas/princess-dream/color-blocking.webp" },
          { label: "Layering & Detailing", image: "/images/academy/aarna/behind-the-canvas/princess-dream/layering-and-detailing.webp" },
          { label: "Final Artwork", image: "/images/academy/aarna/behind-the-canvas/princess-dream/final-artwork.webp" },
          { label: "Framed Version", image: "/images/academy/aarna/behind-the-canvas/princess-dream/framed-version.webp" }
        ]
      },
      {
        artworkSlug: "penguin-in-snow",
        title: "Penguin in Snow",
        image: "/images/academy/aarna/oil-painting-58.webp",
        displayImage: "/images/academy/aarna/featured-artwork/penguin-in-snow/hero.webp",
        medium: "Acrylic on Canvas",
        size: "12 × 14",
        year: 2024,
        description: "A serene winter scene capturing the charm of a penguin in snow.",
        story: "Completed in February 2024, this painting demonstrates Aarna's skill with cool tones and texture work.",
        exploredSkills: ["Cool Color Palette", "Texture", "Brush Control", "Winter Mood"],
        macroShots: [
          { label: "Penguin Face", image: "/images/academy/aarna/featured-artwork/penguin-in-snow/face-detail.webp" },
          { label: "Scarf & Wing", image: "/images/academy/aarna/featured-artwork/penguin-in-snow/scarf-wing-detail.webp" },
          { label: "Snow & Footprint", image: "/images/academy/aarna/featured-artwork/penguin-in-snow/snow-footprint-detail.webp" }
        ],
        roomMockups: [
          { label: "Interior Mockup", image: "/images/academy/aarna/featured-artwork/penguin-in-snow/interior-mockup.webp" },
          { label: "Gallery Display", image: "/images/academy/aarna/featured-artwork/penguin-in-snow/gallery-display.webp" }
        ]
      },
      {
        artworkSlug: "cubist-cat",
        title: "Cubist Cat",
        image: "/images/academy/aarna/oil-painting-45.webp",
        displayImage: "/images/academy/aarna/featured-artwork/cubist-cat/hero.webp",
        medium: "Acrylic on Paper",
        size: "10 × 12",
        year: 2023,
        description: "An exploration of cubist style applied to a feline subject.",
        story: "This December 2023 piece shows Aarna's bold experimentation with abstract styles and geometric forms.",
        exploredSkills: ["Cubism", "Bold Colors", "Abstract Thinking", "Composition"],
        macroShots: [
          { label: "Eyes", image: "/images/academy/aarna/featured-artwork/cubist-cat/eyes-detail.webp" },
          { label: "Nose & Whiskers", image: "/images/academy/aarna/featured-artwork/cubist-cat/nose-whiskers-detail.webp" },
          { label: "Ear & Color Block", image: "/images/academy/aarna/featured-artwork/cubist-cat/ear-color-detail.webp" }
        ],
        roomMockups: [
          { label: "Interior Mockup", image: "/images/academy/aarna/featured-artwork/cubist-cat/interior-mockup.webp" },
          { label: "Gallery Display", image: "/images/academy/aarna/featured-artwork/cubist-cat/gallery-display.webp" }
        ],
        behindTheCanvas: [
          { label: "Sketch Layout", image: "/images/academy/aarna/behind-the-canvas/cubist-cat/sketch-layout.webp" },
          { label: "Color Blocking", image: "/images/academy/aarna/behind-the-canvas/cubist-cat/color-blocking.webp" },
          { label: "Layering & Detailing", image: "/images/academy/aarna/behind-the-canvas/cubist-cat/layering-and-detailing.webp" },
          { label: "Final Artwork", image: "/images/academy/aarna/behind-the-canvas/cubist-cat/final-artwork.webp" },
          { label: "Framed Version", image: "/images/academy/aarna/behind-the-canvas/cubist-cat/framed-version.webp" }
        ]
      },
      {
        artworkSlug: "rainbow-unicorn",
        title: "Rainbow Unicorn",
        image: "/images/academy/aarna/oil-painting-136.webp",
        displayImage: "/images/academy/aarna/featured-artwork/rainbow-unicorn/hero.webp",
        medium: "Acrylic on Canvas",
        size: "14 × 16",
        year: 2024,
        description: "A whimsical unicorn sitting on a rainbow cake with stars.",
        story: "Created in January 2024, this playful composition combines imagination with technical skill in layering and color blending.",
        exploredSkills: ["Whimsy & Imagination", "Layering", "Color Gradients", "Cloud Effects"],
        macroShots: [
          { label: "Unicorn Face", image: "/images/academy/aarna/featured-artwork/rainbow-unicorn/face-detail.webp" },
          { label: "Rainbow Cake", image: "/images/academy/aarna/featured-artwork/rainbow-unicorn/cake-detail.webp" },
          { label: "Horn & Mane", image: "/images/academy/aarna/featured-artwork/rainbow-unicorn/horn-mane-detail.webp" }
        ],
        roomMockups: [
          { label: "Interior Mockup", image: "/images/academy/aarna/featured-artwork/rainbow-unicorn/interior-mockup.webp" },
          { label: "Gallery Display", image: "/images/academy/aarna/featured-artwork/rainbow-unicorn/gallery-display.webp" }
        ],
        behindTheCanvas: [
          { label: "Sketch Layout", image: "/images/academy/aarna/behind-the-canvas/rainbow-unicorn/sketch-layout.webp" },
          { label: "Color Blocking", image: "/images/academy/aarna/behind-the-canvas/rainbow-unicorn/color-blocking.webp" },
          { label: "Layering & Detailing", image: "/images/academy/aarna/behind-the-canvas/rainbow-unicorn/layering-and-detailing.webp" },
          { label: "Final Artwork", image: "/images/academy/aarna/behind-the-canvas/rainbow-unicorn/final-artwork.webp" },
          { label: "Framed Version", image: "/images/academy/aarna/behind-the-canvas/rainbow-unicorn/framed-version.webp" }
        ]
      },
      {
        artworkSlug: "japanese-tree",
        title: "Japanese Tree",
        image: "/images/academy/aarna/oil-painting-154.webp",
        displayImage: "/images/academy/aarna/featured-artwork/japanese-tree/hero.webp",
        medium: "Acrylic on Canvas",
        size: "11 × 14",
        year: 2024,
        description: "A cherry blossom tree overlooking water at dusk.",
        story: "This serene landscape, completed in 2024, demonstrates Aarna's mastery of atmospheric perspective and peaceful composition.",
        exploredSkills: ["Landscape Painting", "Atmospheric Perspective", "Water Reflection", "Blossom Detail"],
        macroShots: [
          { label: "Cherry Blossom", image: "/images/academy/aarna/featured-artwork/japanese-tree/blossom-detail.webp" },
          { label: "Moon", image: "/images/academy/aarna/featured-artwork/japanese-tree/moon-detail.webp" },
          { label: "Tree Trunk", image: "/images/academy/aarna/featured-artwork/japanese-tree/trunk-detail.webp" }
        ],
        roomMockups: [
          { label: "Interior Mockup", image: "/images/academy/aarna/featured-artwork/japanese-tree/interior-mockup.webp" },
          { label: "Gallery Display", image: "/images/academy/aarna/featured-artwork/japanese-tree/gallery-display.webp" }
        ],
        behindTheCanvas: [
          { label: "Sketch Layout", image: "/images/academy/aarna/behind-the-canvas/japanese-tree/sketch-layout.webp" },
          { label: "Color Blocking", image: "/images/academy/aarna/behind-the-canvas/japanese-tree/color-blocking.webp" },
          { label: "Layering & Detailing", image: "/images/academy/aarna/behind-the-canvas/japanese-tree/layering-and-detailing.webp" },
          { label: "Final Artwork", image: "/images/academy/aarna/behind-the-canvas/japanese-tree/final-artwork.webp" },
          { label: "Framed Version", image: "/images/academy/aarna/behind-the-canvas/japanese-tree/framed-version.webp" }
        ]
      },
      {
        artworkSlug: "pencil-portrait",
        title: "Pencil Portrait",
        image: "/images/academy/aarna/oil-painting-32.webp",
        displayImage: "/images/academy/aarna/featured-artwork/harry-potter/hero.webp",
        medium: "Pencil on Paper",
        size: "9 × 12",
        year: 2024,
        description: "A detailed graphite pencil portrait study.",
        story: "Completed in 2024, this portrait study showcases Aarna's precision with line work and facial proportions.",
        exploredSkills: ["Pencil Technique", "Shading", "Proportion", "Realism"],
        macroShots: [
          { label: "Hair Detail", image: "/images/academy/aarna/featured-artwork/harry-potter/hair-detail.webp" },
          { label: "Face & Shading", image: "/images/academy/aarna/featured-artwork/harry-potter/face-shading-detail.webp" },
          { label: "Eyes & Glasses", image: "/images/academy/aarna/featured-artwork/harry-potter/eyes-glasses-detail.webp" }
        ],
        roomMockups: [
          { label: "Interior Mockup", image: "/images/academy/aarna/featured-artwork/harry-potter/interior-mockup.webp" },
          { label: "Gallery Display", image: "/images/academy/aarna/featured-artwork/harry-potter/gallery-display.webp" }
        ]
      },
      {
        artworkSlug: "garden-in-bloom",
        title: "Garden in Bloom",
        image: "/images/academy/aarna/oil-painting-22.webp",
        displayImage: "/images/academy/aarna/featured-artwork/garden-in-bloom/hero.webp",
        medium: "Acrylic on Canvas",
        size: "12 × 16",
        year: 2024,
        description: "A vibrant garden scene with blooming flowers and birds.",
        story: "Created in March 2024, this joyful composition celebrates Aarna's growth in color theory and natural subjects.",
        exploredSkills: ["Floral Painting", "Vibrant Colors", "Nature Studies", "Movement & Balance"],
        macroShots: [
          { label: "Bird Detail", image: "/images/academy/aarna/featured-artwork/garden-in-bloom/bird-detail.webp" },
          { label: "Spiral Flower", image: "/images/academy/aarna/featured-artwork/garden-in-bloom/spiral-flower-detail.webp" },
          { label: "Flower Detail", image: "/images/academy/aarna/featured-artwork/garden-in-bloom/flower-detail.webp" }
        ],
        roomMockups: [
          { label: "Interior Mockup", image: "/images/academy/aarna/featured-artwork/garden-in-bloom/interior-mockup.webp" },
          { label: "Gallery Display", image: "/images/academy/aarna/featured-artwork/garden-in-bloom/gallery-display.webp" }
        ],
        behindTheCanvas: [
          { label: "Sketch Layout", image: "/images/academy/aarna/behind-the-canvas/garden-in-bloom/sketch-layout.webp" },
          { label: "Color Blocking", image: "/images/academy/aarna/behind-the-canvas/garden-in-bloom/color-blocking.webp" },
          { label: "Layering & Detailing", image: "/images/academy/aarna/behind-the-canvas/garden-in-bloom/layering-and-detailing.webp" },
          { label: "Final Artwork", image: "/images/academy/aarna/behind-the-canvas/garden-in-bloom/final-artwork.webp" }
        ]
      }
    ],
    journeyYears: [2023, 2023, 2023, 2024, 2024, 2024],
    featuredArtwork: {
      title: "Princess Dream",
      image: "/images/academy/aarna/featured-artwork/princess-dream/hero.webp",
      medium: "Acrylic on Canvas",
      size: "14 × 16 inches",
      yearCompleted: 2024,
      daysTaken: 30,
      description: "Inspired by fantasy storybook illustrations. This artwork reflects imagination, engagement and a dreamer's heart.",
      teacherQuote: "Aarna shows excellent color harmony and a natural sense of composition. Her patience with layering creates depth that's impressive for her level."
    },
    stats: {
      artworksCreated: 7,
      creativeHours: 40,
      favoriteColors: ["Blue", "Pink", "Gold"],
      currentMedium: "Acrylic",
      dreamGoal: "Become a Professional Artist"
    },
    studioMoments: [
      { image: "/images/academy/aarna/studio-moments/studio-1.webp", alt: "Studio practice session" },
      { image: "/images/academy/aarna/studio-moments/studio-2.webp", alt: "Focused artwork creation" },
      { image: "/images/academy/aarna/studio-moments/studio-3.webp", alt: "Studio learning environment" },
      { image: "/images/academy/aarna/studio-moments/studio-4.webp", alt: "Creative process at work" },
      { image: "/images/academy/aarna/studio-moments/studio-5.webp", alt: "Studio session in progress" }
    ],
    teacherNote: {
      text: "Every artwork tells a little more about Aarna's imagination. I'm excited to watch her continue growing and discovering her unique artistic voice.",
      attribution: "Meenakshi Ma'am"
    },
    galleryWallImage: "/images/academy/aarna/aarna-gallery-wall/gallery-wall-1.webp",
    teacherNoteImage: "/images/academy/aarna/note-from-mam/teacher-note.webp",
    certificate: {
      text: "This is to certify that Aarna has successfully completed the foundational phases of art training and is an active student of Meenakshi Art Work Academy.",
      certificateId: "MAW-AARNA-2024-001",
      issuedDate: new Date().toISOString().split("T")[0]
    },
    shareCode: "AARNA24"
  };

export default entry;
