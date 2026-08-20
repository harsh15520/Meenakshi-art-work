"use client";

import Link from "next/link";
import { useGhostHover } from "./GhostHover";

/** Homepage "What we create" — service card link (ghost-hover target: .service-card a). */
export function ServiceCardLink({
  href,
  className,
  children,
  "aria-label": ariaLabel,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
  "aria-label"?: string;
}) {
  const ref = useGhostHover<HTMLAnchorElement>({ group: "home-services" });
  return (
    <Link ref={ref} href={href} className={className} aria-label={ariaLabel}>
      {children}
    </Link>
  );
}

/** Homepage "Selected work" — gallery tile link (ghost-hover target: .gallery-tile). */
export function GalleryTileLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
}) {
  const ref = useGhostHover<HTMLAnchorElement>({ group: "home-gallery" });
  return (
    <Link ref={ref} href={href} className={className}>
      {children}
    </Link>
  );
}

/** Journal "What brings you here today" — entry-point card link (.journal-entry-point-card). */
export function JournalEntryPointLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
}) {
  const ref = useGhostHover<HTMLAnchorElement>({ group: "journal-entry-points" });
  return (
    <Link ref={ref} href={href} className={className}>
      {children}
    </Link>
  );
}

/** Journal "Trending this week" — sidebar trending link (.journal-sidebar-trending-link). */
export function TrendingLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
}) {
  const ref = useGhostHover<HTMLAnchorElement>({ group: "journal-trending" });
  return (
    <Link ref={ref} href={href} className={className}>
      {children}
    </Link>
  );
}

/** Student portfolio card (.artist-artwork-card). */
export function ArtworkCardLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
}) {
  const ref = useGhostHover<HTMLAnchorElement>({ group: "student-portfolio" });
  return (
    <Link ref={ref} href={href} className={className}>
      {children}
    </Link>
  );
}

/** Student gallery-wall CTA overlay (.gallery-wall-cta-overlay). */
export function GalleryWallCtaLink({
  href,
  className,
  children,
  "aria-label": ariaLabel,
}: {
  href: string;
  className?: string;
  children?: React.ReactNode;
  "aria-label"?: string;
}) {
  const ref = useGhostHover<HTMLAnchorElement>({ group: "student-gallery-wall" });
  return (
    <Link ref={ref} href={href} className={className} aria-label={ariaLabel}>
      {children}
    </Link>
  );
}
