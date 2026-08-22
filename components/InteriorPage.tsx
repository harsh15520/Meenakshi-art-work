import Image from "next/image";
import Link from "next/link";
import OpposingMarquee from "./OpposingMarquee";
import InquiryLink from "./InquiryLink";
import Reveal from "./Reveal";
import RotatingAchievementBadge from "./RotatingAchievementBadge";
import type { AchievementBadge } from "@/data/academyToday";
import type { CarouselImage } from "@/data/categoryImages";
import { HERO_BLUR } from "@/lib/image-optimization";

type Props = {
  eyebrow: string;
  title: string;
  italic: string;
  intro: string;
  message: string;
image: string;
  items?: { title: string; text: string }[];
  carouselImages?: CarouselImage[];
  marqueeEyebrow?: string;
  marqueeTitle?: string;
  marqueeCaption?: string;
  /** Optional WhatsApp CTA ghost card appended to the marquee bottom row */
  marqueeCta?: { label: string; message: string };
  heroNote?: { href: string; label: string; text: string };
  /** Optional floating achievement badge(s) rendered over the bottom-left of the hero image.
   *  Pass an array to make it rotate through pre-written student achievements. */
  achievementBadges?: AchievementBadge[];
  /** Optional extra nodes rendered inside the hero actions row */
  heroActionsExtra?: React.ReactNode;
  /** When true, hides the default "Ask on WhatsApp" hero button (e.g. when the
   *  hero should only show the curriculum CTA + an audio player). */
  hideHeroWhatsApp?: boolean;
  /** When true, adds a "View Curriculum →" anchor link beside the WhatsApp CTA */
  curriculumCta?: boolean;
  /** Optional node rendered directly after the hero, before the marquee scrolls */
  beforeMarquee?: React.ReactNode;
  /** Optional node rendered inside the marquee header area, above the scroll */
  marqueeAudioExtra?: React.ReactNode;
/** When true, suppresses the "What to Expect" (interior-list) section for this page */
  hideWhatToExpect?: boolean;
  /** Optional emotional closing headline shown in the final CTA (replaces the default) */
  customClosing?: string;
  children?: React.ReactNode;
};

export default function InteriorPage({
  eyebrow,
  title,
  italic,
  intro,
  message,
  image,
  items,
  carouselImages,
  marqueeEyebrow,
  marqueeTitle,
  marqueeCaption,
  marqueeCta,
  heroNote,
  achievementBadges,
  curriculumCta,
  heroActionsExtra,
  hideHeroWhatsApp,
  beforeMarquee,
  marqueeAudioExtra,
  hideWhatToExpect,
  customClosing,
  children,
}: Props) {
  return (
    <main>
      <section className="interior-hero">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h1>
            {title}
            <br />
            <span className="interior-em-wrap">
              <em>{italic}</em>
              <svg className="interior-flourish" viewBox="0 0 120 20" aria-hidden="true" focusable="false">
                <path d="M4 14 Q30 4 62 10 T116 6" />
              </svg>
            </span>
          </h1>
          <p className="interior-intro">{intro}</p>
          {heroNote ? (
            <Link href={heroNote.href} className="interior-hero-note">
              <span>{heroNote.label}</span>
              <strong>{heroNote.text}</strong>
            </Link>
          ) : null}
          <div className="interior-hero-actions">
            {!hideHeroWhatsApp && (
              <InquiryLink message={message}>Ask on WhatsApp</InquiryLink>
            )}
            {curriculumCta && (
              <a href="#curriculum" className="interior-curriculum-cta">
                View Curriculum <span>→</span>
              </a>
            )}
            {heroActionsExtra}
          </div>
        </div>
        <div className="interior-image">
          <Image src={image} alt="" aria-hidden="true" fill className="interior-image-bg" sizes="100vw" priority placeholder="blur" blurDataURL={HERO_BLUR} />
          <Image src={image} alt={`${title} image`} fill className="interior-image-fg" sizes="(min-width: 980px) 52vw, 100vw" placeholder="blur" blurDataURL={HERO_BLUR} />
          <div className="interior-shine"></div>
          <div className="interior-image-overlay" aria-hidden="true"></div>
          <span>MEENAKSHI<br />ART WORK</span>
          {achievementBadges && achievementBadges.length > 0 ? (
            <RotatingAchievementBadge badges={achievementBadges} />
          ) : null}
        </div>
      </section>
      {beforeMarquee}
      {marqueeAudioExtra ? (
        <div className="interior-marquee-audio">{marqueeAudioExtra}</div>
      ) : null}
      {carouselImages && carouselImages.length > 0 ? (
        <OpposingMarquee
          images={carouselImages}
          eyebrow={marqueeEyebrow}
          title={marqueeTitle}
          caption={marqueeCaption}
          ctaCard={marqueeCta}
        />
      ) : null}
      {children}
      {!hideWhatToExpect && (
        <section className="interior-list section-wrap">
          <Reveal>
            <p className="eyebrow">WHAT TO EXPECT</p>
            <h2>Thoughtful, personal<br />and made with care.</h2>
          </Reveal>
<div className="large-list">
            {items?.map((item, i) => (
              <Reveal key={item.title} className="large-list-item" delay={i * 0.08}>
                <span>0{i + 1}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      )}
<section className="final-cta">
        <div className="final-cta__panel">
          <svg className="final-cta__flourish" viewBox="0 0 120 20" aria-hidden="true" focusable="false">
            <path d="M4 14 Q30 4 62 10 T116 6" />
          </svg>
          <p className="eyebrow">READY WHEN YOU ARE</p>
          {customClosing ? (
            <h2>{customClosing}</h2>
          ) : (
            <h2>Start with a simple<br /><em>conversation.</em></h2>
          )}
          <p className="final-cta__sub">No forms, no pressure — a real reply from Meenakshi, usually the same day.</p>
          <InquiryLink message={message} className="button-primary final-cta__button">Message 7017512686</InquiryLink>
        </div>
      </section>
    </main>
  );
}
