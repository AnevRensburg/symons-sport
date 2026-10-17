#!/usr/bin/env node
/**
 * One-time image pipeline: converts the originals from the old static site
 * (../symons-sport/images and ../symons-sport/logos) into AVIF + WebP at a few
 * widths, writes them to public/images, and generates a typed manifest that the
 * <app-picture> component reads (intrinsic size + available widths).
 *
 * Usage: npm run images [-- --source ../symons-sport]
 *
 * sharp is a devDependency only; the committed output is what ships.
 */
import { copyFile, mkdir, rm, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const sourceArg = process.argv.indexOf('--source');
const source = path.resolve(root, sourceArg > -1 ? process.argv[sourceArg + 1] : '../symons-sport');
const outDir = path.join(root, 'public/images');
const manifestFile = path.join(root, 'src/app/data/image-manifest.ts');

/** [source path relative to old site, output name (kebab-case, no extension)] */
const products = [
  ['images/products/ee-skidplate.png', 'ee-skidplate'],
  ['images/products/billet-rad.png', 'ee-billet-radiator-guards'],
  ['images/products/ee-radiator-braces.png', 'ee-radiator-braces'],
  ['images/products/ee-lower-fork-protector.png', 'ee-lower-fork-protector'],
  ['images/products/ee-front-disk-guard.png', 'ee-front-disc-guard'],
  ['images/products/ee-rear-disc-guard.png', 'ee-rear-disc-guard'],
  ['images/products/ee-xtreme-skidplate.png', 'ee-xtreme-skidplate'],
  ['images/products/ee-bar-risers.png', 'ee-bar-risers'],
  ['images/products/Tools.png', 'ee-tools'],
  ['images/products/handguards-silver.png', 'ee-handguards-silver'],
  ['images/products/handguards-black.png', 'ee-handguards-black'],
  ['images/products/plastic-shields.png', 'ee-plastic-shields'],
  ['images/products/mtb-stand.png', 'mtb-stand'],
  ['images/products/mtb-bike.png', 'mtb-stand-with-bike'],
  ['images/products/excel-rims.png', 'excel-rims'],
  ['images/products/excel-torque-wrench-set.jpg', 'excel-torque-wrench-set'],
  ['images/products/excel-spokes.jpg', 'excel-spokes'],
  ['images/products/kite-complete-wheel.png', 'kite-complete-wheel'],
  ['images/products/complete-wheels-1.png', 'kite-hubs'],
  ['images/products/complete-wheels-2.png', 'kite-alpina-spokes'],
  ['images/products/seal-doctor.png', 'risk-seal-doctor'],
  ['images/products/palm-protectors.png', 'risk-palm-protectors'],
  ['images/products/Lock-n-Load Pro.png', 'risk-lock-n-load-pro'],
  ['images/products/haan-spokes.png', 'haan-spokes'],
  ['images/products/hour-meters.jpg', 'runleader-hour-meters'],
  ['images/products/tacho-meter.png', 'runleader-tacho-meter'],
  ['images/products/sprockets.png', 'supersprox-stealth-sprockets'],
  ['images/products/aluminium-sprockets.png', 'supersprox-aluminium-sprockets'],
  ['images/products/front-sprockets.png', 'supersprox-front-sprockets'],
  ['images/products/chain-guides.png', 'tmd-chain-guides'],
  ['images/products/TMD.png', 'tmd-chain-guide'],
  ['images/products/pivot-mx2.jpg', 'flex-pivot-mx-levers'],
  ['images/products/pro-pack.jpeg', 'bolts-pro-pack'],
  ['images/products/t-packs.jpeg', 'bolts-track-pack'],
  ['images/products/p-bolts.jpeg', 'bolts-plastics-fastener-kit'],
  ['images/products/s-bolts.jpeg', 'bolts-sprocket-disc'],
  ['images/products/brake-disks.png', 'brake-discs'],
];

const logos = [
  ['logos/SSI-logo.png', 'ssi-logo'],
  ['logos/EE-logo.png', 'enduro-engineering'],
  ['logos/Excel-logo.jpg', 'excel'],
  ['logos/Kite-logo.png', 'kite'],
  ['logos/Risk-logo.jpg', 'risk-racing'],
  ['logos/HaanWheels-logo.png', 'haan-wheels'],
  ['logos/CrossPro-logo.png', 'crosspro'],
  ['logos/Runleader-logo.jpg', 'runleader'],
  ['logos/SuperSprox-logo.jpg', 'supersprox'],
  ['logos/TMD-logo.jpg', 'tm-designworks'],
];

/** Groups: folder, target widths (never upscaled), encoder quality. */
const jobs = [
  {
    dir: 'hero',
    items: [['images/cropped background.jpg', 'home-hero']],
    widths: [640, 1280, 1920],
    avif: 50,
    webp: 70,
  },
  { dir: 'products', items: products, widths: [400, 800], avif: 55, webp: 78 },
  {
    dir: 'logos',
    items: logos.filter(([, n]) => n !== 'ssi-logo'),
    widths: [160, 320],
    avif: 60,
    webp: 82,
  },
  {
    dir: 'logos',
    items: logos.filter(([, n]) => n === 'ssi-logo'),
    widths: [250, 500],
    avif: 60,
    webp: 82,
  },
  {
    dir: 'elmer',
    items: [
      ['images/Elmer.png', 'elmer-racing'],
      ['images/Elmer-profile.jpg', 'elmer-portrait'],
    ],
    widths: [300, 600],
    avif: 55,
    webp: 78,
  },
];

const fmtKB = (bytes) => `${(bytes / 1024).toFixed(0)} kB`;
const fmtMB = (bytes) => `${(bytes / 1024 / 1024).toFixed(2)} MB`;

let before = 0;
let after = 0;
const manifest = {};

async function writeTracked(pipeline, file) {
  const info = await pipeline.toFile(file);
  after += info.size;
  return info;
}

await rm(outDir, { recursive: true, force: true });

for (const job of jobs) {
  await mkdir(path.join(outDir, job.dir), { recursive: true });
  for (const [rel, name] of job.items) {
    const input = path.join(source, rel);
    before += (await stat(input)).size;
    const meta = await sharp(input).metadata();
    const widths = [...new Set(job.widths.map((w) => Math.min(w, meta.width)))].sort(
      (a, b) => a - b,
    );
    let maxHeight = 0;
    for (const width of widths) {
      const base = sharp(input).rotate().resize({ width, withoutEnlargement: true });
      const out = path.join(outDir, job.dir, `${name}-${width}`);
      const info = await writeTracked(
        base.clone().avif({ quality: job.avif, effort: 6 }),
        `${out}.avif`,
      );
      await writeTracked(base.clone().webp({ quality: job.webp, effort: 6 }), `${out}.webp`);
      maxHeight = info.height;
    }
    const key = `${job.dir}/${name}`;
    manifest[key] = { width: widths.at(-1), height: maxHeight, widths };
    console.log(`${rel.padEnd(52)} -> ${key} [${widths.join(', ')}]`);
  }
}

// Open Graph / social preview: 1200x630 JPEG (AVIF/WebP are not reliably supported by crawlers).
const ogLogo = await sharp(path.join(source, 'logos/SSI-logo.png'))
  .resize({ width: 300 })
  .toBuffer();
const ogLogoMeta = await sharp(ogLogo).metadata();
const plate = Buffer.from(
  `<svg width="${ogLogoMeta.width + 48}" height="${ogLogoMeta.height + 48}"><rect width="100%" height="100%" rx="12" fill="#fff" fill-opacity="0.9"/></svg>`,
);
await writeTracked(
  sharp(path.join(source, 'images/cropped background.jpg'))
    .resize({ width: 1200, height: 630, fit: 'cover', position: 'top' })
    .composite([
      { input: plate, top: 40, left: 40 },
      { input: ogLogo, top: 64, left: 64 },
    ])
    .jpeg({ quality: 78, mozjpeg: true }),
  path.join(outDir, 'og-image.jpg'),
);

// Favicons: the SSI logo centred on a white square.
const square = (size) =>
  sharp(path.join(source, 'logos/SSI-logo.png'))
    .resize({ width: size, height: size, fit: 'contain', background: '#ffffff' })
    .flatten({ background: '#ffffff' })
    .png({ compressionLevel: 9, palette: true });
await writeTracked(square(48), path.join(root, 'public/favicon.png'));
await writeTracked(square(180), path.join(root, 'public/apple-touch-icon.png'));

// The tribute PDF linked from the Elmer page (not an image, copied as-is with a clean name).
await mkdir(path.join(root, 'public/docs'), { recursive: true });
await copyFile(
  path.join(source, 'Elmers messages.pdf'),
  path.join(root, 'public/docs/elmers-messages.pdf'),
);

await writeFile(
  manifestFile,
  `// Generated by scripts/optimize-images.mjs. Do not edit by hand.\n\n` +
    `export interface ImageEntry {\n  /** Intrinsic width of the largest generated file. */\n  readonly width: number;\n  readonly height: number;\n  /** Widths generated as <name>-<width>.avif / .webp. */\n  readonly widths: readonly number[];\n}\n\n` +
    `export const IMAGE_MANIFEST = ${JSON.stringify(manifest, null, 2)} as const satisfies Record<string, ImageEntry>;\n\n` +
    `export type ImageKey = keyof typeof IMAGE_MANIFEST;\n`,
);

console.log(
  `\nOriginals used: ${fmtMB(before)}  ->  optimised output: ${fmtMB(after)} (${fmtKB(after)})`,
);
console.log(`Reduction: ${(100 - (after / before) * 100).toFixed(1)}%`);
