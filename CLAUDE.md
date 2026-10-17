# Symons Sport International: Angular site

Business website for Symons Sport International (motorcycle parts importer/distributor, Bellville,
Cape Town). Angular 22, standalone components, signals, zoneless, strict TS, SCSS. Every route is
prerendered to static HTML (`outputMode: "static"`) and hosted on GitHub Pages at
www.symons-sport.co.za. No backend and no API calls, ever. Content changes are cosmetic or data-only.

The old static site lives in `../symons-sport` (a local checkout). Never modify that folder. The
GitHub repo `AnevRensburg/symons-sport` now holds this Angular site on `main`; the old site's
code is only in its git history (last old commit `48189c0`).

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
      Unit 3, 30 Bella Rosa St, Bellville, 7550 (updated on the site 2026-10-17). The office number
      021 975 9629 is unchanged (confirmed by the client's email signature). Update the Google
      Business Profile address so it matches the site.
- [x] Postal code: the owner confirmed **7550** (was 7530 on the site). Changed 2026-10-17.
- [ ] The client asked you to keep track of the time you spend on the website ("Hou asb. boek van
      jou tyd"). Log your hours.
- [x] The "Renz.co.za" logo in the client's logo PDF: the owner said not to use it.

- [x] Private details in the tribute messages: the owner asked to remove them. Removed on
      2026-10-17: Paul Aniceto's and Kathy Fletcher's home addresses, Kathy Fletcher's and Bryan
      Henson's emails, and Bryan Henson's, Mark Chemaly's and Etienne vd Merwe's phone numbers.
      The linked PDF (`public/docs/elmers-messages.pdf`) was scanned and has no contact details.
- [x] CrossPro: the owner asked to remove it everywhere. The logo was taken out of the carousel,
      the image script and the image files on 2026-10-17 (its products were never on the site).
- [x] The repo README no longer calls the site a portfolio project: the old site's files (including
      its README) were replaced by this project when it was published to `AnevRensburg/symons-sport`
      on 2026-10-17.

### Dealer questions

Open questions about the dealer list (`src/app/data/dealers.ts`), to go through with the client.
Each was checked online on 2026-10-17.

- [ ] **AOV Tech** (Hillcrest, KZN; was TR-Tec Adventure): renamed at the user's request, but no
      trace of "AOV Tech" was found online. Confirm the name with the dealer or the client.
- [ ] **NL Racing** (Nelspruit; was No Limits Racing): renamed at the user's request. Online the shop
      appears as "NL Auto & Bike" at 34 Christie Crescent, Vintonia, Mbombela, but the site still
      lists Shop 34 Sonpark Industrial, Nelspruit 1200. Confirm the exact name and address.
- [ ] **RAD Paarl** (was KTM Paarl; rename confirmed online): a 2026 news item says it moved to
      2 New Eskdale Str, Paarl South, but the site still shows Zandwyk Business Park, R101 Old Paarl
      Road, Paarl, 7646. Confirm the current address.
- [ ] **The Roost** (Boksburg): set to "Atlas Rd, Boksburg 1459" as given. Their own website lists
      Unit 12 Atlas Lifestyle Centre, Cnr North Rand & Atlas Rd, Bardene, Boksburg 1459. Use the
      full address?
- [ ] **UB Leisure** (Pretoria, new dealer): most listings give 34 Banghoek Crescent, The Willows,
      Pretoria, but the Suzuki and Kawasaki dealer lists place it at N4 Gateway. Confirm.
- [ ] **Locomoto** (now Hermanus, Western Cape): shown as just "Hermanus" as given. Their website
      lists 8 Romany Street, Sandbaai, Hermanus 7200, and it appears to be mainly an online parts
      shop. Use the full address?
- [ ] **Similar names kept** when removing 39 dealers: Rocket Racing PMB, Vans Motorcycles (was Vans
      Big Boy Scooters) and Probike Welkom. Confirm they should stay.

### Things to know

- The old site hid the Elmer tributes below 1300px wide; the new site shows them at every width.
- Content added in the rebuild: Elmer intro paragraph (from the old page's meta description), short
  page intros, product brand menu and search, footer contact details on every page.
- The brand carousel sits above the footer on every page instead of being fixed to the bottom of the
  screen.
- The brand carousel renders the logo list three times and loads its logos eagerly. Lazy-loading
  left a blank gap after TM Designworks until the next logos had downloaded, and with only two
  copies screens wider than about 1580px would show a gap at the end of each loop.
- GitHub Pages serves routes as folders, so canonical URLs and the sitemap use a trailing slash
  (`/about/`). The address bar shows `/about` once Angular has loaded.
- Old URLs (`about.html`, `products.html`, …) redirect to the new routes via pages written by
  `scripts/postbuild.mjs`.
- **Dealers page:** briefly removed on 2026-10-17 after reading the client's email line "Dealer
  lys: Haal af asb." as "take the list down". The user clarified it meant removing specific dealers,
  so the page is back with 39 dealers removed (144 → 105). AG Grid was rejected for this page
  because grouping by province needs a paid Enterprise licence.
- Dealer search and the region menu move matching dealers to the top (highlighted) and keep the
  rest below; using one clears the other. On desktop the list scrolls inside a fixed-height box.
- The Zimbabwe dealer number is malformed on the old site (`+02 63 7722 68971`). Its `tel:` link
  uses +263772268971; the displayed number is unchanged.
- The dealer grid keeps one column-header row (Province / country, Company, Tel, Address) for
  accessibility; only the per-province section headings were removed.
- The footer copyright year is set at build time, so rebuild once a year (or on any change).
- Products search hides products that don't match; the brand menu clears the search and jumps to
  the brand.
- The products page no longer uses `@defer`: live filtering needs every section rendered. The
  page is only about 3.5 kB of JavaScript.
- The header is sticky on every page and compact (4rem tall on mobile, 4.75rem on desktop); the
  logo is 120px wide on mobile and 170px on desktop. The mobile menu button is a two-line icon
  that animates into an X.
- The logo is the client's official version ("Symons Sport Int.", from "Logos SSI & Renz.pdf"),
  also used for the favicon, apple-touch icon and Open Graph image. The old site's logo wrongly
  read "Symons Sports Int.".
- The Vibration Hour Meter photo is cropped to remove the model/code text printed under it, as
  the client asked.

### Manual steps before going live

- [x] Publish to the same repo, `AnevRensburg/symons-sport` (user's choice, 2026-10-17). The old
      history was merged in with the "ours" strategy, so `main` contains only the Angular site.
- [ ] Get the business owner's sign-off on the whole site (content, new products, dealer list,
      the Elmer page intro that was added in the rebuild).
- [x] Real-phone check: the user checked the live site on a phone on 2026-10-17 and it looks good.
      If that was Android, also check once on an iPhone (Safari), or the other way round.
- [x] YouTube video (06eL79XSmBk) on the Elmer page: the owner wants to keep it. It is hosted on
      someone else's channel ("VCMC Wheelie 05 16 04" by Geno TF2), so check now and then that it
      still plays.
- [ ] Back up `image-sources/` (gitignored: the client's new photos and the logo cut from the PDF).
- [x] Push the repo to GitHub (user confirmed 2026-10-17).
- [x] GitHub **Settings → Pages**: source switched from "deploy from branch" to **GitHub Actions**;
      custom domain `www.symons-sport.co.za` and **Enforce HTTPS** kept.
- [x] DNS: `www` is a CNAME to `anevrensburg.github.io` and the bare domain points at GitHub Pages
      (checked 2026-10-17); nothing to change.
- [x] Site launched on 2026-10-17 (live at https://www.symons-sport.co.za).

### After launch

- [ ] **Google Search Console:** add a **Domain** property for `symons-sport.co.za` (verify with the
      DNS TXT record at the domain registrar; it covers www, the bare domain, http and https).
      Then submit `https://www.symons-sport.co.za/sitemap.xml` and use **URL Inspection → Request
      indexing** for the home, products, dealers and contact pages. Check the **Pages** report after
      1–2 weeks. The old `*.html` URLs showing as redirects is expected.
- [ ] **Bing Webmaster Tools** (optional): import the site from Search Console in one step.
- [ ] **Google Business Profile:** change the address to Unit 3, 30 Bella Rosa St, Bellville, 7550
      (may need re-verification), and check the website link, phone numbers, hours and photos.
- [ ] **PageSpeed Insights** (pagespeed.web.dev) on the live home and products pages, mobile.
      Local tests scored 97–99 for Performance and 100 for Accessibility, Best Practices and SEO.
- [ ] **Rich Results Test** (search.google.com/test/rich-results) on the home and contact pages:
      the LocalBusiness data should be valid.
- [ ] **Link previews:** paste the link into WhatsApp to check the preview image and title. If
      Facebook shows the old preview, refresh it in the Facebook Sharing Debugger.
- [ ] **Old address elsewhere:** update the Facebook page and any directory listings (e.g. dealer
      or brand websites, AutoTrader, Yellow Pages) that still show the Durbanville address.
- [ ] **Domain renewal:** confirm who renews `symons-sport.co.za` at the registrar and when.
      GitHub renews the HTTPS certificate automatically.
- [ ] **Each January:** the footer year is set at build time. If nothing has been pushed in the new
      year, re-run the deploy (GitHub → Actions → "Deploy to GitHub Pages" → Run workflow).

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
- [x] Dealer list: remove the dealers the user listed on 2026-10-17 (39 removed, 105 left). Typos
      in the list were matched to: Fast Powersports cc, RCR Motorcycles, Probike and Car Service,
      Marula Dirt Bikes. Rocket Racing PMB, Vans Big Boy Scooters and Probike Welkom were kept.
- [x] Dealer updates (2026-10-17), each checked online first: The Roost moved to Atlas Rd,
      Boksburg 1459; new dealer UB Leisure (012 331 1224, 34 Banghoek Crescent, Pretoria); Locomoto
      moved from Westville (KZN) to Hermanus (Western Cape); KTM Paarl renamed RAD Paarl; Vans Big
      Boy Scooters renamed Vans Motorcycles. AOV Tech and NL Racing were applied later at the user's request (see above).
