#!/usr/bin/env node
// Phase 0: 원본 JPG → 리사이즈 + AVIF 변환 + kebab-case 리네임
// PRD FR-029: Hero/About 1600px ≤ 300KB, Room 1400px ≤ 200KB
import { mkdirSync, readdirSync, statSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import sharp from 'sharp';

const ROOT = resolve(process.cwd(), 'public/images');
const OUT = resolve(ROOT, 'optimized');
mkdirSync(OUT, { recursive: true });

const JOBS = [
  { src: 'main.jpg',        out: 'hero.avif',     maxWidth: 1600, quality: 62 },
  { src: 'about.jpg',       out: 'about.avif',    maxWidth: 1600, quality: 62 },
  { src: 'double (1).jpg',  out: 'double-1.avif', maxWidth: 1400, quality: 58 },
  { src: 'double (2).jpg',  out: 'double-2.avif', maxWidth: 1400, quality: 58 },
  { src: 'double (3).jpg',  out: 'double-3.avif', maxWidth: 1400, quality: 58 },
  { src: 'double (4).jpg',  out: 'double-4.avif', maxWidth: 1400, quality: 58 },
  { src: 'double (5).jpg',  out: 'double-5.avif', maxWidth: 1400, quality: 58 },
  { src: 'double (6).jpg',  out: 'double-6.avif', maxWidth: 1400, quality: 58 },
  { src: 'double (7).jpg',  out: 'double-7.avif', maxWidth: 1400, quality: 58 },
  { src: 'twin.jpg',        out: 'twin-1.avif',   maxWidth: 1400, quality: 58 },
  { src: 'twin (2).jpg',    out: 'twin-2.avif',   maxWidth: 1400, quality: 58 },
  { src: 'twin (3).jpg',    out: 'twin-3.avif',   maxWidth: 1400, quality: 58 },
  { src: 'twin (4).jpg',    out: 'twin-4.avif',   maxWidth: 1400, quality: 58 },
  { src: 'twin (5).jpg',    out: 'twin-5.avif',   maxWidth: 1400, quality: 58 },
  { src: 'twin (6).jpg',    out: 'twin-6.avif',   maxWidth: 1400, quality: 58 },
];

const pad = (s, n) => s.padEnd(n, ' ');
const kb = (b) => (b / 1024).toFixed(1).padStart(7, ' ') + ' KB';

let totalBytes = 0;
let totalOrigBytes = 0;
const rows = [];

for (const job of JOBS) {
  const srcPath = resolve(ROOT, job.src);
  const outPath = resolve(OUT, job.out);
  const origSize = statSync(srcPath).size;

  const image = sharp(srcPath).rotate();
  const meta = await image.metadata();
  const pipeline = image
    .resize({
      width: Math.min(meta.width ?? job.maxWidth, job.maxWidth),
      withoutEnlargement: true,
    })
    .avif({ quality: job.quality, effort: 6 });

  const info = await pipeline.toFile(outPath);
  totalBytes += info.size;
  totalOrigBytes += origSize;

  rows.push({
    src: job.src,
    out: job.out,
    origKb: origSize,
    newKb: info.size,
    w: info.width,
    h: info.height,
  });
}

console.log('\nOPTIMIZE IMAGES REPORT');
console.log('─'.repeat(82));
console.log(
  pad('source', 22),
  pad('output', 18),
  pad('orig', 11),
  pad('new', 11),
  pad('size', 12),
  'ratio'
);
console.log('─'.repeat(82));
for (const r of rows) {
  const ratio = ((1 - r.newKb / r.origKb) * 100).toFixed(1) + '%';
  console.log(
    pad(r.src, 22),
    pad(r.out, 18),
    kb(r.origKb),
    kb(r.newKb),
    pad(`${r.w}×${r.h}`, 12),
    '-' + ratio
  );
}
console.log('─'.repeat(82));
console.log(
  `TOTAL  orig ${(totalOrigBytes / 1024 / 1024).toFixed(2)} MB  →  new ${(totalBytes / 1024 / 1024).toFixed(2)} MB  (-${((1 - totalBytes / totalOrigBytes) * 100).toFixed(1)}%)`
);
console.log(`Output dir: ${OUT}`);
