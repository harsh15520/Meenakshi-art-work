import fs from "node:fs";
import path from "node:path";

/**
 * Checks whether a `public/`-relative image src (as used in `<Image src="...">`)
 * actually resolves to a file on disk. Server-only — for filtering data-driven
 * lists (e.g. marquee carousels) so entries pointing at missing/renamed assets
 * are dropped instead of rendering as blank/broken cards.
 */
export function existsInPublic(src: string): boolean {
  if (!src || src.startsWith("http://") || src.startsWith("https://")) return true;

  try {
    const decoded = decodeURIComponent(src);
    const filePath = path.join(process.cwd(), "public", decoded.replace(/^\//, ""));
    return fs.existsSync(filePath);
  } catch {
    return false;
  }
}
