import { execSync } from 'child_process';
import { readdir, stat } from 'fs/promises';
import { join } from 'path';

const AUDIO_DIR = join(process.cwd(), 'public/audio');
const OUTPUT_DIR = join(process.cwd(), 'public/audio');

const files = await readdir(AUDIO_DIR);
const mp3Files = files.filter(f => f.endsWith('.mp3'));

console.log(`Found ${mp3Files.length} MP3 files to convert...`);

for (const file of mp3Files) {
  const inputPath = join(AUDIO_DIR, file);
  const outputPath = join(OUTPUT_DIR, file.replace('.mp3', '.opus'));
  
  try {
    const inputStats = await stat(inputPath);
    const inputSizeMB = (inputStats.size / (1024 * 1024)).toFixed(2);
    
    console.log(`\nConverting: ${file} (${inputSizeMB} MB)`);
    
    // Convert to Opus at 64kbps mono (good quality, small size)
    execSync(
      `ffmpeg -i "${inputPath}" -c:a libopus -b:a 64k -ac 1 -ar 48000 "${outputPath}" -y`,
      { stdio: 'inherit' }
    );
    
    const outputStats = await stat(outputPath);
    const outputSizeMB = (outputStats.size / (1024 * 1024)).toFixed(2);
    const reduction = ((1 - outputStats.size / inputStats.size) * 100).toFixed(1);
    
    console.log(`✓ Converted to: ${file.replace('.mp3', '.opus')} (${outputSizeMB} MB, ${reduction}% reduction)`);
  } catch (error) {
    console.error(`✗ Failed to convert ${file}:`, error.message);
  }
}

console.log('\n✓ Audio conversion complete!');
console.log('\nNext steps:');
console.log('1. Update audio player components to use .opus files');
console.log('2. Add preload links to page headers');
console.log('3. Update .gitignore to exclude .mp3 files (keep originals in audio-originals/)');