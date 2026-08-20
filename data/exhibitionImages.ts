/**
 * Exhibition image + room metadata.
 *
 * A single "room" in the exhibition walk. Rooms are full-wall photographs
 * showing several paintings in context. The `pieces` array drives the
 * zoom-to-inspect interaction — each piece is one identifiable painting
 * inside the room (best-effort; prices are placeholders to fill later).
 */
import { NarrativeModule, EmotionalSignature, SignatureInteraction } from "./narrativeModules";
import { paintingStorySlug } from "../lib/paintingStorySlug";

export type ExhibitionPiece = {
  src: string;
  title: string;
  medium: string;
  size: string;
  price: string;
  href: string;
  /** Pre-filled WhatsApp commission message shown when a visitor clicks "Start a commission like this" */
  commission?: string;
  /** Link to dedicated painting story page */
  paintingSlug?: string;
  /** Context for narrative approach (commission/gallery/student) */
  storyContext?: 'commission' | 'gallery' | 'student';
};

/**
 * PaintingStory - Documentary page data for individual paintings.
 * Transforms each painting from a product into a life story using modular narrative system.
 */
export type PaintingStory = {
  slug: string;
  contextualTitle: string; // "The Morning Corner" not "Krishna in Gold Crown"
  pieceId: string; // Reference to ExhibitionPiece title
  storyContext: 'commission' | 'gallery' | 'student';
  emotionalSignature: EmotionalSignature; // Painting's emotional personality

  // Core required sections
  openingScene: {
    image: string; // Environmental hero shot
    narrative: string; // "Some homes begin their day with silence..."
    /** Optional full-bleed YouTube background video, replacing the static hero image */
    video?: { youtubeId: string };
  };

  // Selected narrative modules (6-10 of 60) - each painting chooses its own story
  modules: NarrativeModule[];

  // Optional signature interactive element for unique experience
  signatureInteraction?: SignatureInteraction;

  /** Optional floating YouTube short — the artist introducing this painting in her own words */
  founderVideo?: { youtubeId: string; title: string };

  /** Optional poster-styled standalone moment, rendered right after the hero */
  posterMoment?: {
    title: string;
    subtitle: string;
    image: string;
    problemEyebrow: string;
    problem: string;
    problemQuote: string;
    solutionEyebrow: string;
    solution: string;
    comparisonImage: string;
    closingLine: string;
    closingSubline: string;
  };

  /** Optional procession-themed standalone moment — unique to the Elephant · Pattern Art page.
   *  Deliberately NOT the tiger poster structure: reads as a journey you step into (ground -> current -> crowd),
   *  never as a 'problem / solution' reveal. */
  processionMoment?: {
    eyebrow: string;
    title: string;
    lede: string;
    image: string;
    passes: Array<{ step: string; heading: string; body: string }>;
    ribbon: string;
    motifs?: Array<{ label: string; note: string }>;
  };

  inquiryMethod: 'whatsapp'; // Context-aware WhatsApp integration
};

export type ExhibitionImage = {
  src: string;
  alt: string;
  label?: string;
  ratio?: number;
  display?: "framed" | "full";
  caption?: string;
  note?: string;
  notePosition?: "bottom-left" | "bottom-right" | "top-left" | "bottom-center";
/** Named wing of the exhibition, e.g. "The Devotional Wing" */
  wing?: string;
  /** Ambient colour key used to tint the room background per slide */
  theme?: "devotional" | "divine" | "rural" | "wildlife" | "graphite" | "pop" | "occasion" | "heritage" | "table" | "devotion" | "gesture";
  /** Short first-person note from the client — the "made for someone" story */
  testimonial?: string;
  /** Tiny handwritten-like client requests — e.g. "Could you make the background resemble her childhood home?" */
  clientNotes?: string[];
  /** Story metadata — e.g. [{label: "Gift from", value: "daughter"}, {label: "Completed in", value: "41 days"}] */
  storyFacts?: { label: string; value: string }[];
  /** 1-based room number within the walk */
  room?: number;
  /** Optional identifiable paintings inside the room for zoom-to-inspect */
  pieces?: ExhibitionPiece[];
  /** Expanded curator's notes — sensory detail and specific painting references, surfaced in the inspect modal */
  curatorNotes?: string[];
};

export const galleryExhibitionImages: ExhibitionImage[] = [
  {
    src: "/images/exhibition/1.webp",
    alt: "Gallery room with a Krishna portrait, a marigold-garlanded temple deity, and a mother-and-child devotional painting",
    note: "Devotional portraiture at its most reverent — icons, garlands and gold, painted the way faith is actually held close.",
    curatorNotes: [
      "Stand close to the Krishna in Gold Crown and you'll see the crown isn't one gold but four — a warm underneath, a bright on top, and two in between that only read in raking morning light. That layering is the whole point: the gold is meant to be found, not just seen.",
      "The Mother & Child on the right is painted almost whisper-soft, the blessing hand blurred on purpose. Move three steps back and the blur resolves into tenderness; up close it stays a gesture. Most visitors read it as devotion. A few read it as exhaustion, and that's allowed too.",
      "The Apsara at the end of the wall was the hardest to hang — her wing catches the room's only cool light, so she reads as dusk while everything else reads as dawn. Let your eye travel left to right and feel the day begin and end in one wall.",
    ],
    notePosition: "bottom-left",
    wing: "The Devotional Wing",
    theme: "devotional",
    room: 1,
    pieces: [
      { src: "/images/painting/oil-painting-93.webp", title: "Krishna in Gold Crown", medium: "Acrylic", size: "2 × 3 ft", price: "₹10,000", href: "/gallery", paintingSlug: "morning-corner-krishna", storyContext: "commission" },
      { src: "/images/custom/oil-painting-31.webp", title: "Marigold Temple Deity", medium: "Acrylic", size: "2 × 1.5 ft", price: "₹4,000", href: "/gallery" },
      { src: "/images/custom/custom-work-1.webp", title: "Mother & Child", medium: "Oil", size: "2 × 1.5 ft", price: "₹5,000", href: "/gallery", paintingSlug: "mother-and-child-blessing", storyContext: "gallery" },
      { src: "/images/painting-details/Screenshot\ 2026-08-04\ 154629.webp", title: "Angels (Apsara)", medium: "Oil", size: "2 × 3 ft", price: "₹15,000", href: "/gallery" },
    ],
  },
  {
    src: "/images/exhibition/2.webp",
    alt: "Gallery room with three Radha-Krishna paintings in blue, gold, and purple palettes",
    note: "Krishna and Radha, told three ways — myth rendered as romance, warm and lyrical rather than solemn.",
    curatorNotes: [
      "The largest, Radha-Krishna in Gold & Blue, is the key. Blue is the hardest pigment to keep luminous on a dark ground — look at the halo where the blue meets the gold and you'll see the gold was laid first, then the blue floated over it wet-on-wet so the edges breathe.",
      "The Moonlit version on the right was painted from memory of a night the client described but couldn't photograph — cooler, quieter, the flute almost dissolving. Stand between the two and you feel the difference between a remembered evening and a painted one.",
      "The small Duet at the end was the quickest of the three and the most spontaneous — a single sitting, no underdrawing. Its looseness is the point; it's the same lovers, told like a hum rather than a song.",
    ],
    notePosition: "bottom-right",
    wing: "The Radha-Krishna Room",
    theme: "divine",
    room: 2,
    pieces: [
      { src: "/images/painting/oil-painting-20.webp", title: "Radha-Krishna in Gold & Blue", medium: "Acrylic", size: "24 × 30 in", price: "₹20,000", href: "/gallery", paintingSlug: "radha-krishna-gold-and-blue", storyContext: "gallery" },
      { src: "/images/painting/oil-painting-80.webp", title: "Radha-Krishna · Moonlit", medium: "Acrylic", size: "20 × 24 in", price: "₹16,000", href: "/gallery" },
      { src: "/images/custom/oil-painting-56.webp", title: "Radha-Krishna Duet", medium: "Acrylic", size: "2 × 1.5 ft", price: "₹4,000", href: "/gallery" },
      { src: "/images/painting-details/Screenshot\ 2026-08-04\ 154641.webp", title: "Radha Krishna", medium: "Oil", size: "2 × 1.5 ft", price: "₹5,000", href: "/gallery" },
    ],
  },
  {
    src: "/images/exhibition/4.webp",
    alt: "Gallery room with a rural village bullock-cart scene, flanked by a well scene and a folk portrait with horses",
    note: "Everyday village life — wells, bullock carts, daily ritual — remembered in warm earth tones before it disappears.",
    curatorNotes: [
      "The Village Well · Banyan is the anchor of this room. The banyan's aerial roots were painted with a dry, nearly-empty brush so they read as hair-thin threads — stand six feet back and the tree looks solid, step close and it dissolves into hundreds of separate strokes. That's the whole memory of a village tree: solid from far, fragile up close.",
      "Women at the Well was composed around the water pots, not the women — the pots carry the rhythm of the piece, each one a slightly different terracotta so the row never feels printed. Look at the second pot from the left; its chip was kept, not corrected.",
      "Village Life · Narrative on the left packs the most story into the least space — a cart, a cow, a child, all suggested in a few confident marks. It's the room's appetite; the other two are its memory.",
    ],
    notePosition: "top-left",
    wing: "The Village Room",
    theme: "rural",
    room: 3,
    pieces: [
      { src: "/images/painting/oil-painting-112.webp", title: "Village Life · Narrative", medium: "Acrylic", size: "2 × 1.5 ft", price: "₹5,000", href: "/gallery" },
      { src: "/images/painting/oil-painting-116.webp", title: "Village Well · Banyan", medium: "Acrylic", size: "2 × 3 ft", price: "₹10,000", href: "/gallery", paintingSlug: "village-well-banyan", storyContext: "gallery" },
      { src: "/images/painting/oil-painting-122.webp", title: "Women at the Well", medium: "Acrylic", size: "18 × 24 in", price: "₹13,000", href: "/gallery" },
    ],
  },
  {
    src: "/images/exhibition/5.webp",
    alt: "Gallery room with a tiger family painting, paired sunset wildlife scenes, and a tiger close-up portrait",
    note: "Nature observed with patience — not decoration, but genuine study of animals in their own light.",
    curatorNotes: [
      "The Tiger Family at the centre is the room's quiet engine — read its full story separately, but in the room notice how the mother's stripes were painted to lead your eye away from the cubs and back to her watchful gaze. That redirection is the composition, not a detail.",
      "The Close Portrait beside it was an exercise in restraint: no background, no story, just one animal filling the frame. Look at the whisker dots — each was dotted with the handle end of the brush, never the tip, so they stay round.",
      "Cranes at Sunset on the right is the room's exhale. The water was laid in one wash and never touched again, so the cranes float on top of stillness rather than standing in it. It's the only painting here with no hard edge anywhere.",
    ],
    notePosition: "bottom-center",
    wing: "The Wildlife Room",
    theme: "wildlife",
    room: 4,
    pieces: [
      { src: "/images/painting/oil-painting-51.webp", title: "Tiger Family", medium: "Acrylic", size: "24 × 30 in", price: "₹22,000", href: "/gallery", paintingSlug: "tiger-family-quiet-hour", storyContext: "gallery" },
      { src: "/images/painting/oil-painting-6.webp", title: "Tiger · Close Portrait", medium: "Acrylic", size: "2 × 3 ft", price: "₹12,000", href: "/gallery" },
      { src: "/images/painting/oil-painting-113.webp", title: "Cranes at Sunset", medium: "Acrylic", size: "2 × 1.5 ft", price: "₹5,000", href: "/gallery", paintingSlug: "cranes-at-sunset", storyContext: "gallery" },
    ],
  },
  {
    src: "/images/exhibition/6.webp",
    alt: "Gallery wall of seven graphite portrait sketches",
    note: "Seven likenesses in graphite alone — proof that character doesn't need colour to be felt.",
    curatorNotes: [
      "This wall is about pressure, not pigment. Look at the jawline of the first portrait — the line is darkest where the pencil bore down and lifts to nothing at the chin. That single gradient carries more likeness than any detail.",
      "The three studies are the same sitter approached three ways: frontal, three-quarter, and a loose study where the eyes were left unfinished on purpose. Together they show that a portrait is a decision about where to stop, not what to add.",
      "Stand back far enough and the wall reads as one grey field with seven pale faces. Step in and each face has its own temperature — some warm from the paper, some cool from the graphite. Character, held in monochrome.",
    ],
    notePosition: "bottom-right",
    wing: "The Portrait Wall",
    theme: "graphite",
    room: 5,
    pieces: [
      { src: "/images/custom/oil-painting-7.webp", title: "Graphite Portrait", medium: "Graphite", size: "12 × 16 in", price: "₹8,000", href: "/gallery", paintingSlug: "graphite-portrait", storyContext: "gallery" },
      { src: "/images/custom/oil-painting-106.webp", title: "Graphite Portrait · Study", medium: "Graphite", size: "12 × 16 in", price: "₹8,000", href: "/gallery" },
      { src: "/images/custom/oil-painting-107.webp", title: "Graphite Portrait · Frontal", medium: "Graphite", size: "12 × 16 in", price: "₹8,000", href: "/gallery" },
    ],
  },
  {
    src: "/images/exhibition/7.webp",
    alt: "Gallery room with vivid pop-art paintings including lion portraits, an elephant, dancers, and an abstract piece",
    note: "A deliberate departure — bold, graphic, modern — the range beyond tradition.",
    curatorNotes: [
      "The Lion at the centre is the room's declaration: flat colour, hard edges, a stare that owes more to print than to nature. Notice the mane was built from repeated stencil-like shapes rather than drawn strokes — it's the one painting here where repetition is the subject.",
      "The Elephant beside it hides its labour. The pattern covering its body was mapped square by square so no two motifs sit at the same angle — from across the room it shimmers; up close it's clearly hand-placed, one cell at a time.",
      "The Pop Art Portrait at the end was the playful risk — a real face pushed into poster colour. Its charm is that it's still recognisably a person, just one who agreed to be loud for an afternoon.",
    ],
    notePosition: "bottom-left",
    wing: "The Pop Room",
    theme: "pop",
    room: 6,
    pieces: [
      { src: "/images/painting/oil-painting-5.webp", title: "Lion · Pop Art", medium: "Acrylic", size: "24 × 30 in", price: "₹20,000", href: "/gallery", paintingSlug: "lion-pop-art", storyContext: "gallery" },
      { src: "/images/painting/oil-painting-82.webp", title: "Elephant · Pattern Art", medium: "Acrylic", size: "2 × 3 ft", price: "₹10,000", href: "/gallery", paintingSlug: "elephant-pattern-art", storyContext: "gallery" },
      { src: "/images/painting/oil-painting-12.webp", title: "Pop Art Portrait", medium: "Acrylic", size: "18 × 24 in", price: "₹14,000", href: "/gallery" },
    ],
  },
];

export const meetTheStudentsExhibition: ExhibitionImage[] = [
  { src: "/images/academy/niyati/niyati-photo.webp", alt: "Niyati holding her Radha Krishna painting", label: "Niyati", caption: "Niyati with her Radha-Krishna painting." },
  { src: "/images/academy/muskan/muskan-photo.webp", alt: "Muskan holding her autumn path painting", label: "Muskan", caption: "Muskan with her autumn-path painting." },
  { src: "/images/academy/pranav/group-photo-2.webp", alt: "Pranav and Sanchi holding their paintings", label: "Pranav & Sanchi", caption: "Pranav and Sanchi with their finished pieces." },
  { src: "/images/academy/kartik/group-photo.webp", alt: "Kartik and classmates holding their paintings", label: "Kartik & Classmates", caption: "Kartik and classmates, paintings in hand." },
  { src: "/images/academy/kartik/oil-painting-94.webp", alt: "Students painting together in the studio", label: "Studio Class", caption: "A regular class in session." }
];

export const customOrdersExhibitionImages: ExhibitionImage[] = [
  {
    src: "/images/custom/exhibition/1.webp",
    alt: "A carved wooden gate hand-painted with peacocks beneath a flowering tree, set in a sunlit courtyard archway",
    label: "The Entrance",
    ratio: 1024 / 1536,
    note: "A hand-painted gate, commissioned for a private courtyard entrance.",
    wing: "The Grand Gate",
    theme: "gesture",
    room: 1,
    testimonial: "This gate is the first thing guests see. It was meant to say 'welcome' the way our family actually welcomes — with live birdsong and flowers.",
    clientNotes: [
      "Could the peacocks look like the ones from our wedding invitation?",
      "We'd love the tree to be the neem from our childhood courtyard.",
    ],
    storyFacts: [
      { label: "For", value: "A private family home" },
      { label: "Completed in", value: "5 weeks" },
      { label: "Delivered", value: "Saharanpur" },
    ],
    pieces: [
      { src: "/images/custom/oil-painting-23.webp", title: "Peacock Courtyard Gate", medium: "Carved Wood", size: "6 × 4 ft", price: "By enquiry", href: "/gallery", paintingSlug: "peacock-courtyard-gate", storyContext: "commission", commission: "Hello, I was inspired by the carved peacock gate commission. I'd like to discuss a carved gate for my own entrance." },
    ],
  },
  {
    src: "/images/custom/exhibition/2.webp",
    alt: "A grand daylit hall with a large mythological mural of the churning of the ocean",
    label: "A Farewell Gift",
    ratio: 1536 / 1024,
    display: "full",
    wing: "The Grand Gesture",
    theme: "gesture",
    room: 2,
    testimonial: "We commissioned this as a farewell gift for a mentor who gave the institution everything. It had to feel monumental — it had to hold the whole story.",
    storyFacts: [
      { label: "Occasion", value: "Farewell gift" },
      { label: "Completed in", value: "8 weeks" },
      { label: "Space", value: "Institutional hall" },
    ],
    clientNotes: [
      "Could the serpent Vasuki wrap the whole composition — it's the backbone of the story, not a side detail?",
      "We'd love the emerging treasures to appear gradually, not all at once — achievement as a process, not a moment.",
    ],
    pieces: [
      { src: "/images/custom/oil-painting-samudra-manthan.webp", title: "The Churning of the Ocean", medium: "Acrylic Mural", size: "8 × 6 ft", price: "₹25,000", href: "/gallery", paintingSlug: "farewell-mural-samudra", storyContext: "commission", commission: "Hello, I was moved by the Samudra Manthan mural commission. I'd like to discuss a large mural for my space." },
    ],
  },
  {
    src: "/images/custom/exhibition/3.webp",
alt: "A warm family hallway with five pencil portrait sketches above a console table",
    label: "Family Keepsakes",
    ratio: 1024 / 1536,
    note: "Five likenesses drawn from family photographs — hung the way a home hangs the people it loves.",
    wing: "For the Occasion",
    theme: "occasion",
    room: 3,
    testimonial: "These five are my parents and my husband's parents and the grandmother who raised us all. Every morning I pass them and remember who I come from.",
    clientNotes: [
      "Please use the photos from Diwali — everyone looks happiest in those.",
      "Could you keep the drawings soft, like the light in our living room?",
    ],
    storyFacts: [
      { label: "Gift from", value: "A daughter" },
      { label: "Completed in", value: "6 weeks" },
      { label: "Delivered", value: "Delhi" },
    ],
    pieces: [
      { src: "/images/custom/oil-painting-7.webp", title: "Graphite Portrait · Curled Hair", medium: "Graphite", size: "12 × 16 in", price: "₹8,000", href: "/gallery", paintingSlug: "family-keepsakes-graphite", storyContext: "commission", commission: "Hello, I'd like a graphite family portrait set like the ones in the hallway — from photos." },
      { src: "/images/custom/oil-painting-106.webp", title: "Graphite Portrait · Wavy Hair", medium: "Graphite", size: "12 × 16 in", price: "₹8,000", href: "/gallery", commission: "Hello, I'd like a graphite family portrait set — from photos." },
      { src: "/images/custom/oil-painting-109.webp", title: "Graphite Keepsake · Baby", medium: "Graphite", size: "12 × 16 in", price: "₹8,000", href: "/gallery", commission: "Hello, I'd like a graphite baby keepsake portrait from a photo." },
    ],
  },
  {
    src: "/images/custom/exhibition/4.webp",
    alt: "An elegant dressing room with three styled portrait sketches above a vanity table with jewelry and roses",
    label: "For the Occasion",
    ratio: 1122 / 1402,
    note: "Portraits commissioned to mark an occasion — styled, considered, made to be remembered.",
    wing: "For the Occasion",
    theme: "occasion",
    room: 4,
    testimonial: "This was for my daughter's wedding. She wanted portraits that felt like the way she looked that day — the jewellery, the embroidery, the way her hair was pinned.",
    clientNotes: [
      "Please include the jhumkas she wore at the sangeet.",
      "Could the background be soft and warm, like the wedding venue?",
    ],
    storyFacts: [
      { label: "Occasion", value: "Wedding" },
      { label: "Gift from", value: "A mother" },
      { label: "Completed in", value: "3 weeks" },
    ],
    pieces: [
      { src: "/images/custom/oil-painting-158.webp", title: "Occasion Portrait · Floral Pin", medium: "Graphite", size: "12 × 16 in", price: "₹9,000", href: "/gallery", paintingSlug: "occasion-portraits-wedding", storyContext: "commission", commission: "Hello, I'd like an occasion portrait for a wedding — styled with jewellery and hair details." },
      { src: "/images/custom/oil-painting-160.webp", title: "Occasion Portrait · Jewellery", medium: "Graphite", size: "12 × 16 in", price: "₹9,000", href: "/gallery", commission: "Hello, I'd like an occasion portrait — styled with statement jewellery and embroidery." },
    ],
  },
  {
    src: "/images/custom/exhibition/5.webp",
    alt: "A sunlit dining table with two hand-painted wooden plates and a matching tray, styled with fresh flowers and tea",
    label: "Made for the Table",
    ratio: 1402 / 1122,
    note: "Hand-painted trays and plates, made for gifting and everyday use.",
    wing: "Made for the Table",
    theme: "table",
    room: 5,
    testimonial: "I sent these to my mother for her birthday. She feeds us all on them now — the flowers match the jasmine in her garden.",
    clientNotes: [
      "Could the jasmine match the ones in my mother's garden — not a generic flower, her jasmine?",
      "Please make the tray safe for actual food, not just display — she'll use it, not store it.",
    ],
    storyFacts: [
      { label: "Gift from", value: "A daughter" },
      { label: "Completed in", value: "4 weeks" },
      { label: "Delivered", value: "Pune" },
    ],
    pieces: [
      { src: "/images/custom/oil-painting-2.webp", title: "Jasmine · Wood Plate", medium: "Hand-painted wood", size: "Round, 16 in", price: "₹4,500", href: "/gallery", paintingSlug: "made-for-the-table", storyContext: "commission", commission: "Hello, I'd like a hand-painted wooden plate with jasmine, like the ones in the dining table set." },
      { src: "/images/custom/oil-painting-41.webp", title: "Magnolia · Wood Plate", medium: "Hand-painted wood", size: "Round, 16 in", price: "₹4,500", href: "/gallery", commission: "Hello, I'd like a hand-painted wooden plate with magnolia blooms." },
      { src: "/images/custom/oil-painting-81.webp", title: "Magnolia · Wood Tray", medium: "Hand-painted wood", size: "Rectangular, 22 × 14 in", price: "₹6,500", href: "/gallery", commission: "Hello, I'd like a hand-painted wooden tray with magnolia blooms." },
    ],
  },
  {
    src: "/images/custom/exhibition/6.webp",
    alt: "A quiet sunlit study with a large painting of Shravanabelagola's ancient temple ruins and monolithic statue above a bookshelf",
    label: "A Place Remembered",
    ratio: 1405 / 1119,
    note: "A heritage destination, painted for someone who carries it with them.",
    wing: "A Place Remembered",
    theme: "heritage",
    room: 6,
    testimonial: "My father climbed Shravanabelagola every year as a boy. This painting brings that hill back into his study — and into our conversations.",
    clientNotes: [
      "My father climbed this hill every year as a boy — can you show the monolith small, like a memory he's carrying, not a postcard?",
      "Please include the flat step near the top where he always rested. That's the part he talks about.",
    ],
    storyFacts: [
      { label: "For", value: "A son, for his father" },
      { label: "Completed in", value: "5 weeks" },
      { label: "Delivered", value: "Bengaluru" },
    ],
    pieces: [
      { src: "/images/custom/oil-painting-162.webp", title: "Shravanabelagola · Ruins & Monolith", medium: "Acrylic", size: "2 × 3 ft", price: "₹10,000", href: "/gallery", paintingSlug: "shravanabelagola-heritage", storyContext: "commission", commission: "Hello, I'd like a heritage commission of a place that matters to my family — starting with Shravanabelagola as the example." },
    ],
  },
  {
    src: "/images/custom/exhibition/7.webp",
    alt: "A warm home prayer corner with three devotional paintings above a puja shrine cabinet with a lit diya and marigold flowers",
    label: "A Corner for Devotion",
    ratio: 1122 / 1402,
    note: "Devotional pieces, commissioned for a quiet corner of home.",
    wing: "A Corner for Devotion",
    theme: "devotion",
    room: 7,
    testimonial: "Our puja corner finally feels finished. The diya is lit every morning and the paintings catch the light first thing.",
    clientNotes: [
      "Could the diya light hit the paintings first thing in the morning — that's when the corner matters most?",
      "We'd love Radha-Krishna to face the entrance, so they greet anyone who comes in.",
    ],
    storyFacts: [
      { label: "For", value: "A family home" },
      { label: "Completed in", value: "5 weeks" },
      { label: "Delivered", value: "Haridwar" },
    ],
    pieces: [
      { src: "/images/custom/oil-painting-31.webp", title: "Marigold Temple Deity", medium: "Acrylic", size: "2 × 1.5 ft", price: "₹4,000", href: "/gallery", paintingSlug: "marigold-temple-deity", storyContext: "commission", commission: "Hello, I'd like a devotional painting for a home puja corner — inspired by the marigold temple deity." },
      { src: "/images/custom/oil-painting-56.webp", title: "Radha-Krishna Duet", medium: "Acrylic", size: "2 × 1.5 ft", price: "₹4,000", href: "/gallery", commission: "Hello, I'd like a Radha-Krishna devotional painting for a home puja corner." },
      { src: "/images/custom/custom-work-1.webp", title: "Mother & Child · Blessing", medium: "Oil", size: "2 × 1.5 ft", price: "₹5,000", href: "/gallery", commission: "Hello, I'd like a devotional family painting — mother and child under a blessing figure." },
    ],
  },
];
// ==== EXHIBITION PIECE INDEXES (built once at module load) ====
// T1: O(1) lookups across all gallery + custom-commission rooms, so the
// painting page and ExhibitionWalk never re-flatMap the room arrays.

// O(1): find the exhibition piece by its human-readable title (pieceId).
const exhibitionPieceByTitle = new Map<string, ExhibitionPiece>();
// O(1): precomputed story-page href for a piece, matching the prior inline
// logic in ExhibitionWalk: paintingSlug wins, else href, else derived slug.
const exhibitionPieceStoryHref = new Map<string, string>();
// O(1): all pieces belonging to a room (by `room` number).
export const exhibitionPiecesByRoom = new Map<number, ExhibitionPiece[]>();
// adjacency: pieces → rooms they live in (connection for room navigation).
const exhibitionRoomByTitle = new Map<string, number>();

function indexExhibitionRooms(rooms: ExhibitionImage[]) {
  for (const room of rooms) {
    for (const piece of room.pieces ?? []) {
      const key = piece.title;
      if (!exhibitionPieceByTitle.has(key)) exhibitionPieceByTitle.set(key, piece);
      if (!exhibitionPieceStoryHref.has(key)) {
        exhibitionPieceStoryHref.set(key, resolvePieceStoryHref(piece));
      }
      if (!exhibitionRoomByTitle.has(key) && room.room !== undefined) {
        exhibitionRoomByTitle.set(key, room.room);
      }
      if (room.room !== undefined) {
        const roomPieces = exhibitionPiecesByRoom.get(room.room);
        if (roomPieces) roomPieces.push(piece);
        else exhibitionPiecesByRoom.set(room.room, [piece]);
      }
    }
  }
}
for (const room of galleryExhibitionImages) indexExhibitionRooms([room]);
for (const room of customOrdersExhibitionImages) indexExhibitionRooms([room]);

// Mirror of the prior ExhibitionWalk inline resolution: paintingSlug → href
// → derived slug, preserving exact link behavior after the refactor.
function resolvePieceStoryHref(piece: {
  title: string;
  paintingSlug?: string;
  href?: string;
}): string {
  if (piece.paintingSlug) return `/painting/${piece.paintingSlug}`;
  if (piece.href) return piece.href;
  return `/painting/${paintingStorySlug(piece.title)}`;
}

/**
 * Get an exhibition piece by its title.
 * O(1) Map lookup across both gallery and custom-orders rooms.
 */
export function getExhibitionPieceByTitle(
  title: string
): ExhibitionPiece | undefined {
  return exhibitionPieceByTitle.get(title);
}

/**
 * Get the story page href for an exhibition piece.
 * Uses the piece's `paintingSlug` when present, else derives it from the title
 * via paintingStorySlug. Precomputed once at module load so ExhibitionWalk
 * doesn't re-derive it for every piece on every render.
 */
export function getExhibitionPieceStoryHref(piece: {
  title: string;
  paintingSlug?: string;
  href?: string;
}): string {
  return exhibitionPieceStoryHref.get(piece.title) ?? piece.href ?? "/gallery";
}

/**
 * Get all exhibition pieces that live in a given room number.
 */
export function getExhibitionPiecesByRoom(room: number): ExhibitionPiece[] {
  return exhibitionPiecesByRoom.get(room) ?? [];
}

/**
 * Get the room number an exhibition piece belongs to (if any).
 */
export function getExhibitionRoomByTitle(title: string): number | undefined {
  return exhibitionRoomByTitle.get(title);
}
