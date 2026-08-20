import Image from "next/image";
import Reveal from "./Reveal";
import type { PaintingStory } from "@/data/exhibitionImages";

type PosterMoment = NonNullable<PaintingStory["posterMoment"]>;

export default function TigerPosterSection({ data }: { data: PosterMoment }) {
  return (
    <section className="poster-moment">
      <Reveal>
        <div className="poster-moment-monogram" aria-hidden="true">
          <span className="poster-moment-monogram-line" />
          <span className="poster-moment-monogram-mark">M</span>
          <span className="poster-moment-monogram-line" />
        </div>
        <h2 className="poster-moment-title">{data.title}</h2>
        <p className="poster-moment-subtitle">{data.subtitle}</p>

        <div className="poster-moment-frame">
          <Image
            src={data.image}
            alt={data.title}
            fill
            sizes="(min-width: 980px) 70vw, 92vw"
            style={{ objectFit: "cover" }}
          />
        </div>

        <div className="poster-moment-columns">
          <div className="poster-moment-column">
            <p className="poster-moment-eyebrow">{data.problemEyebrow}</p>
            <p className="poster-moment-body">{data.problem}</p>
            <blockquote className="painting-pull-quote poster-moment-quote">{data.problemQuote}</blockquote>
          </div>
          <div className="poster-moment-column">
            <p className="poster-moment-eyebrow">{data.solutionEyebrow}</p>
            <p className="poster-moment-body">{data.solution}</p>
            <div className="poster-moment-comparison">
              <Image
                src={data.comparisonImage}
                alt="Three studies of her gaze: at the viewer, at the cub, and beyond the frame"
                width={700}
                height={262}
              />
            </div>
          </div>
        </div>

        <div className="poster-moment-closing">
          <p className="poster-moment-closing-line">{data.closingLine}</p>
          <p className="poster-moment-closing-subline">{data.closingSubline}</p>
        </div>

        <p className="poster-moment-signature">
          <b>Meenakshi</b>
          <small>ART WORK</small>
        </p>
      </Reveal>
    </section>
  );
}
