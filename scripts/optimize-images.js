/**
 * Image Optimization Script for Meenakshi Art Work
 * 
 * This script:
 * 1. Audits all images in public/images
 * 2. Generates a report of image sizes and optimization needs
 * 3. Creates a migration plan for CDN upload
 * 
 * Run with: node scripts/optimize-images.js
 */

const fs = require('fs');
const path = require('path');

const IMAGE_DIR = path.join(process.cwd(), 'public/images');
const OUTPUT_FILE = path.join(process.cwd(), 'image-audit-report.json');

// Image extensions to audit
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.avif'];

// Size thresholds (in bytes)
const THRESHOLDS = {
  HERO: 200 * 1024,      // 200 KB - hero images should be optimized
  GALLERY: 150 * 1024,   // 150 KB - gallery images
  THUMBNAIL: 80 * 1024,  // 80 KB - thumbnails
  MAX: 500 * 1024        // 500 KB - any image above this needs immediate optimization
};

function getFileSize(filePath) {
  try {
    const stats = fs.statSync(filePath);
    return stats.size;
  } catch (error) {
    return 0;
  }
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

/**
 * Atomically write a file (temp sibling + rename) so a reader never sees a
 * half-written report. Retries once on a transient EPERM (Windows file lock).
 */
function writeFileAtomicSync(filePath, data) {
  const tmpPath = `${filePath}.${process.pid}.tmp`;
  const commit = () => {
    fs.writeFileSync(tmpPath, data);
    fs.renameSync(tmpPath, filePath);
  };
  try {
    commit();
  } catch (err) {
    try { fs.unlinkSync(tmpPath); } catch {}
    if (err && (err.code === 'EPERM' || err.code === 'EACCES')) {
      const end = Date.now() + 250;
      while (Date.now() < end) {} // brief synchronous wait for lock release
      commit();
      return;
    }
    throw err;
  }
}

function categorizeImage(filePath, size) {
  const relativePath = path.relative(IMAGE_DIR, filePath);
  const fileName = path.basename(filePath);
  
  // Categorize based on path and filename
  let category = 'general';
  let priority = 'low';
  
  if (relativePath.includes('academy') && (fileName.includes('hero') || fileName.includes('full'))) {
    category = 'hero';
    priority = 'high';
  } else if (relativePath.includes('hero')) {
    category = 'hero';
    priority = 'high';
  } else if (relativePath.includes('gallery') || relativePath.includes('painting')) {
    category = 'gallery';
    priority = 'medium';
  } else if (relativePath.includes('academy') || relativePath.includes('student')) {
    category = 'student';
    priority = 'medium';
  } else if (relativePath.includes('exhibition')) {
    category = 'exhibition';
    priority = 'high';
  } else if (fileName.includes('thumbnail') || fileName.includes('thumb')) {
    category = 'thumbnail';
    priority = 'low';
  }
  
  // Determine optimization need
  let needsOptimization = false;
  let reasons = [];
  
  if (size > THRESHOLDS.MAX) {
    needsOptimization = true;
    reasons.push(`Exceeds max size (${formatBytes(size)} > ${formatBytes(THRESHOLDS.MAX)})`);
  } else if (size > THRESHOLDS.HERO && category === 'hero') {
    needsOptimization = true;
    reasons.push(`Hero image too large (${formatBytes(size)})`);
  } else if (size > THRESHOLDS.GALLERY && (category === 'gallery' || category === 'exhibition')) {
    needsOptimization = true;
    reasons.push(`Gallery/exhibition image too large (${formatBytes(size)})`);
  } else if (size > THRESHOLDS.THUMBNAIL && category === 'thumbnail') {
    needsOptimization = true;
    reasons.push(`Thumbnail too large (${formatBytes(size)})`);
  }
  
  // Check format
  const ext = path.extname(filePath).toLowerCase();
  if (ext === '.png' && size > 100 * 1024) {
    needsOptimization = true;
    reasons.push('Large PNG - consider converting to WebP/AVIF');
  }
  
  return {
    category,
    priority,
    needsOptimization,
    reasons
  };
}

function auditImages() {
  console.log('🔍 Starting image audit...\n');
  
  const report = {
    timestamp: new Date().toISOString(),
    totalImages: 0,
    totalSize: 0,
    needsOptimization: 0,
    byCategory: {},
    images: [],
    summary: {}
  };
  
  function walkDirectory(dir) {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        walkDirectory(filePath);
      } else if (IMAGE_EXTENSIONS.includes(path.extname(file).toLowerCase())) {
        const size = getFileSize(filePath);
        const relativePath = path.relative(IMAGE_DIR, filePath);
        const { category, priority, needsOptimization, reasons } = categorizeImage(filePath, size);
        
        report.totalImages++;
        report.totalSize += size;
        
        if (needsOptimization) {
          report.needsOptimization++;
        }
        
        // Track by category
        if (!report.byCategory[category]) {
          report.byCategory[category] = {
            count: 0,
            totalSize: 0,
            needsOptimization: 0
          };
        }
        report.byCategory[category].count++;
        report.byCategory[category].totalSize += size;
        if (needsOptimization) {
          report.byCategory[category].needsOptimization++;
        }
        
        // Add to images list (only if needs optimization or is high priority)
        if (needsOptimization || priority === 'high') {
          report.images.push({
            path: relativePath,
            size: size,
            sizeFormatted: formatBytes(size),
            category,
            priority,
            needsOptimization,
            reasons
          });
        }
      }
    });
  }
  
  walkDirectory(IMAGE_DIR);
  
  // Calculate summary
  report.summary = {
    totalImages: report.totalImages,
    totalSizeFormatted: formatBytes(report.totalSize),
    needsOptimization: report.needsOptimization,
    optimizationRate: ((report.needsOptimization / report.totalImages) * 100).toFixed(2) + '%',
    categories: Object.keys(report.byCategory).map(cat => ({
      name: cat,
      count: report.byCategory[cat].count,
      totalSize: formatBytes(report.byCategory[cat].totalSize),
      needsOptimization: report.byCategory[cat].needsOptimization
    }))
  };
  
  // Sort images by size (largest first)
  report.images.sort((a, b) => b.size - a.size);
  
  // Save report
  writeFileAtomicSync(OUTPUT_FILE, JSON.stringify(report, null, 2));
  
  // Print summary
  console.log('📊 Image Audit Complete!\n');
  console.log('Summary:');
  console.log(`  Total Images: ${report.totalImages}`);
  console.log(`  Total Size: ${formatBytes(report.totalSize)}`);
  console.log(`  Needs Optimization: ${report.needsOptimization} (${report.summary.optimizationRate})`);
  console.log('\nBy Category:');
  report.summary.categories.forEach(cat => {
    console.log(`  ${cat.name}: ${cat.count} images, ${cat.totalSize}, ${cat.needsOptimization} need optimization`);
  });
  console.log('\nTop 10 Largest Images:');
  report.images.slice(0, 10).forEach((img, i) => {
    console.log(`  ${i + 1}. ${img.path} (${img.sizeFormatted}) - ${img.priority} priority`);
    if (img.needsOptimization) {
      console.log(`     ⚠️  ${img.reasons.join(', ')}`);
    }
  });
  console.log(`\n📄 Full report saved to: ${OUTPUT_FILE}`);
  
  return report;
}

// Run audit
const report = auditImages();

// Exit with error code if optimization needed
if (report.needsOptimization > 0) {
  console.log(`\n⚠️  ${report.needsOptimization} images need optimization!`);
  console.log('Run the optimization script to fix these issues.');
  process.exit(1);
} else {
  console.log('\n✅ All images are optimized!');
  process.exit(0);
}