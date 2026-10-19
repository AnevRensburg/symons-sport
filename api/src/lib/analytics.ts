/**
 * Website traffic for the admin page, from the business's Google Analytics 4 property
 * (GA4 Data API, service account with Viewer access). Without a property/credentials it returns
 * clearly labelled sample data, so the dashboard can be demoed before GA is connected.
 */
import { BetaAnalyticsDataClient } from '@google-analytics/data';
import { env } from '../env.ts';

export interface AnalyticsReport {
  source: 'ga4' | 'sample';
  days: number;
  totals: { users: number; sessions: number; pageViews: number; avgSessionSeconds: number };
  daily: { date: string; users: number; sessions: number }[];
  topPages: { path: string; views: number }[];
  channels: { name: string; sessions: number }[];
  devices: { name: string; sessions: number }[];
}

let client: BetaAnalyticsDataClient | undefined;
const cache = new Map<number, { at: number; report: AnalyticsReport }>();

function gaClient(): BetaAnalyticsDataClient | undefined {
  const { ga4PropertyId, credentialsJson } = env.analytics;
  if (!ga4PropertyId || (!credentialsJson && !process.env.GOOGLE_APPLICATION_CREDENTIALS)) return undefined;
  client ??= new BetaAnalyticsDataClient(credentialsJson ? { credentials: JSON.parse(credentialsJson) } : {});
  return client;
}

export async function analyticsReport(days = 28): Promise<AnalyticsReport> {
  const hit = cache.get(days);
  if (hit && Date.now() - hit.at < 10 * 60_000) return hit.report; // GA quotas: refresh every 10 minutes at most
  const ga = gaClient();
  const report = ga ? await fromGa4(ga, days) : sample(days);
  cache.set(days, { at: Date.now(), report });
  return report;
}

async function fromGa4(ga: BetaAnalyticsDataClient, days: number): Promise<AnalyticsReport> {
  const property = `properties/${env.analytics.ga4PropertyId}`;
  const dateRanges = [{ startDate: `${days}daysAgo`, endDate: 'today' }];
  const num = (v?: string | null) => Number(v ?? 0);
  const [[totals], [daily], [pages], [channels], [devices]] = await Promise.all([
    ga.runReport({ property, dateRanges, metrics: [{ name: 'totalUsers' }, { name: 'sessions' }, { name: 'screenPageViews' }, { name: 'averageSessionDuration' }] }),
    ga.runReport({ property, dateRanges, dimensions: [{ name: 'date' }], metrics: [{ name: 'totalUsers' }, { name: 'sessions' }], orderBys: [{ dimension: { dimensionName: 'date' } }] }),
    ga.runReport({ property, dateRanges, dimensions: [{ name: 'pagePath' }], metrics: [{ name: 'screenPageViews' }], limit: 8, orderBys: [{ metric: { metricName: 'screenPageViews' }, desc: true }] }),
    ga.runReport({ property, dateRanges, dimensions: [{ name: 'sessionDefaultChannelGroup' }], metrics: [{ name: 'sessions' }], limit: 6 }),
    ga.runReport({ property, dateRanges, dimensions: [{ name: 'deviceCategory' }], metrics: [{ name: 'sessions' }] }),
  ]);
  const t = totals.rows?.[0]?.metricValues ?? [];
  return {
    source: 'ga4',
    days,
    totals: { users: num(t[0]?.value), sessions: num(t[1]?.value), pageViews: num(t[2]?.value), avgSessionSeconds: Math.round(num(t[3]?.value)) },
    daily: (daily.rows ?? []).map((r) => {
      const d = r.dimensionValues![0].value!;
      return { date: `${d.slice(0, 4)}-${d.slice(4, 6)}-${d.slice(6)}`, users: num(r.metricValues![0].value), sessions: num(r.metricValues![1].value) };
    }),
    topPages: (pages.rows ?? []).map((r) => ({ path: r.dimensionValues![0].value!, views: num(r.metricValues![0].value) })),
    channels: (channels.rows ?? []).map((r) => ({ name: r.dimensionValues![0].value!, sessions: num(r.metricValues![0].value) })),
    devices: (devices.rows ?? []).map((r) => ({ name: r.dimensionValues![0].value!, sessions: num(r.metricValues![0].value) })),
  };
}

/** Deterministic, realistic-looking numbers (seeded by a fixed seed) for demos. */
function sample(days: number): AnalyticsReport {
  let seed = 1979;
  const rand = () => ((seed = (seed * 9301 + 49297) % 233280) / 233280);
  const daily = Array.from({ length: days }, (_, i) => {
    const d = new Date(Date.now() - (days - 1 - i) * 86_400_000);
    const weekend = [0, 5, 6].includes(d.getDay()) ? 1.45 : 1;
    const users = Math.round((25 + rand() * 25) * weekend);
    return { date: d.toISOString().slice(0, 10), users, sessions: Math.round(users * (1.2 + rand() * 0.2)) };
  });
  const sessions = daily.reduce((s, d) => s + d.sessions, 0);
  const users = Math.round(daily.reduce((s, d) => s + d.users, 0) * 0.82);
  const paths = ['/', '/dealers', '/products', '/contact', '/about', '/elmer'];
  return {
    source: 'sample',
    days,
    totals: { users, sessions, pageViews: Math.round(sessions * 3.1), avgSessionSeconds: 142 },
    daily,
    topPages: paths.map((path, i) => ({ path, views: Math.round((sessions * 1.6) / (i + 1.3)) })),
    channels: [
      { name: 'Organic Search', sessions: Math.round(sessions * 0.38) },
      { name: 'Organic Social', sessions: Math.round(sessions * 0.27) },
      { name: 'Direct', sessions: Math.round(sessions * 0.24) },
      { name: 'Referral', sessions: Math.round(sessions * 0.11) },
    ],
    devices: [
      { name: 'mobile', sessions: Math.round(sessions * 0.71) },
      { name: 'desktop', sessions: Math.round(sessions * 0.25) },
      { name: 'tablet', sessions: Math.round(sessions * 0.04) },
    ],
  };
}
