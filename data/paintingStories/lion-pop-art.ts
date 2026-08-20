import type { PaintingStory } from "../exhibitionImages";

// Bespoke Story 9: Lion · Pop Art — intense graphic narrative (Gallery piece)
const story: PaintingStory = {
    slug: "lion-pop-art",
    contextualTitle: "The Lion, in Loud Colour",
    pieceId: "Lion · Pop Art",
    storyContext: "gallery",
    emotionalSignature: "intense",

    openingScene: {
      image: "/images/exhibition/7.webp",
      narrative: "Some paintings observe an animal. This one declares one — flat colour, hard edges, a stare borrowed from print more than from the wild.",
    },

    modules: [
      {
        type: "the-problem",
        title: "The Realism Trap",
        content: {
          type: "the-problem",
          problem: "A lion almost has to be painted 'realistic' — mane, fur, savannah. The brief wanted to break that reflex and treat the lion as a graphic object, not a nature study.",
          whyItMattered: "The buyer wanted range on the wall, not another faithful animal.",
        },
        order: 1,
      },
      {
        type: "the-solution",
        title: "Repetition as the Mane",
        content: {
          type: "the-solution",
          solution: "The mane was built from repeated stencil-like shapes rather than drawn strokes — the pattern itself becomes the subject, and the lion becomes a poster.",
          howWeGotThere: "Free-drawn manes kept drifting back toward realism. A fixed repeated unit forced the graphic read.",
        },
        order: 2,
      },
      {
        type: "color-decisions",
        title: "Four Colours, No Apology",
        content: {
          type: "color-decisions",
          palette: [
            { color: "Signal orange", role: "The body", reasoning: "Loud, flat, the colour you notice first." },
            { color: "Cobalt blue", role: "The negative space", reasoning: "Pushes the orange forward and keeps the poster feel." },
            { color: "Hot magenta", role: "The mane accents", reasoning: "Adds the third pop so it never settles into two tones." },
            { color: "Black outline", role: "The hold", reasoning: "Hard edges keep every shape graphic, never painterly." },
          ],
        },
        order: 3,
      },
      {
        type: "technique-details",
        title: "Keeping It Flat",
        content: {
          type: "technique-details",
          techniques: [
            { technique: "Masked flat fills", how: "Each colour blocked in clean, no blending across boundaries.", why: "Blending would betray the print language." },
            { technique: "Uniform outline weight", how: "Every edge gets the same black line.", why: "Equal weight is what makes it read as a poster, not a sketch." },
          ],
        },
        order: 4,
      },
      {
        type: "future-home",
        title: "A Place It Could Belong",
        content: {
          type: "future-home",
          imaginedContext: "We imagine it in a young person's room or a studio corner — somewhere that wants energy more than calm.",
          potentialSettings: ["Teen room", "Studio wall", "Entrance pop"],
        },
        order: 5,
      },
      {
        type: "ideal-owner",
        title: "For Someone Who Likes Loud",
        content: {
          type: "ideal-owner",
          description: "This piece is for someone who wants the wall to speak first — bold, graphic, unapologetic, a deliberate break from the rest of the collection.",
          traits: ["Likes colour", "Wants energy", "Enjoys a statement"],
        },
        order: 6,
      },
    ],

    signatureInteraction: {
      type: "color-palette-explorer",
      data: {
        colors: [
          { color: "#ff6a13", name: "Signal Orange", role: "The body", reasoning: "The first colour the eye lands on." },
          { color: "#1f4fd6", name: "Cobalt Blue", role: "Negative space", reasoning: "Pushes the orange forward." },
          { color: "#d61f8c", name: "Hot Magenta", role: "Mane accents", reasoning: "The third pop that keeps it from settling." },
        ],
      },
    },

    inquiryMethod: "whatsapp",
  };

export default story;
