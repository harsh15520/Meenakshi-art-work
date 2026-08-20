import type { PaintingStory } from "../exhibitionImages";

// Bespoke Story 5: Radha-Krishna in Gold & Blue — sacred lyrical narrative (Gallery piece)
const story: PaintingStory = {
    slug: "radha-krishna-gold-and-blue",
    contextualTitle: "Blue, and the Gold That Follows",
    pieceId: "Radha-Krishna in Gold & Blue",
    storyContext: "gallery",
    emotionalSignature: "sacred",

    openingScene: {
      image: "/images/exhibition/2.webp",
      narrative: "Some loves are painted as fire. This one is painted as dusk — blue settling, gold answering, two figures who don't need to face each other to be together.",
    },

    modules: [
      {
        type: "reference-evolution",
        title: "Three References, One Temperature",
        content: {
          type: "reference-evolution",
          references: [
            { image: "/images/painting/oil-painting-20.webp", caption: "The midday study", rejected: false, reason: "Chosen ground — a warm blue that stays luminous rather than dark." },
            { image: "/images/painting/oil-painting-80.webp", caption: "The moonlit version", rejected: true, reason: "Too cool; lost the earthly warmth the buyer wanted." },
            { image: "/images/custom/oil-painting-56.webp", caption: "Theatre duet (loose)", rejected: true, reason: "Lovely but too loose for the centre wall." },
          ],
        },
        order: 1,
      },
      {
        type: "color-decisions",
        title: "Laying Gold Before Blue",
        content: {
          type: "color-decisions",
          palette: [
            { color: "Luminous blue ground", role: "The night around them", reasoning: "Mixed to glow, not to recede — the hardest pigment to keep alive on a dark field." },
            { color: "Warm gold halo", role: "Devotion made visible", reasoning: "Laid first, then blue floated wet-on-wet so the edges breathe." },
            { color: "Rose on Radha", role: "Earthly warmth", reasoning: "Keeps her human amid the divine blue." },
          ],
        },
        order: 2,
      },
      {
        type: "light-study",
        title: "Where the Gold Catches",
        content: {
          type: "light-study",
          lightConditions: [
            { condition: "Morning, east window", image: "/images/painting/oil-painting-20.webp", effect: "The halo reads as pale fire; the blue stays recessive." },
            { condition: "Noon, flat light", image: "/images/painting/oil-painting-20.webp", effect: "The gold and blue reach equal weight — the most balanced read." },
            { condition: "Evening, lamp", image: "/images/painting/oil-painting-20.webp", effect: "The halo glows and the blue deepens into night." },
          ],
        },
        order: 3,
      },
      {
        type: "hidden-symbolism",
        title: "The Flute That Isn't Played",
        content: {
          type: "hidden-symbolism",
          symbols: [
            { element: "The flute at the side", meaning: "Resting, not raised — the music is implied, the moment is the pause between notes.", image: "/images/painting/oil-painting-20.webp", coordinates: { x: 30, y: 60 } },
            { element: "Their near-touching hands", meaning: "Fingers almost meet but don't — the tension of restrained devotion rather than union.", image: "/images/painting/oil-painting-20.webp", coordinates: { x: 50, y: 55 } },
          ],
        },
        order: 4,
      },
      {
        type: "artists-notebook",
        title: "From the Notebook",
        content: {
          type: "artists-notebook",
          entries: [
            { sketch: "/images/painting/oil-painting-20.webp", notes: "Gold first, blue second. If I reverse it the halo dies.", date: "Day 2" },
            { sketch: "/images/painting/oil-painting-20.webp", notes: "Pulled Radha's rose warmer on the 5th pass — she was reading as another deity, not a woman.", date: "Day 5" },
          ],
        },
        order: 5,
      },
      {
        type: "future-home",
        title: "A Place It Could Belong",
        content: {
          type: "future-home",
          imaginedContext: "We imagine this above a console in a home where the evening lamp is lit before guests arrive — the gold catching them at the door.",
          potentialSettings: ["Pooja-room antechamber", "Dining console", "Stair landing"],
        },
        order: 6,
      },
      {
        type: "ideal-owner",
        title: "For Someone Who Knows the Story",
        content: {
          type: "ideal-owner",
          description: "This piece is for someone who doesn't need the figures named — who feels the blue-and-gold temperature and already knows the love it points to.",
          traits: ["Knows the lore", "Likes warmth over spectacle", "Wants a daily, not a display"],
        },
        order: 7,
      },
    ],

    signatureInteraction: {
      type: "color-palette-explorer",
      data: {
        colors: [
          { color: "#2a3a6a", name: "Luminous Blue", role: "The night around them", reasoning: "Mixed to glow rather than recede on a dark ground." },
          { color: "#c9a227", name: "Warm Gold", role: "Devotion made visible", reasoning: "Laid first so the blue could float over its edge." },
          { color: "#b86b7a", name: "Rose", role: "Radha's earthly warmth", reasoning: "Keeps her human amid the divine blue." },
        ],
      },
    },

    inquiryMethod: "whatsapp",
  };

export default story;
