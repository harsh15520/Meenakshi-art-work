export function getSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");
  const vercel = process.env.NEXT_PUBLIC_VERCEL_URL || process.env.VERCEL_URL;
  if (vercel) return `https://${vercel.replace(/\/$/, "")}`;
  if (typeof window !== "undefined") {
    return window.location.origin.replace(/\/$/, "");
  }
  const warn = process.env.NODE_ENV !== "production";
  if (warn) {
    console.warn(
      "[site.ts] NEXT_PUBLIC_SITE_URL is not set. Falling back to localhost for development. Set this env var before production build to avoid incorrect URLs."
    );
  }
  return "http://localhost:3000";
}

export const SITE_URL = getSiteUrl();

export function buildAbsoluteUrl(path: string): string {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${cleanPath}`;
}

/**
 * Verified Google Maps link for the studio (uses the verified Place CID,
 * not a generic search query). Every Maps link in the codebase should use
 * this constant so that local-SEO signals consolidate on the verified listing.
 */
export const GOOGLE_MAPS_URL = "https://www.google.com/maps?cid=14226774238352202659";
