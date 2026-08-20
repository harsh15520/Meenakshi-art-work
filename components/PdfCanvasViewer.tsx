"use client";

import { useEffect, useRef, useState } from "react";

const MIN_ZOOM = 0.5;
const MAX_ZOOM = 2.5;

/**
 * PdfCanvasViewer — renders a PDF entirely via pdf.js onto a <canvas>, so no
 * native browser PDF chrome ever shows (unlike the old <object> embed this
 * replaces). Only ever mounted client-side (see SlideDeckViewer, which loads
 * this via next/dynamic ssr:false) since pdf.js touches canvas/DOMMatrix
 * APIs that don't exist during the server render pass.
 *
 * The render scale is "fit the stage's actual width" (recomputed on resize)
 * times a user zoom multiplier — not a fixed absolute scale. A fixed scale
 * of 1 renders at the PDF's native point size (often 900px+ wide for a
 * landscape slide deck), which on a ~360px-wide phone either overflowed its
 * flex container or got blurrily downscaled depending on the browser. Fit
 * scale means the canvas is always rendered at the resolution it's actually
 * displayed at, so it stays crisp at any viewport size.
 */
export default function PdfCanvasViewer({ src, title }: { src: string; title: string }) {
  const stageRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const docRef = useRef<import("pdfjs-dist").PDFDocumentProxy | null>(null);
  const renderTaskRef = useRef<import("pdfjs-dist").RenderTask | null>(null);
  const [numPages, setNumPages] = useState(0);
  const [pageNum, setPageNum] = useState(1);
  const [zoom, setZoom] = useState(1);
  const [stageWidth, setStageWidth] = useState(0);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  // Load the document once.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const pdfjsLib = await import("pdfjs-dist");
        pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
          "pdfjs-dist/build/pdf.worker.min.mjs",
          import.meta.url
        ).toString();
        const doc = await pdfjsLib.getDocument(src).promise;
        if (cancelled) return;
        docRef.current = doc;
        setNumPages(doc.numPages);
        setStatus("ready");
      } catch {
        if (!cancelled) setStatus("error");
      }
    })();
    return () => {
      cancelled = true;
      docRef.current?.destroy();
    };
  }, [src]);

  // Track the stage's actual display width so the render scale can fit it —
  // recomputes on container resize (mobile rotation, sidebar changes, etc).
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => {
      setStageWidth(entry.contentBoxSize?.[0]?.inlineSize ?? entry.contentRect.width);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Render the current page whenever it, the doc, the stage size, or zoom changes.
  useEffect(() => {
    if (status !== "ready" || !docRef.current || !canvasRef.current || stageWidth <= 0) return;
    let cancelled = false;
    (async () => {
      const doc = docRef.current;
      if (!doc) return;
      const page = await doc.getPage(pageNum);
      if (cancelled) return;

      const nativeWidth = page.getViewport({ scale: 1 }).width;
      const fitScale = stageWidth / nativeWidth;
      const viewport = page.getViewport({ scale: fitScale * zoom });

      const canvas = canvasRef.current;
      if (!canvas) return;
      const context = canvas.getContext("2d");
      if (!context) return;
      const dpr = window.devicePixelRatio || 1;
      // Round the backing store to whole pixels FIRST, then derive the CSS
      // display size from that same rounded value — canvas.width silently
      // truncates fractional values, and if the CSS size were set from the
      // original (un-rounded) viewport instead, the two would drift apart
      // by a sub-pixel amount, forcing the browser to resample the canvas
      // on display. That resample is what was softening the text.
      const backingWidth = Math.round(viewport.width * dpr);
      const backingHeight = Math.round(viewport.height * dpr);
      canvas.width = backingWidth;
      canvas.height = backingHeight;
      canvas.style.width = `${backingWidth / dpr}px`;
      canvas.style.height = `${backingHeight / dpr}px`;

      renderTaskRef.current?.cancel();
      const task = page.render({
        canvasContext: context,
        viewport,
        transform: dpr !== 1 ? [dpr, 0, 0, dpr, 0, 0] : undefined,
      });
      renderTaskRef.current = task;
      try {
        await task.promise;
      } catch {
        // A cancelled render (page/zoom/resize changed mid-render) throws — ignore.
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [status, pageNum, zoom, stageWidth]);

  const goPrev = () => setPageNum((p) => Math.max(1, p - 1));
  const goNext = () => setPageNum((p) => Math.min(numPages, p + 1));
  const zoomIn = () => setZoom((z) => Math.min(MAX_ZOOM, +(z + 0.25).toFixed(2)));
  const zoomOut = () => setZoom((z) => Math.max(MIN_ZOOM, +(z - 0.25).toFixed(2)));

  if (status === "error") {
    return (
      <div className="pdf-viewer pdf-viewer--error">
        <p>This deck couldn&apos;t be opened here.</p>
      </div>
    );
  }

  return (
    <div className="pdf-viewer" role="group" aria-label={title}>
      <div className="pdf-viewer__stage" ref={stageRef}>
        {(status === "loading" || stageWidth <= 0) && <div className="pdf-viewer__loading" aria-hidden="true" />}
        <canvas ref={canvasRef} className="pdf-viewer__canvas" />
      </div>
      <div className="pdf-viewer__bar">
        <button type="button" className="pdf-viewer__btn" onClick={goPrev} disabled={pageNum <= 1} aria-label="Previous page">
          ←
        </button>
        <span className="pdf-viewer__page">
          {status === "ready" ? `${pageNum} / ${numPages}` : "…"}
        </span>
        <button type="button" className="pdf-viewer__btn" onClick={goNext} disabled={pageNum >= numPages} aria-label="Next page">
          →
        </button>
        <span className="pdf-viewer__divider" aria-hidden="true" />
        <button type="button" className="pdf-viewer__btn" onClick={zoomOut} disabled={zoom <= MIN_ZOOM} aria-label="Zoom out">
          −
        </button>
        <button type="button" className="pdf-viewer__btn" onClick={zoomIn} disabled={zoom >= MAX_ZOOM} aria-label="Zoom in">
          +
        </button>
      </div>
    </div>
  );
}
