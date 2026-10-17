# Symons Sport International

Website for [Symons Sport International](https://www.symons-sport.co.za), importer and distributor of
MX, enduro and off-road motorcycle parts in Bellville, Cape Town.

Built with Angular 22 (standalone components, signals, zoneless change detection, strict TypeScript, SCSS).
Every route is **prerendered to static HTML** at build time. There is no backend, and the output is
hosted on GitHub Pages.

This is the company's live business website, not a portfolio project. It shows static information
only (products, dealers, contact details), so it makes no API or network calls. Interactive parts
(the mobile menu, product and dealer search, the tribute dialog and the video player) run in the
browser.

Open to-dos, decisions and manual launch steps are tracked in [CLAUDE.md](CLAUDE.md).

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
```

### Editing content

- **Products:** `src/app/data/products.ts`. To add an image, put the original in `image-sources/`,
  add it to the list in `scripts/optimize-images.mjs` as `new/<file>` and run `npm run images`.
- **Dealers:** `src/app/data/dealers.ts`. The `tel` field is the number in international format for
  `tel:` links.
- **Contact details** (also used in the footer and JSON-LD): `src/app/core/site.ts`.
- **Page titles and descriptions:** the `seo` data on each route in `src/app/app.routes.ts`. If you
  add a page, add it to `public/sitemap.xml` too.

## Images

`npm run images` reads the originals from the old static site (by default `../symons-sport`; to
use another folder, run `npm run images -- --source <path>`) and newer originals supplied by the
client from `image-sources/` (gitignored, so keep a backup of it). It writes
AVIF + WebP at 2–3 widths into `public/images/`, along with the Open Graph image, the favicons and
`src/app/data/image-manifest.ts`. Only the optimised output is committed. `sharp` is a dev
dependency only.

Pridi 500 (latin subset, OFL licence) is self-hosted from `public/fonts/`. No Google Fonts requests
are made.

## Deploying to GitHub Pages

1. Push this repository to GitHub.
2. In **Settings → Pages**, set **Source** to **GitHub Actions**.
3. Every push to `main` runs `.github/workflows/deploy.yml`, which lints, builds and publishes
   `dist/symons-sport-angular/browser`.
4. Custom domain: `public/CNAME` contains `www.symons-sport.co.za`. In **Settings → Pages**, set
   the custom domain to the same value and tick **Enforce HTTPS**. Keep the DNS `CNAME` record for
   `www` pointing at `<username>.github.io`.

To deploy by hand instead, build locally and publish the contents of
`dist/symons-sport-angular/browser/` (including `.nojekyll` and `CNAME`) to the Pages branch.

GitHub Pages serves each route as a folder (`/about/index.html`), so the canonical URLs and the
sitemap use a trailing slash (`/about/`).
