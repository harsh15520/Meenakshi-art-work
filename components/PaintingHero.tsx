import Image from "next/image";
import Reveal from "./Reveal";
import PaintingHeroVideoBackground from "./PaintingHeroVideoBackground";

interface PaintingHeroProps {
  image: string;
  contextualTitle: string;
  narrative: string;
  video?: { youtubeId: string };
}

export default function PaintingHero({ image, contextualTitle, narrative, video }: PaintingHeroProps) {
  return (
    <section className={`painting-hero${video ? " painting-hero--video" : ""}`}>
      {video ? (
        <PaintingHeroVideoBackground youtubeId={video.youtubeId} posterImage={image} posterAlt={contextualTitle} />
      ) : (
        <div className="painting-hero-image">
          <Image
            src={image}
            alt={contextualTitle}
            fill
            sizes="100vw"
            priority
            className="painting-hero-img"
          />
        </div>
      )}
      <div className="painting-hero-content">
        <Reveal>
          <p className="painting-eyebrow">PAINTING STORY</p>
          <h1>{contextualTitle}</h1>
          <p className="painting-opening-narrative">{narrative}</p>
        </Reveal>
      </div>
    </section>
  );
}
