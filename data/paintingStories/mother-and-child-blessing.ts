import type { PaintingStory } from "../exhibitionImages";

// Bespoke Story 4: Mother & Child — tender devotional narrative (Gallery piece)
const story: PaintingStory = {
    slug: "mother-and-child-blessing",
    contextualTitle: "The Quiet Between Them",
    pieceId: "Mother & Child",
    storyContext: "gallery",
    emotionalSignature: "tender",

    openingScene: {
      image: "/images/exhibition/1.webp",
      narrative: "Some paintings describe a feeling. This one holds one — the small, wordless hush that passes between a mother and a child before either of them speaks.",
    },

    modules: [
      {
        type: "the-problem",
        title: "The Sweetness Problem",
        content: {
          type: "the-problem",
          problem: "Mother-and-child is one of the most painted subjects in the world, and most of it leans saccharine — round cheeks, glowing halos, everything resolved. The risk was making something pretty that said nothing.",
          whyItMattered: "The brief wasn't 'a nice picture for a wall.' It was a feeling the buyer remembered from their own childhood and couldn't name.",
        },
        order: 1,
      },
      {
        type: "the-solution",
        title: "Lowering the Gaze",
        content: {
          type: "the-solution",
          solution: "The composition keeps the mother's eyes down, resting on the child, never meeting the viewer. That single choice turns a portrait into a private moment we're only overhearing.",
          howWeGotThere: "Three studies tried eye contact with the viewer; each felt like a greeting card. The lowered gaze was the fourth, and it finally felt true.",
        },
        order: 2,
      },
      {
        type: "color-decisions",
        title: "Warmth Without Heat",
        content: {
          type: "color-decisions",
          palette: [
            { color: "Soft ochre ground", role: "The room's warmth", reasoning: "Keeps the whole scene in the temperature of lamplight, not sunlight." },
            { color: "Muted rose on the child", role: "Tenderness", reasoning: "A blush of colour, never a bright one, so the child reads as held, not highlighted." },
            { color: "Deep umber shadow", role: "Grounding", reasoning: "Pulls the figures into the canvas so the moment feels enclosed, not staged." },
          ],
        },
        order: 3,
      },
      {
        type: "hidden-symbolism",
        title: "The Blessing Hand",
        content: {
          type: "hidden-symbolism",
          symbols: [
            {
              element: "The mother's raised hand",
              meaning: "It hovers near the child's head but doesn't touch — a blessing held in suspension, deliberately unfinished in its reach.",
              image: "/images/custom/custom-work-1.webp",
              coordinates: { x: 62, y: 40 },
            },
            {
              element: "The child's grip on fabric",
              meaning: "Fist clenched in the mother's dupatta — the only tense line in an otherwise soft painting. It's where the love becomes physical.",
              image: "/images/custom/custom-work-1.webp",
              coordinates: { x: 48, y: 66 },
            },
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
            { sketch: "/images/custom/custom-work-1.webp", notes: "Buyer said 'it should feel like being five again, safe.' That's the brief, not the subject.", date: "Day 1" },
            { sketch: "/images/custom/custom-work-1.webp", notes: "Softened the blessing hand after the 3rd try — sharper edges read as command, not care.", date: "Day 6" },
          ],
        },
        order: 5,
      },
      {
        type: "living-observations",
        title: "How It Lives on a Wall",
        content: {
          type: "living-observations",
          observations: [
            "Hung low in a hallway, it's the first thing children point at — they read the grip instantly, before they read anything else.",
            "In a bedroom it becomes a night-light companion; the warm ground glows under a lamp without any glare.",
            "One owner said guests always go quiet in front of it, then say 'oh' — as if they'd remembered something.",
          ],
        },
        order: 6,
      },
      {
        type: "details-people-almost-miss",
        title: "Details People Almost Miss",
        content: {
          type: "details-people-almost-miss",
          details: [
            {
              element: "The blurred blessing hand",
              story: "Up close it's barely painted — a few rose-grey strokes. Step back and it resolves into a hand offering protection. The blur is the point.",
              image: "/images/custom/custom-work-1.webp",
              coordinates: { x: 62, y: 40 },
            },
            {
              element: "The single tense line",
              story: "Everything in the painting is soft except the child's fist in the fabric. That one hard edge is where tenderness becomes grip.",
              image: "/images/custom/custom-work-1.webp",
              coordinates: { x: 48, y: 66 },
            },
          ],
        },
        order: 7,
      },
    ],

    signatureInteraction: {
      type: "light-simulator",
      data: {
        timeStates: [
          { time: "Morning", image: "/images/custom/custom-work-1.webp", description: "Cool window light, the ochre ground stays quiet" },
          { time: "Afternoon", image: "/images/custom/custom-work-1.webp", description: "Full warmth, the rose on the child blooms" },
          { time: "Lamp-lit evening", image: "/images/custom/custom-work-1.webp", description: "The ground glows; the moment feels enclosed" },
        ],
      },
    },

    inquiryMethod: "whatsapp",
  };

export default story;
