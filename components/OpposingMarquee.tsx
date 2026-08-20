import Image from "next/image";
import type { CarouselImage } from "@/data/categoryImages";
import { existsInPublic } from "@/lib/assetExists";

type Props = {
  images: CarouselImage[];
  eyebrow?: string;
  title?: string;
  caption?: string;
  /** Optional WhatsApp CTA ghost card appended to the bottom row */
  ctaCard?: { label: string; message: string };
};

function MarqueeCard({ image }: { image: CarouselImage }) {
  const inner = (
    <>
      <div className="opposing-marquee__image">
        <Image src={image.src} alt={image.alt} fill sizes="240px" loading="eager" style={{ objectFit: "cover" }} />
        {image.curatorsChoice && (
          <span className="opposing-marquee__ribbon" title={image.curatorReason}>
            <span className="opposing-marquee__ribbon-stars">★★★★★</span>
            Meenakshi Recommends
            {image.curatorReason ? (
              <span className="opposing-marquee__ribbon-reason">{image.curatorReason}</span>
            ) : null}
          </span>
        )}
        {image.occasion && (
          <span className="opposing-marquee__ribbon opposing-marquee__ribbon--occasion" title={image.story}>
            {image.occasion}
            {image.story ? (
              <span className="opposing-marquee__ribbon-reason">{image.story}</span>
            ) : null}
          </span>
        )}
        {image.inProgress && (
          <span className="opposing-marquee__badge opposing-marquee__badge--live">
            <span className="opposing-marquee__badge-dot" aria-hidden="true" />
            Now being painted
          </span>
        )}
        {(image.student || image.duration || image.theme || image.style || image.priceFrom) ? (
          <div className="opposing-marquee__hover">
            {image.student ? <p className="opposing-marquee__hover-student">{image.student}</p> : null}
            {image.duration ? <p className="opposing-marquee__hover-duration">{image.duration}</p> : null}
            {image.theme ? <p className="opposing-marquee__hover-theme">{image.theme}</p> : null}
            {image.style ? <p className="opposing-marquee__hover-style">{image.style}</p> : null}
            {image.priceFrom ? <p className="opposing-marquee__price">{image.priceFrom}</p> : null}
          </div>
        ) : null}
      </div>
      {image.label ? <p className="opposing-marquee__label">{image.label}</p> : null}
    </>
  );

// Marquee cards intentionally do NOT navigate on click — on mobile the hover
  // details are revealed by tapping, and we don't want to redirect the visitor
  // away from the current page unexpectedly. The card stays a plain div.
  return <div className="opposing-marquee__card">{inner}</div>;
}

function MarqueeRow({ images, direction }: { images: CarouselImage[]; direction: "left" | "right" }) {
  if (!images.length) return null;

  return (
    <div className={`opposing-marquee__row opposing-marquee__row--${direction}`}>
      <div className="opposing-marquee__track">
        {[...images, ...images].map((image, i) => (
          <MarqueeCard key={`${image.src}-${i}`} image={image} />
        ))}
      </div>
    </div>
  );
}

export default function OpposingMarquee({ images, eyebrow = "FEATURED WORK", title = "Featured work", caption, ctaCard }: Props) {
  // Only show cards that are actually wired to a real, existing image asset —
  // never render a blank/broken card for a missing or mistyped file.
  const validImages = images.filter((image) => existsInPublic(image.src));
  if (!validImages.length) return null;

  const mid = Math.ceil(validImages.length / 2);
  const rowTop = validImages.slice(0, mid);
  const rowBottom = validImages.slice(mid);

  return (
    <section className="opposing-marquee" aria-label={title}>
      <div className="opposing-marquee__header">
        <p className="eyebrow">{eyebrow}</p>
        <h3>{title}</h3>
        {caption ? <p className="opposing-marquee__caption">{caption}</p> : null}
      </div>

      <MarqueeRow images={rowTop} direction="left" />
      <MarqueeRow images={rowBottom.length ? rowBottom : rowTop} direction="right" />

      {ctaCard ? (
        <div className="opposing-marquee__cta-row">
          <a
            href={`https://wa.me/917017512686?text=${encodeURIComponent(ctaCard.message)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="opposing-marquee__cta-card"
          >
            <span className="opposing-marquee__cta-label">{ctaCard.label}</span>
            <span className="opposing-marquee__cta-sub">Message on WhatsApp</span>
          </a>
        </div>
      ) : null}
    </section>
  );
}