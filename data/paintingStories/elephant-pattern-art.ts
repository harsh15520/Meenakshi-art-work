import type { PaintingStory } from "../exhibitionImages";

// Gallery Story: Elephant · Pattern Art — "The Elephant That Marches Off the Wall" (a procession you step into)
const story: PaintingStory = {
    slug: "elephant-pattern-art",
    contextualTitle: "A Whole Parade in One Beast",
    pieceId: "Elephant · Pattern Art",
    storyContext: "gallery",
    emotionalSignature: "intense",

    openingScene: {
      image: "/images/painting/oil-painting-82.webp",
      narrative: "Some paintings put an animal in a scene. This one puts a scene inside the animal — an elephant built so wholly from pattern that, after a moment, you stop seeing an elephant decorated and start seeing a procession walking: crimson banding at the flank, olive settling into the legs, a sunburst blazing behind the raised trunk, the whole beast leaning forward as if mid‑step. It was painted to be read slowly, from trunk to tail, like following a crowd.",
      video: { youtubeId: "kr4T4VLhA4Y" },
    },

    processionMoment: {
      eyebrow: "A PAINTING YOU STEP INTO",
      title: "The Elephant That Marches Off the Wall",
      lede: "Most patterned elephants sit still and let you look. This one was built to move — so before you read it as a picture, you read it as a crowd you have walked into. Begin at the trunk: the ground is laid, then a current is drawn through it, then the crowd arrives.",
      image: "/images/painting/oil-painting-82.webp",
      passes: [
        { step: "Pass One", heading: "The Road Is Laid", body: "A cobalt-blue field goes down first — not a background but a night road, cool and quiet, broken only by looping green medallion arcs. Everything else is placed on top of this stillness." },
        { step: "Pass Two", heading: "A Current Is Drawn", body: "Before a single cell is filled, a slow line is pulled from the trunk to the tail, bending with the body. It is not a motif — it is the direction the whole painting will obey. The elephant begins to lean forward." },
        { step: "Pass Three", heading: "The Crowd Arrives", body: "Only now do the swirls, ovals and banded cells come in — crimson across the head and back, olive settling into the legs — each set by hand at its own angle, every one following that current. The beast fills with a procession and starts to walk." },
      ],
      ribbon: "Three passes — ground, current, crowd. By the last, the elephant is no longer decorated. It is moving.",
      motifs: [
        { label: "The sunburst", note: "one blazing wheel of light behind the raised trunk" },
        { label: "The medallion arcs", note: "looping floral rosettes framing the crowd, left and right" },
        { label: "Red to olive", note: "the crimson body giving way to grounded olive at the legs" },
        { label: "The spiral", note: "the raised trunk's tip curling into its one loop" },
      ],
    },

    modules: [
      {
        type: "color-decisions",
        title: "The Map of the Field",
        icon: "sun",
        content: {
          type: "color-decisions",
          palette: [
            { color: "Crimson red", role: "The ceremonial body", reasoning: "Covers the head, ears, back and raised trunk in dense hand-drawn banding — the colour that reads first from across a room." },
            { color: "Cobalt blue ground", role: "The night the procession crosses", reasoning: "A deep, cool field behind the elephant, broken by looping green medallion arcs, so the hot body doesn't overwhelm the canvas." },
            { color: "Sunburst gold-orange", role: "The one blazing point", reasoning: "A radiating wheel of light behind the raised trunk — the single hottest note in the painting, marking where the eye lands first." },
            { color: "Olive green", role: "Grounding the legs", reasoning: "The body's crimson gives way to a quieter olive at the legs, keeping the animal tethered to the earth rather than floating in ornament." },
          ],
        },
        order: 1,
      },
      {
        type: "technique-details",
        title: "Drawing the Crowd by Hand",
        icon: "temple",
        content: {
          type: "technique-details",
          techniques: [
            { technique: "Hand‑placed motif-cells", how: "Every swirl, oval and band across the body set by hand at a slightly different angle.", why: "Uniform repetition reads as printed; variation reads as a crowd of small made things." },
            { technique: "Curved grid", how: "The underlying grid bends with the trunk's curl and the haunch's round.", why: "Keeps the elephant readable through the ornament instead of flattening it." },
            { technique: "The one spiral", how: "The raised trunk's tip curls back on itself in a single loop, breaking the banding that runs the rest of its length.", why: "A breath in the rhythm — the one place where the eye is allowed to rest." },
          ],
        },
        order: 2,
      },
      {
        type: "hidden-symbolism",
        title: "A Field Guide to the Procession",
        icon: "lotus",
        content: {
          type: "hidden-symbolism",
          symbols: [
            { element: "The sunburst behind the trunk", meaning: "A radiating wheel of gold and orange, the one blazing point in the painting — where the procession is heading, not where it's been.", image: "/images/painting/oil-painting-82.webp", coordinates: { x: 78, y: 50 } },
            { element: "The medallion arcs, left and right", meaning: "Looping, stained-glass-like floral rosettes frame the elephant on both sides — the gates the procession passes through.", image: "/images/painting/oil-painting-82.webp", coordinates: { x: 15, y: 30 } },
            { element: "Red giving way to olive", meaning: "The crimson of the head and back settles into olive at the legs — the crowned figure still standing on the earth.", image: "/images/painting/oil-painting-82.webp", coordinates: { x: 45, y: 68 } },
            { element: "The trunk's single spiral", meaning: "The raised trunk's tip curls back into one loop — the one pause in the procession, the breath before the step.", image: "/images/painting/elephant-pattern-art/trunk-spiral-detail.webp" },
          ],
        },
        order: 3,
      },
      {
        type: "future-home",
        title: "A Wall That Hosts a Procession",
        icon: "frame",
        content: {
          type: "future-home",
          imaginedContext: "We picture it where people pass and linger — a stair landing or a long corridor, somewhere the eye can travel the way it travels a crowd, trunk to tail, without needing to stop.",
          heroImage: "/images/painting/elephant-pattern-art/staged-installation-mood.webp",
          pullQuote: "Hang it where you walk past slowly, and the parade walks with you.",
          potentialSettings: [
            { label: "A stair landing that catches afternoon light", icon: "star", image: "/images/painting/oil-painting-82.webp" },
            { label: "A long corridor you pass twice a day", icon: "book", image: "/images/painting/oil-painting-82.webp" },
            { label: "A reading nook that wants colour, not calm", icon: "sofa", image: "/images/painting/oil-painting-82.webp" },
          ],
        },
        order: 4,
      },
      {
        type: "ideal-owner",
        title: "For the Person Who Reads Patterns",
        icon: "marigold",
        content: {
          type: "ideal-owner",
          description: "This piece is for someone who loves detail that rewards a long look — who will trace the swirls and medallion arcs and find the whole elephant moving inside them, and who would rather a wall throw a small festival than keep a polite silence.",
          heroImage: "/images/painting/oil-painting-82.webp",
          pullQuote: "Who sees a crowd before they see an animal.",
          traits: [
            { label: "Loves pattern and detail", icon: "lotus" },
            { label: "Patient viewer — reads slowly", icon: "sun" },
            { label: "Wants a festival, not a statement", icon: "people" },
          ],
        },
        order: 5,
      },
    ],

    signatureInteraction: {
      type: "detail-explorer",
      data: {
        details: [
          { element: "The sunburst", story: "A radiating wheel of gold and orange behind the raised trunk — the one blazing point, where the procession is heading.", image: "/images/painting/oil-painting-82.webp", coordinates: { x: 78, y: 50 } },
          { element: "The medallion arcs", story: "Looping floral rosettes frame the elephant left and right — the gates the procession passes through.", image: "/images/painting/oil-painting-82.webp", coordinates: { x: 15, y: 30 } },
          { element: "The trunk spiral", story: "The raised trunk's tip curls back on itself in a single loop — the one breath in the procession.", image: "/images/painting/elephant-pattern-art/trunk-spiral-detail.webp" },
          { element: "The bending grid", story: "The hidden grid curves to follow the haunch — find it and the elephant reappears inside the ornament.", image: "/images/painting/oil-painting-82.webp", coordinates: { x: 60, y: 55 } },
        ],
      },
    },

    inquiryMethod: "whatsapp",

    founderVideo: { youtubeId: "uk-D2wqz3aI", title: "Meenakshi on this painting" },
  };

export default story;
