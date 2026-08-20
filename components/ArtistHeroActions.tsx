"use client";

import { useEffect, useState } from "react";

export function ArtistHeroActions({ artistName, artistHeadline }: { artistName: string; artistHeadline: string }) {
  // Server and first client render both produce "", so there's no hydration
  // mismatch — the real URL fills in after mount via this normal state update.
  const [pageUrl, setPageUrl] = useState("");
  const [shareState, setShareState] = useState<"idle" | "copied">("idle");

  useEffect(() => {
    setPageUrl(window.location.href);
  }, []);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: artistName,
        text: artistHeadline,
        url: pageUrl
      });
    } else {
      navigator.clipboard.writeText(pageUrl);
      setShareState("copied");
      setTimeout(() => setShareState("idle"), 2000);
    }
  };

  return (
    <div className="artist-hero-actions">
      <button
        onClick={handleShare}
        className={`artist-btn artist-btn-primary${shareState === "copied" ? " is-busy" : ""}`}
      >
        {shareState === "copied" ? "Link copied!" : "Share My Profile"}
      </button>
      <a href={`https://wa.me/?text=${encodeURIComponent(`Check out ${artistName}'s art portfolio: ${pageUrl}`)}`} className="artist-btn artist-btn-secondary">
        WhatsApp
      </a>
    </div>
  );
}
