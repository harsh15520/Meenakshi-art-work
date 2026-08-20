import type { PaintingStory } from "../exhibitionImages";

// Bespoke Commission Story: Peacock Courtyard Gate (Custom room 1)
const story: PaintingStory = {
    slug: "peacock-courtyard-gate",
    contextualTitle: "The Gate That Says Welcome",
    pieceId: "Peacock Courtyard Gate",
    storyContext: "commission",
    emotionalSignature: "tender",

    openingScene: {
      image: "/images/custom/exhibition/1.webp",
      narrative: "Some commissions are about a thing. This one was about an entrance — the first object every guest meets, built to say 'welcome' the way a family actually means it.",
    },

    modules: [
      {
        type: "the-brief",
        title: "The Brief From the Courtyard",
        content: {
          type: "the-brief",
          originalRequest: "A carved wooden gate for a private courtyard entrance, hand-painted with peacocks beneath a flowering tree — something that would greet guests before they ever stepped inside.",
          clientWords: "It was meant to say 'welcome' the way our family actually welcomes — with live birdsong and flowers.",
        },
        order: 1,
      },
      {
        type: "family-connection",
        title: "The Wedding-Invitation Peacocks",
        content: {
          type: "family-connection",
          connection: "The peacocks had to echo the ones on the couple's wedding invitation — a private joke and a love story carved into the front of the house.",
          generations: "A marriage, remembered at the threshold.",
        },
        order: 2,
      },
      {
        type: "the-problem",
        title: "Carving Meets Colour",
        content: {
          type: "the-problem",
          problem: "A carved gate and a painted gate are two different crafts. The challenge was to let the carving do the structure and the paint do the life, without one fighting the other.",
          whyItMattered: "The clients wanted it to read as one object made by one hand, not a carved frame with a picture stuck on.",
        },
        order: 3,
      },
      {
        type: "material-choice",
        title: "Wood First, Then Paint",
        content: {
          type: "material-choice",
          material: "Carved seasoned wood, sealed, with layered acrylic on the relief",
          whyThisMaterial: "Wood gives the gate its weight and shadow; acrylic holds the bright peacock colour without cracking on an outdoor-facing surface.",
          alternativesConsidered: ["Pure relief carving (lost the colour story)", "Printed panel (defeated the handmade point)", "Metal inlay (too cold for a home entrance)"],
        },
        order: 4,
      },
      {
        type: "process-timeline",
        title: "Five Weeks at the Threshold",
        content: {
          type: "process-timeline",
          timeline: [
            { date: "Week 1", milestone: "Carving the arch and the neem trunk", description: "The wood was shaped and the tree's form roughed in before any colour." },
            { date: "Week 2-3", milestone: "Peacocks in relief", description: "Each bird carved, then underpainted so the feather relief caught light." },
            { date: "Week 4", milestone: "Blossoms and sealing", description: "The flowering tree filled in; the whole gate sealed against weather." },
            { date: "Week 5", milestone: "Installation in Saharanpur", description: "Fitted to the courtyard entrance and checked in morning light." },
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
            { sketch: "/images/custom/oil-painting-23.webp", notes: "Make the neem the frame, not a backdrop — the tree holds the whole gate.", date: "Week 1" },
            { sketch: "/images/custom/oil-painting-23.webp", notes: "Peacock eyes in slight relief so they catch sun; flat paint alone looked printed.", date: "Week 3" },
          ],
        },
        order: 6,
      },
      {
        type: "installation-day",
        title: "The Morning It Was Fitted",
        content: {
          type: "installation-day",
          narrative: "Installed in the courtyard entrance in Saharanpur. The family stood back as the morning sun hit the carved peacocks and the relief finally read as alive.",
          time: "Installation day",
        },
        order: 7,
      },
      {
        type: "living-observations",
        title: "How the Gate Lives Now",
        content: {
          type: "living-observations",
          observations: [
            "Guests pause at it before knocking — the client says people photograph it before they photograph the house.",
            "The neem's carved leaves read differently through the day as the sun moves across the relief.",
            "It has become the family's default 'we're home' marker at the end of every evening.",
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
            { element: "The relief peacock eyes", story: "Carved a few millimetres proud of the surface so they catch sunlight — most visitors only notice the shimmer, not the reason.", image: "/images/custom/oil-painting-23.webp", coordinates: { x: 40, y: 45 } },
            { element: "The neem as the frame", story: "The flowering tree isn't decoration; its branches form the arch's outline. Step back and the gate is the tree.", image: "/images/custom/oil-painting-23.webp", coordinates: { x: 55, y: 30 } },
          ],
        },
        order: 9,
      },
    ],

    signatureInteraction: {
      type: "detail-explorer",
      data: {
        details: [
          { element: "The relief peacock eyes", story: "Carved proud of the surface so they catch the sun.", image: "/images/custom/oil-painting-23.webp", coordinates: { x: 40, y: 45 } },
          { element: "The neem branches", story: "They form the gate's arch — the tree is the structure.", image: "/images/custom/oil-painting-23.webp", coordinates: { x: 55, y: 30 } },
          { element: "The blossom clusters", story: "Painted last, in the warmest white, so they read as the gate's greeting.", image: "/images/custom/oil-painting-23.webp", coordinates: { x: 65, y: 55 } },
        ],
      },
    },

    inquiryMethod: "whatsapp",
  };

export default story;
