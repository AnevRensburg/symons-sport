# Symons Sport International: Angular site

Business website for Symons Sport International (motorcycle parts importer/distributor, Bellville,
Cape Town). Angular 22, standalone components, signals, zoneless, strict TS, SCSS. Every route is
prerendered to static HTML (`outputMode: "static"`) and hosted on GitHub Pages at
www.symons-sport.co.za. No backend and no API calls, ever. Content changes are cosmetic or data-only.

The old static site lives in `../symons-sport`. Never modify it.

## Commands

Node 24 via nvm (`export NVM_DIR="$HOME/.nvm"; . "$NVM_DIR/nvm.sh"` in non-login shells).

- `npm run build`: production build + prerender + `scripts/postbuild.mjs`
- `npm run serve:dist`: serve the build at http://localhost:8080 (uncompressed, so local Lighthouse
  Performance scores lower than on GitHub Pages)
- `npm run lint`, `npm run format`
- `npm run images`: regenerate optimised images (sharp). Reads the old site's originals plus newer
  originals from the client in `image-sources/` (gitignored, so keep a backup elsewhere). Crops for
  supplied photos are in `PREP` in `scripts/optimize-images.mjs`.

## Conventions

- No UI libraries (no Bootstrap, jQuery, Font Awesome, AG Grid). Modern CSS and inline SVG icons
  (`shared/icon`).
- Content lives in typed data files in `src/app/data/`, rendered with `@for`.
- Images go through `<app-picture>` (AVIF + WebP, NgOptimizedImage, sizes from
  `data/image-manifest.ts`).
- SEO per route via `data: { seo }` in `app.routes.ts`; add new pages to `public/sitemap.xml`.
- Targets: Lighthouse mobile 95+ in all four categories, one h1 per page, alt text on every image.
- Do not push to GitHub without the user's explicit OK.

## To-do and things to know

**Rule for Claude:** whenever something comes up that the user should know, decide or do later (a
trade-off, a skipped item, a content question, a manual step), add it to this list in the same turn.
Tick items off (`- [x]`) when they are done, don't delete them.

### Decisions for the user

- [ ] The business moved from Unit 4 Durbanville Park, 5 Lilie Street, Durbanville to
      Unit 3, 30 Bella Rosa St, Bellville, 7530 (updated on the site 2026-10-17). The office number
      021 975 9629 is unchanged (confirmed by the client's email signature). Update the Google
      Business Profile address so it matches the site.
- [ ] The client's email gives the address without a postal code; 7530 came from you. Confirm it.
- [ ] The client asked you to keep track of the time you spend on the website ("Hou asb. boek van
      jou tyd"). Log your hours.
- [ ] The client's logo PDF also contains a "Renz.co.za" logo. It isn't used on the site; check
      whether they want it anywhere (e.g. the brand carousel or footer).

- [ ] Tribute messages include private contact details (Kathy Fletcher's home address and emails,
      Bryan Henson's email and phone, Mark Chemaly's and Etienne vd Merwe's phone numbers). They are
      kept exactly as on the old site. Decide whether to remove them.
- [ ] Crosspro products (standard bashplates, bashplates with linkage guard) were commented out on
      the old site and are not included. The CrossPro logo is still in the brand carousel. Confirm
      whether CrossPro is still sold.
- [ ] The old site's README (`../symons-sport/README.md`) still describes the site as a portfolio
      project. It was left untouched because the old site must not be modified. Update or archive
      it when the old repo is retired.

### Things to know

- The old site hid the Elmer tributes below 1300px wide; the new site shows them at every width.
- Content added in the rebuild: Elmer intro paragraph (from the old page's meta description), short
  page intros, product brand menu and search, footer contact details on every page.
- The brand carousel sits above the footer on every page instead of being fixed to the bottom of the
  screen.
- GitHub Pages serves routes as folders, so canonical URLs and the sitemap use a trailing slash
  (`/about/`). The address bar shows `/about` once Angular has loaded.
- Old URLs (`about.html`, `products.html`, …) redirect to the new routes via pages written by
  `scripts/postbuild.mjs`.
- **Dealer list removed** (client email of 2026-07-22, done 2026-10-17). The Dealers page, its nav
  link and the "Find a dealer" buttons are gone; `/dealers/` and `dealers.html` redirect to Contact.
  The last version (144 dealers, region menu + search grid) is in git commit `a23bd7f`
  (`src/app/pages/dealers/`, `src/app/data/dealers.ts`) if it is ever needed again. AG Grid had
  been rejected for it because grouping needs a paid Enterprise licence.
- The footer copyright year is set at build time, so rebuild once a year (or on any change).
- Products search hides products that don't match; the brand menu clears the search and jumps to
  the brand.
- The products page no longer uses `@defer`: live filtering needs every section rendered. The
  page is only about 3.5 kB of JavaScript.
- The header is sticky on every page; the logo is 150px wide on mobile and 220px on desktop.
- The logo is the client's official version ("Symons Sport Int.", from "Logos SSI & Renz.pdf"),
  also used for the favicon, apple-touch icon and Open Graph image. The old site's logo wrongly
  read "Symons Sports Int.".
- The Vibration Hour Meter photo is cropped to remove the model/code text printed under it, as
  the client asked.

### Manual steps before going live

- [ ] Push the repo to GitHub (only after the user confirms).
- [ ] In GitHub **Settings → Pages**, set **Source** to **GitHub Actions**, set the custom domain to
      `www.symons-sport.co.za` and tick **Enforce HTTPS**.
- [ ] Keep the DNS `CNAME` record for `www` pointing at `<username>.github.io`.
- [ ] After launch, run Lighthouse on the live site and submit `sitemap.xml` in Google Search
      Console.

### Requested changes

- [x] Home: keep the brand carousel moving when hovered.
- [x] Products: sticky search bar (product or brand) and a sticky brand menu on the left.
- [x] Dealers: compact single grid sorted by province. Columns: province/place, company, tel,
      address. No section headings and no phone icon. A sticky region menu on the left and the
      search both bring the matching rows to the top. (Later removed, see below.)

From the client's email "Website" (2026-07-22), done 2026-10-17:

- [x] New Brake Discs photo.
- [x] New products: Supersprox Steel Sprockets; Hour Meters: 4.5 - 60V DC Hour Meter and Vibration
      Hour Meters (text under the photo removed).
- [x] Contact address: Unit 3, 30 Bella Rosa St, Bellville.
- [x] Logo changed to "Symons Sport Int." (without the s).
- [x] Dealer list taken down.
