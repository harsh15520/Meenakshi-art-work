"use client";

import { usePathname } from "next/navigation";
import { trackWhatsAppInquiry } from "@/lib/analytics";

const PHONE = "917017512686";

/**
 * Context-aware floating WhatsApp CTA. Picks a pre-filled message based on the
 * current route and reports the tap to analytics (consistent with InquiryLink),
 * so every WhatsApp initiation is tracked and the message matches the page.
 */
function messageForPath(pathname: string): string {
  if (pathname.startsWith("/academy")) {
    return "Hello Meenakshi Art Work, I would like academy enrollment details including fees, timings and available batches.";
  }
  if (pathname.startsWith("/gallery") || pathname.startsWith("/painting")) {
    return "Hello Meenakshi Art Work, I am interested in purchasing a painting. Please share currently available artwork and prices.";
  }
  if (pathname.startsWith("/custom-orders")) {
    return "Hello, I would like a custom painting. Please guide me about sizes, pricing and delivery time.";
  }
  if (pathname.startsWith("/journal")) {
    return "Hello Meenakshi Art Work, I have been reading your studio journal and would like to get in touch.";
  }
  if (pathname.startsWith("/contact")) {
    return "Hello Meenakshi Art Work, I would like to plan a studio visit.";
  }
  return "Hello Meenakshi Art Work, I found you through the website.";
}

export default function WhatsAppButton() {
  const pathname = usePathname();
  const message = messageForPath(pathname);
  const href = `https://wa.me/${PHONE}?text=${encodeURIComponent(message)}`;

  const handleClick = () => trackWhatsAppInquiry(message, pathname);

  return (
    <a
      className="wa-float"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      onClick={handleClick}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 3.5A11.8 11.8 0 0 0 12.1 0C5.6 0 .3 5.3.3 11.8c0 2.1.5 4.1 1.6 5.9L0 24l6.5-1.7a11.8 11.8 0 0 0 5.6 1.4A11.9 11.9 0 0 0 24 11.8c0-3.2-1.3-6.1-3.5-8.3Zm-8.4 18.2c-1.8 0-3.6-.5-5.1-1.4l-.4-.2-3.8 1 1-3.7-.2-.4a9.8 9.8 0 1 1 8.5 4.7Zm5.4-7.3c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.2-.2.3-.8.9-1 1.1-.2.2-.4.2-.7.1-1.8-.9-3-1.6-4.2-3.7-.3-.5.3-.5.9-1.7.1-.2 0-.4 0-.6l-.9-2.1c-.2-.5-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.2-1.2 2.9s1.2 3.3 1.4 3.5c.1.2 2.5 3.8 6.1 5.3.9.4 1.5.6 2 .7.9.3 1.7.2 2.3.1.7-.1 1.7-.7 1.9-1.3.2-.7.2-1.2.2-1.3-.1-.1-.3-.2-.6-.3Z" /></svg>
      <span>WhatsApp</span>
    </a>
  );
}
