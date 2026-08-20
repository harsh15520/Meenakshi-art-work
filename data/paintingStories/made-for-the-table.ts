import type { PaintingStory } from "../exhibitionImages";

// Bespoke Commission Story: Made for the Table — wood plates (Custom room 5)
const story: PaintingStory = {
    slug: "made-for-the-table",
    contextualTitle: "Flowers She Can Eat Off",
    pieceId: "Jasmine · Wood Plate",
    storyContext: "commission",
    emotionalSignature: "grounded",

    openingScene: {
      image: "/images/custom/exhibition/5.webp",
      narrative: "Some commissions are for the wall. This one was for the table — hand-painted plates and a tray, sent from a daughter to her mother, meant to be used and washed, not stored and admired.",
    },

    modules: [
      {
        type: "the-brief",
        title: "A Birthday for Her Mother",
        content: {
          type: "the-brief",
          originalRequest: "A set of hand-painted wooden plates and a tray with jasmine and magnolia, sent to the client's mother for her birthday — beautiful, but safe to actually eat from.",
          clientWords: "She feeds us all on them now — the flowers match the jasmine in her garden.",
        },
        order: 1,
      },
      {
        type: "the-problem",
        title: "Beautiful and Usable",
        content: {
          type: "the-problem",
          problem: "Painted tableware usually fails one way: too precious to use, or too plain to love. The brief demanded both — food-safe and genuinely beautiful.",
          whyItMattered: "The mother was going to use them daily; a display-only gift would have been a quiet insult.",
        },
        order: 2,
      },
      {
        type: "material-choice",
        title: "Sealed Wood",
        content: {
          type: "material-choice",
          material: "Acrylic-painted wood, finished with a food-safe sealant",
          whyThisMaterial: "Wood takes the floral colour warmly and, once sealed, survives washing and daily food.",
          alternativesConsidered: ["Ceramic (client wanted the lighter wood feel)", "Untreated wood (not food-safe)", "Printed melamine (no hand behind it)"],
        },
        order: 3,
      },
      {
        type: "color-decisions",
        title: "Her Garden, Exactly",
        content: {
          type: "color-decisions",
          palette: [
            { color: "White jasmine", role: "The daughter's request", reasoning: "Matched to the mother's actual garden, not a generic bloom." },
            { color: "Soft magnolia pink", role: "The companion plate", reasoning: "A second note so the set reads as a pair, not a repeat." },
            { color: "Leaf green scrollwork", role: "The join", reasoning: "Carries the eye around the rim so the flower sits in a garden, not floats." },
          ],
        },
        order: 4,
      },
      {
        type: "process-timeline",
        title: "Four Weeks to the Birthday",
        content: {
          type: "process-timeline",
          timeline: [
            { date: "Week 1", milestone: "Wood prep and base", description: "Plates and tray sealed and primed for paint." },
            { date: "Week 2-3", milestone: "Florals", description: "Jasmine and magnolia painted by hand on each piece." },
            { date: "Week 4", milestone: "Sealing and dispatch", description: "Food-safe top coat applied; set sent to Pune for the birthday." },
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
            { sketch: "/images/custom/oil-painting-2.webp", notes: "Match the jasmine to her garden photo, not a stock flower.", date: "Day 3" },
            { sketch: "/images/custom/oil-painting-2.webp", notes: "Three coats of sealant — it has to survive a dishwasher, not just a shelf.", date: "Day 18" },
          ],
        },
        order: 6,
      },
      {
        type: "living-observations",
        title: "How the Set Lives",
        content: {
          type: "living-observations",
          observations: [
            "The mother serves the family on them daily — exactly as asked.",
            "The jasmine on the plate is now recognised as 'hers' by visiting grandchildren.",
            "The tray became the birthday-table centre piece, then stayed.",
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
            { element: "The garden-matched jasmine", story: "Painted from the mother's actual garden photo — the daughter's one non-negotiable.", image: "/images/custom/oil-painting-2.webp", coordinates: { x: 50, y: 45 } },
            { element: "The sealant coats", story: "Three coats of food-safe finish — invisible, but the reason the art survives the sink.", image: "/images/custom/oil-painting-2.webp", coordinates: { x: 50, y: 60 } },
          ],
        },
        order: 8,
      },
    ],

    signatureInteraction: {
      type: "detail-explorer",
      data: {
        details: [
          { element: "The garden jasmine", story: "Matched to the mother's real garden, petal by petal.", image: "/images/custom/oil-painting-2.webp", coordinates: { x: 50, y: 45 } },
          { element: "The leaf scrollwork", story: "Carries the eye around the rim so the bloom sits in a garden.", image: "/images/custom/oil-painting-2.webp", coordinates: { x: 70, y: 55 } },
          { element: "The sealant coats", story: "Three coats of food-safe finish — invisible, but the reason the art survives the sink.", image: "/images/custom/oil-painting-2.webp", coordinates: { x: 50, y: 60 } },
        ],
      },
    },

    inquiryMethod: "whatsapp",
  };

export default story;
