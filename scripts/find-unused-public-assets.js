/**
 * Unreferenced public/ asset finder for Meenakshi Art Work
 *
 * Walks public/images and public/audio and reports any file or directory
 * whose name never appears anywhere in app/, components/, data/, or lib/ —
 * i.e. dead weight sitting in the deployment with zero functional purpose.
 *
 * This generalizes a manual audit from 2026-08-20 that found ~72MB of dead
 * reference/mockup folders this way (elephant-mockup/, tiger-page-layout/,
 * a stray bal-gopal-krishna/ folder, academy/to-be-deleted/,
 * font-to-inherit-from/) purely by grepping folder names against source.
 *
 * Report-only — never deletes anything. Deletion is a human decision.
 *
 * Run with: node scripts/find-unused-public-assets.js
 */

const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const ASSET_ROOTS = ["public/images", "public/audio"];
// `scripts` is included because build-time tooling (e.g. build_students_mosaic.py)
// reads raw source photos that never appear in app/components/data/lib — excluding
// it produced false positives (flagging genuinely-used mosaic source images) when
// this script was first written.
const SOURCE_ROOTS = ["app", "components", "data", "lib", "scripts"];
const SOURCE_EXTENSIONS = new Set([".ts", ".tsx", ".js", ".jsx", ".mjs", ".css", ".md", ".py"]);

function readAllSourceText() {
  const chunks = [];
  for (const root of SOURCE_ROOTS) {
    const dir = path.join(ROOT, root);
    if (!fs.existsSync(dir)) continue;
    walkSource(dir, chunks);
  }
  return chunks.join("\n");
}

function walkSource(dir, chunks) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkSource(full, chunks);
    } else if (SOURCE_EXTENSIONS.has(path.extname(entry.name))) {
      chunks.push(fs.readFileSync(full, "utf8"));
    }
  }
}

function dirSize(dir) {
  let total = 0;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    total += entry.isDirectory() ? dirSize(full) : fs.statSync(full).size;
  }
  return total;
}

function formatBytes(bytes) {
  if (bytes >= 1024 * 1024) return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
  if (bytes >= 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${bytes} B`;
}

/**
 * Check an asset (file or directory) for references. Directories are
 * checked by name (matches how this class of dead weight was found
 * manually — a whole reference/mockup folder that nothing ever imports).
 * Files are checked by their site-relative path (how data/*.ts stores
 * image src strings) and by basename as a fallback for computed paths.
 */
function isReferenced(sourceText, assetPath, isDirectory) {
  const name = path.basename(assetPath);
  if (isDirectory) {
    return sourceText.includes(name);
  }
  const siteRelative = "/" + path.relative(path.join(ROOT, "public"), assetPath).split(path.sep).join("/");
  const basenameNoExt = name.replace(path.extname(name), "");
  return sourceText.includes(siteRelative) || sourceText.includes(basenameNoExt);
}

function scan(dir, sourceText, results) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    const referenced = isReferenced(sourceText, full, entry.isDirectory());
    if (!referenced) {
      const size = entry.isDirectory() ? dirSize(full) : fs.statSync(full).size;
      results.push({ path: path.relative(ROOT, full), size, isDirectory: entry.isDirectory() });
      continue; // don't descend into an already-unreferenced directory
    }
    if (entry.isDirectory()) {
      scan(full, sourceText, results);
    }
  }
}

function main() {
  const sourceText = readAllSourceText();
  const results = [];
  for (const assetRoot of ASSET_ROOTS) {
    const dir = path.join(ROOT, assetRoot);
    if (!fs.existsSync(dir)) continue;
    scan(dir, sourceText, results);
  }

  results.sort((a, b) => b.size - a.size);

  if (results.length === 0) {
    console.log("No unreferenced assets found under " + ASSET_ROOTS.join(", ") + ".");
    return;
  }

  const total = results.reduce((sum, r) => sum + r.size, 0);
  console.log(`Found ${results.length} unreferenced asset(s), ${formatBytes(total)} total:\n`);
  for (const r of results) {
    console.log(`  ${formatBytes(r.size).padStart(9)}  ${r.isDirectory ? r.path + "/" : r.path}`);
  }
  console.log("\nThis is a report only — nothing was deleted. Verify before removing:");
  console.log("  a stray naming coincidence (e.g. a folder name that also appears in unrelated prose)");
  console.log("  can produce a false negative (looks referenced, isn't); this script cannot produce");
  console.log("  false positives from computed/templated paths it can't statically see, so double-check");
  console.log("  anything surprising before deleting.");
}

main();
