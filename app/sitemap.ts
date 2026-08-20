import type { MetadataRoute } from "next";
import { publicArtistProfiles } from "@/data/artists";
import { journalEntries } from "@/data/journal";
import { getAllPaintingStories } from "@/data/paintingStories";
import { buildAbsoluteUrl } from "@/lib/site";

/**
 * /sitemap.xml — generated from the real data store so new students, journal
 * entries and painting stories are automatically included on the next build.
 * Uses buildAbsoluteUrl() so URLs always carry the configured site domain.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const url = (path: string) => buildAbsoluteUrl(path);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: url("/"), lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: url("/academy"), lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: url("/gallery"), lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: url("/custom-orders"), lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: url("/journal"), lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: url("/contact"), lastModified: now, changeFrequency: "monthly", priority: 0.6 },
  ];

  const academyRoutes: MetadataRoute.Sitemap = publicArtistProfiles.flatMap((a) => [
    { url: url(`/academy/${a.slug}`), lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    ...a.artworks.map((aw) => ({
      url: url(`/academy/${a.slug}/${aw.artworkSlug}`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
  ]);

  const journalRoutes: MetadataRoute.Sitemap = journalEntries.map((e) => ({
    url: url(`/journal/${e.slug}`),
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const paintingRoutes: MetadataRoute.Sitemap = getAllPaintingStories().map((p) => ({
    url: url(`/painting/${p.slug}`),
    lastModified: now,
    changeFrequency: "yearly" as const,
    priority: 0.5,
  }));

  return [...staticRoutes, ...academyRoutes, ...journalRoutes, ...paintingRoutes];
}