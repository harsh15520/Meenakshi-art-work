// Maps each academy phase (zero-padded num) to its report content, structured
// as blocks — the real text of the PDF in `curriculumReports`, transcribed and
// cleaned (the source PDFs render literal "**word**" markdown instead of bold;
// that syntax is preserved here on purpose so ReportContent's inline parser
// can turn it into real <strong> at render time — do not strip it).
//
// Each phase's report is a genuinely different document type (a letter, a
// study guide, a briefing doc, a journal entry), so this schema is a small
// set of reusable block shapes rather than one rigid template — not every
// phase uses every block type.

export type ReportBlock =
  | { type: "heading"; label?: string; text: string }
  | { type: "paragraph"; text: string }
  | { type: "quote"; text: string; attribution?: string }
  | { type: "callout"; label: string; text: string }
  | { type: "list"; items: string[]; ordered?: boolean }
  | { type: "groupedList"; groups: { label: string; items: string[] }[] }
  | { type: "qa"; items: { q: string; a?: string; note?: string }[] }
  | { type: "glossary"; items: { term: string; def: string }[] }
  | { type: "table"; headers: [string, string]; rows: [string, string][] }
  | { type: "image"; src: string; alt: string; caption: string };

export const curriculumReportContent: Record<string, ReportBlock[]> = {
  // ---------------------------------------------------------------- Phase 01
  "01": [
    { type: "heading", label: "1", text: "What this phase is" },
    {
      type: "paragraph",
      text:
        "Welcome to the beginning of your daughter's artistic journey. At Meenakshi Art Work, we believe that a beautiful painting is only as strong as the hand that guides the brush. During this foundational five-week period, we use graphite-on-paper to train the hand for steady, intentional movement.",
    },
    {
      type: "paragraph",
      text:
        "You may wonder why we don't start with color or canvas immediately. In our studio, we follow a strict medium progression: **Pencil → Acrylic → Canvas → Oil**. Every student must \"earn\" their way through these stages. This ensures they develop the motor skills and control required for advanced work so that when your daughter eventually reaches the canvas, she isn't fighting her tools — she is mastering them. This philosophy of the \"steady line\" is the starting point for every specific exercise she will perform.",
    },
    {
      type: "image",
      src: "/images/academy/keshav/oil-painting-83.webp",
      alt: "A graphite pencil portrait study by a Meenakshi Art Work student",
      caption: "A graphite portrait study — Keshav, Hand Control phase",
    },
    { type: "heading", label: "2", text: "What your daughter will actually do" },
    {
      type: "paragraph",
      text:
        "Your daughter will progress through a ladder of 14 specific exercises. These are grouped into five stages to build her skills logically:",
    },
    {
      type: "groupedList",
      groups: [
        {
          label: "Stage A — Grip & Pressure",
          items: [
            "**First Lines** — Using a loose wrist to create freer, more confident marks.",
            "**Tripod Grip Drill** — Mastering the traditional grip (holding the pencil like a pen) for stability in short strokes.",
            "**Overhand Grip for Shading** — Learning to hold the hand over the pencil to cover large areas of tone evenly.",
            "**Underhand Grip for Detail** — Experimenting with hand positions to learn how changing your grip changes the control you get.",
            "**Pressure Scale** — Training the hand to move from whisper-light hatching to deep, grounded shadows.",
          ],
        },
        {
          label: "Stage B — Tone Building",
          items: [
            "**Hatching Bands** — Using parallel lines to build up consistent tone systematically.",
            "**Cross-Hatching Grid** — Overlapping lines at different angles to control darkness with precision.",
          ],
        },
        {
          label: "Stage C — Observation",
          items: [
            "**Contour Drawing** — Focusing on the outlines of a subject to improve accuracy.",
            "**Blind Contour** — Drawing the subject without looking at the paper (often using a \"no-peeking\" paper plate over the hand) to sync the eye and hand.",
            "**Gesture Poses** — Capturing the \"life\" and movement of a form before worrying about detail.",
          ],
        },
        {
          label: "Stage D — Forms",
          items: [
            "**Ellipse Practice** — Mastering the circular forms that serve as the basis for most real-world objects.",
            "**Cylinder & Cube Forms** — Learning how basic 3D forms explain the structure of almost everything else.",
            "**Sphere Study** — A deep dive into understanding how light and shadow hit a curved surface.",
          ],
        },
        {
          label: "Stage E — Capstone",
          items: [
            "**Still-Life of Three Objects** — A final project where she combines all her new skills into one finished drawing.",
          ],
        },
      ],
    },
    {
      type: "paragraph",
      text: "These exercises are more than just drills; they ensure the hand follows the eye without hesitation.",
    },
    { type: "heading", label: "3", text: "How long it takes and how we judge progress" },
    {
      type: "paragraph",
      text:
        "The Hand Control phase is designed to cover 14 exercises over approximately **5 weeks**. However, our studio operates on a principle of true mastery rather than a fixed calendar.",
    },
    {
      type: "callout",
      label: "The \"No Rushing\" Rule",
      text:
        "At Meenakshi Art Work, we do not advance students just because a certain number of days have passed. A phase is repeated until it is mastered. Rushing through foundations creates \"gaps\" that appear later in a student's portfolio.",
    },
    {
      type: "paragraph",
      text:
        "Progress is judged by the **freedom of the line** and the **evenness of tone**. We look for a shift from \"hairy,\" hesitant lines to single, confident strokes. We provide one-on-one feedback to every student, comparing their work against 23 student examples that serve as our benchmark for readiness. While the student's skill is the focus, having the right physical tools makes that skill possible.",
    },
    { type: "heading", label: "4", text: "What she needs" },
    {
      type: "paragraph",
      text: "To succeed, your daughter will need high-quality materials that help her understand the range of the graphite medium.",
    },
    {
      type: "table",
      headers: ["Tool", "Purpose"],
      rows: [
        ["HB, 2B, 4B, 6B Pencils", "A range of lead softness (H is hard/light, B is soft/dark) to build tone gradually."],
        ["Kneaded Eraser", "A pliable eraser that \"lifts\" graphite without damaging the sturdy \"tooth\" (texture) of the paper."],
        ["A3 Cartridge Paper (120–160 gsm)", "Sturdy paper that can withstand repeated shading and erasing."],
        ["Pencil Sharpener & Sandpaper Block", "Used to maintain a long, tapered lead for better control and various line weights."],
        ["Blending Stumps", "Compressed paper tools used to soften tone without using oily fingers."],
      ],
    },
    {
      type: "paragraph",
      text: "Even the best tools feel strange until a student overcomes the \"beginner's awkwardness\" of the first few weeks.",
    },
    { type: "heading", label: "5", text: "What's normal in the first weeks" },
    {
      type: "paragraph",
      text:
        "It is common for students to feel a bit of physical awkwardness at first. Most children are used to moving only their wrists (the \"writing\" motion). We are retraining the body to engage the **shoulder and elbow** for long, expressive lines.",
    },
    {
      type: "paragraph",
      text:
        "Expect the first strokes to look \"tight,\" but a visible **breakthrough point** typically occurs around **Exercise 10**. You will notice a shift in confidence as the \"stuttering\" hand of Week 1 transforms into the \"gliding\" hand of Week 5. You can support this physical transformation easily at home.",
    },
    { type: "heading", label: "6", text: "How you can help at home" },
    { type: "paragraph", text: "Support at home is about encouraging the right habits rather than teaching technique." },
    {
      type: "list",
      items: [
        "**Micro-Habits over Marathons** — Encourage 5 minutes of daily \"scribbles\" or hatching practice. This is far superior to a single long session once a week.",
        "**Celebrate the Process** — We aren't looking for \"pretty pictures\" yet — we are looking for steady lines. Praise the confidence of a stroke rather than the likeness of a drawing.",
        "**The Originality Rule** — To build real skill, your daughter must draw everything by hand. Please avoid the temptation to \"help\" by drawing for her or suggesting she trace.",
      ],
    },
    {
      type: "callout",
      label: "Pro-Tip",
      text: "Keep every page she completes in a folder. Comparing a Week 1 exercise to a Week 5 drawing provides a massive boost to a student's confidence.",
    },
    { type: "heading", label: "7", text: "What she can do at the end" },
    {
      type: "paragraph",
      text:
        "Upon completion of Phase 1, your daughter will be able to **draw any form from observation with a steady, intentional line; the hand no longer fights the pencil.** This milestone secures her foundation for the more complex lessons ahead.",
    },
    { type: "heading", label: "8", text: "Asking about batches and fees" },
    {
      type: "paragraph",
      text: "Meenakshi Art Work is a women-only studio. We provide a focused, safe, and professional environment for girls (aged 6+) and women to learn without distraction.",
    },
    {
      type: "list",
      items: [
        "**Class Times** — 4:30 PM – 5:30 PM.",
        "**Originality Rule** — We maintain a strict policy of \"No Tracing\" and \"No Teacher Finishing.\" Your daughter's work will be 100% her own.",
        "**Logistics** — For specific information regarding current batch availability and fee structures, please contact us directly.",
      ],
    },
  ],

  // ---------------------------------------------------------------- Phase 02
  "02": [
    {
      type: "paragraph",
      text:
        "This guide serves as a comprehensive resource for students and parents navigating the **Phase 2 — Proportions** module at Meenakshi Art Work academy. This six-week observation, balance, and composition module contains 18 core exercises designed to transition the student from simply drawing lines to truly seeing relationships. By the end of this phase, students will have the ability to place any subject accurately on the page and arrange it for visual balance before a single detail is added.",
    },
    { type: "heading", label: "A", text: "Key concepts" },
    {
      type: "paragraph",
      text:
        "In the studio, we transition from the tight, hesitant strokes of beginners to the intentional, observant eye of the artist. This starts with understanding **sight-size and comparative measurement**. While sight-size allows for a direct 1:1 scale transfer, comparative measurement empowers the student to scale any subject using a \"thumb-on-pencil\" unit to keep relationships honest. Before detailing, we establish **the envelope**, a simplified multi-sided polygon that captures the height-to-width ratio of the whole subject. We then use the **block-in** method, breaking form into straight-line geometric structures to ensure the structural skeleton is accurate.",
    },
    {
      type: "paragraph",
      text:
        "To achieve objective accuracy, we often look at **negative space** — the abstract shapes of empty space around a subject — which bypasses our mental preconceptions of what an object \"should\" look like. We rely on **plumb lines** to maintain vertical alignment and **angle checking** to transfer specific tilts to the page without guesswork. Compositional integrity is managed through the **rule of thirds**, dividing the canvas into a 3×3 grid to place focal points for dynamic balance, and **value thumbnails**, which are small sketches used to plan light and shadow masses. As the work moves into three dimensions, we introduce **one-point and two-point perspective**, **eye-level** shifts, and **foreshortening** to handle compressed lengths. Finally, we consider **visual weight** to ensure the page feels balanced, using **cropping and framing** to choose the specific \"window\" that best tells the story of the artwork.",
    },
    {
      type: "image",
      src: "/images/academy/aarna/oil-painting-32.webp",
      alt: "A pencil portrait study by a Meenakshi Art Work student",
      caption: "A pencil portrait built on measured proportion — Aarna, Proportions phase",
    },
    { type: "heading", label: "B", text: "Short-answer quiz" },
    {
      type: "qa",
      items: [
        { q: "Why does measuring with your pencil beat guesswork?", a: "Comparison keeps relationships completely honest by scaling units rather than guessing." },
        { q: "What does drawing the negative space reveal?", a: "It reveals the true, objective shape of the subject by focusing on the abstract shapes of empty space around it." },
        { q: "What does a plumb line keep aligned?", a: "It keeps features aligned on a true vertical axis to prevent structural drifting." },
        { q: "Why is \"the envelope\" drawn before individual parts of a subject?", a: "It captures the absolute height-to-width ratio and gesture of the overall composition before the student ever details individual parts." },
        { q: "What is the primary purpose of a value thumbnail?", a: "It allows the artist to quickly map out the light and shadow masses to ensure the composition has strong visual impact." },
        { q: "How does angle checking improve the description of a form?", a: "It allows the artist to transfer a specific tilt directly to the page to describe form with sharp, accurate lines rather than guesswork." },
        { q: "What does the rule of thirds provide for a composition?", a: "It creates a natural sense of dynamic balance, visual weight, and \"breathing room\" rather than centering everything statically." },
        { q: "Why does the studio use a \"block-in\" stage with straight lines?", a: "This phase establishes large structural masses and proportional boundaries while avoiding rounded curves and surface details." },
        { q: "What does foreshortening do to the apparent length of an object?", a: "Foreshortening visually compresses the apparent length of a form when it is angled toward the viewer." },
        { q: "What is the difference between sight-size and comparative measurement?", a: "Sight-size involves a direct 1-to-1 scale transfer, while comparative measurement allows the artist to draw at any scaled size." },
        { q: "How do framing L's assist the student before they begin to draw?", a: "They help the student find the correct crop and composition before committing pencil to the page." },
        { q: "Why are hands and feet \"constructed\" rather than traced in this phase?", a: "This ensures the student understands the underlying bone and muscle structure so the work is entirely their own." },
      ],
    },
    { type: "heading", label: "C", text: "Essay questions" },
    {
      type: "qa",
      items: [
        { q: "Why measure before you draw?", note: "A good answer covers: comparison > guesswork, establishing the envelope before individual parts, and valuing proportional relationships over immediate details." },
        { q: "How does value lead composition?", note: "A good answer covers: planning values using thumbnails before drawing, and arranging elements off-centre via the rule of thirds for balance." },
        { q: "Why does the studio forbid tracing?", note: "A good answer covers: ensuring every portfolio piece is entirely the student's own, and prioritizing observational skills before pure mechanical accuracy." },
        { q: "What does 'the page becomes a window, not a wall' mean after this phase?", note: "A good answer covers: how the eye learns to see, and how the student begins to notice proportion mistakes independently before the teacher points them out." },
      ],
    },
    { type: "heading", label: "D", text: "Glossary" },
    {
      type: "glossary",
      items: [
        { term: "Sight-size", def: "A method where the subject and drawing appear identical in size for direct 1-to-1 scale comparison." },
        { term: "Comparative measurement", def: "A technique using a tool at arm's length to scale units and keep proportional relationships honest." },
        { term: "Thumb-on-pencil", def: "The physical act of using the thumb to mark a unit of distance on a pencil for comparative scaling." },
        { term: "Envelope", def: "A simplified multi-sided polygon that encapsulates the entire outer boundary and gesture of a subject." },
        { term: "Negative space", def: "The abstract shapes of empty space that surround, pierce, or sit between the positive forms of a subject." },
        { term: "Plumb line", def: "A physical or virtual vertical axis used to identify vertical alignments and prevent structural drifting." },
        { term: "Angle checking", def: "Using a pencil as a straight edge to align with a subject's boundary and transfer that tilt to the page." },
        { term: "Rule of thirds", def: "A compositional guideline dividing the canvas into a 3×3 grid to place focal points for dynamic balance." },
        { term: "Value thumbnail", def: "A small, simplified sketch limited to a few flat tones used to map out light and shadow masses." },
        { term: "Eye level", def: "The horizontal line representing the artist's viewpoint which determines the perspective of all elements." },
        { term: "Vanishing point", def: "The point on the eye level where parallel lines appear to converge in linear perspective." },
        { term: "One-point perspective", def: "A perspective system where all parallel lines lead to a single vanishing point on the horizon." },
        { term: "Two-point perspective", def: "A perspective system using two vanishing points to describe three-dimensional objects viewed at an angle." },
        { term: "Block-in", def: "Establishing large structural masses and proportional boundaries using straight-line geometric structures." },
        { term: "Foreshortening", def: "The visual compression of an object's length when it is angled directly toward the viewer." },
        { term: "Visual weight", def: "The felt sense of balance in a composition created by the specific arrangement of elements." },
        { term: "Crop", def: "The specific \"window\" or boundary chosen for the composition to determine the focus and story of the work." },
        { term: "Toned ground", def: "A mid-tone paper surface that eliminates the white of the page and speeds up the building of values." },
        { term: "White charcoal", def: "A medium used on toned paper to strictly recover highlights and build volumetric 3D form." },
      ],
    },
    { type: "heading", label: "E", text: "How mastery is judged" },
    {
      type: "paragraph",
      text:
        "At Meenakshi Art Work, progress is dictated by skill, not the calendar. Our \"no rushing\" rule ensures that a phase is repeated until it is fully mastered. In Phase 2, advancement is granted when a student's work consistently shows the ability to place any form accurately and arrange it for visual balance before adding surface detail.",
    },
    {
      type: "quote",
      text: "The first time you notice your own proportion mistake before the teacher points it out — that's the real breakthrough. Suddenly you're not just drawing; you're seeing.",
      attribution: "Meenakshi",
    },
    {
      type: "paragraph",
      text:
        "This signifies that the eye has learned faster than the hand, and at this point, \"the page starts to feel like a window rather than a wall.\" Readiness for Phase 3 (Acrylic Techniques) is determined by this newfound reliability in observation and the ability to block in a still-life or portrait correctly on the first pass.",
    },
    {
      type: "table",
      headers: ["Phase 2 statistics", "Detail"],
      rows: [
        ["Duration", "6 Weeks"],
        ["Exercise Count", "18 Exercises"],
        ["Student Examples", "31 Portfolios"],
        ["Primary Goal", "Observation, balance, and composition"],
        ["Studio Rule", "No rushing; repeat until mastered"],
      ],
    },
    {
      type: "callout",
      label: "Note",
      text:
        "For information regarding current batch timings or to request fee details, please contact the studio via WhatsApp. Fees and schedules are never listed in public handouts to ensure all families receive the most up-to-date information for their specific requirements.",
    },
  ],

  // ---------------------------------------------------------------- Phase 03
  "03": [
    {
      type: "paragraph",
      text:
        "This Study Guide is designed for students and parents of the Meenakshi Art Work academy to navigate the Phase 3 module. This seven-week stage focuses on transitioning from graphite to colour, mastering the fast-drying nature of acrylics, and developing professional brush and layering techniques through 24 structured exercises and the analysis of 42 student examples.",
    },
    { type: "heading", label: "A", text: "Key concepts" },
    {
      type: "paragraph",
      text:
        "In Phase 3, students move from the grey tones of pencil into the vibrant, fast-paced world of acrylics. We begin with a **limited palette** — using only a split-primary system and a few neutrals — to enforce **colour mixing discipline**. Our core mantra is **value-before-hue**: because value (lightness or darkness) reads before colour does, a painting with a solid value scaffold will always look more realistic than one with correct colours but broken light structures. We use **monochrome underpaintings** in burnt umber or Payne's grey to map these values before applying local colour. To manage the medium's speed, we use a **stay-wet setup**, a hydration system that keeps paint workable for hours.",
    },
    {
      type: "paragraph",
      text:
        "Students learn to use the **four brush voices**: the **flat brush** for structural bands, the **round brush** for controlled detail, the **filbert** for organic blending, and the **fan brush** for suggesting textures like grass or clouds. Application styles vary from **wet-on-wet** for fast gradients to **wet-on-dry** for crisp, layered shapes. We add atmospheric effects through **scumbling** (dragging light paint over dark) and **glazing** (pooling transparent dark paint over light). For physical texture, the **palette knife** allows for **impasto** marks and clean mixing, while **colour blocking** helps students establish large masses before focusing on fine details. Finally, **colour temperature** is introduced as the primary tool for creating the sensation of natural daylight through shifting warm and cool tones.",
    },
    {
      type: "image",
      src: "/images/academy/shreya/oil-painting-117.webp",
      alt: "An acrylic painting by a Meenakshi Art Work student",
      caption: "Colour, value, and brushwork in acrylic — Shreya, Acrylic Techniques phase",
    },
    { type: "heading", label: "B", text: "Short-answer quiz" },
    {
      type: "qa",
      items: [
        { q: "Why start every colour from three primaries?", a: "Mixing from three primaries builds colour discipline and harmony, ensuring every shade remains clean and unified." },
        { q: "What does a glaze do?", a: "A transparent glaze tunes colour optically while staying luminous, letting the underpainting shine through like a stained glass window." },
        { q: "Why must acrylics blend fast?", a: "Acrylics dry fast, so you must commit quickly and paint with a relaxed, fast wrist." },
        { q: "What does scumble add?", a: "A scumble adds soft, airy atmosphere without turning muddy by catching on the high ridges of dry paint." },
        { q: "Why use a limited palette for portraits?", a: "Restricting the palette to specific primaries forces colour harmony and prevents the \"colour chaos\" that comes from using too many unmixed pigments." },
        { q: "What does a monochrome underpainting provide?", a: "It acts as a foolproof value scaffold that establishes all light and shadow patterns before any local colour is introduced." },
        { q: "Why use a stay-wet palette setup?", a: "This setup continuously hydrates the paint from beneath, keeping fast-drying acrylics workable for hours or even days." },
        { q: "What does the filbert brush achieve?", a: "Its curved bristle tips blend paint edges gently, making it the perfect tool for organic forms and seamless transitions." },
        { q: "Why perform a temperature shift in a study?", a: "Shifting temperature models three-dimensional form by creating the sensation of natural daylight through warm highlights and cool shadows." },
        { q: "What does dry-brushing describe?", a: "Dragging concentrated paint over dry canvas creates a scratchy mark ideal for describing textures like wood grain, stone, or fur." },
        { q: "Why is colour blocking an early step?", a: "Blocking allows the student to establish big masses of colour and value before moving into the complexity of smaller details." },
        { q: "What does the palette knife prevent?", a: "Using a palette knife to mix colour prevents the \"mud\" that occurs when dirty brushes mix paint together." },
      ],
    },
    { type: "heading", label: "C", text: "Essay questions" },
    {
      type: "qa",
      items: [
        { q: "Why build value before colour?", note: "A good answer covers: value reads before colour does, and establishing a monochrome underpainting or value plan saves you from colour chaos." },
        { q: "How does brush choice change the mark?", note: "A good answer covers: the flat brush for even fields, the round as an all-rounder detail tool, the filbert for soft organic edges, and the fan brush to suggest natural textures." },
        { q: "Wet-on-wet vs wet-on-dry — when to use each?", note: "A good answer covers: using wet-on-wet to blend gradients quickly before drying, and using wet-on-dry to build clean layers, glazes, or crisp shapes." },
        { q: "Why does the studio keep a stay-wet palette?", note: "A good answer covers: keeping fast-drying acrylics workable for hours, avoiding paint waste, and allowing a deliberate rhythm of layering and waiting." },
      ],
    },
    { type: "heading", label: "D", text: "Glossary" },
    {
      type: "glossary",
      items: [
        { term: "Primary", def: "The three foundational colours (red, blue, yellow) from which all other colours are derived." },
        { term: "Secondary", def: "A colour made by mixing two primary colours." },
        { term: "Tint", def: "A lighter version of a colour created by adding titanium white." },
        { term: "Shade", def: "A darker version of a colour created by adding black or a dark neutral like Payne's grey." },
        { term: "Value scale", def: "A systematic range of tones from light to dark used to establish structure in a painting." },
        { term: "Limited palette", def: "A restricted selection of colours used to ensure harmony and force mixing discipline." },
        { term: "Colour temperature", def: "The relative warmth or coolness of a colour used to model light and volume." },
        { term: "Flat brush", def: "A rectangular brush used for broad fields of colour and sharp, structural bands." },
        { term: "Round brush", def: "A pointed brush that serves as an all-rounder for transitions and controlled detail." },
        { term: "Filbert brush", def: "An oval-shaped brush designed for soft organic edges and gentle blending." },
        { term: "Fan brush", def: "A spread-out brush used to feather edges or suggest textures like grass and foliage." },
        { term: "Dry-brush", def: "A technique using minimal, concentrated paint to create scratchy, textured marks." },
        { term: "Scumble", def: "A thin layer of light, opaque paint applied over a dark ground to add atmosphere." },
        { term: "Glaze", def: "A thin, transparent layer of dark paint applied over a light ground to tune colour optically." },
        { term: "Wet-on-wet", def: "Blending wet paint directly into wet paint on the canvas for fast gradients." },
        { term: "Wet-on-dry", def: "Applying fresh paint over a completely dry layer to keep shapes and edges crisp." },
        { term: "Palette knife", def: "A flexible tool used for clean colour mixing or applying thick paint." },
        { term: "Impasto", def: "A style of painting where paint is applied thickly enough to retain three-dimensional texture." },
        { term: "Colour blocking", def: "The process of laying down large, simplified masses of colour before adding detail." },
        { term: "Monochrome underpainting", def: "A single-colour tonal map used as a value scaffold for the entire painting." },
        { term: "Stay-wet palette", def: "A hydration system using a damp base and permeable membrane to keep acrylics wet." },
      ],
    },
    { type: "heading", label: "E", text: "How mastery is judged" },
    {
      type: "paragraph",
      text:
        "At Meenakshi Art Work, progress is not determined by a calendar but by demonstrated skill. Following the studio's third rule — **No Rushing** — a phase repeats until it is mastered. In Phase 3, mastery is shown by the student's ability to mix any colour seen in a reference, build a painting in confident, logical layers, and use various brushes to accurately describe texture, edge, and light.",
    },
    {
      type: "paragraph",
      text:
        "Students often begin the phase feeling that the fast-drying nature of the paint is a source of stress. However, as mastery develops, they undergo a specific acrylic reflection: \"fast-drying paint first feels like pressure, then becomes a rhythm of layering and waiting.\" True progress is identified when a student stops fighting the brush and instead lets it carry the colour where it wants to go. Success is reached when the student no longer fears the speed of the medium but uses it to commit to bold, intentional marks on the canvas.",
    },
  ],

  // ---------------------------------------------------------------- Phase 04
  // No inline image here on purpose: the only real oil-on-canvas student
  // photo in data/artists.ts (Veenu's "Portrait Commission") is already this
  // phase's hero image — repeating the same photo inline would read as a
  // mistake, not a choice. Add one once a second oil piece is photographed.
  "04": [
    { type: "heading", text: "One-line summary" },
    {
      type: "paragraph",
      text: "Taking a painting from a blank canvas to a resolved, lit, atmospheric image using the slow, honest language of oil.",
    },
    { type: "heading", text: "Who should step into oil" },
    {
      type: "paragraph",
      text:
        "Stepping into the medium of oil is a significant milestone at Meenakshi Art Work academy, reserved for those who have demonstrated disciplined progression through the foundational stages of the curriculum. The academy adheres to a strict artistic ladder: **Pencil → Acrylic → Canvas → Oil**.",
    },
    {
      type: "paragraph",
      text:
        "This progression is essential because oil painting requires a level of control and an understanding of colour that must be earned in previous phases. Skipping these preparatory steps invariably shows in the final work, leading to technical struggles that the slow-drying nature of oil will only exacerbate. Only students who have achieved mastery over form and value in Phase 1 and 2, and colour mixing in Phase 3, are ready to handle the complexities of the oil medium.",
    },
    { type: "heading", text: "Key insights" },
    {
      type: "list",
      items: [
        "**The Chemistry of Curing and Layering** — Oil paint does not dry by evaporation like acrylics; it cures through a slow chemical process of polymerisation and oxidation. Following the \"fat-over-lean\" rule is vital for the painting's structural integrity: lower layers must be \"lean\" (thinned with solvent), while upper layers must be \"fatter\" (containing more oil) to remain flexible and prevent cracking, wrinkling, or delamination as the film contracts over time.",
        "**Atmospheric Edge Control** — An edge is created wherever one brushstroke or shape meets another. Mastery of this phase involves distinguishing between hard edges, which visually advance and attract attention to focal points, and soft or lost edges, which recede and dissolve boundaries into background values. Utilizing lost-and-found edges prevents the flat, cartoonish \"cutout\" look and creates a sense of atmospheric focus and mystery.",
        "**Volume and Colour Temperature** — Modeling 3D volume on a flat canvas is achieved by shifting colour temperature rather than just adding black or white. By utilizing warm lights and cool shadows (or vice versa), students create the sensation of natural daylight. Shadows must never be rendered as flat black; they must remain luminous and reflect the presence of secondary reflected ambient light from the surroundings.",
        "**From Concept to Complete Canvas** — The workflow in Phase 4 is systematic and deliberate. It begins with a warm wash (imprimatura) and a linear block-in of shapes, followed by establishing solid values. Forms are then refined using colour strings before finishing the piece with advanced techniques such as scumbling (light over dark for an airy effect) and glazing (dark over light for intensity), concluding with a protective varnish pass.",
        "**Safe Studio Setup & Tool Care** — Due to the chemistry of the medium, safety is paramount. Linseed oil-soaked rags must never be left crumpled in a pile because they can undergo exothermic spontaneous combustion; they must be air-dried flat or submerged in water. Proper ventilation is required even with odorless mineral spirits, as they still release volatile organic compounds. Brushes are cleaned with cool water and lipid-rich soap, then dried flat to prevent ferrule rot and shedding.",
      ],
    },
    { type: "heading", text: "Voices" },
    {
      type: "quote",
      attribution: "Phase 4 Student Reflection",
      text:
        "Oil is emotional. The first time you see light move across a wet layer of paint — the linseed scent rising, the brush dragging slow and reluctant — something clicks. You slow down. You realise painting isn't about finishing; it's about staying with one thing long enough to make it honest.",
    },
    {
      type: "quote",
      attribution: "Studio Note on Mastery",
      text:
        "Advancement happens purely when a student's work displays a resolved, lit, and atmospheric image built in the correct fat-over-lean sequence with intentional edges, never by the calendar.",
    },
    { type: "heading", text: "Readiness gate" },
    {
      type: "paragraph",
      text:
        "The academy operates under a firm \"no rushing\" rule. Phase 4 consists of 8 weeks and 28 specific exercises, but these numbers are guidelines for the curriculum's depth rather than a guaranteed timeline for completion. A phase repeats until the techniques are mastered.",
    },
    {
      type: "paragraph",
      text:
        "A student only moves forward when their portfolio displays a consistent ability to create a resolved, atmospheric image using correct chemical layering and edge control.",
    },
    { type: "heading", text: "Practical next step" },
    {
      type: "list",
      items: [
        "**Batch Times** — Classes are held from 4:30 PM to 5:30 PM.",
        "**Environment** — We provide a dedicated women-only environment for girls aged 6+ and women of any age.",
        "**Authenticity Rule** — To ensure genuine skill development, every piece must be the student's own work. We maintain a strict policy of no tracing and no teacher finishing.",
        "**Inquiries** — Please direct all inquiries regarding specific batch windows and fees to the studio WhatsApp.",
      ],
    },
  ],

  // ---------------------------------------------------------------- Phase 05
  "05": [
    {
      type: "quote",
      text: "No one tells you when you've found your style. It just starts showing up — in the palette you reach for without thinking, the way your signature sits in the corner...",
    },
    {
      type: "paragraph",
      text:
        "There is a distinct shift in the air at the Meenakshi Art Work studio when a student enters Phase 5. The earlier chapters of the learning journey are often defined by the \"noise\" of technical acquisition: the scratching of pencils during Phase 1's hand control exercises, the constant measuring of Phase 2's proportions, and the focused intensity of mastering acrylic and oil mediums in Phases 3 and 4.",
    },
    {
      type: "paragraph",
      text:
        "Phase 5 is different. It is a quieter, more inward-looking chapter. This is the threshold where a student stops looking primarily at external references and begins to paint from a unique, internal perspective. It is the moment the **Developing Artist** ascends the final rung of our Artist Ladder to become a **Portfolio Artist**. However, this transition from technical skill to a distinct visual voice is not left to chance; it is achieved through an intentional structure designed to bridge the gap between \"knowing how to paint\" and \"having something to say.\"",
    },
    { type: "heading", text: "The turning point: from technical foundation to visual identity" },
    {
      type: "paragraph",
      text:
        "The transition to Phase 5 represents a fundamental shift in the artist's psychology. While the first four phases focus on the external — mastering the physics of light, form, and medium — Phase 5 focuses on the internal identity. We facilitate this growth through three core components that ensure **Visual Cohesion**:",
    },
    {
      type: "list",
      items: [
        "**Choosing Your Subject (Appetite)** — Students move beyond \"what is assigned\" to \"what I love.\" By identifying their own artistic appetite, they find the motifs that sustain their interest for long-term exploration.",
        "**Your Palette Statement (Identity)** — Just as a writer develops a specific vocabulary, an artist must cultivate a signature palette. Students learn how a curated set of colours becomes a personal brand, ensuring that their body of work feels unified rather than accidental.",
        "**The Repetitive Series (Intuition)** — By moving from \"Series Planning\" to \"Variation Studies,\" students uncover their own mark-making habits. Through repetition, the hand moves past conscious effort into the realm of intuition, allowing the \"handwriting\" of the artist to emerge.",
      ],
    },
    {
      type: "image",
      src: "/images/academy/aarna/oil-painting-154.webp",
      alt: "A personal, signature-style acrylic painting by a Meenakshi Art Work student",
      caption: "A personal subject, painted in a developing signature style — Aarna",
    },
    { type: "heading", text: "The evolution of the artist" },
    {
      type: "table",
      headers: ["The Foundation Phases (1–4)", "The Signature Phase (5)"],
      rows: [
        ["**Rank:** Foundation to Developing Artist", "**Rank:** Portfolio Artist"],
        ["**Focus:** Copying for Skill", "**Focus:** Creating for Expression"],
        ["**Success:** Technical accuracy and mastery", "**Success:** Consistency of voice and personal vision"],
        ["**Method:** Structured medium-specific exercises", "**Method:** 8 Project Modules and Variation Studies"],
        ["**Goal:** Technical Versatility", "**Goal:** Visual Cohesion"],
      ],
    },
    {
      type: "paragraph",
      text: "These internal shifts are supported by eight specific, guided project modules that provide the necessary scaffolding for high-level creative work.",
    },
    { type: "heading", text: "The architecture of the portfolio: 8 project modules" },
    {
      type: "paragraph",
      text:
        "In Phase 5, the curriculum moves away from a fixed count of small exercises to a deep-dive structure. We group these eight modules into three categorical buckets to help the student navigate the complexities of professional-level production.",
    },
    {
      type: "groupedList",
      groups: [
        {
          label: "1 — The Motif",
          items: [
            "**The Motif** — Selecting the recurring theme that the artist will explore.",
            "**Portfolio Sequencing** — Learning how to arrange works so they tell a story, moving from the initial concept to the final, polished execution.",
          ],
        },
        {
          label: "2 — The Master Copy",
          items: [
            "**The Master Copy Module** — Through deduction and analysis, the student studies the materials and bold paint handling of history's greats. By deconstructing how a master solved a specific problem — whether it be a complex shadow or a vibrant sky — the student builds the versatility required to solve those same problems in their own original work. This is not plagiarism; it is using a master's influence as a silent teacher.",
          ],
        },
        {
          label: "3 — The Series",
          items: [
            "**The Series** — Producing a collection of interrelated pieces.",
            "**Variation Study** — Experimenting with light, composition, and colour shifts within the series.",
            "**Palette Statement** — Finalising the unique colour language of the portfolio.",
            "**Documentation** — The discipline of photographing work from day one, often resulting in **12 framed exhibition pieces** or **25 board-exam quality sheets**.",
            "**Support & Framing** — Learning how the final presentation — the choice of support and the style of the frame — completes the artistic statement.",
          ],
        },
      ],
    },
    { type: "heading", text: "The parent's perspective: \"quiet confidence\" and self-possession" },
    {
      type: "paragraph",
      text:
        "For a parent, the outcome of this 10+ week phase is a profound sense of \"quiet confidence\" in their child. The student no longer looks to the teacher to ask, \"Is this right?\" Instead, they possess the authority to state, \"This is mine.\" This self-possession is protected by our three foundational studio rules:",
    },
    {
      type: "list",
      ordered: true,
      items: [
        "**No Tracing** — Every line is seen, understood, and drawn by the student.",
        "**No Teacher Finishing** — A teacher will never \"touch up\" a piece to make a portfolio look better. The success of the work is 100% the student's own.",
        "**No Rushing** — Artistry cannot be forced or hurried. We believe that a piece is finished only when it is mastered, not when a clock says so.",
      ],
    },
    {
      type: "paragraph",
      text: "By strictly adhering to these rules, we ensure that the resulting confidence is not a facade, but a resilient trait built through genuine perseverance.",
    },
    {
      type: "callout",
      label: "Note to Parents",
      text:
        "Phase 5 is entirely self-paced and typically lasts 10+ weeks. This open-ended timeframe is a deliberate feature of our Lead Architect's curriculum. By refusing to rush, we give the student the luxury of depth, allowing them to linger on the pieces they love until their true visual language is found.",
    },
    { type: "heading", text: "Leaving the studio with a visual language" },
    {
      type: "paragraph",
      text:
        "The ultimate goal of Phase 5 is for the student to leave the studio with more than just a collection of paintings. They leave with a \"visual language\" — the ability to communicate their internal world to the external one through the power of paint. They transition from an apprentice to a **Portfolio Artist**, equipped with the discipline to continue their artistic practice independently for the rest of their lives.",
    },
    {
      type: "paragraph",
      text: "We invite you to visit our centre and witness this transformation in person.",
    },
    {
      type: "list",
      items: ["**Batch Timings** — 4:30–5:30 PM.", "**Audience** — Women-only studio; girls aged 6+ and women of any age."],
    },
  ],
};
