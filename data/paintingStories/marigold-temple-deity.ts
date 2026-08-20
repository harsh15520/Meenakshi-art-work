import type { PaintingStory } from "../exhibitionImages";

// Bespoke Commission Story: A Corner for Devotion (Custom room 7)
const story: PaintingStory = {
    slug: "marigold-temple-deity",
    contextualTitle: "The Corner That Finally Felt Finished",
    pieceId: "Marigold Temple Deity",
    storyContext: "commission",
    emotionalSignature: "sacred",

    openingScene: {
      image: "/images/custom/exhibition/7.webp",
      narrative: "Some commissions fill a wall. This one finished a corner — three devotional paintings brought together so a home's puja space could feel, at last, complete.",
    },

    modules: [
      {
        type: "the-brief",
        title: "A Corner for Daily Worship",
        content: {
          type: "the-brief",
          originalRequest: "Three devotional paintings for a home puja corner — a temple deity, a Radha-Krishna, and a mother-and-child blessing — hung so the space felt finished.",
          clientWords: "Our puja corner finally feels finished. The diya is lit every morning and the paintings catch the light first thing.",
        },
        order: 1,
      },
      {
        type: "the-problem",
        title: "Three, Not One",
        content: {
          type: "the-problem",
          problem: "A set of three devotional works can easily feel like three separate commissions. The challenge was to compose them as one corner — related, not repeated.",
          whyItMattered: "The client wanted a single feeling of completion, not three pretty pictures above a shrine.",
        },
        order: 2,
      },
      {
        type: "client-collaboration",
        title: "What the Family Asked",
        content: {
          type: "client-collaboration",
          moments: [
            { moment: "The morning diya", clientInput: "Could the diya light hit the paintings first thing in the morning?", howItChangedTheWork: "Composed so the gold catches the early flame — the corner is built around the daily lamp, not the room's main light." },
            { moment: "Facing the entrance", clientInput: "We'd love Radha-Krishna to face the entrance, so they greet anyone who comes in.", howItChangedTheWork: "Reordered the hang so the greeting deity meets you at the threshold of the corner." },
          ],
        },
        order: 3,
      },
      {
        type: "reference-evolution",
        title: "From Separate to a Set",
        content: {
          type: "reference-evolution",
          references: [
            { image: "/images/custom/oil-painting-31.webp", caption: "Three standalone icons", rejected: true, reason: "Looked like three commissions; the corner never cohered." },
            { image: "/images/custom/oil-painting-31.webp", caption: "One composed corner", rejected: false, reason: "Chosen — related palettes and a shared gold so the three read as a single devotion." },
          ],
        },
        order: 4,
      },
      {
        type: "color-decisions",
        title: "Gold That Catches the Diya",
        content: {
          type: "color-decisions",
          palette: [
            { color: "Warm gold", role: "The unifying thread", reasoning: "Each painting carries gold so the corner reads as one devotion in morning light." },
            { color: "Deep marigold", role: "The deity's flower", reasoning: "Ties the temple deity to the welcome tradition of the marigold." },
            { color: "Soft rose", role: "The blessing figures", reasoning: "Keeps the mother-and-child and Radha-Krishna human amid the divine." },
          ],
        },
        order: 5,
      },
      {
        type: "hidden-symbolism",
        title: "The Marigold Means Welcome",
        content: {
          type: "hidden-symbolism",
          symbols: [
            { element: "The marigold at the deity's feet", meaning: "The flower of welcome and worship — the corner is dressed to receive, not just to display.", image: "/images/custom/oil-painting-31.webp", coordinates: { x: 50, y: 75 } },
            { element: "The shared gold line", meaning: "A continuous gold edge across all three so the eye travels the corner as one devotion.", image: "/images/custom/oil-painting-31.webp", coordinates: { x: 50, y: 20 } },
          ],
        },
        order: 6,
      },
      {
        type: "artists-notebook",
        title: "From the Notebook",
        content: {
          type: "artists-notebook",
          entries: [
            { sketch: "/images/custom/oil-painting-31.webp", notes: "Paint the gold to meet the diya's morning angle — the corner lives at 6am, not noon.", date: "Day 2" },
            { sketch: "/images/custom/oil-painting-31.webp", notes: "One gold line across all three so they're a set, not a row.", date: "Day 10" },
          ],
        },
        order: 7,
      },
      {
        type: "living-observations",
        title: "How the Corner Lives",
        content: {
          type: "living-observations",
          observations: [
            "The diya is lit every morning and the gold catches it first thing, exactly as asked.",
            "Radha-Krishna greets anyone entering the corner, as the family wanted.",
            "The mother-and-child blessing became the focal point of daily prayer.",
          ],
        },
        order: 8,
      },
      {
        type: "details-people-almost-miss",
        title: "Details People Almost Miss",
        content: {
          type: "details-people-almost-miss",
          details: [
            { element: "The continuous gold line", story: "A single gold edge runs across all three paintings so the corner reads as one devotion.", image: "/images/custom/oil-painting-31.webp", coordinates: { x: 50, y: 20 } },
            { element: "The marigold at the feet", story: "Placed at the deity's feet as the flower of welcome — the corner is dressed to receive.", image: "/images/custom/oil-painting-31.webp", coordinates: { x: 50, y: 75 } },
          ],
        },
        order: 9,
      },
    ],

    signatureInteraction: {
      type: "ambient-sound",
      data: {
        sounds: [
          { type: "bells", description: "The soft ring of the temple bell at the start of prayer" },
          { type: "diya", description: "The faint click of the diya being lit each morning" },
          { type: "chant", description: "Distant morning chanting from the corner" },
        ],
      },
    },

    inquiryMethod: "whatsapp",
  };

export default story;
