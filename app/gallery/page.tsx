import type { Metadata } from "next";
import InteriorPage from "@/components/InteriorPage";
import ExhibitionWalk from "@/components/ExhibitionWalk";
import ErrorBoundary from "@/components/ErrorBoundary";
import GalleryLiveStrip from "@/components/GalleryLiveStrip";
import GalleryHeroAudioPlayer from "@/components/GalleryHeroAudioPlayer";
import MarqueeAudioPlayer from "@/components/MarqueeAudioPlayer";
import { premiumPaintingsImages } from "@/data/categoryImages";
import { galleryExhibitionImages } from "@/data/exhibitionImages";

export const metadata: Metadata = { title: "Original Paintings & Student Gallery" };

export default function GalleryPage() {
  return (
    <InteriorPage
      eyebrow="ORIGINAL ART • HANDMADE"
      title="Art that changes"
      italic="the feeling of a room."
      intro="Hand-painted, never printed — original oil and acrylic works from our Saharanpur studio, including student pieces and available commissions."
      message="Hello, I am interested in purchasing a painting. Please share currently available artwork and prices."
      image="/images/gallery-acrylic-01.webp"
      heroActionsExtra={<GalleryHeroAudioPlayer />}
      marqueeAudioExtra={<MarqueeAudioPlayer src="/audio/gallery-opposite-marequee-hindi.opus" label="🎧 हिंदी में सुनें" />}
      beforeMarquee={<GalleryLiveStrip />}
      hideWhatToExpect
      carouselImages={premiumPaintingsImages}
      marqueeEyebrow="AVAILABLE NOW"
      marqueeTitle="Meenakshi's original paintings"
      marqueeCaption="Hand-painted by Meenakshi and available to purchase."
      items={[
        { title: "Oil paintings", text: "Layered, detailed and timeless pieces with rich depth and character." },
        { title: "Acrylic art", text: "Contemporary colour stories created for modern homes and thoughtful gifting." },
        { title: "Student work", text: "A celebration of growing confidence, technique and original expression." },
        { title: "Available art", text: "Message us for current paintings, dimensions, pricing and delivery options." },
      ]}
    >
      <ErrorBoundary
        fallback={
          <section className="section-wrap">
            <p className="eyebrow">Exhibition</p>
            <h2>Something went wrong here</h2>
            <p>Please refresh the page to try again.</p>
          </section>
        }
      >
        <ExhibitionWalk id="exhibition" images={galleryExhibitionImages} />
      </ErrorBoundary>
    </InteriorPage>
  );
}


