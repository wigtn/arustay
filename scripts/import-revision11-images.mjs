#!/usr/bin/env node
// Usage: node scripts/import-revision11-images.mjs /path/to/웹페이지용
// Originals remain outside the repository. Numeric filename order is preserved.
import { readdir, mkdir, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
const source = process.argv[2];
if (!source) throw new Error('Provide the directory containing About, OurLocations_Dongdaemun and Room_Dongdaemun.');
const output = path.resolve('public/images/revision-11');
await mkdir(output, { recursive: true });
const groups = [
  ['About', 'about', 1],
  ['OurLocations_Dongdaemun', 'dongdaemun-location', 4],
  ['Room_Dongdaemun/01_SingleRoom', 'dongdaemun-single', 6],
  ['Room_Dongdaemun/02_DoubleRoom', 'dongdaemun-double', 15],
  ['Room_Dongdaemun/03_TwinRoom', 'dongdaemun-twin', 8],
  ['Room_Dongdaemun/04_TripleRoom', 'dongdaemun-triple', 7],
  ['Room_Dongdaemun/05_DeluxeFamilyRoom', 'dongdaemun-deluxe-family', 7],
];
const manifest = [];
for (const [folder, prefix, expected] of groups) {
  const files = (await readdir(path.join(source, folder))).filter(n => /\.jpg$/i.test(n)).sort((a,b) => a.localeCompare(b, 'en', { numeric: true }));
  if (files.length !== expected) throw new Error(`${folder}: expected ${expected} JPGs, found ${files.length}`);
  for (const [i, file] of files.entries()) {
    const input = path.join(source, folder, file);
    const name = `${prefix}-${i+1}.jpg`;
    const info = await sharp(input).rotate().resize({width:1600,height:1600,fit:'inside',withoutEnlargement:true}).jpeg({quality:82,mozjpeg:true}).toFile(path.join(output,name));
    manifest.push({source:`${folder}/${file}`,output:`/images/revision-11/${name}`,width:info.width,height:info.height,originalBytes:(await stat(input)).size,bytes:info.size});
  }
}
await mkdir('docs/revision-11', {recursive:true});
await writeFile('docs/revision-11/images.json',JSON.stringify(manifest,null,2)+'\n');
console.log(JSON.stringify({images:manifest.length,originalBytes:manifest.reduce((n,x)=>n+x.originalBytes,0),outputBytes:manifest.reduce((n,x)=>n+x.bytes,0)}));
