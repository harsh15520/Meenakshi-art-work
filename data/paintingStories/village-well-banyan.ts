import type { PaintingStory } from "../exhibitionImages";

// Bespoke Story 6: Village Well · Banyan — grounded rural narrative (Gallery piece)
const story: PaintingStory = {
    slug: "village-well-banyan",
    contextualTitle: "The Well Everyone Knew",
    pieceId: "Village Well · Banyan",
    storyContext: "gallery",
    emotionalSignature: "grounded",

    openingScene: {
      image: "/images/exhibition/4.webp",
      narrative: "Some paintings are about a place. This one is about a routine — the walk to the well, the wait in the banyan's shade, the same task done by the same hands for generations.",
    },

    modules: [
      {
        type: "the-problem",
        title: "The Postcard Problem",
        content: {
          type: "the-problem",
          problem: "Village scenes slide easily into postcards — bright, flat, 'colourful India.' The danger was making a pretty postcard instead of a remembered place.",
          whyItMattered: "The buyer grew up at such a well and wanted the weight of it, not the brochure version.",
        },
        order: 1,
      },
      {
        type: "the-solution",
        title: "Painting the Tree in Threads",
        content: {
          type: "the-solution",
          solution: "The banyan's aerial roots were painted with a nearly-empty brush, hundreds of separate dry strokes, so the tree reads solid from far and fragile up close.",
          howWeGotThere: "A solid green mass looked like a cartoon. The thread technique came from watching how real banyan roots actually hang — individually, then together.",
        },
        order: 2,
      },
      {
        type: "color-decisions",
        title: "Earth, Not Rainbow",
        content: {
          type: "color-decisions",
          palette: [
            { color: "Terracotta earth", role: "The ground and pots", reasoning: "The colour of the actual village soil, not a brighter stand-in." },
            { color: "Dusty olive", role: "The banyan", reasoning: "Muted green so the tree feels old, not decorative." },
            { color: "Pale sky wash", role: "Open space", reasoning: "Left thin so the eye rests, never shouts." },
          ],
        },
        order: 3,
      },
      {
        type: "cultural-references",
        title: "Why the Banyan",
        content: {
          type: "cultural-references",
          references: [
            { reference: "The banyan as village meeting place", connection: "In countless north-Indian villages the banyan is where news, matches and arguments are settled — the tree is the institution." },
            { reference: "The well as the day's first errand", connection: "The morning queue at the well was the village's original social network; painting it is painting that rhythm." },
          ],
        },
        order: 4,
      },
      {
        type: "living-observations",
        title: "How It Reads at Home",
        content: {
          type: "living-observations",
          observations: [
            "In a dining room it becomes a conversation piece — visitors from villages recognise their own well instantly.",
            "The earth tones pair with wood and terracotta better than any bright piece would.",
            "One owner said it 'smells like childhood' — meaning the colour temperature, not literally.",
          ],
        },
        order: 5,
      },
      {
        type: "details-people-almost-miss",
        title: "Details People Almost Miss",
        content: {
          type: "details-people-almost-miss",
          details: [
            { element: "The dry-brush roots", story: "Step close: the solid tree dissolves into hundreds of individual strokes. From across the room it's whole again.", image: "/images/painting/oil-painting-116.webp", coordinates: { x: 50, y: 30 } },
            { element: "The chipped water pot", story: "Second pot from the left keeps its real chip — left uncorrected on purpose, because memory isn't tidy.", image: "/images/painting/oil-painting-116.webp", coordinates: { x: 35, y: 70 } },
          ],
        },
        order: 6,
      },
      {
        type: "future-home",
        title: "A Place It Could Belong",
        content: {
          type: "future-home",
          imaginedContext: "We imagine it in a home far from the village it depicts — a small, daily reminder of where someone came from, hung where the morning light is soft.",
          potentialSettings: ["Dining room", "Stair landing", "Study"],
        },
        order: 7,
      },
    ],

    signatureInteraction: {
      type: "ambient-sound",
      data: {
        sounds: [
          { type: "water", description: "The pulley creak and the fill of the pot" },
          { type: "leaves", description: "Wind moving through the banyan's high branches" },
          { type: "birds", description: "Sparrows that nest in the well's eaves at dusk" },
        ],
      },
    },

    inquiryMethod: "whatsapp",
  };

export default story;
