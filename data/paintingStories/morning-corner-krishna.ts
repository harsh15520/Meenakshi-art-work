import type { PaintingStory } from "../exhibitionImages";

// Pilot Story 1: Krishna - Morning Ritual narrative
const story: PaintingStory = {
    slug: "morning-corner-krishna",
    contextualTitle: "The Morning Corner",
    pieceId: "Krishna in Gold Crown",
    storyContext: "commission",
    emotionalSignature: "sacred",

    openingScene: {
      image: "/images/exhibition/1.webp",
      narrative: "Some homes begin their day with silence. This one begins with light. A corner where incense meets morning sun, where bells ring before the world wakes, where gold catches the first ray of day.",
      video: { youtubeId: "qOqLuRDjeyI" },
    },

    modules: [
      {
        type: "client-memory",
        title: "The Grandmother's Request",
        icon: "om",
        content: {
          type: "client-memory",
          text: "The client shared that their grandmother always said Krishna should be the first face you see in the morning. This painting honors that tradition.",
          clientName: "The Sharma Family",
          heroImage: "/images/painting/oil-painting-93.webp",
          intro: "Some homes begin their day with silence. This one begins with light — a corner where incense meets morning sun, where bells ring before the world wakes, and gold catches the first ray of day. This is the corner that asked to be painted.",
        },
        order: 1,
      },
      {
        type: "reference-evolution",
        title: "Twelve References, One Choice",
        icon: "crown",
        content: {
          type: "reference-evolution",
          references: [
            {
              image: "/images/painting/oil-painting-93.webp",
              caption: "Family temple photograph",
              rejected: false,
              reason: "This was the chosen reference—the client had grown up with this deity.",
            },
          ],
          studyThumbnails: [
            "/images/painting/oil-painting-93.webp",
            "/images/painting/oil-painting-93.webp",
            "/images/painting/oil-painting-93.webp",
            "/images/painting/oil-painting-93.webp",
            "/images/painting/oil-painting-93.webp",
            "/images/painting/oil-painting-93.webp",
            "/images/painting/oil-painting-93.webp",
            "/images/painting/oil-painting-93.webp",
            "/images/painting/oil-painting-93.webp",
            "/images/painting/oil-painting-93.webp",
            "/images/painting/oil-painting-93.webp",
            "/images/painting/oil-painting-93.webp",
          ],
        },
        order: 2,
      },
      {
        type: "artists-notebook",
        title: "From the Artist's Notebook",
        icon: "lotus",
        layoutGroup: "notebook",
        content: {
          type: "artists-notebook",
          heroImage: "/images/painting/oil-painting-93.webp",
          intro: "Before the gold was laid, the idea lived in small margins—notes scribbled between sips of tea, measurements guessed by eye, pigments tested in the first morning light.",
          entries: [
            {
              sketch: "/images/painting/morning-corner-krishna/notebook-sketch-day3.webp",
              notes: "Client wants Krishna's eyes at prayer mat height. Need to adjust composition accordingly.",
              date: "Day 3",
            },
            {
              sketch: "/images/painting/morning-corner-krishna/notebook-gold-pigment-day12.webp",
              notes: "Gold pigment test #3 finally behaves correctly in morning light. Warm undertones are key.",
              date: "Day 12",
            },
          ],
          closingLine: "Somewhere between Day 3 and Day 12, the painting stopped being an idea and became a presence.",
        },
        order: 4,
      },
      {
        type: "installation-day",
        title: "6 AM Installation",
        icon: "clock",
        layoutGroup: "installation",
        content: {
          type: "installation-day",
          narrative: "The painting was delivered and installed at 6 AM, so the client could see it in the exact light it was painted for. We watched together as the first morning light hit the gold crown exactly as intended.",
          time: "6:00 AM",
          heroImage: "/images/painting/morning-corner-krishna/installation-hero.webp",
          emblemImage: "/images/painting/morning-corner-krishna/om-rose-emblem.webp",
        },
        order: 5,
      },
      {
        type: "living-observations",
        title: "How the Corner Changed",
        icon: "marigold",
        layoutGroup: "living",
        content: {
          type: "living-observations",
          observations: [
            {
              icon: "pin",
              image: "/images/painting/morning-corner-krishna/observation-prayer-mat.webp",
              text: "The family moved their prayer mat three times before finding the exact spot where morning light hits the gold crown at 6:15 AM.",
            },
            {
              icon: "flower",
              image: "/images/painting/morning-corner-krishna/observation-marigolds.webp",
              text: "Fresh marigolds are now changed every Friday morning. The painting has become part of their weekly ritual.",
            },
            {
              icon: "temple",
              image: "/images/painting/morning-corner-krishna/observation-temple-visit.webp",
              text: "The client's mother now visits specifically to pray in this corner—she says the gold reminds her of the temple she grew up visiting.",
            },
          ],
        },
        order: 6,
      },
      {
        type: "details-people-almost-miss",
        title: "Details That Speak",
        icon: "gaze",
        layoutGroup: "details",
        content: {
          type: "details-people-almost-miss",
          details: [
            {
              element: "The peacock crown",
              story: "The gold crown is worked with tiny peacock plumes—the artist's signature motif, catching the first morning ray before anything else in the room.",
              image: "/images/painting/morning-corner-krishna/detail-crown.webp",
            },
            {
              element: "Floral offerings",
              story: "Marigold and lotus garlands rest at the base, painted from the real flowers the family places there each week.",
              image: "/images/painting/morning-corner-krishna/detail-florals.webp",
            },
            {
              element: "The flute, and the Om mark",
              story: "In one hand the flute, in the other the quiet Om—two symbols of the divine sound that opens the day in this home.",
              image: "/images/painting/morning-corner-krishna/detail-flute-hand.webp",
            },
            {
              element: "The gaze",
              story: "Krishna's eyes are set at prayer-mat height, so the first face a child sees at dawn is the one their grandmother asked for.",
              image: "/images/painting/morning-corner-krishna/detail-gaze.webp",
            },
          ],
        },
        order: 7,
      },
      {
        type: "time-based-updates",
        title: "Life with the Painting",
        icon: "heart",
        layoutGroup: "time-updates",
        content: {
          type: "time-based-updates",
          intro: "Months on, the painting is no longer simply hung—it is lived with.",
          updates: [
            {
              date: "Three weeks later",
              observation: "The family moved the lamp to the opposite side because they realized evening light made the painting glow better than the electric lamp.",
              image: "/images/painting/morning-corner-krishna/update-lamp-moved.webp",
            },
            {
              date: "Two months later",
              observation: "The client's daughter learned to light the diya in front of this painting. It's now her morning responsibility.",
              image: "/images/painting/morning-corner-krishna/update-daughter-diya.webp",
            },
          ],
          closingLeft: "It's in the little moments that art becomes life.",
          closingRight: "Thank you to the Sharma family for sharing these beautiful moments.",
        },
        order: 8,
      },
    ],

    founderVideo: { youtubeId: "wS8wNtXy8OU", title: "Meenakshi on this painting" },

    inquiryMethod: "whatsapp",
  };

export default story;
