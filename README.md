# Symons Sport International

The website of [Symons Sport International](https://www.symons-sport.co.za), importer and
distributor of quality MX, enduro and off-road motorcycle parts in Bellville, Cape Town. The site
shows the brands and products the company distributes, the dealers that stock them across Southern
Africa, the company's contact details, and a tribute page for co-founder Elmer Symons.

## How it works

- Built with **Angular 22**: standalone components, signals, zoneless change detection, strict
  TypeScript and SCSS. No UI libraries (no Bootstrap, jQuery or icon fonts).
- Every page is **prerendered to static HTML** at build time. The only backend is the small
  dealers API in [`api/`](api/README.md) (Express + MongoDB on Render): the dealers page loads the
  live list from it, and the owner edits dealers and sees Google Analytics on the hidden `/admin`
  page. Only the interactive parts run in the browser: the mobile menu,
  product and dealer search, the tribute message dialog and the click-to-load YouTube video.
- Hosted on **GitHub Pages** at www.symons-sport.co.za, deployed automatically by GitHub Actions on
  every push to `main`.
- Images are served as AVIF and WebP in several sizes, the Pridi heading font is self-hosted, and
  each page has its own title, description, canonical URL, social preview tags and (home and
  contact) business details for search engines.

This repository also used to hold the original hand-written HTML/Bootstrap site (2021–2024). That
version is still in the git history (last commit `48189c0`), but only the Angular site is on `main`.

Open to-dos, dealer questions for the business owner and launch notes are tracked in
[CLAUDE.md](CLAUDE.md).

## Requirements

- Node.js 24 LTS (Angular 22 supports `^22.22.3 || ^24.15.0 || ^26.0.0`)
- npm 11

```bash
npm install
```

## Scripts

| Command              | What it does                                                                    |
| -------------------- | ------------------------------------------------------------------------------- |
| `npm start`          | Dev server at http://localhost:4200                                             |
| `npm run build`      | Production build + prerender of all routes, then `scripts/postbuild.mjs`        |
| `npm run prerender`  | Alias for `npm run build` (prerendering is part of every production build)      |
| `npm run serve:dist` | Serve the built site at http://localhost:8080 (no gzip; GitHub Pages does gzip) |
| `npm run images`     | Regenerate the optimised images (see below)                                     |
| `npm run lint`       | ESLint (angular-eslint, including template accessibility rules)                 |
| `npm run format`     | Prettier                                                                        |

The build output is `dist/symons-sport-angular/browser/`. `postbuild.mjs` then:

- moves the prerendered `/404` page to `404.html` (GitHub Pages serves it for unknown URLs),
- writes redirect pages for the old URLs (`about.html`, `products.html`, …) so existing links and
  search results keep working,
- points the hero image preload at the AVIF files, with `type="image/avif"`.

## Project structure

```
src/app/
  core/      header (accessible mobile menu), footer, SeoService, business details (site.ts)
  pages/     home, about, products, dealers, elmer, contact, not-found (each lazy-loaded)
  shared/    picture (AVIF/WebP + NgOptimizedImage), product card, brand carousel,
             tribute dialog (native <dialog>), icon (inline SVG)
  data/      products.ts, dealers.ts, tributes.ts, brands.ts, image-manifest.ts (generated)
public/      static files copied as-is: images/, fonts/, docs/, CNAME, robots.txt, sitemap.xml
scripts/     optimize-images.mjs, postbuild.mjs
.github/     deploy workflow (lint, build, publish to GitHub Pages)
```

## Editing content

- **Products:** `src/app/data/products.ts`. To add a photo, put the original in `image-sources/`,
  add it to the list in `scripts/optimize-images.mjs` as `new/<file>`, run `npm run images`, then
  add the product with the new image key.
- **Dealers:** `src/app/data/dealers.ts`, grouped by province or country. The `tel` field is the
  number in international format for `tel:` links (e.g. `+27219759629`).
- **Brand logos in the carousel:** `src/app/data/brands.ts`.
- **Contact details** (also used in the footer and search engine data): `src/app/core/site.ts`.
- **Page titles and descriptions:** the `seo` data on each route in `src/app/app.routes.ts`. If you
  add a page, add it to `public/sitemap.xml` too.

After a change, run `npm run lint` and `npm run build`, check it with `npm run serve:dist`, then
push to `main` to publish.

## Images

`npm run images` turns original photos into AVIF + WebP at 2–3 widths in `public/images/`, and also
writes the social preview image, the favicons and `src/app/data/image-manifest.ts`. Only the
optimised output is committed; `sharp` is a dev dependency only.

It reads two sets of originals:

- **The original site's images**, from `../symons-sport` by default (or
  `npm run images -- --source <path>`). They are no longer on `main`; to get them back, check out the
  old site from the history: `git worktree add ../symons-sport-original 48189c0`.
- **Newer photos from the client** (new products, the official logo), from `image-sources/`. This
  folder is gitignored, so keep a backup of it.

## Deployment

Every push to `main` runs `.github/workflows/deploy.yml`, which installs, lints, builds and
publishes `dist/symons-sport-angular/browser` to GitHub Pages. Repository settings:

- **Settings → Pages → Source:** GitHub Actions
- **Custom domain:** `www.symons-sport.co.za`, with **Enforce HTTPS** on. The DNS `CNAME` record
  for `www` points at `anevrensburg.github.io`, and the bare domain redirects to `www`.

GitHub Pages serves each route as a folder (`/about/index.html`), so canonical URLs and the sitemap
use a trailing slash (`/about/`).
