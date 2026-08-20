"use client";
import { useEffect, useRef, useState } from "react";

type Variant = "fade" | "stamp" | "line-fill";

/**
 * Reveal - Animation wrapper that reveals content with scroll-triggered effects.
 * Uses CSS animations instead of framer-motion for better performance.
 * 
 * @param children - Content to animate
 * @param className - Optional CSS classes for styling
 * @param delay - Animation delay in seconds (default: 0)
 * @param variant - Animation type: "fade", "stamp", or "line-fill" (default: "fade")
 */
export default function Reveal({ children, className = "", delay = 0, variant = "fade", threshold = 0.18 }: { children?: React.ReactNode; className?: string; delay?: number; variant?: Variant; threshold?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // A ratio-based threshold can never be satisfied once content is taller
    // than viewport/threshold (e.g. 0.18 needs 5.5x the viewport in visible
    // height) — clamp it to what's actually achievable for this element so
    // very long content (like the curriculum report letters) still reveals.
    const achievable = Math.min(threshold, (window.innerHeight || 800) / el.offsetHeight);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: Math.max(achievable - 0.02, 0) }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  const style: React.CSSProperties = {
    animationDelay: `${delay}s`,
    animationFillMode: "both",
  };

  return (
    <div
      ref={ref}
      className={`reveal reveal--${variant} ${isVisible ? "reveal--visible" : ""} ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}
