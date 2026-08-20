/**
 * Image Compression Script for Meenakshi Art Work
 * 
 * Compresses and converts images to WebP/AVIF formats
 * Run with: node scripts/compress-images.js
 * 
 * Requires: sharp (already in Next.js dependencies)
 */

const fs = require('fs');
const path = require('path');

const IMAGE_DIR = path.join(process.cwd(), 'public/images');
const OUTPUT_DIR = path.join(process.cwd(), 'public/images-optimized');

// Quality settings
const QUALITY = {
  WEBP: 85,
  AVIF: 70,
  JPEG: 85,
  PNG: 80
};

// How many images to compress at once (bounded concurrency, env-tunable).
const CONCURRENCY = Math.max(1, parseInt(process.env.CDN_UPLOAD_CONCURRENCY || '8', 10) || 1);

/**
 * Run `fn` over `items`, at most `limit` at a time (bounded concurrency pool).
 * Counter increments inside tasks are safe: JS is single-threaded, so each
 * task's post-await increments happen serially.
 */
async function mapWithConcurrency(items, limit, fn) {
  let cursor = 0;
  async function worker() {
    while (cursor < items.length) {
      await fn(items[cursor++]);
    }
  }
  const count = Math.min(Math.max(limit, 1), Math.max(items.length, 1));
  await Promise.all(Array.from({ length: count }, worker));
}

/**
 * Atomically write a file: write to a temp sibling then rename into place so a
 * crash or concurrent reader never sees a half-written file. Retries once on a
 * transient EPERM (Windows file lock, e.g. a dev server holding the file).
 */
async function writeFileAtomic(filePath, data) {
  const dir = path.dirname(filePath);
  await fs.promises.mkdir(dir, { recursive: true });
  const tmpPath = `${filePath}.${process.pid}.tmp`;
  const commit = async () => {
    await fs.promises.writeFile(tmpPath, data);
    await fs.promises.rename(tmpPath, filePath);
  };
  try {
    await commit();
  } catch (err) {
    try { await fs.promises.unlink(tmpPath); } catch {}
    if (err && (err.code === 'EPERM' || err.code === 'EACCES')) {
      // Transient Windows lock — wait briefly and retry once.
      await new Promise((r) => setTimeout(r, 250));
      await commit();
      return;
    }
    throw err;
  }
}

async function compressImages() {
  console.log('🚀 Starting image compression...\n');

  // Check if sharp is available
  try {
    const sharp = require('sharp');
    console.log('✅ Sharp library found\n');
  } catch (error) {
    console.error('❌ Sharp library not found. Installing...');
    console.log('Run: npm install sharp');
    process.exit(1);
  }
  
  const sharp = require('sharp');
  
  // Create output directory
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }
  
  let processed = 0;
  let errors = 0;
  
  async function processDirectory(dir, relativePath = '') {
    const files = fs.readdirSync(dir);
    const imageJobs = [];

    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        // Create corresponding output directory
        const outputSubDir = path.join(OUTPUT_DIR, relativePath, file);
        if (!fs.existsSync(outputSubDir)) {
          fs.mkdirSync(outputSubDir, { recursive: true });
        }
        await processDirectory(filePath, path.join(relativePath, file));
      } else {
        // Collect image files to compress
        const ext = path.extname(file).toLowerCase();
        if (['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext)) {
          imageJobs.push({ filePath, relativePath, file });
        }
      }
    }

    // Compress the images in this directory concurrently with a bounded pool.
    // Each output file has a unique path (and writes are atomic via temp+rename),
    // so parallel processing is safe.
    await mapWithConcurrency(imageJobs, CONCURRENCY, async ({ filePath, relativePath, file }) => {
      try {
        await compressImage(sharp, filePath, relativePath, file);
        processed++;
      } catch (error) {
        console.error(`❌ Error processing ${file}:`, error.message);
        errors++;
      }
    });
  }
  
  await processDirectory(IMAGE_DIR);
  
  console.log('\n📊 Compression Complete!');
  console.log(`  Processed: ${processed} images`);
  console.log(`  Errors: ${errors}`);
  console.log(`\n📁 Optimized images saved to: ${OUTPUT_DIR}`);
  console.log('\nNext steps:');
  console.log('1. Review images in public/images-optimized');
  console.log('2. Replace public/images with public/images-optimized');
  console.log('3. Run: rm -rf public/images && mv public/images-optimized public/images');
}

async function compressImage(sharp, filePath, relativePath, fileName) {
  const ext = path.extname(fileName).toLowerCase();
  const baseName = path.basename(fileName, ext);
  const outputPath = path.join(OUTPUT_DIR, relativePath, `${baseName}.webp`);
  
  // Get original size
  const originalSize = fs.statSync(filePath).size;
  
  // Skip if already WebP and small enough
  if (ext === '.webp' && originalSize < 200 * 1024) {
    return;
  }
  
  try {
    // Compress and convert to WebP
    const metadata = await sharp(filePath).metadata();
    
    let pipeline = sharp(filePath);
    
    // Resize if too large (max 2400px on longest side)
    if (metadata.width > 2400 || metadata.height > 2400) {
      pipeline = pipeline.resize(2400, 2400, {
        fit: 'inside',
        withoutEnlargement: true
      });
    }
    
    // Convert to WebP with quality
    const webpBuffer = await pipeline
      .webp({ quality: QUALITY.WEBP })
      .toBuffer();
    
    // Save WebP version
    await writeFileAtomic(outputPath, webpBuffer);
    
    const newSize = webpBuffer.length;
    const saved = originalSize - newSize;
    
    if (saved > 0) {
      const savingsPercent = ((saved / originalSize) * 100).toFixed(1);
      console.log(`✅ ${path.join(relativePath, fileName)}`);
      console.log(`   ${formatBytes(originalSize)} → ${formatBytes(newSize)} (${savingsPercent}% saved)`);
    } else {
      console.log(`⚠️  ${path.join(relativePath, fileName)} - no savings (${formatBytes(originalSize)})`);
    }
    
  } catch (error) {
    throw new Error(`Failed to compress: ${error.message}`);
  }
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

// Run compression
compressImages().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});