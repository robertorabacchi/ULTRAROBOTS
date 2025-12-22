import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const logosDir = 'public/assets/logos';
const variants = [
  'ultrarobots-white',
  'ultrarobots-black',
  'ultrarobots-white-ciano',
  'ultrarobots-black-ciano'
];

async function generateLogos() {
  for (const variant of variants) {
    const svgPath = path.join(logosDir, `${variant}.svg`);
    const pngPath = path.join(logosDir, `${variant}.png`);
    const webpPath = path.join(logosDir, `${variant}.webp`);

    console.log(`Generating PNG and WebP for ${variant}...`);

    try {
      // Generate PNG
      await sharp(svgPath)
        .resize(1200) // Base width 1200px for high quality
        .png()
        .toFile(pngPath);

      // Generate WebP
      await sharp(svgPath)
        .resize(1200)
        .webp({ quality: 90 })
        .toFile(webpPath);

      console.log(`✓ ${variant} generated.`);
    } catch (error) {
      console.error(`✗ Error generating ${variant}:`, error);
    }
  }
}

generateLogos();

