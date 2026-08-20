import Image from "next/image";
import Reveal from "./Reveal";
import type { PaintingStory } from "@/data/exhibitionImages";

type ProcessionMoment = NonNullable<PaintingStory["processionMoment"]>;

export default function ElephantProcessionSection({ data }: { data: ProcessionMoment }) {
  return (
    <section className="elephant-procession">
      <Reveal>
        <p className="elephant-procession-eyebrow">{data.eyebrow}</p>
        <h2 className="elephant-procession-title">{data.title}</h2>
        <p className="elephant-procession-lede">{data.lede}</p>
        <div className="elephant-procession-frame">
          <Image src={data.image} alt={data.title} fill sizes="(min-width: 980px) 70vw, 92vw" style={{ objectFit: "cover" }} />
          <span className="elephant-procession-flow" aria-hidden="true" />
        </div>
        <ol className="elephant-procession-passes">
          {data.passes.map((pass) => (
            <li key={pass.step} className="elephant-procession-pass">
              <span className="elephant-procession-pass-step">{pass.step}</span>
              <div>
                <h3 className="elephant-procession-pass-heading">{pass.heading}</h3>
                <p className="elephant-procession-pass-body">{pass.body}</p>
              </div>
            </li>
          ))}
        </ol>
        {data.motifs && data.motifs.length > 0 && (
          <ul className="elephant-procession-motifs">
            {data.motifs.map((m) => (
              <li key={m.label} className="elephant-procession-motif">
                <strong>{m.label}</strong>
                <span>{m.note}</span>
              </li>
            ))}
          </ul>
        )}
        <p className="elephant-procession-ribbon">{data.ribbon}</p>
      </Reveal>
    </section>
  );
}
