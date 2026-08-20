import type { PaintingStory } from "../exhibitionImages";

// Bespoke Commission Story: Shravanabelagola — heritage (Custom room 6)
const story: PaintingStory = {
    slug: "shravanabelagola-heritage",
    contextualTitle: "The Hill He Climbed Every Year",
    pieceId: "Shravanabelagola · Ruins & Monolith",
    storyContext: "commission",
    emotionalSignature: "grounded",

    openingScene: {
      image: "/images/custom/exhibition/6.webp",
      narrative: "Some commissions are of a place. This one was of a memory — a hill an old man climbed every year as a boy, painted small and carried into his study so the climb could continue in conversation.",
    },

    modules: [
      {
        type: "the-brief",
        title: "A Son, For His Father",
        content: {
          type: "the-brief",
          originalRequest: "A painting of Shravanabelagola's ruins and monolith — not a postcard, but the hill as the father remembers it, to hang above his bookshelf.",
          clientWords: "My father climbed this hill every year as a boy. This painting brings that hill back into his study.",
        },
        order: 1,
      },
      {
        type: "family-connection",
        title: "The Annual Climb",
        content: {
          type: "family-connection",
          connection: "The hill wasn't a tourist site to this family — it was the father's boyhood ritual, and the son wanted to return it to him in paint.",
          generations: "A father's memory, carried by his son.",
        },
        order: 2,
      },
      {
        type: "the-problem",
        title: "Memory, Not Monument",
        content: {
          type: "the-problem",
          problem: "The brief asked for the monolith 'small, like a memory' — the opposite of the usual hero-shot. The challenge was to make a famous landmark feel intimate and remembered.",
          whyItMattered: "A grand postcard would have missed the point; the father's relationship to the hill was quiet, not monumental.",
        },
        order: 3,
      },
      {
        type: "cultural-references",
        title: "Why Shravanabelagola",
        content: {
          type: "cultural-references",
          references: [
            { reference: "The monolithic statue of Bahubali", connection: "One of the largest free-standing statues in the world — but the client wanted it as the small, familiar thing his father climbed toward." },
            { reference: "The step where he rested", connection: "A personal landmark, not a famous one — the brief named it specifically as the part the father talks about." },
          ],
        },
        order: 4,
      },
      {
        type: "reference-evolution",
        title: "Big, Then Small",
        content: {
          type: "reference-evolution",
          references: [
            { image: "/images/custom/oil-painting-162.webp", caption: "The hero composition", rejected: true, reason: "Too postcard — the monolith dominated and the memory disappeared." },
            { image: "/images/custom/oil-painting-162.webp", caption: "The intimate composition", rejected: false, reason: "Chosen — the monolith sits small among the ruins, as the father would have seen it climbing." },
          ],
        },
        order: 5,
      },
      {
        type: "color-decisions",
        title: "Stone, Warm and Weathered",
        content: {
          type: "color-decisions",
          palette: [
            { color: "Warm stone grey", role: "The ruins", reasoning: "The actual colour of the granite at golden hour, not a cold grey." },
            { color: "Dusty green hillside", role: "The climb", reasoning: "Keeps the scene grounded in a real place, not a backdrop." },
            { color: "Pale sky", role: "The openness", reasoning: "Left thin so the eye rests on the small monolith." },
          ],
        },
        order: 6,
      },
      {
        type: "light-study",
        title: "The Climb Light",
        content: {
          type: "light-study",
          lightConditions: [
            { condition: "Dawn", image: "/images/custom/oil-painting-162.webp", effect: "The ruins glow briefly; the monolith is a silhouette against light." },
            { condition: "Midday", image: "/images/custom/oil-painting-162.webp", effect: "Flat and honest — the climb as the father would have known it." },
            { condition: "Dusk", image: "/images/custom/oil-painting-162.webp", effect: "The stone warms; the memory feels closest." },
          ],
        },
        order: 7,
      },
      {
        type: "living-observations",
        title: "How It Lives in the Study",
        content: {
          type: "living-observations",
          observations: [
            "Hung above the bookshelf where the father reads — the climb now part of the room.",
            "Family conversations about the boyhood climbs reportedly start with 'look at the painting.'",
            "The small monolith reads larger the longer you live with it — as memories do.",
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
            { element: "The small monolith", story: "Painted intentionally small — the whole brief was 'like a memory he's carrying,' not a landmark.", image: "/images/custom/oil-painting-162.webp", coordinates: { x: 55, y: 40 } },
            { element: "The resting step", story: "The flat step near the top is included because the father always rested there — a personal landmark among famous ones.", image: "/images/custom/oil-painting-162.webp", coordinates: { x: 45, y: 60 } },
          ],
        },
        order: 9,
      },
    ],

    signatureInteraction: {
      type: "light-simulator",
      data: {
        timeStates: [
          { time: "Dawn", image: "/images/custom/oil-painting-162.webp", description: "The monolith is a silhouette against first light" },
          { time: "Midday", image: "/images/custom/oil-painting-162.webp", description: "Flat and honest, the climb as remembered" },
          { time: "Dusk", image: "/images/custom/oil-painting-162.webp", description: "The stone warms; the memory feels closest" },
        ],
      },
    },

    inquiryMethod: "whatsapp",
  };

export default story;
