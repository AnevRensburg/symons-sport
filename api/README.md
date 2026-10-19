# Symons Sport dealers API

A small Express 5 + Mongoose + Zod API that holds the dealer list in MongoDB. The website (GitHub
Pages) loads `/api/dealers` on the dealers page, and the owner edits dealers on the hidden admin
page at **/admin** (not linked anywhere, not indexed). The admin page also shows Google Analytics.

| Endpoint | Who | What |
| --- | --- | --- |
| `GET /api/dealers` | public | Dealers grouped by province/country (the website's shape) |
| `POST /api/auth/login`, `GET /api/auth/me`, `POST /api/auth/password` | admin | Log in, session, change password |
| `GET/POST /api/admin/dealers`, `PUT/DELETE /api/admin/dealers/:id` | admin | Edit dealers |
| `GET /api/admin/analytics?days=7\|28\|90` | admin | GA4 report (sample data until connected) |

How it fits together:

- The dealers page is still prerendered with `src/app/data/dealers.ts`, so search engines and
  visitors see a full list at once. In the browser it then loads the live list from the API and
  swaps it in. If the API is down or asleep, the built-in list stays.
- The `tel:` link is worked out from the phone number as typed (`021 …` becomes `+2721…`; numbers
  outside South Africa start with `+` and the country code).
- Logins: generated password from `create-admin`, which must be replaced on first login. Changing
  a password logs out every other device. 20 login attempts per 15 minutes per IP.

## Run locally

```bash
# from fullstack/ (the shared local MongoDB)
.tools/mongodb-linux-x86_64-ubuntu2404-8.0.15/bin/mongod --dbpath .data/db --logpath .data/log/mongod.log --bind_ip 127.0.0.1 --fork
cd symons-sport-angular/api
npm install
npm run seed                                   # once: copies data/dealers.ts into the database
npm run create-admin -- you@example.com "Name" # prints a generated password
npm run dev                                    # http://localhost:4004
npm test
```

Then run the website (`npm start` in the project root, or `npm run build && npm run serve:dist`)
and open http://localhost:4200/admin (or :8080). On localhost the site calls the API on port 4004.

## Deploy (Atlas + Render)

The website stays on GitHub Pages; only the API needs hosting.

1. **Database, MongoDB Atlas** (free M0). Create a cluster on AWS **Frankfurt (eu-central-1)**,
   next to the API. *Database Access*: add a user with a generated password. *Network Access*:
   add `0.0.0.0/0` (Render has no fixed IP; the password protects it). Copy the connection
   string and put `/symons` before the `?` so the database is called "symons".
2. **Fill the database** from your PC: copy `.env.example` to `.env.production`, paste the
   connection string as `MONGO_URL`, then
   ```bash
   npm run seed:production
   npm run create-admin:production -- <owner email> "<owner name>"
   npm run create-admin:production -- <your email> "Ané (support)"
   ```
   Each prints a password once. Send the owner hers privately (WhatsApp/SMS); she chooses her own
   when she first logs in. Forgotten password: run `create-admin:production` again for that email.
3. **API, Render**. Sign in with GitHub, allow access to `AnevRensburg/symons-sport`, then
   *New → Blueprint* and pick the repo: Render reads `render.yaml`. Paste `MONGO_URL` when asked.
   Plan: **Starter, $7 (≈R125) a month, always on**. The free plan also works but sleeps after
   15 minutes: the first visitor after a quiet spell sees the built-in list for up to a minute
   (not the latest edits), and the owner's first login takes about a minute.
4. **API address**. The website calls `https://api.symons-sport.co.za` (`src/app/core/api.ts`).
   In Render: *Settings → Custom Domains → add* `api.symons-sport.co.za`, then add the CNAME
   record Render shows at the domain registrar. (Or put the `…onrender.com` URL in
   `PRODUCTION_API_URL` instead.) Check https://api.symons-sport.co.za/api/health shows `{"ok":true}`.
5. **Website**. Push to `main`; GitHub Actions rebuilds the site as before. Then open
   https://www.symons-sport.co.za/admin and log in.

## Google Analytics (same as The Creamery / Die Boer)

1. In Google Analytics create a GA4 property for www.symons-sport.co.za with a Web data stream.
   Put its measurement ID (`G-…`) in `gaMeasurementId` in `src/app/core/site.ts` and push.
   The tag loads after the page has finished loading and doesn't track /admin.
2. In Google Cloud create a service account, enable the *Google Analytics Data API*, and download
   a JSON key. In GA *Admin → Property access management*, add the service account's email as
   **Viewer**.
3. In Render, set `GA4_PROPERTY_ID` (the property's number) and `GA4_CREDENTIALS_JSON` (the whole
   JSON key). The analytics tab switches from sample data to real numbers (refreshed every 10 min).

Never paste the connection string, JWT secret or JSON key into chat or commit them.
