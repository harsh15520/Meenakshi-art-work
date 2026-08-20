#!/usr/bin/env node
/**
 * CDN Upload Script
 * 
 * Uploads local /public/images to a configured CDN.
 * 
 * Supported providers:
 * - vercel-blob: Uses @vercel/blob SDK (requires BLOB_READ_WRITE_TOKEN)
 * - cloudinary: Uses Cloudinary REST API (requires CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET)
 * 
 * Usage:
 *   node scripts/upload-to-cdn.mjs --provider=vercel-blob
 *   node scripts/upload-to-cdn.mjs --provider=cloudinary
 * 
 * Environment variables:
 *   Vercel Blob:  BLOB_READ_WRITE_TOKEN
 *   Cloudinary:   CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET
 */

import { readdirSync, statSync, readFileSync, renameSync, unlinkSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";
import { createHash } from "node:crypto";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC_IMAGES_DIR = join(__dirname, "../public/images");

function parseArgs() {
  const args = process.argv.slice(2);
  const opts = {};
  for (const arg of args) {
    if (arg.startsWith("--provider=")) opts.provider = arg.split("=")[1];
  }
  return opts;
}

function walkDir(dir) {
  const files = [];
  for (const entry of readdirSync(dir)) {
    const fullPath = join(dir, entry);
    const stat = statSync(fullPath);
    if (stat.isDirectory()) {
      files.push(...walkDir(fullPath));
    } else if (/\.(webp|png|jpe?g|gif|avif)$/i.test(entry)) {
      files.push(fullPath);
    }
  }
  return files;
}

function fileHash(filePath) {
  return createHash("sha1").update(readFileSync(filePath)).digest("hex").slice(0, 12);
}

// How many uploads may be in flight at once (configurable via env, default 8).
const CONCURRENCY = Math.max(1, parseInt(process.env.CDN_UPLOAD_CONCURRENCY || "8", 10) || 1);

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Atomically write a file (temp sibling + rename) so a reader never sees a
 * half-written mapping. Retries once on a transient EPERM (Windows file lock).
 */
function writeFileAtomicSync(filePath, data) {
  const tmpPath = `${filePath}.${process.pid}.tmp`;
  const commit = () => {
    writeFileSync(tmpPath, data);
    renameSync(tmpPath, filePath);
  };
  try {
    commit();
  } catch (err) {
    try { unlinkSync(tmpPath); } catch {}
    if (err && (err.code === "EPERM" || err.code === "EACCES")) {
      const end = Date.now() + 300;
      while (Date.now() < end) {} // brief synchronous wait for lock release
      commit();
      return;
    }
    throw err;
  }
}

/**
 * Run `fn` over `items`, at most `limit` at a time (a bounded concurrency pool),
 * preserving input order in the returned array.
 */
async function mapWithConcurrency(items, limit, fn) {
  const results = new Array(items.length);
  let cursor = 0;
  async function worker() {
    while (cursor < items.length) {
      const index = cursor++;
      results[index] = await fn(items[index], index);
    }
  }
  const workerCount = Math.min(Math.max(limit, 1), Math.max(items.length, 1));
  await Promise.all(Array.from({ length: workerCount }, worker));
  return results;
}

/**
 * Retry a promise-returning call with exponential backoff + jitter on transient
 * failures (network errors, 429, and 5xx). Definitively-thrown errors carrying a
 * non-retryable HTTP status (4xx other than 429) are re-thrown immediately.
 */
async function withRetry(fn, { attempts = 4, baseDelayMs = 500 } = {}) {
  let lastError;
  for (let attempt = 0; attempt < attempts; attempt++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err;
      const status = err && (err.status || err.statusCode);
      if (status && status >= 400 && status < 500 && status !== 429) throw err;
      if (attempt < attempts - 1) {
        await sleep(baseDelayMs * 2 ** attempt + Math.random() * 250);
      }
    }
  }
  throw lastError;
}

async function uploadToVercelBlob(files) {
  const { put } = await import("@vercel/blob");
  const results = [];
  let uploaded = 0;
  let skipped = 0;

  const task = async (filePath) => {
    const rel = relative(PUBLIC_IMAGES_DIR, filePath).replace(/\\/g, "/");
    const blobPath = `images/${rel}`;
    const data = readFileSync(filePath);

    try {
      const blob = await withRetry(() =>
        put(blobPath, data, {
          access: "public",
          addRandomSuffix: false,
        })
      );
      uploaded++;
      process.stdout.write(`  ✓ ${rel} → ${blob.url}\n`);
      return { local: `/images/${rel}`, url: blob.url, status: "uploaded" };
    } catch (err) {
      process.stderr.write(`  ✗ ${rel}: ${err.message}\n`);
      return { local: `/images/${rel}`, url: "", error: err.message };
    }
  };

  results.push(...(await mapWithConcurrency(files, CONCURRENCY, task)));
  return { uploaded, skipped, results };
}

async function uploadToCloudinary(files) {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    throw new Error("Cloudinary requires CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET env vars");
  }

  const results = [];
  let uploaded = 0;
  let skipped = 0;

  const task = async (filePath) => {
    const rel = relative(PUBLIC_IMAGES_DIR, filePath).replace(/\\/g, "/");
    const publicId = `images/${rel.replace(/\.[^.]+$/, "")}`;

    const form = new FormData();
    const data = readFileSync(filePath);
    const blob = new Blob([data], { type: `image/${rel.split(".").pop().replace("jpg", "jpeg")}` });
    form.append("file", blob, rel);
    form.append("public_id", publicId);
    const timestamp = Math.floor(Date.now() / 1000);
    form.append("timestamp", String(timestamp));
    form.append("api_key", apiKey);

    const payload = `public_id=${encodeURIComponent(publicId)}&timestamp=${timestamp}&api_key=${apiKey}`;
    const signature = createHash("sha1").update(`${payload}${apiSecret}`).digest("hex");
    form.append("signature", signature);

    try {
      const doUpload = async () => {
        const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
          method: "POST",
          body: form,
        });
        if (!res.ok) {
          // 429/5xx are transient → throw (withRetry retries); other 4xx are fatal.
          const message = `HTTP ${res.status}: ${(await res.text()).slice(0, 500)}`;
          const err = new Error(message);
          if (res.status !== 429 && res.status < 500) err.status = res.status;
          throw err;
        }
        return res.json();
      };

      const json = await withRetry(doUpload);
      uploaded++;
      process.stdout.write(`  ✓ ${rel} → ${json.secure_url}\n`);
      return { local: `/images/${rel}`, url: json.secure_url, status: "uploaded" };
    } catch (err) {
      process.stderr.write(`  ✗ ${rel}: ${err.message}\n`);
      return { local: `/images/${rel}`, url: "", error: err.message };
    }
  };

  results.push(...(await mapWithConcurrency(files, CONCURRENCY, task)));
  return { uploaded, skipped, results };
}

async function main() {
  const { provider = "vercel-blob" } = parseArgs();

  console.log("\n📦 CDN Upload Script");
  console.log(`   Provider: ${provider}`);
  console.log(`   Directory: ${PUBLIC_IMAGES_DIR}\n`);

  const files = walkDir(PUBLIC_IMAGES_DIR);
  console.log(`   Found ${files.length} image files\n`);

  if (files.length === 0) {
    console.log("   No images to upload.");
    return;
  }

  let result;
  if (provider === "vercel-blob") {
    result = await uploadToVercelBlob(files);
  } else if (provider === "cloudinary") {
    result = await uploadToCloudinary(files);
  } else {
    console.error(`   Unknown provider: ${provider}`);
    console.error("   Supported: vercel-blob, cloudinary");
    process.exit(1);
  }

  console.log(`\n   Done: ${result.uploaded} uploaded, ${result.skipped} skipped`);

  // Write mapping file for reference
  const outputFile = join(__dirname, "../cdn-mapping.json");
  const mapping = {
    provider,
    uploadedAt: new Date().toISOString(),
    files: result.results.filter((r) => r.status === "uploaded").map(({ local, url }) => ({ local, url })),
  };
  writeFileAtomicSync(outputFile, JSON.stringify(mapping, null, 2));
  console.log(`   Mapping saved to cdn-mapping.json`);
}

main().catch((err) => {
  console.error("\n❌ Upload failed:", err.message);
  process.exit(1);
});