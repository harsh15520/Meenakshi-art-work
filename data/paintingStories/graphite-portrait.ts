import type { PaintingStory } from "../exhibitionImages";

// Bespoke Story 8: Graphite Portrait — quiet monochrome narrative (Gallery piece)
const story: PaintingStory = {
    slug: "graphite-portrait",
    contextualTitle: "A Face in Pencil Only",
    pieceId: "Graphite Portrait",
    storyContext: "gallery",
    emotionalSignature: "quiet",

    openingScene: {
      image: "/images/exhibition/6.webp",
      narrative: "Some portraits prove a likeness with colour. This one proves it with pressure — a single grey field, graded by how hard the pencil bore down.",
    },

    modules: [
      {
        type: "the-problem",
        title: "The Colour Problem",
        content: {
          type: "the-problem",
          problem: "A portrait in graphite risks looking like a study, not a finished piece — incomplete, like the colour 'hasn't been added yet.' The work was to make monochrome feel complete.",
          whyItMattered: "The buyer wanted character without decoration — a face, held, nothing else.",
        },
        order: 1,
      },
      {
        type: "the-solution",
        title: "Pressure as Pigment",
        content: {
          type: "the-solution",
          solution: "Instead of adding tone with more marks, the likeness was built from how hard the pencil pressed — one gradient from the dark jawline to the pale chin carries the whole face.",
          howWeGotThere: "Layering strokes made it muddy. Letting a single pressure-gradient do the work cleared it up.",
        },
        order: 2,
      },
      {
        type: "material-choice",
        title: "Three Grades, One Hand",
        content: {
          type: "material-choice",
          material: "Graphite, 2B through 6B on cold-press paper",
          whyThisMaterial: "The soft B grades allow the full pressure range the portrait depends on; the tooth of the paper holds the lightest grey without shine.",
          alternativesConsidered: ["Charcoal (too smudgy for a finished wall piece)", "Coloured pencil (defeats the monochrome point)", "Digital print (loses the pressure entirely)"],
        },
        order: 3,
      },
      {
        type: "technique-details",
        title: "Where the Line Lifts",
        content: {
          type: "technique-details",
          techniques: [
            { technique: "Lifted-pressure hatching", how: "Strokes begin dark and rise off the paper, so the line fades without a hard stop.", why: "Keeps the edge alive instead of outlined." },
            { technique: "Negative drawing for highlights", how: "The lightest areas are left as paper, never touched.", why: "Preserves the cool temperature of unmarked stock." },
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
            { sketch: "/images/custom/oil-painting-7.webp", notes: "Stop layering. One gradient, one hand, done.", date: "Day 2" },
            { sketch: "/images/custom/oil-painting-7.webp", notes: "Left the eyes last and softest — a finished eye early locks the expression too hard.", date: "Day 4" },
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
            { element: "The single gradient jaw", story: "The whole likeness lives in one dark-to-pale line. Trace it with your eye and the face appears.", image: "/images/custom/oil-painting-7.webp", coordinates: { x: 50, y: 62 } },
            { element: "The untouched highlights", story: "The brightest spots are bare paper, never drawn — which is why they stay cool while the shadows warm.", image: "/images/custom/oil-painting-7.webp", coordinates: { x: 45, y: 35 } },
          ],
        },
        order: 6,
      },
      {
        type: "ideal-owner",
        title: "For Someone Who Notices Pressure",
        content: {
          type: "ideal-owner",
          description: "This piece is for someone who reads a drawing as drawing — who'll lean in and see that the face was made by a hand pressing, not a colour applied.",
          traits: ["Notices craft", "Likes restraint", "Wants a study that's also finished"],
        },
        order: 7,
      },
    ],

    signatureInteraction: {
      type: "detail-explorer",
      data: {
        details: [
          { element: "The pressure gradient", story: "One stroke, dark to pale, carries the jaw and cheek.", image: "/images/custom/oil-painting-7.webp", coordinates: { x: 50, y: 62 } },
          { element: "The bare-paper highlight", story: "Never drawn — left as stock, so it stays cool.", image: "/images/custom/oil-painting-7.webp", coordinates: { x: 45, y: 35 } },
          { element: "The lifted line", story: "Where the stroke rises off the paper, the edge stays alive.", image: "/images/custom/oil-painting-7.webp", coordinates: { x: 55, y: 50 } },
        ],
      },
    },

    inquiryMethod: "whatsapp",
  };

export default story;
