"use client";
import { trackWhatsAppInquiry } from "@/lib/analytics";
import { usePathname } from "next/navigation";
import { forwardRef } from "react";

/**
 * InquiryLink - WhatsApp contact link generator
 *
 * @param children - Link text/content
 * @param message - Pre-filled WhatsApp message
 * @param className - Optional CSS classes for styling
 *
 * @example
 * <InquiryLink message="Hello, I'm interested in academy classes">
 *   Join Academy
 * </InquiryLink>
 */
const InquiryLink = forwardRef(function InquiryLink(
  { children, message, className = "button-primary", ...props }: { children: React.ReactNode; message: string; className?: string },
  ref: React.Ref<HTMLAnchorElement>
) {
  const pathname = usePathname();

  const handleClick = () => {
    trackWhatsAppInquiry(message, pathname);
  };

  return <a ref={ref} className={className} href={`https://wa.me/917017512686?text=${encodeURIComponent(message)}`} target="_blank" rel="noopener noreferrer" onClick={handleClick} {...props}>{children}<span>↗</span></a>;
});

export default InquiryLink;
