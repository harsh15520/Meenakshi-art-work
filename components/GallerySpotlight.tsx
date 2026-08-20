"use client";
import { useRef } from "react";

export function GallerySpotlight({ children }: { children: React.ReactNode }) {
  const wrapRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = wrapRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    el.style.setProperty("--x", `${x}%`);
    el.style.setProperty("--y", `${y}%`);
  };

  return (
    <div className="gallery-spotlight-wrap" ref={wrapRef} onMouseMove={handleMouseMove}>
      {children}
      <div className="gallery-spotlight-overlay" />
    </div>
  );
}
