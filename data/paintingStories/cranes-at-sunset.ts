import type { PaintingStory } from "../exhibitionImages";

// Bespoke Story 7: Cranes at Sunset — free, airy wildlife narrative (Gallery piece)
const story: PaintingStory = {
    slug: "cranes-at-sunset",
    contextualTitle: "The Hour the Cranes Cross",
    pieceId: "Cranes at Sunset",
    storyContext: "gallery",
    emotionalSignature: "free",

    openingScene: {
      image: "/images/exhibition/5.webp",
      narrative: "Some paintings hold a subject. This one holds a moment — the few seconds at dusk when cranes cross the last light and the water underneath goes perfectly still.",
    },

    modules: [
      {
        type: "the-problem",
        title: "The Stillness Problem",
        content: {
          type: "the-problem",
          problem: "Birds in flight are usually painted as action — wings spread, motion blurred. The brief wanted the opposite: calm, almost suspended, the quiet before they land.",
          whyItMattered: "The buyer wanted a painting that lowered the room's pulse, not raised it.",
        },
        order: 1,
      },
      {
        type: "the-solution",
        title: "One Wash, Never Touched",
        content: {
          type: "the-solution",
          solution: "The water was laid in a single wet wash and left entirely alone, so the cranes float on stillness rather than standing in it. No hard edge anywhere in the piece.",
          howWeGotThere: "Early versions added ripples and reflections; each one made the scene busier. Removing them was the real work.",
        },
        order: 2,
      },
      {
        type: "color-decisions",
        title: "The Last Ten Minutes of Light",
        content: {
          type: "color-decisions",
          palette: [
            { color: "Amber sky", role: "The closing light", reasoning: "The exact amber of the ten minutes before sunset, not a generic orange." },
            { color: "Pale rose water", role: "Reflected calm", reasoning: "The sky's warmth, cooled and flattened into the wash." },
            { color: "Soft graphite cranes", role: "The quiet subjects", reasoning: "Kept nearly monochrome so they read as silhouette, not specimen." },
          ],
        },
        order: 3,
      },
      {
        type: "light-interaction",
        title: "How It Behaves in a Room",
        content: {
          type: "light-interaction",
          description: "Painted to glow in low evening light; the amber deepens as the room dims, so it feels most alive at the hour it depicts.",
          timesOfDay: [
            { time: "Midday", effect: "Flatter, the amber reads as plain warm light" },
            { time: "6 PM", effect: "The sky and water meet; the cranes lift off the surface" },
            { time: "Dusk", effect: "The whole piece dims to a single glowing band of light" },
          ],
        },
        order: 4,
      },
      {
        type: "seasonal-changes",
        title: "Why Cranes, Why Dusk",
        content: {
          type: "seasonal-changes",
          seasons: [
            { season: "Winter evenings", effect: "When cranes migrate and the light is longest, the scene feels most true." },
            { season: "Monsoon", effect: "The same well-filled fields would hide the birds — this is the dry, clear hour." },
          ],
        },
        order: 5,
      },
      {
        type: "future-home",
        title: "A Place It Could Belong",
        content: {
          type: "future-home",
          imaginedContext: "We imagine it at the end of a corridor or above a bath — somewhere you pass as the day winds down and the stillness lands.",
          potentialSettings: ["Above a bath", "Bedroom passage", "West-facing wall"],
        },
        order: 6,
      },
      {
        type: "ideal-owner",
        title: "For the Stillness Seeker",
        content: {
          type: "ideal-owner",
          description: "This piece is for someone who wants a room to exhale — who'd rather end the day with cranes than with a statement.",
          traits: ["Values calm", "Likes negative space", "Wants art that lowers the pulse"],
        },
        order: 7,
      },
    ],

    signatureInteraction: {
      type: "light-simulator",
      data: {
        timeStates: [
          { time: "Midday", image: "/images/painting/oil-painting-113.webp", description: "Flat warm light, cranes read as silhouette" },
          { time: "6 PM", image: "/images/painting/oil-painting-113.webp", description: "Sky and water meet; the band of light glows" },
          { time: "Dusk", image: "/images/painting/oil-painting-113.webp", description: "The whole piece dims to one glowing line" },
        ],
      },
    },

    inquiryMethod: "whatsapp",
  };

export default story;
