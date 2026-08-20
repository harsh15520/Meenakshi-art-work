import type { MetadataRoute } from "next";
import { buildAbsoluteUrl } from "@/lib/site";

/**
 * /robots.txt — generated from the configured site URL (no hardcoded domain).
 * Allows all crawlers and points them at the XML sitemap.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: buildAbsoluteUrl("/sitemap.xml"),
  };
}