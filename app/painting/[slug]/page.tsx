import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllPaintingStories, getPaintingStory } from "@/data/paintingStories";
import { getExhibitionPieceByTitle } from "@/data/exhibitionImages";
import Reveal from "@/components/Reveal";
import PaintingHero from "@/components/PaintingHero";
import NarrativeModule from "@/components/NarrativeModule";
import SignatureInteraction from "@/components/SignatureInteraction";
import FloatingVideoShort from "@/components/FloatingVideoShort";
import TigerPosterSection from "@/components/TigerPosterSection";
import ElephantProcessionSection from "@/components/ElephantProcessionSection";

interface PaintingPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllPaintingStories().map(({ slug }) => ({ slug }));
}

// Regenerate at most every 60s so painting-story content updates propagate without a full redeploy (ISR).
export const revalidate = 60;

export async function generateMetadata({ params }: PaintingPageProps): Promise<Metadata> {
  const { slug } = await params;
  const story = getPaintingStory(slug);

  if (!story) {
    return {
      title: "Painting Story Not Found",
    };
  }

  return {
    title: `${story.contextualTitle} — Meenakshi Art Work`,
    description: story.openingScene.narrative,
  };
}

export default async function PaintingPage({ params }: PaintingPageProps) {
  const { slug } = await params;
  const story = getPaintingStory(slug);

  if (!story) {
    notFound();
  }

  // Find the original piece data (for the WhatsApp inquiry + context).
  // O(1) lookup via the pre-built piece-by-title index.
  const originalPiece = getExhibitionPieceByTitle(story.pieceId);

  const isCommission = story.storyContext === "commission";
  const isGallery = story.storyContext === "gallery";

  // Sort modules by their `order` field for display
  const orderedModules = [...story.modules].sort((a, b) => a.order - b.order);

  return (
    <main className={`painting-story-page painting-mood--${story.emotionalSignature} painting-story--${story.slug}`}>
      {/* Documentary Hero Section */}
      <PaintingHero
        image={story.openingScene.image}
        contextualTitle={story.contextualTitle}
        narrative={story.openingScene.narrative}
        video={story.openingScene.video}
      />

      {story.posterMoment && <TigerPosterSection data={story.posterMoment} />}

      {story.processionMoment && <ElephantProcessionSection data={story.processionMoment} />}

      {/* Context badge — gallery vs commission divergence (Phase 6) */}
      <div className="painting-context-band">
        <span className="painting-context-label">
          {isCommission
            ? "A COMMISSIONED WORK"
            : isGallery
            ? "FROM THE GALLERY COLLECTION"
            : "STUDENT WORK"}
        </span>
        <p className="painting-context-caption">
          {isCommission
            ? "Made for one person, documented as it lived."
            : isGallery
            ? "Painted in the studio — waiting to find its home."
            : "Created in the academy, part of a student's journey."}
        </p>
      </div>

      {/* Modular narrative chapters — each painting selects its own 6–10 modules (Phase 2+4) */}
      {orderedModules.map((module, index) => (
        <NarrativeModule key={`${module.type}-${index}`} module={module} />
      ))}

      {/* Signature interactive element — unique per painting (Phase 5) */}
      {story.signatureInteraction && (
        <section className="painting-section painting-signature-interaction">
          <Reveal>
            <p className="painting-eyebrow">EXPERIENCE IT</p>
            <h2 className="painting-section-heading">See it for yourself</h2>
            <SignatureInteraction interaction={story.signatureInteraction} />
          </Reveal>
        </section>
      )}

      {/* WhatsApp Inquiry */}
      <section className="painting-section painting-inquiry">
        <Reveal>
          <div className="painting-inquiry-content">
            <h2>
              {isCommission
                ? "Inspired by this story?"
                : isGallery
                ? "Interested in this painting?"
                : "Interested in this work?"}
            </h2>
            <p>
              {isCommission
                ? "Every commission begins with listening. If this story feels like the beginning of yours, message us directly."
                : "Each painting has already lived a life before it reaches a new home. If you'd like to discuss availability, dimensions, or how this piece might fit your space, message us directly."}
            </p>
            {originalPiece && (
              <a
                href={`https://wa.me/917017512686?text=${encodeURIComponent(
                  `Hello, I've been reading the story of "${story.contextualTitle}" (${originalPiece.title}). I'm interested in knowing more about availability and whether this painting might be right for my space.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="painting-whatsapp-button"
              >
                Message on WhatsApp →
              </a>
            )}
            <p className="painting-inquiry-note">
              We&apos;ll respond within 24 hours with availability, dimensions, and any questions about how this painting might work in your home.
            </p>
          </div>
        </Reveal>
      </section>

      {/* Back Navigation */}
      <section className="painting-section painting-back">
        <Reveal>
          <Link href={isCommission ? "/custom-orders" : "/gallery"} className="painting-back-link">
            ← Back to {isCommission ? "Custom Orders" : "Gallery"}
          </Link>
        </Reveal>
      </section>

      {/* Floating owner-intro short — same pattern as the curriculum phase pages */}
      {story.founderVideo && (
        <FloatingVideoShort
          youtubeId={story.founderVideo.youtubeId}
          title={story.founderVideo.title}
        />
      )}
    </main>
  );
}
