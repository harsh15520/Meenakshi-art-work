import type { Metadata } from "next";
import InteriorPage from "@/components/InteriorPage";
import ExhibitionWalk from "@/components/ExhibitionWalk";
import ErrorBoundary from "@/components/ErrorBoundary";
import CustomOrdersLiveStrip from "@/components/CustomOrdersLiveStrip";
import CustomOrdersSeasonsStrip from "@/components/CustomOrdersSeasonsStrip";
import CustomOrdersHeroAudioPlayer from "@/components/CustomOrdersHeroAudioPlayer";
import MarqueeAudioPlayer from "@/components/MarqueeAudioPlayer";
import { customCommissionsImages } from "@/data/categoryImages";
import { customOrdersExhibitionImages } from "@/data/exhibitionImages";

export const metadata: Metadata = { title: "Custom Painting Commissions" };

export default function CustomOrdersPage() {
  return (
    <InteriorPage
      eyebrow="YOUR STORY • OUR BRUSH"
      title="Made for one person."
      italic="Remembered for years."
      intro="Hand-painted for one person, not printed for anyone — a deeply personal commission for a wedding, portrait, home, milestone or meaningful gift."
      message="Hello, I would like a custom painting. Please guide me about sizes, pricing and delivery time."
      image="/images/custom-art-work-2.webp"
      heroActionsExtra={<CustomOrdersHeroAudioPlayer />}
      beforeMarquee={
        <>
          <CustomOrdersSeasonsStrip />
          <CustomOrdersLiveStrip />
        </>
      }
      marqueeAudioExtra={<MarqueeAudioPlayer src="/audio/custom-orders-opposite-marequee-hindi.opus" label="🎧 हिंदी में सुनें" />}
      carouselImages={customCommissionsImages}
      marqueeEyebrow="PAST COMMISSIONS"
      marqueeTitle="Made for real clients"
      marqueeCaption="A look at custom pieces we've completed — yours could be next."
      customClosing="Every painting eventually leaves the studio. The story it carries never does."
      hideWhatToExpect
    >
      <ErrorBoundary
        fallback={
          <section className="section-wrap">
            <p className="eyebrow">Commissions</p>
            <h2>Something went wrong here</h2>
            <p>Please refresh the page to try again.</p>
          </section>
        }
      >
        <ExhibitionWalk
          id="commissions"
          images={customOrdersExhibitionImages}
          eyebrow="MADE TO ORDER"
          title="Made for someone"
          intro="Every piece began with a story — see where these found their place."
          variant="custom"
        />
      </ErrorBoundary>
    </InteriorPage>
  );
}
