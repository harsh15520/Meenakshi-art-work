"use client";
import { useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";
import Image from "next/image";
import { curriculumCanvasReflections } from "@/data/curriculum";

const STAGES = [
  { src: "/images/academy/aarna/behind-the-canvas/japanese-tree/sketch-layout.webp", alt: "Pencil sketch layout of a cherry blossom tree painting on an easel" },
  { src: "/images/academy/aarna/behind-the-canvas/japanese-tree/color-blocking.webp", alt: "Color blocking stage of the same cherry blossom tree painting" },
  { src: "/images/academy/aarna/behind-the-canvas/japanese-tree/layering-and-detailing.webp", alt: "Layering and detailing stage of the same cherry blossom tree painting" },
  { src: "/images/academy/aarna/behind-the-canvas/japanese-tree/final-artwork.webp", alt: "The finished cherry blossom tree painting" },
];

/* Each painting stage owns a scroll window. All four layers stay mounted and
   cross-fade continuously: a layer ramps in over the first part of its window,
   holds, then ramps out over the last part. The windows OVERLAP their
   neighbours so the sketch → colour → detail → final blend never shows a blank
   gap or a hard pop. Stage 0 (the pencil sketch) is the permanent base layer —
   it stays fully visible underneath and the coloured stages paint over it. */
const STAGE_RANGES: Array<[number, number]> = [
  [0.0, 1.0],
  [0.18, 0.68],
  [0.42, 0.9],
  [0.68, 1.0],
];
const STAGE_HOLD = 0.12;

/* Scroll ranges for the 5 narrative reflections (one per curriculum phase).
   These are independent of the 4 painting stages above. */
const NARRATIVE_RANGES: Array<[number, number]> = [
  [0.0, 0.18],
  [0.18, 0.36],
  [0.36, 0.55],
  [0.55, 0.75],
  [0.75, 1.0],
];

/* Continuous opacity ramp for a stage over its [start, end] scroll window:
   0 → 1 (fade in) → 1 (hold) → 0 (fade out). Pure function of scroll progress,
   recomputed every frame from `activeProgress` (the same value that drives the
   narrative highlight) so the images track the scroll reliably. */
function stageOpacityAt(progress: number, [start, end]: [number, number]): number {
  if (progress <= start || progress >= end) return 0;
  const fadeInEnd = start + STAGE_HOLD;
  const fadeOutStart = end - STAGE_HOLD;
  if (progress < fadeInEnd) return (progress - start) / (fadeInEnd - start);
  if (progress > fadeOutStart) return (end - progress) / (end - fadeOutStart);
  return 1;
}

export default function CurriculumCanvas() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const [activeProgress, setActiveProgress] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setActiveProgress(latest);
  });

  // Stage 0 (pencil sketch) is the permanent base layer — always fully visible.
  // Stages 1-3 cross-fade in/out as `activeProgress` moves through their windows.
  const stageOpacities = [
    1,
    stageOpacityAt(activeProgress, STAGE_RANGES[1]),
    stageOpacityAt(activeProgress, STAGE_RANGES[2]),
    stageOpacityAt(activeProgress, STAGE_RANGES[3]),
  ];

  return (
    <section id="curriculum" className="curriculum-canvas section-wrap" ref={ref}>
      <div className="section-heading">
        <div>
          <p className="eyebrow">THE STUDENT EXPERIENCE</p>
          <h2>What it feels like to<br/><em>learn here.</em></h2>
        </div>
        <p>The phases are one thing. The experience of moving through them — that&apos;s another. Read what each stage actually feels like, while one real student painting comes together as you scroll.</p>
        <p className="curriculum-canvas__slow-note" role="note">
          <span className="curriculum-canvas__slow-dot" aria-hidden="true" />
          Scroll slowly — the sketch fills with colour as you go. Don&apos;t rush past it.
        </p>
      </div>

      <div className="curriculum-canvas__body">
        <div className="curriculum-canvas__visual">
          <div className="curriculum-canvas__frame">
            {STAGES.map((stage, i) => (
              <div
                key={stage.src}
                className="curriculum-canvas__layer-wrap"
                style={
                  i === 0
                    ? { zIndex: 1 }
                    : { opacity: stageOpacities[i], zIndex: i + 1 }
                }
              >
                <Image
                  src={stage.src}
                  alt={stage.alt}
                  fill
                  sizes="(min-width: 980px) 40vw, 100vw"
                  className="curriculum-canvas__layer"
                  priority={i === 0}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="curriculum-canvas__phases">
          <div className="canvas-narratives">
            {curriculumCanvasReflections.map((reflection, idx) => {
              const [start, end] = NARRATIVE_RANGES[idx];
              const isActive = activeProgress >= start && activeProgress <= end;
              return (
                <div
                  key={reflection.phaseNum}
                  className={`canvas-narrative${isActive ? " canvas-narrative--active" : ""}`}
                >
                  <span className="canvas-narrative__num">PHASE {reflection.phaseNum}</span>
                  <p className="canvas-narrative__text">{reflection.narrative}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
