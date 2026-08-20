/**
 * CurriculumPhase — one phase of the five-phase academy learning path.
 *
 * @property num            - Zero-padded phase number: "01" through "05"
 * @property title          - Display title, e.g. "Hand Control"
 * @property description    - One-line tagline shown in the curriculum card
 * @property exercises      - Number of exercises in this phase (0 = use exercisesDetail for phase 5)
 * @property weeks          - Duration label, e.g. "5 weeks" or "10+ weeks"
 * @property studentExamples - How many student examples exist for this phase
 * @property image          - Path to a placeholder image (real illustrations TBD)
 * @property focusAreas     - 3 skill bullets defining what this phase builds
 * @property tools          - Brushes, pencils, papers, canvases introduced and why
 * @property outcome        - What the student walks away with
 * @property exercisesDetail - Per-exercise structured content (name, whatToDo, whatYouLearn, duration, successLooksLike)
 */
export type ExerciseDetail = {
  name: string;
  whatToDo: string;
  whatYouLearn: string;
  duration: string;
  successLooksLike: string;
};

export type CurriculumPhase = {
  num: string;
  title: string;
  description: string;
  exercises: number;
  weeks: string;
  studentExamples: number;
  image: string;
  focusAreas?: string[];
  tools?: string[];
  outcome?: string;
  exercisesDetail?: ExerciseDetail[];
};

export const curriculumPhases: CurriculumPhase[] = [
  {
    num: "01",
    title: "Hand Control",
    description: "Lines, forms and confident movement",
    exercises: 14,
    weeks: "5 weeks",
    studentExamples: 23,
    // Graphite portrait — best represents foundational pencil control
    image: "/images/academy/keshav/oil-painting-158.webp",
    focusAreas: [
      "Pencil grip variations (tripod, overhand, underhand) and when each serves the line",
      "Line weight control through pressure and speed modulation",
      "Pressure sensitivity — from whisper-light hatching to grounded shadow lines",
    ],
    tools: [
      "Graphite pencils HB, 2B, 4B, 6B — a range of softness so tone can be built gradually",
      "Kneaded eraser — lifts graphite without damaging the paper tooth",
      "A3 cartridge paper, 120–160 gsm — sturdy enough for repeated shading",
      "Pencil sharpener and sandpaper block — keeps a long, controllable lead",
      "Blending stumps — soften and feather tone without using fingers",
    ],
    outcome:
      "By the end of Phase 1 you can draw any form from observation with a steady, intentional line — and your hand no longer fights the pencil.",
    exercisesDetail: [
      {
        name: "First Lines",
        whatToDo: "Fill a page with continuous looping scribbles for two minutes without lifting the pencil.",
        whatYouLearn: "A loose wrist makes freer, more confident lines.",
        duration: "10 min",
        successLooksLike: "Scribbles look relaxed, not tight or hesitant.",
      },
      {
        name: "Tripod Grip Drill",
        whatToDo: "Practice drawing long lines using the tripod grip, pivoting from the shoulder.",
        whatYouLearn: "A stable grip gives control over long strokes.",
        duration: "15 min",
        successLooksLike: "Lines are smooth and reach across the page cleanly.",
      },
      {
        name: "Overhand Grip for Shading",
        whatToDo: "Hold the pencil overhand and shade broad areas with the side of the lead.",
        whatYouLearn: "The overhand grip covers tone quickly and evenly.",
        duration: "15 min",
        successLooksLike: "Tonal areas are even, with no visible scratch marks.",
      },
      {
        name: "Underhand Grip for Detail",
        whatToDo: "Use the underhand grip near the tip for tight, precise marks.",
        whatYouLearn: "Hand position changes the kind of control you get.",
        duration: "10 min",
        successLooksLike: "Fine details sit exactly where you intend.",
      },
      {
        name: "Pressure Scale",
        whatToDo: "Draw a gradient strip from the lightest whisper to the darkest press.",
        whatYouLearn: "Pressure is your first and most basic shading tool.",
        duration: "20 min",
        successLooksLike: "A smooth, even gradient with no harsh jumps.",
      },
      {
        name: "Hatching Bands",
        whatToDo: "Fill bands with parallel hatching at consistent spacing and angle.",
        whatYouLearn: "Parallel lines build tone systematically.",
        duration: "20 min",
        successLooksLike: "Bands read as even grey steps.",
      },
      {
        name: "Cross-Hatching Grid",
        whatToDo: "Layer cross-hatch to deepen tone and practice changing direction.",
        whatYouLearn: "Overlapping lines control darkness precisely.",
        duration: "25 min",
        successLooksLike: "Tones deepen cleanly wherever lines cross.",
      },
      {
        name: "Contour Drawing",
        whatToDo: "Draw an object's outline in one continuous line, eyes on the object.",
        whatYouLearn: "Looking at the subject beats looking at the page.",
        duration: "20 min",
        successLooksLike: "The outline follows the object's true contour.",
      },
      {
        name: "Blind Contour",
        whatToDo: "Repeat the contour exercise without peeking at the paper.",
        whatYouLearn: "Trusting observation over results loosens the hand.",
        duration: "15 min",
        successLooksLike: "The drawing feels connected to the object, not the page.",
      },
      {
        name: "Gesture Poses",
        whatToDo: "Capture 30-second figure or object gestures focusing on movement.",
        whatYouLearn: "Gesture captures life before accuracy.",
        duration: "20 min",
        successLooksLike: "Poses read as movement, not stiff outlines.",
      },
      {
        name: "Ellipse Practice",
        whatToDo: "Draw circles and ellipses at many angles and sizes.",
        whatYouLearn: "Ellipses are the basis of most forms.",
        duration: "20 min",
        successLooksLike: "Ellipses close cleanly without flat spots.",
      },
      {
        name: "Cylinder & Cube Forms",
        whatToDo: "Shade a cube and a cylinder using a single light source.",
        whatYouLearn: "Basic forms explain almost everything else.",
        duration: "30 min",
        successLooksLike: "Forms look 3D with a consistent light.",
      },
      {
        name: "Sphere Study",
        whatToDo: "Render a sphere with full tonal range and a cast shadow.",
        whatYouLearn: "The sphere teaches all tonal logic.",
        duration: "30 min",
        successLooksLike: "Smooth value roll-off from highlight to core shadow.",
      },
      {
        name: "Still-Life of Three Objects",
        whatToDo: "Compose and draw three objects combining every skill above.",
        whatYouLearn: "Separate skills combine into a finished drawing.",
        duration: "1 class",
        successLooksLike: "A confident, well-toned small still life.",
      },
    ],
  },
  {
    num: "02",
    title: "Proportions",
    description: "Observation, balance and composition",
    exercises: 18,
    weeks: "6 weeks",
    studentExamples: 31,
    image: "/images/academy/keshav/oil-painting-46.webp",
    focusAreas: [
      "Measuring with sight-size and comparative proportion (thumb-on-pencil)",
      "Negative space and the envelope — blocking the whole before the parts",
      "Compositional balance — rule of thirds, weight, and breathing room",
    ],
    tools: [
      "Graphite pencils (same HB–6B set from Phase 1)",
      "Printed reference photos at A4 — a stable subject to measure against",
      "Viewfinder / framing L's — find the crop before you draw",
      "Toned charcoal paper — mid-tone ground makes value obvious",
      "White charcoal pencil — recover highlights on toned ground",
    ],
    outcome:
      "You can place anything accurately on the page — a face, a hand, a room — and arrange it so the composition feels balanced before you ever add detail.",
    exercisesDetail: [
      {
        name: "Sight-Size Measuring",
        whatToDo: "Measure a bottle's height against its width using your pencil as a ruler.",
        whatYouLearn: "Comparison beats guesswork for accuracy.",
        duration: "20 min",
        successLooksLike: "Proportions match the object closely.",
      },
      {
        name: "Thumb Measuring",
        whatToDo: "Use thumb-on-pencil to check the relative sizes of parts.",
        whatYouLearn: "A quick gauge keeps relationships honest.",
        duration: "15 min",
        successLooksLike: "Parts relate correctly to one another.",
      },
      {
        name: "The Envelope",
        whatToDo: "Draw the outer bounding shape of a subject before any detail.",
        whatYouLearn: "The whole comes before the parts.",
        duration: "20 min",
        successLooksLike: "Everything fits inside the envelope.",
      },
      {
        name: "Negative Space Drawing",
        whatToDo: "Draw the spaces around an object, not the object itself.",
        whatYouLearn: "Negative space reveals true shape.",
        duration: "25 min",
        successLooksLike: "The object appears correctly as a byproduct.",
      },
      {
        name: "Plumb Lines",
        whatToDo: "Drop vertical references to align features on a face.",
        whatYouLearn: "Verticals keep features from drifting.",
        duration: "20 min",
        successLooksLike: "Features align on true verticals.",
      },
      {
        name: "Angle Checking",
        whatToDo: "Compare internal angles with your pencil as a protractor.",
        whatYouLearn: "Angles describe form better than outlines.",
        duration: "20 min",
        successLooksLike: "Slopes match the reference exactly.",
      },
      {
        name: "Rule of Thirds",
        whatToDo: "Place a horizon and subject on third-lines in a sketch.",
        whatYouLearn: "Off-centre placement feels balanced.",
        duration: "15 min",
        successLooksLike: "The composition reads as intentional.",
      },
      {
        name: "Value Thumbnails",
        whatToDo: "Make tiny 4-value sketches of a scene before drawing.",
        whatYouLearn: "Planning value saves rework later.",
        duration: "25 min",
        successLooksLike: "Thumbnails clearly guide the final.",
      },
      {
        name: "Eye-Level & Perspective",
        whatToDo: "Sketch a box from eye level, noting the vanishing cues.",
        whatYouLearn: "Viewpoint changes everything.",
        duration: "25 min",
        successLooksLike: "Box reads as grounded in space.",
      },
      {
        name: "One-Point Interior",
        whatToDo: "Draw a room using a single vanishing point.",
        whatYouLearn: "Interiors follow simple, repeatable rules.",
        duration: "30 min",
        successLooksLike: "Walls and floor converge correctly.",
      },
      {
        name: "Two-Point Cube",
        whatToDo: "Construct a cube with two vanishing points.",
        whatYouLearn: "Two points describe real objects.",
        duration: "30 min",
        successLooksLike: "Cube sits convincingly in perspective.",
      },
      {
        name: "Portrait Block-In",
        whatToDo: "Map a face using thirds and the envelope.",
        whatYouLearn: "Faces obey proportion too.",
        duration: "30 min",
        successLooksLike: "Features sit in correct relationships.",
      },
      {
        name: "Hand Construction",
        whatToDo: "Draw a hand using simple masses, not outlines.",
        whatYouLearn: "Hands are built, not traced.",
        duration: "35 min",
        successLooksLike: "Hand reads as volumes, not a glove.",
      },
      {
        name: "Foot & Simple Anatomy",
        whatToDo: "Study foot structure with basic forms.",
        whatYouLearn: "Understanding bones improves the drawing.",
        duration: "30 min",
        successLooksLike: "Foot looks structured, not flat.",
      },
      {
        name: "Foreshortening",
        whatToDo: "Draw an arm or leg coming toward you.",
        whatYouLearn: "Foreshortening compresses apparent length.",
        duration: "30 min",
        successLooksLike: "Limb reads as advancing in space.",
      },
      {
        name: "Composition with Weight",
        whatToDo: "Rearrange a still life for visual balance.",
        whatYouLearn: "Balance is felt, then adjusted.",
        duration: "25 min",
        successLooksLike: "Layout feels stable and calm.",
      },
      {
        name: "Cropping & Framing",
        whatToDo: "Use L-viewfinders to find the strongest crop.",
        whatYouLearn: "The crop decides the story.",
        duration: "20 min",
        successLooksLike: "The chosen crop strengthens the subject.",
      },
      {
        name: "Long Observational Study",
        whatToDo: "Spend a full class on one accurate drawing.",
        whatYouLearn: "Patience produces accuracy.",
        duration: "1 class",
        successLooksLike: "A resolved, proportionally true study.",
      },
    ],
  },
  {
    num: "03",
    title: "Acrylic Techniques",
    description: "Color, layering and brush techniques",
    exercises: 24,
    weeks: "7 weeks",
    studentExamples: 42,
    image: "/images/academy/shreya/oil-painting-121.webp",
    focusAreas: [
      "Colour mixing discipline — limited palette, value before hue",
      "Brushwork variety — flat, round, filbert, fan; dry-brush and scumble",
      "Layering & glazing with fast-drying acrylics; building opacity vs transparency",
    ],
    tools: [
      "Acrylic paints: primary set plus titanium white, burnt umber, payne's grey",
      "Synthetic brushes — flat 1\", round 8, filbert 6, fan — each a different voice",
      "Palette knife — for impasto and mixing clean colour",
      "Acrylic paper / canvas pad, 300 gsm — survives layering and scrubbing",
      "Water jars, misting spray, stay-wet palette — keep acrylics workable",
    ],
    outcome:
      "You can mix any colour you see, build a painting in confident layers, and use the brush to describe texture, edge, and light.",
    exercisesDetail: [
      {
        name: "Primary Mixing",
        whatToDo: "Mix secondary colours from primaries only.",
        whatYouLearn: "Every colour starts from three.",
        duration: "20 min",
        successLooksLike: "Clean secondaries without muddy grey.",
      },
      {
        name: "Tint & Shade",
        whatToDo: "Take one hue and make a tint/shade row.",
        whatYouLearn: "White and black extend a single hue.",
        duration: "15 min",
        successLooksLike: "Even steps from pale to deep.",
      },
      {
        name: "Value Scale in Paint",
        whatToDo: "Mix a 5-step grey value scale.",
        whatYouLearn: "Value reads before colour does.",
        duration: "20 min",
        successLooksLike: "Clear, even value steps.",
      },
      {
        name: "Limited Palette Portrait",
        whatToDo: "Paint a small study with three colours only.",
        whatYouLearn: "Limits force harmony.",
        duration: "30 min",
        successLooksLike: "Convincing form from few pigments.",
      },
      {
        name: "Temperature Shift",
        whatToDo: "Mix warm and cool versions of one colour.",
        whatYouLearn: "Temperature creates daylight.",
        duration: "20 min",
        successLooksLike: "Warm and cool read distinctly.",
      },
      {
        name: "Brush Introduction: Flat",
        whatToDo: "Practise straight edges and broad washes with a flat.",
        whatYouLearn: "Flats lay even fields.",
        duration: "15 min",
        successLooksLike: "Clean edges, no streak gaps.",
      },
      {
        name: "Brush: Round",
        whatToDo: "Make lines, dots, and curves with a round.",
        whatYouLearn: "Rounds are the all-rounder.",
        duration: "15 min",
        successLooksLike: "Confident tapering lines and dots.",
      },
      {
        name: "Brush: Filbert",
        whatToDo: "Use a filbert for soft, leaf-like strokes.",
        whatYouLearn: "Filberts blend edges gently.",
        duration: "15 min",
        successLooksLike: "Soft, organic marks achieved.",
      },
      {
        name: "Brush: Fan",
        whatToDo: "Create foliage and texture with a fan brush.",
        whatYouLearn: "Fans suggest, rather than state.",
        duration: "15 min",
        successLooksLike: "Texture reads without overworking.",
      },
      {
        name: "Dry-Brush",
        whatToDo: "Drag almost-dry paint for broken texture.",
        whatYouLearn: "Less paint means more surface.",
        duration: "20 min",
        successLooksLike: "Grainy, lively texture appears.",
      },
      {
        name: "Scumble",
        whatToDo: "Scumble a thin light layer over a dry dark.",
        whatYouLearn: "Scumble adds atmosphere.",
        duration: "20 min",
        successLooksLike: "Hazy depth without muddiness.",
      },
      {
        name: "Glazing",
        whatToDo: "Apply a transparent glaze to shift a colour.",
        whatYouLearn: "Glazes tune colour optically.",
        duration: "25 min",
        successLooksLike: "Colour shifts while staying luminous.",
      },
      {
        name: "Wet-on-Wet",
        whatToDo: "Blend two acrylics while both are still wet.",
        whatYouLearn: "Acrylics blend fast — commit quickly.",
        duration: "20 min",
        successLooksLike: "Smooth transition before drying.",
      },
      {
        name: "Wet-on-Dry",
        whatToDo: "Layer opaque strokes over a dry base.",
        whatYouLearn: "Dry layers keep crisp shapes.",
        duration: "20 min",
        successLooksLike: "Clean overlaps, no bleed.",
      },
      {
        name: "Palette Knife Marks",
        whatToDo: "Lay thick paint with a knife for impasto.",
        whatYouLearn: "The knife gives physical texture.",
        duration: "20 min",
        successLooksLike: "Raised, expressive strokes.",
      },
      {
        name: "Colour Blocking",
        whatToDo: "Fill a canvas with flat colour zones first.",
        whatYouLearn: "Block big before small.",
        duration: "30 min",
        successLooksLike: "Balanced colour map of the scene.",
      },
      {
        name: "Monochrome Underpainting",
        whatToDo: "Paint a subject in one hue to plan value.",
        whatYouLearn: "A value plan saves colour chaos.",
        duration: "35 min",
        successLooksLike: "Strong value structure in one colour.",
      },
      {
        name: "Apple Study",
        whatToDo: "Paint a single apple with highlight and core shadow.",
        whatYouLearn: "One object holds the full technique.",
        duration: "30 min",
        successLooksLike: "A round, lit, believable apple.",
      },
      {
        name: "Sky & Cloud Wash",
        whatToDo: "Paint a graded sky with soft cloud edges.",
        whatYouLearn: "Skies need gentle value.",
        duration: "30 min",
        successLooksLike: "Believable depth in the sky.",
      },
      {
        name: "Foliage Mass",
        whatToDo: "Suggest a tree using layered greens and fan texture.",
        whatYouLearn: "Mass before detail in nature.",
        duration: "30 min",
        successLooksLike: "Tree reads from a distance.",
      },
      {
        name: "Water Reflection",
        whatToDo: "Paint water with broken horizontal reflections.",
        whatYouLearn: "Water mirrors, then breaks.",
        duration: "30 min",
        successLooksLike: "Convincing shimmer and stillness.",
      },
      {
        name: "Simple Landscape",
        whatToDo: "Compose a small landscape using the above.",
        whatYouLearn: "Elements combine into a scene.",
        duration: "45 min",
        successLooksLike: "A coherent little landscape.",
      },
      {
        name: "Still-Life in Colour",
        whatToDo: "Paint a 3-object still life in full colour.",
        whatYouLearn: "Colour unifies a setup.",
        duration: "1 class",
        successLooksLike: "A harmonious, lit still life.",
      },
      {
        name: "Acrylic Final Piece",
        whatToDo: "Plan and finish one painting start to end.",
        whatYouLearn: "Process becomes habit.",
        duration: "1–2 classes",
        successLooksLike: "A resolved acrylic painting.",
      },
    ],
  },
  {
    num: "04",
    title: "Oil Painting Basics",
    description: "From concept to a complete canvas",
    exercises: 28,
    weeks: "8 weeks",
    studentExamples: 48,
    image: "/images/academy/veenu/oil-painting-110.webp",
    focusAreas: [
      "Fat-over-lean layering and working with slow-drying mediums",
      "Colour temperature and edge control (hard / soft / lost)",
      "From concept to finished canvas — blocking, refining, resolving",
    ],
    tools: [
      "Oil paints (same primaries plus earth tones)",
      "Linseed oil / odourless solvent (or a solvent-free medium)",
      "Hog bristle and sable/synthetic brushes — stiff for laying, soft for finishing",
      "Primed stretched canvas — the real support for a finished work",
      "Palette, rag, and painting-medium cups — a clean, deliberate setup",
    ],
    outcome:
      "You can take a painting from a blank canvas to a resolved, lit, atmospheric image using the slow, honest language of oil.",
    exercisesDetail: [
      {
        name: "Oil vs Acrylic Feel",
        whatToDo: "Compare a stroke in each medium side by side.",
        whatYouLearn: "A slow medium invites patience.",
        duration: "15 min",
        successLooksLike: "You feel the difference immediately.",
      },
      {
        name: "Mediums & Fat-over-Lean",
        whatToDo: "Mix linseed-rich and solvent-thin layers in correct order.",
        whatYouLearn: "Lean under, fat over — no cracking.",
        duration: "20 min",
        successLooksLike: "Test layers stay sound.",
      },
      {
        name: "Solvent Safety & Setup",
        whatToDo: "Set up a clean, ventilated oil-painting station.",
        whatYouLearn: "Setup protects the work and you.",
        duration: "20 min",
        successLooksLike: "A tidy, safe working corner.",
      },
      {
        name: "Brush Care for Oils",
        whatToDo: "Clean and condition hog and sable brushes.",
        whatYouLearn: "Clean brushes last for years.",
        duration: "15 min",
        successLooksLike: "Brushes restored, no caked paint.",
      },
      {
        name: "Toning the Canvas",
        whatToDo: "Lay a mid-tone ground across the canvas.",
        whatYouLearn: "A ground unifies everything.",
        duration: "20 min",
        successLooksLike: "An even, non-white starting field.",
      },
      {
        name: "Imprimatura Wash",
        whatToDo: "Thin-wash a warm tone for atmosphere.",
        whatYouLearn: "Warm grounds glow underneath.",
        duration: "20 min",
        successLooksLike: "Subtle warmth across the canvas.",
      },
      {
        name: "Blocking-In Shapes",
        whatToDo: "Map big masses with thin colour, ignoring detail.",
        whatYouLearn: "Block before you build.",
        duration: "30 min",
        successLooksLike: "Accurate large shapes placed.",
      },
      {
        name: "Establishing Value",
        whatToDo: "Set light/dark relationships early in the block-in.",
        whatYouLearn: "Value order drives realism.",
        duration: "30 min",
        successLooksLike: "A strong value map from the start.",
      },
      {
        name: "Colour Strings",
        whatToDo: "Mix a light-to-dark string of one hue.",
        whatYouLearn: "Strings keep colour consistent.",
        duration: "25 min",
        successLooksLike: "An even progression of a family.",
      },
      {
        name: "Alla Prima Study",
        whatToDo: "Complete a small study in one wet session.",
        whatYouLearn: "Direct painting builds confidence.",
        duration: "45 min",
        successLooksLike: "A fresh, complete small work.",
      },
      {
        name: "Soft Edge Technique",
        whatToDo: "Blend a hard edge into a soft one.",
        whatYouLearn: "Edges tell distance.",
        duration: "20 min",
        successLooksLike: "A seamless edge transition.",
      },
      {
        name: "Hard Edge Control",
        whatToDo: "Keep crisp boundaries where forms meet light.",
        whatYouLearn: "Some edges must stay sharp.",
        duration: "20 min",
        successLooksLike: "Intentional, clean hard edges.",
      },
      {
        name: "Lost & Found Edges",
        whatToDo: "Hide some edges into the background.",
        whatYouLearn: "Lost edges create focus.",
        duration: "25 min",
        successLooksLike: "The eye led by what remains.",
      },
      {
        name: "Colour Temperature in Light",
        whatToDo: "Paint warm light and cool shadow on a form.",
        whatYouLearn: "Temperature models volume.",
        duration: "25 min",
        successLooksLike: "Form turns convincingly.",
      },
      {
        name: "Reflected Light",
        whatToDo: "Add bounced light into shadow sides.",
        whatYouLearn: "Shadows aren't flat black.",
        duration: "20 min",
        successLooksLike: "Shadows feel alive.",
      },
      {
        name: "Cast Shadow Logic",
        whatToDo: "Paint a shadow consistent with the light source.",
        whatYouLearn: "Shadows obey the light.",
        duration: "20 min",
        successLooksLike: "Shadows fall correctly.",
      },
      {
        name: "Painting Drapery",
        whatToDo: "Render cloth with folds and value steps.",
        whatYouLearn: "Cloth is form in repetition.",
        duration: "35 min",
        successLooksLike: "Believable folded fabric.",
      },
      {
        name: "Painting Metal",
        whatToDo: "Capture a metallic vessel's hard highlights.",
        whatYouLearn: "Metal needs extreme contrast.",
        duration: "30 min",
        successLooksLike: "Surface reads as metal.",
      },
      {
        name: "Painting Glass",
        whatToDo: "Suggest transparency with edges and reflections.",
        whatYouLearn: "Glass is mostly what's behind it.",
        duration: "30 min",
        successLooksLike: "A convincing transparent vessel.",
      },
      {
        name: "Skin Tone Mixing",
        whatToDo: "Mix a range of plausible flesh tones.",
        whatYouLearn: "Skin is many colours.",
        duration: "30 min",
        successLooksLike: "Natural, varied skin tones.",
      },
      {
        name: "Portrait Block-In",
        whatToDo: "Block a portrait in oil from life or photo.",
        whatYouLearn: "Same plan, richer medium.",
        duration: "45 min",
        successLooksLike: "A solid portrait foundation.",
      },
      {
        name: "Landscape in Oil",
        whatToDo: "Paint a landscape with atmospheric depth.",
        whatYouLearn: "Distance cools and lifts.",
        duration: "1 class",
        successLooksLike: "A deep, airy landscape.",
      },
      {
        name: "Still-Life in Oil",
        whatToDo: "Build a lit still life with reflective objects.",
        whatYouLearn: "Oil rewards patience.",
        duration: "1 class",
        successLooksLike: "A rich, resolved still life.",
      },
      {
        name: "Scumbling & Glazing in Oil",
        whatToDo: "Use slow glazes to deepen a passage.",
        whatYouLearn: "Oil glazes glow from within.",
        duration: "30 min",
        successLooksLike: "A luminous adjusted passage.",
      },
      {
        name: "Detail & Resolution",
        whatToDo: "Bring one area to full finish selectively.",
        whatYouLearn: "Finish where the eye lands.",
        duration: "30 min",
        successLooksLike: "Focal area reads as complete.",
      },
      {
        name: "Unifying the Whole",
        whatToDo: "Step back and harmonise colour across the canvas.",
        whatYouLearn: "The whole must agree.",
        duration: "25 min",
        successLooksLike: "A cohesive overall colour.",
      },
      {
        name: "Signature & Varnish Prep",
        whatToDo: "Sign and learn when to varnish.",
        whatYouLearn: "A finish protects the work.",
        duration: "20 min",
        successLooksLike: "Signed and correctly prepped.",
      },
      {
        name: "Complete Canvas Project",
        whatToDo: "Take one painting from blank to resolved.",
        whatYouLearn: "The full arc becomes yours.",
        duration: "2–3 classes",
        successLooksLike: "A finished, framed-ready oil.",
      },
    ],
  },
  {
    num: "05",
    title: "Signature Style",
    description: "Depth, realism and a personal voice",
    // Phase 5 has no fixed exercise count — uses Personal Projects + Portfolio Building bullets
    exercises: 0,
    weeks: "10+ weeks",
    studentExamples: 19,
    image: "/images/academy/aarna/featured-artwork/princess-dream/hero.webp",
    focusAreas: [
      "Developing a personal subject and palette",
      "Series work — repeating a motif to find your voice",
      "Presenting and sequencing a body of work (portfolio)",
    ],
    tools: [
      "Your chosen medium at full strength — oils or acrylics, used confidently",
      "Portfolio case and a digital documentation setup — photograph every work",
      "A variety of supports — canvas, board, and paper for different ideas",
      "Framing and presentation materials — the work deserves a finished edge",
    ],
    outcome:
      "You leave with a cohesive body of personal work and the confidence to keep developing your own visual language.",
    exercisesDetail: [
      {
        name: "Choosing Your Subject",
        whatToDo: "List the motifs that genuinely pull you and pick one.",
        whatYouLearn: "Voice starts with appetite.",
        duration: "1 class",
        successLooksLike: "A clear personal direction.",
      },
      {
        name: "Your Palette Statement",
        whatToDo: "Develop a signature limited palette from your favourites.",
        whatYouLearn: "Palette is identity.",
        duration: "1 class",
        successLooksLike: "A palette that feels like you.",
      },
      {
        name: "Series Planning",
        whatToDo: "Plan five works around one motif and its variations.",
        whatYouLearn: "A series reveals a voice.",
        duration: "1 class",
        successLooksLike: "A coherent series brief.",
      },
      {
        name: "First Series Painting",
        whatToDo: "Execute the first piece of your series.",
        whatYouLearn: "Theory becomes practice.",
        duration: "1–2 classes",
        successLooksLike: "A strong opening work.",
      },
      {
        name: "Variation Studies",
        whatToDo: "Repaint the motif with deliberate changes.",
        whatYouLearn: "Variation deepens intent.",
        duration: "1–2 classes",
        successLooksLike: "Clear progression across the studies.",
      },
      {
        name: "Personal Master Copy",
        whatToDo: "Study and reinterpret an artist you admire.",
        whatYouLearn: "Influence is a teacher.",
        duration: "1–2 classes",
        successLooksLike: "A respectful, personal copy.",
      },
      {
        name: "Portfolio Sequencing",
        whatToDo: "Arrange your works for narrative flow.",
        whatYouLearn: "Order shapes meaning.",
        duration: "1 class",
        successLooksLike: "A sequenced, story-driven set.",
      },
      {
        name: "Portfolio Presentation",
        whatToDo: "Photograph, frame, and present your body of work.",
        whatYouLearn: "Presentation completes the work.",
        duration: "1–2 classes",
        successLooksLike: "A polished, presentable portfolio.",
      },
    ],
  },
];

/**
 * Backward-compatible export consumed by CurriculumCanvas and the homepage phases list.
 * Existing consumers need no changes.
 */
export const phases: [string, string, string][] = curriculumPhases.map(
  (p) => [p.num, p.title, p.description]
);

// ==== CURRICULUM INDEXES (built once at module load) ====
// T1: O(1) phase lookups by zero-padded `num`, replacing the prior .find() scan.

const phaseByNum = new Map<string, CurriculumPhase>();
const phaseIndexByNum = new Map<string, number>();
curriculumPhases.forEach((p, i) => {
  phaseByNum.set(p.num, p);
  phaseIndexByNum.set(p.num, i);
});

// T1: O(1) navigation — each phase → its previous and next phase num (doubly
// linked list over the ordered 5-phase path).
const phaseNavigation = new Map<string, { prev: string | null; next: string | null }>();
curriculumPhases.forEach((p, i) => {
  phaseNavigation.set(p.num, {
    prev: i > 0 ? curriculumPhases[i - 1]!.num : null,
    next: i < curriculumPhases.length - 1 ? curriculumPhases[i + 1]!.num : null,
  });
});

export function getCurriculumPhase(num: string): CurriculumPhase | undefined {
  return phaseByNum.get(num);
}

/**
 * Get the previous / next phase numbers for navigation.
 * O(1) lookup over the ordered curriculum path.
 */
export function getCurriculumPhaseNavigation(num: string): {
  prev: string | null;
  next: string | null;
} | undefined {
  return phaseNavigation.get(num);
}

/**
 * Get the next phase (by path order) for a given phase num.
 * Returns undefined when num is the last phase.
 */
export function getNextCurriculumPhase(num: string): CurriculumPhase | undefined {
  const next = phaseNavigation.get(num)?.next;
  return next ? phaseByNum.get(next) : undefined;
}

/**
 * Get the previous phase (by path order) for a given phase num.
 * Returns undefined when num is the first phase.
 */
export function getPrevCurriculumPhase(num: string): CurriculumPhase | undefined {
  const prev = phaseNavigation.get(num)?.prev;
  return prev ? phaseByNum.get(prev) : undefined;
}

/**
 * CurriculumCanvasReflection — a first-person student-experience narrative for each
 * phase of the curriculum. Used in the CurriculumCanvas scroll-fill section.
 *
 * These replace the generic phase descriptions to avoid repeating the card grid above.
 * Each entry is a 1–3 sentence story about what the student actually feels and discovers,
 * enriched with sensory detail (sound, smell, touch) while keeping the original arc.
 */
export type CurriculumCanvasReflection = {
  phaseNum: string;
  narrative: string;
};

export const curriculumCanvasReflections: CurriculumCanvasReflection[] = [
  {
    phaseNum: "01",
    narrative:
      "The first few strokes are always tight — you can hear the pencil's scratch against the paper, smell the faint waxy dust of a freshly sharpened 6B. The hand doesn't know what confidence feels like yet. But by exercise 10, something shifts: the lead glides instead of stutters, the page warms under your palm, and the line finally says what you meant it to.",
  },
  {
    phaseNum: "02",
    narrative:
      "The first time you notice your own proportion mistake before the teacher points it out — that's the real breakthrough. The graphite smells of the kneaded eraser you've been working, the paper faintly cool where your forearm rests. Suddenly you're not just drawing; you're seeing. The eye learns faster than the hand here, and the page starts to feel like a window rather than a wall.",
  },
  {
    phaseNum: "03",
    narrative:
      "Acrylic dries fast, and at first that feels like pressure — you can smell the sharp mineral tang of wet paint, hear the tap of the brush on the water jar. But you learn to trust the rhythm: layering, waiting, building. By the third piece, you stop fighting the brush and start letting it carry the colour where it wants to go, the canvas still tacky-warm under your fingertips.",
  },
  {
    phaseNum: "04",
    narrative:
      "Oil is emotional. The first time you see light move across a wet layer of paint — the linseed scent rising, the brush dragging slow and reluctant — something clicks. You slow down. You realise painting isn't about finishing; it's about staying with one thing long enough, the paint cool and slick, to make it honest.",
  },
  {
    phaseNum: "05",
    narrative:
      "No one tells you when you've found your style. It just starts showing up — in the palette you reach for without thinking, the way your signature sits in the corner. You stop copying references and start painting what only you could have seen. That's when the work becomes yours — completely, unmistakably yours, the studio quiet except for your own breathing.",
  },
];

// T1: O(1) reflection lookup by phase number, replacing the prior .find() scan
// in the curriculum phase page and CurriculumCanvas.
const reflectionByPhase = new Map<string, string>();
for (const r of curriculumCanvasReflections) {
  if (!reflectionByPhase.has(r.phaseNum)) reflectionByPhase.set(r.phaseNum, r.narrative);
}

/**
 * Get the first-person student-experience narrative for a curriculum phase.
 * O(1) Map lookup by phase number.
 */
export function getReflectionForPhase(phaseNum: string): string | undefined {
  return reflectionByPhase.get(phaseNum);
}
