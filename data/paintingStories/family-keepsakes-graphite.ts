import type { PaintingStory } from "../exhibitionImages";

// Bespoke Commission Story: Family Keepsakes — graphite set (Custom room 3)
const story: PaintingStory = {
    slug: "family-keepsakes-graphite",
    contextualTitle: "Five Faces We Come From",
    pieceId: "Graphite Portrait · Curled Hair",
    storyContext: "commission",
    emotionalSignature: "tender",

    openingScene: {
      image: "/images/custom/exhibition/3.webp",
      narrative: "Some commissions are a single likeness. This one was five — the parents, the in-laws, and the grandmother who raised them all, drawn so a hallway could hold the people a family comes from.",
    },

    modules: [
      {
        type: "the-brief",
        title: "A Daughter's Gift",
        content: {
          type: "the-brief",
          originalRequest: "Five graphite portraits from family photographs — the parents, the husband's parents, and the grandmother who raised the client — to hang together in a hallway.",
          clientWords: "Every morning I pass them and remember who I come from.",
        },
        order: 1,
      },
      {
        type: "family-connection",
        title: "Five Generations on One Wall",
        content: {
          type: "family-connection",
          connection: "The set wasn't decorative — it was a way to keep the grandmother who raised her, and both sets of parents, present in daily life.",
          generations: "Grandmother, parents, and the couple who commissioned them.",
        },
        order: 2,
      },
      {
        type: "the-problem",
        title: "Five Photos, One Temperature",
        content: {
          type: "the-problem",
          problem: "Five photographs from different decades, lighting and quality all over the place. The risk was five portraits that looked like five different artists.",
          whyItMattered: "They had to read as one family, hung as one wall, not a collage of strangers.",
        },
        order: 3,
      },
      {
        type: "reference-evolution",
        title: "The Diwali Photos Won",
        content: {
          type: "reference-evolution",
          references: [
            { image: "/images/custom/oil-painting-7.webp", caption: "The Diwali photographs", rejected: false, reason: "Chosen — everyone looked happiest and most themselves in these." },
            { image: "/images/custom/oil-painting-106.webp", caption: "The formal studio shots", rejected: true, reason: "Too stiff; they read as ID photos, not people." },
          ],
        },
        order: 4,
      },
      {
        type: "color-decisions",
        title: "Monochrome, on Purpose",
        content: {
          type: "color-decisions",
          palette: [
            { color: "Soft graphite", role: "The likeness", reasoning: "One material across all five keeps the wall unified." },
            { color: "Bare paper highlights", role: "The light of the living room", reasoning: "Kept cool and unmarked so the set feels lit by the home, not the studio." },
            { color: "Warm mat board", role: "The frame", reasoning: "A single warm tone ties five different faces into one wall." },
          ],
        },
        order: 5,
      },
      {
        type: "artists-notebook",
        title: "From the Notebook",
        content: {
          type: "artists-notebook",
          entries: [
            { sketch: "/images/custom/oil-painting-7.webp", notes: "Draw the grandmother first — she's the anchor the others hang around.", date: "Day 2" },
            { sketch: "/images/custom/oil-painting-7.webp", notes: "Kept every face soft, like the client's living-room light, not a sharp studio.", date: "Day 9" },
          ],
        },
        order: 6,
      },
      {
        type: "living-observations",
        title: "How the Wall Lives",
        content: {
          type: "living-observations",
          observations: [
            "Hung at eye level in a hallway so the family is met, not displayed.",
            "Visitors instinctively name the faces — it reads as a family, not a gallery.",
            "The grandmother's portrait became the one guests ask about first.",
          ],
        },
        order: 7,
      },
      {
        type: "details-people-almost-miss",
        title: "Details People Almost Miss",
        content: {
          type: "details-people-almost-miss",
          details: [
            { element: "The unified pressure", story: "All five were drawn with the same hand-pressure range so they read as one set from across the hall.", image: "/images/custom/oil-painting-7.webp", coordinates: { x: 50, y: 50 } },
            { element: "The grandmother's precedence", story: "She was drawn first and centred in the planning, even though she hangs among equals — the quiet hierarchy of the wall.", image: "/images/custom/oil-painting-7.webp", coordinates: { x: 50, y: 35 } },
          ],
        },
        order: 8,
      },
    ],

    signatureInteraction: {
      type: "detail-explorer",
      data: {
        details: [
          { element: "The shared pressure range", story: "Same hand-pressure across all five — that's what makes them one wall.", image: "/images/custom/oil-painting-7.webp", coordinates: { x: 50, y: 50 } },
          { element: "The bare-paper highlights", story: "Left unmarked so the set feels lit by the home, not a studio.", image: "/images/custom/oil-painting-7.webp", coordinates: { x: 45, y: 35 } },
          { element: "The centred grandmother", story: "Drawn first; the quiet anchor of the five.", image: "/images/custom/oil-painting-7.webp", coordinates: { x: 50, y: 35 } },
        ],
      },
    },

    inquiryMethod: "whatsapp",
  };

export default story;
