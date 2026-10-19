#!/usr/bin/env node
/**
 * Refreshes the built-in dealer list (src/app/data/dealers.ts) from the live dealers API, so the
 * prerendered dealers page and its fallback match what the owner edited on /admin.
 * Run by .github/workflows/sync-dealers.yml once a month; locally: `npm run sync-dealers`.
 * Prints "changed" or "unchanged". DEALERS_API_URL overrides the API address.
 */
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const file = path.join(root, 'src/app/data/dealers.ts');
const api = process.env.DEALERS_API_URL ?? 'https://api.symons-sport.co.za';

/** The free Render plan sleeps when idle: keep trying for about 3 minutes while it wakes up. */
async function fetchDealers() {
  let lastError;
  for (let attempt = 1; attempt <= 6; attempt++) {
    try {
      const res = await fetch(`${api}/api/dealers`, { signal: AbortSignal.timeout(30_000) });
      if (res.ok) return await res.json();
      lastError = new Error(`HTTP ${res.status}`);
    } catch (err) {
      lastError = err;
    }
    console.log(
      `Attempt ${attempt} failed (${lastError.message}); waiting for the API to wake up…`,
    );
    await new Promise((r) => setTimeout(r, 5_000));
  }
  throw lastError;
}

const regions = await fetchDealers();
const valid =
  Array.isArray(regions) &&
  regions.length > 0 &&
  regions.every(
    (r) =>
      typeof r.id === 'string' &&
      typeof r.name === 'string' &&
      Array.isArray(r.dealers) &&
      r.dealers.every((d) => d.name && d.phone && d.tel),
  );
// Never replace the list with an empty or broken one (e.g. an API error page or empty database).
if (!valid) throw new Error('The API returned no dealers or an unexpected shape; nothing changed.');

const clean = regions.map((r) => ({
  id: r.id,
  name: r.name,
  dealers: r.dealers.map((d) => ({
    name: d.name,
    phone: d.phone,
    tel: d.tel,
    ...(d.address ? { address: d.address } : {}),
  })),
}));

const current = await readFile(file, 'utf8');
const start = current.indexOf('export const DEALER_REGIONS');
const end = current.indexOf('export const DEALER_COUNT');
const next = `${current.slice(0, start)}export const DEALER_REGIONS: readonly DealerRegion[] = ${JSON.stringify(clean, null, 2)};\n\n${current.slice(end)}`;

// Format like the rest of the code so unchanged data gives an identical file.
const prettier = await import('prettier');
const options = { ...(await prettier.resolveConfig(file)), filepath: file };
const formatted = await prettier.format(next, options);

if (formatted === current) {
  console.log('unchanged');
} else {
  await writeFile(file, formatted);
  const count = clean.reduce((n, r) => n + r.dealers.length, 0);
  console.log(`changed (${count} dealers)`);
}
