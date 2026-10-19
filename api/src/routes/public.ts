import { Router } from 'express';
import { DealerModel } from '../models.ts';
import { REGIONS } from '../regions.ts';

export const publicRouter = Router();

const byName = (a: { name: string }, b: { name: string }) =>
  a.name.localeCompare(b.name, 'en', { sensitivity: 'base', numeric: true });

/** Dealers grouped by region, in the shape the website's dealers page uses. Empty regions are left out. */
publicRouter.get('/dealers', async (_req, res) => {
  const dealers = await DealerModel.find({}, { name: 1, region: 1, phone: 1, tel: 1, address: 1 }).lean();
  const regions = REGIONS.map((r) => ({
    id: r.id,
    name: r.name,
    dealers: dealers
      .filter((d) => d.region === r.id)
      .sort(byName)
      .map((d) => ({ name: d.name, phone: d.phone, tel: d.tel, ...(d.address ? { address: d.address } : {}) })),
  })).filter((r) => r.dealers.length);
  // Edits must show straight away, so browsers and proxies may not keep a copy.
  res.set('Cache-Control', 'no-cache').json(regions);
});
