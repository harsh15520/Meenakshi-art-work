"use client";
import { useState } from "react";

type Sparkle = { id: number; dx: number; dy: number; sx: string; sy: string };

export function CertificateDownloadButton({ href, fileName }: { href: string; fileName: string }) {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const sx = `${e.clientX - rect.left}px`;
    const sy = `${e.clientY - rect.top}px`;
    const burst: Sparkle[] = Array.from({ length: 10 }, (_, i) => {
      const angle = (Math.PI * 2 * i) / 10;
      const distance = 28 + Math.random() * 20;
      return {
        id: Date.now() + i,
        dx: Math.cos(angle) * distance,
        dy: Math.sin(angle) * distance,
        sx,
        sy,
      };
    });
    setSparkles(burst);
    setTimeout(() => setSparkles([]), 700);
  };

  return (
    <a
      href={href}
      download={fileName}
      className="certificate-download"
      onClick={handleClick}
      style={{ position: "relative" }}
    >
      Download Certificate ↓
      {sparkles.map((s) => (
        <span
          key={s.id}
          className="sparkle"
          style={{ ["--dx" as string]: `${s.dx}px`, ["--dy" as string]: `${s.dy}px`, ["--sx" as string]: s.sx, ["--sy" as string]: s.sy }}
        />
      ))}
    </a>
  );
}
