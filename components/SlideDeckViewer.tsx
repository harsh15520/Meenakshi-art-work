"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

// pdf.js touches canvas/DOMMatrix APIs that don't exist during the server
// render pass this route relies on (generateStaticParams + ISR), so the
// actual viewer is client-only.
const PdfCanvasViewer = dynamic(() => import("./PdfCanvasViewer"), { ssr: false });

/**
 * SlideDeckViewer — lazy-mounts a themed, canvas-rendered PDF viewer (no
 * native browser chrome, unlike the old <object> embed) only once the
 * section is about to scroll into view. Same IntersectionObserver-gated
 * pattern as LazyPdfEmbed — don't fetch pdf.js or the PDF itself eagerly.
 */
export default function SlideDeckViewer({ src, title, skeletonLabel }: { src: string; title: string; skeletonLabel: string }) {
  const [visible, setVisible] = useState(false);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "600px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={wrapRef} className="curriculum-slide-embed">
      {visible ? (
        <PdfCanvasViewer src={src} title={title} />
      ) : (
        <div className="curriculum-pdf-skeleton" aria-hidden="true">
          <span>{skeletonLabel}</span>
        </div>
      )}
    </div>
  );
}
