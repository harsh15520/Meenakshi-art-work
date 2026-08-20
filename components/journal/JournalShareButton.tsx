"use client";

import { useState } from "react";
import { buildAbsoluteUrl } from "@/lib/site";

/**
 * JournalShareButton — lets readers share a journal entry via WhatsApp or copy
 * its link. Used on journal entry cards to support word-of-mouth discovery.
 */
export default function JournalShareButton({ slug, title }: { slug: string; title: string }) {
  const [copied, setCopied] = useState(false);
  const url = buildAbsoluteUrl(`/journal/${slug}`);
  const whatsapp = `https://wa.me/917017512686?text=${encodeURIComponent(`*${title}* — Meenakshi Art Work Journal\n${url}`)}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable — ignore */
    }
  };

  return (
    <div className="journal-share">
      <a
        className="journal-share__btn journal-share__wa"
        href={whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Share "${title}" on WhatsApp`}
      >
        Share ↗
      </a>
      <button
        type="button"
        className="journal-share__btn journal-share__copy"
        onClick={handleCopy}
        aria-label="Copy link to this entry"
      >
        {copied ? "Copied" : "Copy link"}
      </button>
    </div>
  );
}
