import type { Metadata } from "next";
import InteriorPage from "@/components/InteriorPage";
import StudentLocker from "@/components/StudentLocker";
import AcademyLiveStrip from "@/components/AcademyLiveStrip";
import AcademyAudioPlayer from "@/components/AcademyAudioPlayer";
import AcademyCurriculum from "@/components/AcademyCurriculum";
import CurriculumCanvas from "@/components/CurriculumCanvas";
import MeetStudentsWall from "@/components/MeetStudentsWall";
import MarqueeAudioPlayer from "@/components/MarqueeAudioPlayer";
import { academyImages } from "@/data/categoryImages";
import { heroAchievementBadges } from "@/data/academyToday";

export const metadata: Metadata = { title: "Women-Only Art Academy in Saharanpur" };

export default function AcademyPage() {
  return (
    <InteriorPage
      eyebrow="ART ACADEMY • AGE 6+"
      title="Learn with patience."
      italic="Create with confidence."
      intro="A structured, women-only fine-art academy where girls and women build strong foundations, one brushstroke at a time."
      message="Hello, I would like academy enrollment details including fees, timings and available batches."
      image="/images/academy-class.webp"
      achievementBadges={heroAchievementBadges}
      curriculumCta
      hideHeroWhatsApp
      heroActionsExtra={<AcademyAudioPlayer />}
      beforeMarquee={<AcademyLiveStrip />}
      marqueeAudioExtra={<MarqueeAudioPlayer />}
      hideWhatToExpect
      carouselImages={academyImages}
      marqueeEyebrow="FROM OUR STUDENTS"
      marqueeTitle="Made in class"
      marqueeCaption="Real work by our students during lessons — not stock photography."
      items={[
        {
          title: "One artwork at a time, never rushed",
          text: "Each phase is repeated until it is genuinely mastered. No student moves forward when a calendar says so — only when their work shows they are ready.",
        },
        {
          title: "Corrections happen in front of you",
          text: "Mistakes are caught and explained as they happen, individually. No generic group feedback that does not apply to you — every correction is specific to your piece.",
        },
        {
          title: "Each medium is earned, not assigned",
          text: "Pencil before acrylic. Acrylic before canvas. Canvas before oil. The sequence exists because skipping steps always shows in the final work — and we do not allow shortcuts.",
        },
        {
          title: "You leave with work you actually made",
          text: "No tracing, no teacher finishing your piece, no shortcuts. Every artwork in your portfolio is entirely yours — made slowly, with your own hands.",
        },
      ]}
    >
      {/* Live strip now sits immediately below the hero via InteriorPage's beforeMarquee slot */}
      {/* Meet the students — scrapbook/polaroid wall composite with profile hotspots */}
      <MeetStudentsWall />

      {/* Student locker — privacy-gated stories, now with social proof strip */}
      <StudentLocker />

      {/* 5-phase curriculum grid */}
      <AcademyCurriculum />

      {/* Scroll-fill "How We Teach" painting sequence — anchor target for hero CTA */}
      <CurriculumCanvas />
    </InteriorPage>
  );
}
