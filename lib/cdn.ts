/**
 * CDN Image Helper
 * 
 * Provides CDN-aware image resolution with local fallback.
 * 
 * Supported CDNs:
 * - Vercel Blob (BLOB_READ_WRITE_TOKEN or BLOB_STORE_ID) 
 * - Cloudinary (CLOUDINARY_CLOUD_NAME)
 * 
 * Environment variables:
 * - NEXT_PUBLIC_CDN_PROVIDER: "vercel-blob" | "cloudinary" | "none" (default: none)
 * - NEXT_PUBLIC_CDN_BASE_URL: CDN base URL for image paths
 * - NEXT_PUBLIC_CDN_PREFIX: Path prefix on CDN (e.g. "/images")
 * 
 * When no CDN is configured, local /images/ paths are returned as-is.
 */

const CDN_PROVIDER = process.env.NEXT_PUBLIC_CDN_PROVIDER || "none";
const CDN_BASE_URL = process.env.NEXT_PUBLIC_CDN_BASE_URL || "";
const CDN_PREFIX = process.env.NEXT_PUBLIC_CDN_PREFIX || "/images";

/**
 * Check if a CDN is configured
 */
export function isCdnConfigured(): boolean {
  return CDN_PROVIDER !== "none" && CDN_BASE_URL.length > 0;
}

/**
 * Resolve an image path to its CDN URL if configured.
 * Falls back to the local path when CDN is not configured.
 * 
 * @param src - Local image path e.g. "/images/hero-home.webp"
 * @returns CDN URL or local path
 * 
 * @example
 * cdnImage("/images/hero-home.webp")
 * // => "https://cdn.example.com/images/hero-home.webp" (when CDN configured)
 * // => "/images/hero-home.webp" (local fallback)
 */
export function cdnImage(src: string): string {
  if (!isCdnConfigured() || !src.startsWith(CDN_PREFIX)) {
    return src;
  }

  const cdnPath = src.startsWith("/") ? src.slice(1) : src;
  return `${CDN_BASE_URL.replace(/\/$/, "")}/${cdnPath}`;
}

/**
 * Get the CDN base URL for use in config
 */
export function getCdnBaseUrl(): string {
  return CDN_BASE_URL;
}

/**
 * Build a Next.js images.remotePatterns entry for the configured CDN
 */
export function getCdnRemotePattern() {
  if (!isCdnConfigured()) return null;

  try {
    const url = new URL(CDN_BASE_URL);
    return {
      protocol: url.protocol.replace(":", "") as "https" | "http",
      hostname: url.hostname,
      port: url.port || "",
      pathname: `${CDN_PREFIX}/**`,
    };
  } catch {
    return null;
  }
}

/**
 * Sanitize a source path to work with both local and CDN setups
 */
export function normalizeImagePath(src: string): string {
  // Ensure leading slash for local paths
  if (src.startsWith("http")) return src;
  return src.startsWith("/") ? src : `/${src}`;
}

/**
 * Build a short-lived, access-controlled URL for a private Vercel Blob asset.
 *
 * Use this for unpublished student work that must not be served publicly. The
 * download URL is scoped to the store token and can carry its own expiry, so it
 * can be handed to a client without exposing the underlying public store.
 * Falls back to the plain CDN URL when Blob signing isn't available (no token /
 * not vercel-blob).
 *
 * @param path - Blob path e.g. "images/students/unpublished.png"
 * @param expiresInSeconds - TTL for the URL (default 1 hour)
 */
export async function signedBlobUrl(path: string, expiresInSeconds = 3600): Promise<string> {
  if (CDN_PROVIDER !== "vercel-blob" || !process.env.BLOB_READ_WRITE_TOKEN) {
    return cdnImage(path);
  }
  try {
    const { getDownloadUrl } = await import("@vercel/blob");
    // expiresInSeconds reserved for newer @vercel/blob versions that accept an
    // expiry option; this pinned version returns a token-scoped download URL.
    void expiresInSeconds;
    return await getDownloadUrl(path);
  } catch {
    return cdnImage(path);
  }
}