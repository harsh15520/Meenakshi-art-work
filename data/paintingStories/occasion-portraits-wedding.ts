import type { PaintingStory } from "../exhibitionImages";

// Bespoke Commission Story: Occasion Portraits — wedding (Custom room 4)
const story: PaintingStory = {
    slug: "occasion-portraits-wedding",
    contextualTitle: "The Way She Looked That Day",
    pieceId: "Occasion Portrait · Floral Pin",
    storyContext: "commission",
    emotionalSignature: "tender",

    openingScene: {
      image: "/images/custom/exhibition/4.webp",
      narrative: "Some portraits capture a person. These were made to capture a day — the jewellery, the embroidery, the pinned hair of a daughter on her wedding, held longer than any photograph could.",
    },

    modules: [
      {
        type: "the-brief",
        title: "A Mother's Commission",
        content: {
          type: "the-brief",
          originalRequest: "Styled graphite portraits for a daughter's wedding — capturing the jewellery, the embroidery and the way her hair was pinned, so the look of that day could be kept.",
          clientWords: "She wanted portraits that felt like the way she looked that day.",
        },
        order: 1,
      },
      {
        type: "occasion-context",
        title: "Why the Wedding",
        content: {
          type: "occasion-context",
          occasion: "A daughter's wedding",
          significance: "The brief wasn't a generic pretty face — it was a specific, once-in-a-life look the mother wanted preserved exactly.",
        },
        order: 2,
      },
      {
        type: "the-problem",
        title: "Drawing the Details, Not Just the Face",
        content: {
          type: "the-problem",
          problem: "A wedding portrait fails if the jhumkas, the embroidery and the hairpin disappear into 'suggested' detail. The challenge was to render the occasion, not just the person.",
          whyItMattered: "Those details were the whole point — they're what made it her day, not anyone's day.",
        },
        order: 3,
      },
      {
        type: "client-collaboration",
        title: "What the Client Added",
        content: {
          type: "client-collaboration",
          moments: [
            { moment: "The sangeet jhumkas", clientInput: "Please include the jhumkas she wore at the sangeet.", howItChangedTheWork: "Added the earrings as a named detail, not a generic stud — the portrait now names the specific celebration." },
            { moment: "The venue light", clientInput: "Could the background be soft and warm, like the wedding venue?", howItChangedTheWork: "Shifted the ground to a warm wash so the portrait carries the feeling of the room, not a studio grey." },
          ],
        },
        order: 4,
      },
      {
        type: "material-choice",
        title: "Graphite, With a Little Warmth",
        content: {
          type: "material-choice",
          material: "Graphite on warm-toned paper, with the embroidery picked out in fine white",
          whyThisMaterial: "Graphite keeps it intimate and drawn; the warm paper and white highlights stop it reading as a cold ID sketch.",
          alternativesConsidered: ["Full colour (too much like a photo)", "Pure charcoal (lost the fine jewellery detail)", "Digital (no hand behind it)"],
        },
        order: 5,
      },
      {
        type: "process-timeline",
        title: "Three Weeks to the Day",
        content: {
          type: "process-timeline",
          timeline: [
            { date: "Week 1", milestone: "Reference and likeness", description: "Worked from wedding photographs to lock the face and expression." },
            { date: "Week 2", milestone: "Jewellery and embroidery", description: "The jhumkas, hairpin and threadwork drawn in fine detail." },
            { date: "Week 3", milestone: "Background and finishing", description: "Warm wash added; the portrait delivered before the memories faded." },
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
            { sketch: "/images/custom/oil-painting-158.webp", notes: "Draw the jhumka first — it sets the whole festive read.", date: "Day 4" },
            { sketch: "/images/custom/oil-painting-158.webp", notes: "Warm wash, not white ground, or it looks like a passport photo.", date: "Day 12" },
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
            { element: "The named jhumkas", story: "The sangeet earrings are drawn specifically, not as generic studs — that's the client's real request, preserved.", image: "/images/custom/oil-painting-158.webp", coordinates: { x: 35, y: 45 } },
            { element: "The embroidery thread", story: "The blouse threadwork is followed stitch by stitch; up close it's clearly hand-drawn, not printed.", image: "/images/custom/oil-painting-158.webp", coordinates: { x: 50, y: 65 } },
          ],
        },
        order: 8,
      },
    ],

    signatureInteraction: {
      type: "color-palette-explorer",
      data: {
        colors: [
          { color: "#c9a227", name: "Gold Jewellery", role: "The jhumkas and hairpin", reasoning: "The festive anchor of the whole portrait." },
          { color: "#b86b7a", name: "Rose Embroidery", role: "The bridal threadwork", reasoning: "Ties the portrait to the wedding palette." },
          { color: "#f3e6d2", name: "Warm Paper", role: "The ground", reasoning: "Keeps the likeness intimate, not clinical." },
          { color: "#2f6b4f", name: "Emerald Accent", role: "A single bangle", reasoning: "The one cool note that makes the warm read as celebration." },
        ],
      },
    },

    inquiryMethod: "whatsapp",
  };

export default story;
