/**
 * Image Swap Script — Replace originals with WebP versions
 * 
 * Strategy:
 * 1. For each WebP file in public/images/, rename it to match its original's filename
 *    (e.g., hero-home.webp → hero-home.png) — browsers detect format by content-type, not extension
 * 2. Move all original files (PNG/JPG/JPEG/GIF) to public/images-originals/ as backup
 * 3. Keep non-image files (desktop.ini, settings.local, etc.) in place
 * 
 * Result: All code references to /images/... resolve to WebP content with zero code changes.
 * 
 * Run with: node scripts/swap-images.js
 */

const fs = require('fs');
const path = require('path');

const IMAGE_DIR = path.join(process.cwd(), 'public/images');
const BACKUP_DIR = path.join(process.cwd(), 'public/images-originals');

// Non-image extensions to keep in place
const NON_IMAGE_EXTS = new Set(['.ini', '.json', '.py', '.local']);

function walkDir(dir, out = []) {
  fs.readdirSync(dir).forEach((f) => {
    const fp = path.join(dir, f);
    const stat = fs.statSync(fp);
    if (stat.isDirectory()) {
      walkDir(fp, out);
    } else {
      out.push({ name: f, ext: path.extname(f).toLowerCase(), size: stat.size, path: fp, dir });
    }
  });
  return out;
}

/**
 * Rename with a transient-EPERM retry. `renameSync` is atomic on a single
 * volume, so retrying preserves that property; Windows can briefly hold a file
 * lock (e.g. a running dev server), causing EPERM.
 */
function renameWithRetry(fromPath, toPath, attempts = 3) {
  for (let i = 0; i < attempts; i++) {
    try {
      fs.renameSync(fromPath, toPath);
      return;
    } catch (err) {
      if (err && (err.code === 'EPERM' || err.code === 'EACCES') && i < attempts - 1) {
        const end = Date.now() + 200;
        while (Date.now() < end) {} // brief synchronous wait for lock release
        continue;
      }
      throw err;
    }
  }
}

function main() {
  console.log('🔄 Image Swap Script\n');

  const files = walkDir(IMAGE_DIR);
  const webpFiles = files.filter((f) => f.ext === '.webp');
  const originalFiles = files.filter((f) => f.ext !== '.webp' && !NON_IMAGE_EXTS.has(f.ext));
  const nonImageFiles = files.filter((f) => NON_IMAGE_EXTS.has(f.ext));

  console.log(`Total files: ${files.length}`);
  console.log(`WebP files: ${webpFiles.length}`);
  console.log(`Original files (to backup): ${originalFiles.length}`);
  console.log(`Non-image files (keep in place): ${nonImageFiles.length}\n`);

  // Build map of base name → webp file
  const webpByBase = new Map();
  webpFiles.forEach((f) => {
    const base = path.basename(f.name, '.webp');
    const relDir = path.relative(IMAGE_DIR, f.dir);
    const key = path.join(relDir, base).replace(/\\/g, '/');
    webpByBase.set(key, f);
  });

  // Find originals that have a WebP twin
  const originalsWithTwin = [];
  const originalsWithoutTwin = [];

  originalFiles.forEach((f) => {
    const base = path.basename(f.name, f.ext);
    const relDir = path.relative(IMAGE_DIR, f.dir);
    const key = path.join(relDir, base).replace(/\\/g, '/');
    if (webpByBase.has(key)) {
      originalsWithTwin.push({ original: f, webp: webpByBase.get(key) });
    } else {
      originalsWithoutTwin.push(f);
    }
  });

  console.log(`Originals WITH WebP twin: ${originalsWithTwin.length}`);
  console.log(`Originals WITHOUT WebP twin: ${originalsWithoutTwin.length}\n`);

  if (originalsWithoutTwin.length > 0) {
    console.log('⚠️  Originals without WebP twin (will be kept in place):');
    originalsWithoutTwin.forEach((f) => {
      console.log(`   ${path.relative(IMAGE_DIR, f.path)}`);
    });
    console.log('');
  }

  // Create backup directory
  if (!fs.existsSync(BACKUP_DIR)) {
    fs.mkdirSync(BACKUP_DIR, { recursive: true });
  }

  let renamed = 0;
  let backedUp = 0;
  let errors = 0;

  // Step 1: Move originals to backup FIRST (so WebP can take their names)
  console.log('📦 Step 1: Moving originals to public/images-originals/...');
  originalsWithTwin.forEach(({ original }) => {
    try {
      const relPath = path.relative(IMAGE_DIR, original.path);
      const backupPath = path.join(BACKUP_DIR, relPath);
      fs.mkdirSync(path.dirname(backupPath), { recursive: true });
      renameWithRetry(original.path, backupPath);
      backedUp++;
    } catch (err) {
      console.error(`   ✗ Failed to backup ${path.relative(IMAGE_DIR, original.path)}: ${err.message}`);
      errors++;
    }
  });
  console.log(`   Backed up: ${backedUp} files\n`);

  // Step 2: Rename WebP files to match original filenames
  console.log('📝 Step 2: Renaming WebP files to original filenames...');
  originalsWithTwin.forEach(({ original, webp }) => {
    try {
      const newPath = path.join(webp.dir, original.name);
      renameWithRetry(webp.path, newPath);
      renamed++;
    } catch (err) {
      console.error(`   ✗ Failed to rename ${path.relative(IMAGE_DIR, webp.path)}: ${err.message}`);
      errors++;
    }
  });
  console.log(`   Renamed: ${renamed} files\n`);

  // Summary
  console.log('📊 Summary:');
  console.log(`   WebP renamed to original names: ${renamed}`);
  console.log(`   Originals moved to backup: ${backedUp}`);
  console.log(`   Errors: ${errors}`);
  console.log(`   Non-image files kept in place: ${nonImageFiles.length}`);
  console.log(`   Originals without twin kept in place: ${originalsWithoutTwin.length}`);
  console.log(`\n✅ Done! public/images now contains WebP content with original filenames.`);
  console.log(`   Originals preserved in: public/images-originals/`);
  console.log(`   Zero code changes needed.`);
}

main();