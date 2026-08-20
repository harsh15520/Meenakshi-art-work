"use client";
import { useEffect } from "react";

type PinterestWindow = typeof window & { PinUtils?: { build: () => void } };

export default function PinterestEmbed() {
  useEffect(() => {
    if (typeof window !== "undefined" && (window as PinterestWindow).PinUtils) {
      (window as PinterestWindow).PinUtils?.build();
    } else if (typeof window !== "undefined") {
      const script = document.createElement("script");
      script.src = "https://assets.pinterest.com/js/pinit.js";
      script.async = true;
      // anonymous CORS mode keeps the request from leaking credentials and
      // lets the browser apply our CSP script-src allow-list to this origin.
      script.crossOrigin = "anonymous";
      document.body.appendChild(script);
    }
  }, []);

  return (
    <a data-pin-do="embedBoard" href="https://in.pinterest.com/meenakshiartstudio/" data-pin-board-width="300" data-pin-scale-height="400" data-pin-scale-width="300">
      Meenakshi Art Studio
    </a>
  );
}
