import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import { curriculumPhases, getCurriculumPhase, getNextCurriculumPhase, getReflectionForPhase } from "@/data/curriculum";
import { curriculumAudio } from "@/data/curriculumAudio";
import { curriculumSlides } from "@/data/curriculumSlides";
import { curriculumReports, curriculumReportLabels } from "@/data/curriculumReports";
import { curriculumReportContent } from "@/data/curriculumReportContent";
import ReportInspect from "@/components/ReportInspect";
import { curriculumInfographics } from "@/data/curriculumInfographics";
import { curriculumVideos, YOUTUBE_CHANNEL_URL } from "@/data/curriculumVideos";
import PhaseAudioPlayer from "@/components/PhaseAudioPlayer";
import FloatingVideoShort from "@/components/FloatingVideoShort";
import ExerciseMarquee from "@/components/ExerciseMarquee";
import SlideDeckViewer from "@/components/SlideDeckViewer";

export function generateStaticParams() {
  return curriculumPhases.map((phase) => ({ num: phase.num }));
}

// Regenerate at most every 60s so curriculum content updates propagate without a full redeploy (ISR).
export const revalidate = 60;

export async function generateMetadata({ params }: { params: Promise<{ num: string }> }): Promise<Metadata> {
  const { num } = await params;
  const phase = getCurriculumPhase(num);
  if (!phase) return { title: "Phase Not Found" };
  return {
    title: `Phase ${phase.num} — ${phase.title} | Academy`,
    description: phase.description,
  };
}

const WHATSAPP_NUMBER = "917017512686";

// The report's format encodes its real reader — surface that as an explicit signpost.
const REPORT_SIGNPOST: Record<string, string> = {
  "01": "For parents",
  "02": "For students",
  "03": "For students",
  "04": "For you",
  "05": "From the journal",
};

// Each signpost maps to the salutation of the addressed letter/report frame.
const REPORT_SALUTATION: Record<string, string> = {
  "For parents": "Dear Parent",
  "For students": "Dear Student",
  "For you": "Dear Artist",
  "From the journal": "From the studio journal",
};

export default async function CurriculumPhasePage({ params }: { params: Promise<{ num: string }> }) {
  const { num } = await params;
  const phase = getCurriculumPhase(num);
  if (!phase) notFound();

    const nextPhase = getNextCurriculumPhase(num);

  const focusAreas = phase.focusAreas ?? [];
  const tools = phase.tools ?? [];
  const exercises = phase.exercisesDetail ?? [];
  const exerciseCount = phase.exercises > 0 ? phase.exercises : exercises.length;
  const exerciseCountLabel =
    phase.exercises > 0 ? `${exerciseCount} exercises` : "Personal Projects";
  const phaseAudios = curriculumAudio[phase.num] ?? {};
  const slideDeck = curriculumSlides[phase.num];
  const report = curriculumReports[phase.num];
  const reportLabel = curriculumReportLabels[phase.num];
  const reportBlocks = curriculumReportContent[phase.num];
  const infographics = curriculumInfographics[phase.num] ?? [];
  const video = curriculumVideos[phase.num];
  const reflection = getReflectionForPhase(phase.num) ?? "";
  const reportSignpost = REPORT_SIGNPOST[phase.num] ?? "Take this with you";
  const reportSalutation = REPORT_SALUTATION[reportSignpost] ?? "Dear Reader";

  const whatsappMessage = encodeURIComponent(
    `Hello, I'd like to know more about Academy Phase ${phase.num} — ${phase.title} (${phase.weeks}).`
  );
  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`;

  return (
    <main className="curriculum-phase-page">
      {/* Beat 1 — Hero (split: text + audio on the left, image on the right) */}
      <section id="overview" className="curriculum-phase-hero">
        <div className="curriculum-phase-hero__text-col">
          <Reveal>
            <p className="curriculum-phase-hero__num">PHASE {phase.num}</p>
            <h1 className="curriculum-phase-hero__title">{phase.title}</h1>
            <p className="curriculum-phase-hero__desc">{phase.description}</p>
            <ul className="curriculum-phase-hero__meta">
              <li>{phase.weeks}</li>
              <li>{exerciseCountLabel}</li>
              <li>{phase.studentExamples} examples</li>
            </ul>
            {Object.keys(phaseAudios).length > 0 && (
              <div className="curriculum-phase-hero__audio">
                <PhaseAudioPlayer audios={phaseAudios} phaseTitle={phase.title} />
              </div>
            )}
          </Reveal>
        </div>
        <div className="curriculum-phase-hero__media">
          <Image
            src={phase.image}
            alt={`${phase.title} — example student work`}
            fill
            sizes="(max-width:860px) 100vw, 50vw"
            priority
            className="curriculum-phase-hero__img"
          />
          <div className="curriculum-phase-hero__media-scrim" aria-hidden="true" />
        </div>
      </section>

      {/* Exercises marquee — right after the hero */}
      <ExerciseMarquee exercises={exercises} />

      {/* Wayfinding (in-flow, navigational only) */}
      <nav className="curriculum-wayfind" aria-label="On this page">
        <a href="#overview">Overview</a>
        <a href="#exercises">Exercises</a>
        <a href="#in-class">In class</a>
        <a href="#takeaway">Take-away</a>
        <a href="#watch">Watch</a>
        <a href="#next">Next</a>
      </nav>

      {/* Beat 2 — Reflection (emotional connective tissue) */}
      {reflection && (
        <section className="curriculum-beat">
          <Reveal>
            <figure className="curriculum-reflection">
              <blockquote className="curriculum-reflection__quote">{reflection}</blockquote>
              <figcaption className="curriculum-reflection__attr">— from the studio</figcaption>
            </figure>
          </Reveal>
        </section>
      )}

      {/* Beat 3 — The map: focus + tools */}
      <section className="curriculum-beat">
        <Reveal>
          <p className="curriculum-signpost">What this phase builds</p>
          <h2 className="curriculum-beat__heading">Focus &amp; the tools you&apos;ll meet</h2>
          <div className="curriculum-map">
            <div className="curriculum-map__block">
              <h3 className="curriculum-map__subhead">Focus areas</h3>
              <ul className="curriculum-map__focus">
                {focusAreas.map((area, i) => (
                  <li key={i} className="curriculum-map__focus-item">
                    <span className="curriculum-map__focus-index">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p>{area}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="curriculum-map__block">
              <h3 className="curriculum-map__subhead">Tools you&apos;ll meet</h3>
              <ul className="curriculum-map__tools">
                {tools.map((tool, i) => (
                  <li key={i} className="curriculum-map__tool">
                    {tool}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Beat 4 — Infographic (visual 10-second map; shareable) */}
      <section className="curriculum-beat">
        <Reveal>
          <p className="curriculum-signpost">At a glance · shareable</p>
          <h2 className="curriculum-beat__heading">Phase infographic</h2>
          <p className="curriculum-beat__intro">
            A one-page visual cheat-sheet of the tools, focus, and practice in this phase.
          </p>
          <div className="curriculum-infographic">
            {infographics.map((info, i) => (
              <figure
                key={i}
                className={`curriculum-infographic__item${
                  info.landscape ? " curriculum-infographic__item--bleed" : " curriculum-infographic__item--contained"
                }`}
              >
                <div className="curriculum-infographic__frame">
                  <img
                    className="curriculum-infographic__img"
                    src={info.src}
                    alt={info.label}
                    loading="lazy"
                  />
                </div>
                <figcaption className="curriculum-infographic__caption">{info.label}</figcaption>
                <a className="curriculum-phase-slide__download" href={info.src} download>
                  Download PNG ↓
                </a>
              </figure>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Beats 7 & 8 — In class (slide deck) + Take-away (report), shown side by side */}
      {(slideDeck || (report && reportLabel)) && (
        <section className="curriculum-beat curriculum-inclass-report">
          <Reveal>
            <div className="curriculum-inclass-report__grid">
              {slideDeck && (
                <div id="in-class" className="curriculum-inclass-report__col">
                  <p className="curriculum-signpost">For class · print</p>
                  <h2 className="curriculum-beat__heading">Slide deck</h2>
                  <p className="curriculum-beat__intro">
                    A printable exercise &amp; tool deck — handy in the studio or to email home.
                  </p>
                  <SlideDeckViewer
                    src={slideDeck}
                    title={`Phase ${phase.num} slide deck`}
                    skeletonLabel="Loading slide deck…"
                  />
                  <span className="curriculum-pdf__actions">
                    <a className="curriculum-phase-slide__download" href={slideDeck} target="_blank" rel="noopener noreferrer">
                      Open PDF ↗
                    </a>
                    <a className="curriculum-phase-slide__download curriculum-phase-slide__download--ghost" href={slideDeck} download>
                      Download PDF ↓
                    </a>
                  </span>
                </div>
              )}
              {report && reportLabel && reportBlocks && (
                <div id="takeaway" className="curriculum-inclass-report__col">
                  <p className="curriculum-signpost">{reportSignpost}</p>
                  <h2 className="curriculum-beat__heading">{reportLabel.title}</h2>
                  <p className="curriculum-beat__intro">{reportLabel.intro}</p>
                  <ReportInspect
                    blocks={reportBlocks}
                    salutation={reportSalutation}
                    voice={reportSignpost}
                    whatsappHref={whatsappHref}
                    title={reportLabel.title}
                  />
                  <span className="curriculum-pdf__actions">
                    <a className="curriculum-phase-slide__download curriculum-phase-slide__download--ghost" href={report} target="_blank" rel="noopener noreferrer">
                      Open as PDF ↗
                    </a>
                    <a className="curriculum-phase-slide__download curriculum-phase-slide__download--ghost" href={report} download>
                      Download PDF ↓
                    </a>
                  </span>
                </div>
              )}
            </div>
          </Reveal>
        </section>
      )}

      {/* Beat 10 — Where you land (outcome + next + WhatsApp) */}
      <section id="next" className="curriculum-beat">
        <Reveal>
          <p className="curriculum-signpost">Where you land</p>
          <h2 className="curriculum-beat__heading">What you walk away with</h2>
          <p className="curriculum-land__statement">{phase.outcome}</p>

          {nextPhase ? (
            <Link
              href={`/academy/curriculum/${nextPhase.num}`}
              className="curriculum-land__next"
            >
              <span className="curriculum-land__next-label">Next phase</span>
              <span className="curriculum-land__next-title">
                Phase {nextPhase.num} — {nextPhase.title}
              </span>
              <span className="curriculum-land__next-arrow" aria-hidden="true">
                →
              </span>
            </Link>
          ) : (
            <div className="curriculum-land__done">
              <p className="curriculum-land__done-eyebrow">PATH COMPLETE</p>
              <p className="curriculum-land__done-text">
                You&apos;ve completed the full 5-phase path — from first lines to a body of work
                that is unmistakably yours.
              </p>
            </div>
          )}

          <div className="curriculum-land__cta">
            <h3 className="curriculum-land__cta-title">Curious about Phase {phase.num}?</h3>
            <p className="curriculum-land__cta-text">
              Every phase is taught in person, one artwork at a time. Message us to ask about
              batches, timings, or where {phase.title.toLowerCase()} might fit in your journey.
            </p>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="curriculum-phase-slide__download curriculum-land__cta-button"
            >
              Message on WhatsApp →
            </a>
            {video && (
              <a
                id="watch"
                className="curriculum-land__watch-link"
                href={video ? `https://www.youtube.com/watch?v=${video.youtubeId}` : YOUTUBE_CHANNEL_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                Watch this phase on YouTube →
              </a>
            )}
          </div>
        </Reveal>
      </section>

      {/* Persistent footer */}
      <section className="curriculum-phase-footer">
        <Link href="/academy#curriculum" className="curriculum-phase-back__link">
          ← Back to Curriculum
        </Link>
      </section>

      {video && (
        <FloatingVideoShort
          youtubeId={video.youtubeId}
          title={video.title}
        />
      )}
    </main>
  );
}
