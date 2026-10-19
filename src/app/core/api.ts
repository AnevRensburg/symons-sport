/**
 * Address of the dealers API (the `api/` folder, hosted separately from this static site).
 * Local development uses the API on port 4004 (`cd api && npm run dev`).
 */
export const PRODUCTION_API_URL = 'https://api.symons-sport.co.za';

export function apiUrl(): string {
  const host = typeof location === 'undefined' ? '' : location.hostname;
  return host === 'localhost' || host === '127.0.0.1'
    ? 'http://localhost:4004'
    : PRODUCTION_API_URL;
}
