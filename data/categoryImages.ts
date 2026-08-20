import { publicArtistProfiles } from "@/data/artists";

export type CarouselImage = {
  src: string;
  alt: string;
  label?: string;
  student?: string;
  duration?: string;
  theme?: string;
  style?: string;
  /** When true, renders a "Meenakshi Recommends ★★★★★" ribbon on the marquee card (#16) */
  curatorsChoice?: boolean;
  /** One-line reason shown with the curator ribbon on hover (#16) */
  curatorReason?: string;
  /** Occasion tag for custom commissions (Wedding / Farewell / Family Keepsake…) — renders an occasion ribbon */
  occasion?: string;
  /** One-line client story shown with the occasion ribbon on hover */
  story?: string;
  /** When true, renders a pulsing "NOW BEING PAINTED" live badge */
  inProgress?: boolean;
  /** "from ₹X" / "by enquiry" price chip shown on hover */
  priceFrom?: string;
  /** Anchor to the matching room in the exhibition walk, e.g. "commissions-room-3" */
  roomLink?: string;
};

// NOTE: 4 entries below (Riya, Tanvi, Ishaan, Devansh) use placeholder names —
// these loose top-level files predate the per-student folder reorganization and
// their real contributors aren't known. Every `duration` value is an estimate,
// not confirmed timing. Both flagged per owner instruction to fill and correct later.
export const academyImages: CarouselImage[] = [
  { src: "/images/academy/oil-painting-153.webp", alt: "Hummingbird and florals watercolor", label: "Watercolor · Wildlife", student: "Riya", duration: "2-week study" },
  { src: "/images/academy/oil-painting-38.webp", alt: "Woman on a garden swing, acrylic painting", label: "Acrylic · Figure", student: "Tanvi", duration: "3-week piece" },
  { src: "/images/academy/oil-painting-59.webp", alt: "Stylized abstract landscape painting", label: "Acrylic · Abstract Landscape", student: "Ishaan", duration: "2-week project" },
  { src: "/images/academy/oil-painting-84.webp", alt: "Green pier sunset in oil pastel", label: "Oil Pastel · Landscape", student: "Devansh", duration: "Single session" },
  { src: "/images/academy/Raj-kumar-gayen/oil-painting-114.webp", alt: "Violinist portrait, acrylic painting", label: "Acrylic · Portrait", student: "Raj Kumar Gayen", duration: "4-week piece" },
  { src: "/images/academy/anmol/oil-painting-91.webp", alt: "Pianist portrait, acrylic painting", label: "Acrylic · Portrait", student: "Anmol Gupta", duration: "4-week piece" },
  { src: "/images/academy/harsh\ bansal/oil-painting-3400.webp", alt: "Pop art style portrait, acrylic painting", label: "Acrylic · Pop Art Portrait", student: "Harsh", duration: "2-week piece" },
  { src: "/images/academy/harsh\ bansal/oil-painting-3463.webp", alt: "Silhouette sunset scene, acrylic painting", label: "Acrylic · Silhouette Scene", student: "Harsh", duration: "1-week piece" },
  { src: "/images/academy/harsh\ bansal/oil-painting-4322.webp", alt: "Abstract pattern composition, acrylic painting", label: "Acrylic · Abstract Pattern", student: "Harsh", duration: "2-week piece" },
  { src: "/images/academy/keshav/oil-painting-158.webp", alt: "Graphite pencil portrait study", label: "Graphite Pencil · Portrait", student: "Keshav", duration: "Single sitting" },
  { src: "/images/academy/keshav/oil-painting-46.webp", alt: "Realistic graphite pencil portrait", label: "Graphite Pencil · Portrait", student: "Keshav", duration: "2-session study" },
  { src: "/images/academy/keshav/oil-painting-5322.webp", alt: "Deer at sunset, acrylic landscape painting", label: "Acrylic · Wildlife Landscape", student: "Keshav", duration: "3-week piece" },
  { src: "/images/academy/keshav/oil-painting-64.webp", alt: "Realistic graphite pencil portrait", label: "Graphite Pencil · Portrait", student: "Keshav", duration: "2-session study" },
  { src: "/images/academy/keshav/oil-painting-83.webp", alt: "Character portrait, graphite pencil drawing", label: "Graphite Pencil · Character Portrait", student: "Keshav", duration: "2-session study" },
  { src: "/images/academy/kartik/oil-painting-74.webp", alt: "Mosaic-style elephant, acrylic painting", label: "Acrylic · Wildlife", student: "Kartik", duration: "2-week project" },
  { src: "/images/academy/megha/oil-painting-119.webp", alt: "Autumn park path, acrylic landscape painting", label: "Acrylic · Landscape", student: "Megha", duration: "3-week piece" },
  { src: "/images/academy/megha/oil-painting-47.webp", alt: "Sailboat at sunset, acrylic painting", label: "Acrylic · Seascape", student: "Megha", duration: "2-week piece" },
  { src: "/images/academy/muskan/oil-painting-102.webp", alt: "Autumn path landscape, acrylic painting", label: "Acrylic · Landscape", student: "Muskan", duration: "2-week project" },
  { src: "/images/academy/niyati/oil-painting-108.webp", alt: "Radha Krishna traditional art painting", label: "Acrylic · Traditional Art", student: "Niyati", duration: "2-week piece" },
  { src: "/images/academy/pranav/oil-painting-155.webp", alt: "Birds on a cherry blossom branch, acrylic painting", label: "Acrylic · Nature", student: "Pranav", duration: "1-week piece" },
  { src: "/images/academy/prisha/oil-painting-15.webp", alt: "Cubist style cat portrait, acrylic painting", label: "Acrylic · Cubist Study", student: "Prisha", duration: "1-week piece" },
  { src: "/images/academy/prisha/Screenshot\ 2026-07-30\ 183041.webp", alt: "Cherry blossom tree over water, acrylic painting", label: "Acrylic · Landscape", student: "Prisha", duration: "1-week piece" },
  { src: "/images/academy/prisha/oil-painting-144.webp", alt: "Pointillism style autumn tree study", label: "Acrylic · Pointillism", student: "Prisha", duration: "1-week project" },
  { src: "/images/academy/prisha/oil-painting-42.webp", alt: "Floral still life, acrylic painting", label: "Acrylic · Still Life", student: "Prisha", duration: "1-week piece" },
  { src: "/images/academy/sanchi/oil-painting-143.webp", alt: "Cranes at sunset, acrylic painting", label: "Acrylic · Wildlife", student: "Sanchi", duration: "2-week piece" },
  { src: "/images/academy/shreya/oil-painting-117.webp", alt: "Flamenco dancer, acrylic painting", label: "Acrylic · Figure", student: "Shreya", duration: "3-week piece" },
  { src: "/images/academy/shreya/oil-painting-121.webp", alt: "Village river landscape, acrylic painting", label: "Acrylic · Landscape", student: "Shreya", duration: "4-week piece" },
  { src: "/images/academy/shreya/oil-painting-2000.webp", alt: "Tropical beach hut scene, acrylic painting", label: "Acrylic · Landscape", student: "Shreya", duration: "2-week piece" },
  { src: "/images/academy/shreya/oil-painting-67.webp", alt: "Exotic bird on a branch, acrylic painting", label: "Acrylic · Wildlife", student: "Shreya", duration: "2-week piece" },
  { src: "/images/academy/snigdha/2.webp", alt: "Woman reading on a balcony, illustrative acrylic painting", label: "Acrylic · Illustrative Scene", student: "Snigdha", duration: "2-week piece" },
  { src: "/images/academy/snigdha/3.webp", alt: "Wildflowers still life, acrylic painting", label: "Acrylic · Still Life", student: "Snigdha", duration: "1-week piece" },
  { src: "/images/academy/snigdha/4.webp", alt: "Abstract pattern composition, acrylic painting", label: "Acrylic · Abstract Pattern", student: "Snigdha", duration: "2-week piece" },
  { src: "/images/academy/snigdha/5.webp", alt: "Decorative patterned elephant, acrylic painting", label: "Acrylic · Decorative Pattern", student: "Snigdha", duration: "2-week piece" },
  { src: "/images/academy/snigdha/oil-painting-104.webp", alt: "Parent and child under an umbrella, acrylic painting", label: "Acrylic · Figure & Landscape", student: "Snigdha", duration: "2-week piece" },
  { src: "/images/academy/veenu/oil-painting-110.webp", alt: "Realistic portrait commission, oil painting", label: "Oil · Portrait Commission", student: "Veenu", duration: "5-week commission" },
  { src: "/images/academy/veenu/oil-painting-35.webp", alt: "Traditional procession scene, acrylic painting", label: "Acrylic · Traditional Art", student: "Veenu", duration: "3-week piece" },
  { src: "/images/academy/veenu/oil-painting-48.webp", alt: "Surrealist composition, acrylic painting", label: "Acrylic · Surrealist Composition", student: "Veenu", duration: "4-week piece" },
  { src: "/images/academy/aarna/oil-painting-22.webp", alt: "Floral still life, acrylic painting", label: "Acrylic · Still Life", student: "Aarna", duration: "1-week piece" },
  { src: "/images/academy/aarna/oil-painting-36.webp", alt: "Princess portrait, acrylic painting", label: "Acrylic · Figure", student: "Aarna", duration: "2-week piece" },
  { src: "/images/academy/aarna/oil-painting-45.webp", alt: "Cubist style cat portrait, acrylic painting", label: "Acrylic · Cubist Study", student: "Aarna", duration: "1-week piece" },
  { src: "/images/academy/aarna/oil-painting-58.webp", alt: "Penguin in the snow, acrylic painting", label: "Acrylic · Character Study", student: "Aarna", duration: "1-week piece" },
  { src: "/images/academy/aarna/oil-painting-136.webp", alt: "Rainbow unicorn, acrylic painting", label: "Acrylic · Character Study", student: "Aarna", duration: "1-week piece" },
  { src: "/images/academy/aarna/oil-painting-154.webp", alt: "Cherry blossom tree over water, acrylic painting", label: "Acrylic · Landscape", student: "Aarna", duration: "2-week piece" },
  { src: "/images/academy/aarna/oil-painting-32.webp", alt: "Harry Potter portrait study, graphite pencil drawing", label: "Graphite Pencil · Portrait", student: "Aarnav", duration: "Single sitting" }
];

export type StudentLockerEntry = {
  name: string;
  code: string;
  reveal: string;
  /** Slug of the student's page under /academy/{slug}. Omit if the page isn't built yet. */
  slug?: string;
};

// Each published student carries their shareCode on their own profile
// (see ArtistProfile.shareCode in @/data/artists) and on their certificate.
// The chest box below is built from those published profiles so a family reads
// the code on the student's page, then opens the chest on the academy page.
// Codes are intentionally simple placeholders — not a real access-control system.
export const studentLockerEntries: StudentLockerEntry[] = publicArtistProfiles
  .filter((p) => p.shareCode)
  .map((p) => ({
    name: p.name,
    code: p.shareCode as string,
    reveal: `${p.name}'s full journey — artworks, behind-the-canvas process and teacher's note.`,
    slug: p.slug,
  }));

export const customCommissionsImages: CarouselImage[] = [
  { src: "/images/custom/oil-painting-2.webp", alt: "Jasmine blossoms hand-painted on a round wooden plate", label: "Floral · Wood Plate", theme: "Decorative", style: "Wood Floral", occasion: "Gift for Mother", story: "I sent these to my mother for her birthday. She feeds us all on them now — the flowers match the jasmine in her garden.", priceFrom: "from ₹4,500", roomLink: "commissions-room-5" },
  { src: "/images/custom/oil-painting-7.webp", alt: "Graphite portrait of a young man with curly hair and a beard", label: "Portrait Commission", theme: "Portrait", style: "Graphite Sketch", occasion: "Family Keepsake", story: "Five likenesses drawn from family photographs — hung the way a home hangs the people it loves.", priceFrom: "from ₹8,000", roomLink: "commissions-room-3" },
  { src: "/images/custom/oil-painting-26.webp", alt: "Man at a Gulmarg viewpoint railing, graphite travel sketch", label: "Travel Memory", theme: "Portrait", style: "Graphite Sketch", occasion: "Travel Memory", story: "A place carried close — painted so it can be revisited every day.", priceFrom: "from ₹8,000", roomLink: "commissions-room-3" },
  { src: "/images/custom/oil-painting-31.webp", alt: "Marigold-garlanded deity idol beneath a temple arch", label: "Temple Deity", theme: "Devotional", style: "Temple Icon", occasion: "Puja Corner", story: "Our puja corner finally feels finished. The diya is lit every morning and the paintings catch the light first thing.", priceFrom: "from ₹4,000", roomLink: "commissions-room-7" },
  { src: "/images/custom/oil-painting-41.webp", alt: "Magnolia blooms hand-painted on a round wooden plate", label: "Floral · Wood Plate", theme: "Decorative", style: "Wood Floral", occasion: "Gift for Mother", story: "Hand-painted trays and plates, made for gifting and everyday use.", priceFrom: "from ₹4,500", roomLink: "commissions-room-5" },
  { src: "/images/custom/oil-painting-56.webp", alt: "Radha and Krishna in a musical duet, flute and veena", label: "Radha-Krishna Duet", theme: "Devotional", style: "Mythological", occasion: "Puja Corner", story: "Devotional pieces, commissioned for a quiet corner of home.", priceFrom: "from ₹4,000", roomLink: "commissions-room-7" },
  { src: "/images/custom/oil-painting-81.webp", alt: "Magnolia blooms hand-painted on a rectangular wooden tray", label: "Floral · Wood Tray", theme: "Decorative", style: "Wood Floral", occasion: "Gift for Mother", story: "Hand-painted trays and plates, made for gifting and everyday use.", priceFrom: "from ₹6,500", roomLink: "commissions-room-5" },
  { src: "/images/custom/oil-painting-106.webp", alt: "Graphite portrait of a young woman with wavy hair", label: "Portrait Commission", theme: "Portrait", style: "Graphite Sketch", occasion: "Family Keepsake", story: "Five likenesses drawn from family photographs — hung the way a home hangs the people it loves.", priceFrom: "from ₹8,000", roomLink: "commissions-room-3" },
  { src: "/images/custom/oil-painting-107.webp", alt: "Graphite portrait of a young man, frontal gaze", label: "Portrait Commission", theme: "Portrait", style: "Graphite Sketch", occasion: "Family Keepsake", story: "Five likenesses drawn from family photographs — hung the way a home hangs the people it loves.", priceFrom: "from ₹8,000", roomLink: "commissions-room-3" },
  { src: "/images/custom/oil-painting-109.webp", alt: "Graphite portrait of a baby seated in overalls", label: "Family Keepsake", theme: "Portrait", style: "Graphite Keepsake", occasion: "Family Keepsake", story: "These five are my parents and my husband's parents and the grandmother who raised us all.", priceFrom: "from ₹8,000", roomLink: "commissions-room-3" },
  { src: "/images/custom/oil-painting-125.webp", alt: "Close graphite portrait of a young woman with a soft smile", label: "Portrait Commission", theme: "Portrait", style: "Graphite Sketch", occasion: "Family Keepsake", story: "Five likenesses drawn from family photographs — hung the way a home hangs the people it loves.", priceFrom: "from ₹8,000", roomLink: "commissions-room-3" },
  { src: "/images/custom/oil-painting-158.webp", alt: "Styled graphite portrait with an ornate floral hair ornament", label: "Occasion Portrait", theme: "Portrait", style: "Occasion Sketch", occasion: "Wedding Gift", story: "This was for my daughter's wedding. She wanted portraits that felt like the way she looked that day.", priceFrom: "from ₹9,000", roomLink: "commissions-room-4" },
  { src: "/images/custom/oil-painting-160.webp", alt: "Styled graphite portrait with statement jewelry and embroidery", label: "Occasion Portrait", theme: "Portrait", style: "Occasion Sketch", occasion: "Wedding Gift", story: "This was for my daughter's wedding. She wanted portraits that felt like the way she looked that day.", priceFrom: "from ₹9,000", roomLink: "commissions-room-4" },
  { src: "/images/custom/oil-painting-162.webp", alt: "Shravanabelagola's ancient temple ruins and monolithic statue", label: "Heritage Commission", theme: "Heritage", style: "Landscape", occasion: "Heritage", story: "My father climbed Shravanabelagola every year as a boy. This painting brings that hill back into his study.", priceFrom: "from ₹10,000", roomLink: "commissions-room-6" },
  { src: "/images/custom/custom-work-1.webp", alt: "A mother cradling her infant beneath a blessing figure of Shiva", label: "Family & Faith", theme: "Devotional", style: "Family Portrait", occasion: "Puja Corner", story: "Devotional pieces, commissioned for a quiet corner of home.", priceFrom: "from ₹5,000", roomLink: "commissions-room-7" },
  { src: "/images/custom/oil-painting-23.webp", alt: "Peacocks carved and painted on a wooden courtyard gate", label: "Carved Gate", theme: "Decorative", style: "Carved Gate", occasion: "Home Entrance", story: "This gate is the first thing guests see. It was meant to say 'welcome' the way our family actually welcomes.", priceFrom: "by enquiry", roomLink: "commissions-room-1" },
  { src: "/images/custom/oil-painting-samudra-manthan.webp", alt: "A monumental mural of the churning of the ocean, commissioned as a farewell gift", label: "Institutional Mural", theme: "Mythological", style: "Institutional Mural", occasion: "Farewell Gift", story: "We commissioned this as a farewell gift for a mentor who gave the institution everything.", priceFrom: "from ₹25,000", roomLink: "commissions-room-2" },
  { src: "/images/custom/coloured-portrait.webp", alt: "A hand mid-stroke on an in-progress colour pencil portrait", label: "In Progress", theme: "Portrait", style: "Colour Study", occasion: "Portrait", story: "A colour pencil portrait, built layer by layer — the reference is approved and the face is taking shape.", inProgress: true, priceFrom: "from ₹9,000", roomLink: "commissions-room-3" },
  { src: "/images/custom/Screenshot\ 2026-07-30\ 183153.webp", alt: "The raw carved wood stage of a peacock gate, before painting", label: "In Progress", theme: "Decorative", style: "Wood Carving", occasion: "Home Entrance", story: "The raw carved wood stage of a peacock gate, before painting.", inProgress: true, priceFrom: "by enquiry", roomLink: "commissions-room-1" }
];

export const premiumPaintingsImages: CarouselImage[] = [
  { src: "/images/painting/oil-painting-5.webp", alt: "Vibrant multicolour lion head painting on a black background", label: "Lion · Pop Art", theme: "Wildlife", style: "Pop Art" },
  { src: "/images/painting/oil-painting-6.webp", alt: "Close-up tiger face with striking green eyes", label: "Tiger · Close Portrait", theme: "Wildlife", style: "Portrait", priceFrom: "from ₹12,000" },
  { src: "/images/painting/oil-painting-12.webp", alt: "Pop-art portrait of a woman with sunglasses and cubist colour fragments", label: "Pop Art Portrait", theme: "Portrait", style: "Pop Art" },
  { src: "/images/painting/oil-painting-20.webp", alt: "Radha and Krishna dancing in warm gold and deep blue tones", label: "Radha-Krishna · Devotional", theme: "Devotional", style: "Mythological" },
  { src: "/images/painting/oil-painting-24.webp", alt: "Vibrant multicolour lion head painting on a navy blue background", label: "Lion · Pop Art", theme: "Wildlife", style: "Pop Art" },
  { src: "/images/painting/oil-painting-28.webp", alt: "Stylised portrait of a pirate captain with a quote, in cool teal and warm brown", label: "Captain Jack · Fan Art", theme: "Portrait", style: "Fan Art", priceFrom: "from ₹5,000" },
  { src: "/images/painting/oil-painting-40.webp", alt: "Women carrying pots in a rural scene with a small Krishna vignette", label: "Village Life · Devotional", theme: "Rural Life", style: "Devotional Accent", priceFrom: "from ₹7,000" },
  { src: "/images/painting/oil-painting-49.webp", alt: "Rose bouquet still life in warm pinks and reds", label: "Rose Bouquet · Still Life", theme: "Floral", style: "Still Life", priceFrom: "from ₹1,500" },
  { src: "/images/painting/oil-painting-50.webp", alt: "Deer at a sunset pond with swans in warm orange and red tones", label: "Deer at Sunset", theme: "Wildlife", style: "Landscape", curatorsChoice: true, curatorReason: "Six weeks of layering until the evening light finally felt right." },
  { src: "/images/painting/oil-painting-51.webp", alt: "Tiger family, mother and cubs resting in a green forest", label: "Tiger Family", theme: "Wildlife", style: "Family Portrait" },
  { src: "/images/painting/oil-painting-66.webp", alt: "Seven running horses in warm browns and golds beside water", label: "Seven Horses · Auspicious", theme: "Wildlife", style: "Symbolic", curatorsChoice: true, curatorReason: "I kept this one in the studio for weeks before deciding to release it." },
  { src: "/images/painting/oil-painting-68.webp", alt: "Classical romantic garden scene with women in Victorian-style dress", label: "Garden Idyll · Classical", theme: "Classical", style: "Romantic Genre" },
  { src: "/images/painting/oil-painting-69.webp", alt: "Elderly man with two horses in warm sepia and gold tones", label: "Elder & Horses · Folk Art", theme: "Portrait", style: "Folk Devotional" },
  { src: "/images/painting/oil-painting-80.webp", alt: "Stylised Radha-Krishna profile beneath a moon in cool blue and gold", label: "Radha-Krishna · Moonlit", theme: "Devotional", style: "Modern Mythological", curatorsChoice: true, curatorReason: "The blue and gold against that moon — it stays with you." },
  { src: "/images/painting/oil-painting-82.webp", alt: "Psychedelic pattern-style elephant in vivid multicolour with an orange sun", label: "Elephant · Pattern Art", theme: "Wildlife", style: "Pattern Art", priceFrom: "from ₹10,000" },
  { src: "/images/painting/oil-painting-93.webp", alt: "Krishna in an ornate gold crown against a dark blue ground", label: "Krishna · Devotional Portrait", theme: "Devotional", style: "Mythological", priceFrom: "from ₹10,000" },
  { src: "/images/painting/oil-painting-101.webp", alt: "Abstract composition of vibrant organic shapes and patterns", label: "Abstract Composition", theme: "Abstract", style: "Pattern" },
  { src: "/images/painting/oil-painting-112.webp", alt: "Camel, bullock cart and villagers in a warm earthy rural scene", label: "Village Life · Narrative", theme: "Rural Life", style: "Narrative" },
  { src: "/images/painting/oil-painting-113.webp", alt: "Cranes resting on a branch at golden sunset", label: "Cranes at Sunset", theme: "Wildlife", style: "Nature", priceFrom: "from ₹5,000" },
  { src: "/images/painting/oil-painting-116.webp", alt: "Village well scene with a camel cart and banyan tree", label: "Village Well · Narrative", theme: "Rural Life", style: "Narrative", priceFrom: "from ₹10,000" },
  { src: "/images/painting/oil-painting-122.webp", alt: "Women carrying water pots at a rural well in colourful sarees", label: "Women at the Well", theme: "Rural Life", style: "Narrative" },
  { src: "/images/painting/oil-painting-127.webp", alt: "Two young ballerinas reflected in a mirror, in muted pastel tones", label: "Ballerinas · Figure Study", theme: "Portrait", style: "Figure Study", priceFrom: "from ₹8,000" },
  { src: "/images/painting/oil-painting-159.webp", alt: "Flamenco dancer in motion, dominant fiery red with black and gold accents", label: "Flamenco Dancer", theme: "Portrait", style: "Figure Study", priceFrom: "from ₹7,000" },
  { src: "/images/painting/oil-painting-7horses.webp", alt: "Seven horses crossing a river beneath a waterfall and canyon cliffs", label: "Seven Horses · River Crossing", theme: "Wildlife", style: "Symbolic", priceFrom: "from ₹7,000" },
  { src: "/images/painting-details/Screenshot\ 2026-08-04\ 154629.webp", alt: "Angels (Apsara) oil painting, celestial figures", label: "Angels · Apsara", theme: "Devotional", style: "Mythological", priceFrom: "from ₹15,000" },
  { src: "/images/painting-details/Screenshot\ 2026-08-04\ 154641.webp", alt: "Radha Krishna oil painting", label: "Radha-Krishna · Devotional", theme: "Devotional", style: "Mythological", priceFrom: "from ₹5,000" }
];

export const schoolProjectsImages: CarouselImage[] = [
  { src: "/images/school/oil-painting-10.webp", alt: "School art project in progress", label: "Classroom project" },
  { src: "/images/school/oil-painting-34.webp", alt: "Visual art project sample", label: "Creative assignment" },
  { src: "/images/school/oil-painting-70.webp", alt: "Finished school-themed artwork", label: "Finished piece" },
  { src: "/images/school/oil-painting-76.webp", alt: "Art materials arranged for practice", label: "Ready to create" },
  { src: "/images/school/oil-painting-78.webp", alt: "School art project in progress", label: "Classroom project" },
  { src: "/images/school/oil-painting-92.webp", alt: "Visual art project sample", label: "Creative assignment" },
  { src: "/images/school/oil-painting-95.webp", alt: "Finished school-themed artwork", label: "Finished piece" },
  { src: "/images/school/oil-painting-96.webp", alt: "Art materials arranged for practice", label: "Ready to create" },
  { src: "/images/school/oil-painting-99.webp", alt: "School art project in progress", label: "Classroom project" },
  { src: "/images/school/oil-painting-105.webp", alt: "Visual art project sample", label: "Creative assignment" },
  { src: "/images/school/oil-painting-111.webp", alt: "Finished school-themed artwork", label: "Finished piece" },
  { src: "/images/school/oil-painting-115.webp", alt: "Art materials arranged for practice", label: "Ready to create" },
  { src: "/images/school/oil-painting-118.webp", alt: "School art project in progress", label: "Classroom project" },
  { src: "/images/school/oil-painting-119.webp", alt: "Visual art project sample", label: "Creative assignment" },
  { src: "/images/school/oil-painting-123.webp", alt: "Finished school-themed artwork", label: "Finished piece" },
  { src: "/images/school/oil-painting-124.webp", alt: "Art materials arranged for practice", label: "Ready to create" },
  { src: "/images/school/oil-painting-126.webp", alt: "School art project in progress", label: "Classroom project" },
  { src: "/images/school/oil-painting-128.webp", alt: "Visual art project sample", label: "Creative assignment" },
  { src: "/images/school/oil-painting-131.webp", alt: "Finished school-themed artwork", label: "Finished piece" },
  { src: "/images/school/oil-painting-132.webp", alt: "Art materials arranged for practice", label: "Ready to create" },
  { src: "/images/school/oil-painting-133.webp", alt: "School art project in progress", label: "Classroom project" },
  { src: "/images/school/oil-painting-134.webp", alt: "Visual art project sample", label: "Creative assignment" },
  { src: "/images/school/oil-painting-135.webp", alt: "Finished school-themed artwork", label: "Finished piece" },
  { src: "/images/school/oil-painting-136.webp", alt: "Art materials arranged for practice", label: "Ready to create" },
  { src: "/images/school/oil-painting-137.webp", alt: "School art project in progress", label: "Classroom project" },
  { src: "/images/school/oil-painting-138.webp", alt: "Visual art project sample", label: "Creative assignment" },
  { src: "/images/school/oil-painting-139.webp", alt: "Finished school-themed artwork", label: "Finished piece" },
  { src: "/images/school/oil-painting-140.webp", alt: "Art materials arranged for practice", label: "Ready to create" },
  { src: "/images/school/oil-painting-141.webp", alt: "School art project in progress", label: "Classroom project" },
  { src: "/images/school/oil-painting-142.webp", alt: "Visual art project sample", label: "Creative assignment" },
  { src: "/images/school/oil-painting-143.webp", alt: "Finished school-themed artwork", label: "Finished piece" }
];
