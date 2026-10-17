#!/usr/bin/env node
/**
 * Post-processes the prerendered output in dist/ for GitHub Pages:
 *  - 404/index.html -> 404.html (GitHub Pages serves it for unknown URLs)
 *  - redirect pages for the old site's URLs (about.html, products.html, ...)
 *  - hero preload: point it at the AVIF files the <picture> actually uses, with type="image/avif"
 *    so browsers without AVIF support skip it and use the WebP <img> instead
 *  - removes index.csr.html (every route is prerendered)
 */
import { readdir, readFile, rename, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist/symons-sport-angular/browser');
const SITE = 'https://www.symons-sport.co.za';

// 1. 404 page
await rename(path.join(dist, '404/index.html'), path.join(dist, '404.html'));
await rm(path.join(dist, '404'), { recursive: true });

// 2. Old URLs from the static site -> new routes
const redirects = {
  'about.html': '/about/',
  'products.html': '/products/',
  'dealers.html': '/dealers/',
  'elmer.html': '/elmer/',
  'contact.html': '/contact/',
};
for (const [file, target] of Object.entries(redirects)) {
  const url = `${SITE}${target}`;
  await writeFile(
    path.join(dist, file),
    `<!doctype html>
<html lang="en-ZA">
<head>
<meta charset="utf-8">
<title>Redirecting…</title>
<meta name="robots" content="noindex">
<link rel="canonical" href="${url}">
<meta http-equiv="refresh" content="0; url=${target}">
<script>location.replace(${JSON.stringify(target)} + location.hash)</script>
</head>
<body><p>This page has moved to <a href="${target}">${url}</a>.</p></body>
</html>
`,
  );
}

// 3. Rewrite NgOptimizedImage preloads for local images to AVIF
const htmlFiles = [];
async function collect(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) await collect(full);
    else if (entry.name.endsWith('.html')) htmlFiles.push(full);
  }
}
await collect(dist);
let rewritten = 0;
for (const file of htmlFiles) {
  const html = await readFile(file, 'utf8');
  const next = html.replace(/<link\b[^>]*\bas="image"[^>]*\brel="preload"[^>]*>/g, (tag) => {
    if (!tag.includes('href="/images/')) return tag;
    rewritten++;
    return tag.replace(/\.webp\b/g, '.avif').replace('<link ', '<link type="image/avif" ');
  });
  if (next !== html) await writeFile(file, next);
}

// 4. Not needed: every route is prerendered
await rm(path.join(dist, 'index.csr.html'), { force: true });

console.log(
  `postbuild: 404.html, ${Object.keys(redirects).length} legacy redirects, ${rewritten} AVIF preload(s)`,
);
