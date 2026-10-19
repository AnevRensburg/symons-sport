import { Router } from 'express';
import mongoose from 'mongoose';
import { z } from 'zod';
import { analyticsReport } from '../lib/analytics.ts';
import { requireAdmin } from '../lib/auth.ts';
import { HttpError, notFound, parse } from '../lib/http.ts';
import { DealerModel } from '../models.ts';
import { REGIONS, REGION_IDS, toTel } from '../regions.ts';

export const adminRouter = Router();
adminRouter.use(requireAdmin);

adminRouter.get('/regions', (_req, res) => {
  res.json(REGIONS);
});

// ---------------------------------------------------------------- dealers
const dealerSchema = z.object({
  name: z.string().trim().min(1, 'Please fill in the company name.').max(120),
  region: z.enum(REGION_IDS, 'Please choose a province or country.'),
  phone: z
    .string()
    .trim()
    .max(40)
    .refine((p) => p.replace(/\D/g, '').length >= 7, 'Please fill in a phone number (at least 7 digits).'),
  address: z.string().trim().max(250).optional().default(''),
});

const view = (d: { _id: unknown; name: string; region: string; phone: string; tel: string; address?: string | null; updatedAt?: Date }) => ({
  id: String(d._id),
  name: d.name,
  region: d.region,
  phone: d.phone,
  tel: d.tel,
  address: d.address ?? '',
  updatedAt: d.updatedAt,
});

function dealerId(id: string): string {
  if (!mongoose.isValidObjectId(id)) throw notFound('That dealer no longer exists.');
  return id;
}

adminRouter.get('/dealers', async (_req, res) => {
  const dealers = await DealerModel.find().sort({ name: 1 }).collation({ locale: 'en', numericOrdering: true }).lean();
  res.json(dealers.map(view));
});

adminRouter.post('/dealers', async (req, res) => {
  const body = parse(dealerSchema, req.body);
  const dealer = await DealerModel.create({ ...body, tel: toTel(body.phone) });
  res.status(201).json(view(dealer));
});

adminRouter.put('/dealers/:id', async (req, res) => {
  const body = parse(dealerSchema, req.body);
  const dealer = await DealerModel.findByIdAndUpdate(
    dealerId(req.params.id),
    { ...body, tel: toTel(body.phone) },
    { returnDocument: 'after', runValidators: true },
  ).lean();
  if (!dealer) throw notFound('That dealer no longer exists.');
  res.json(view(dealer));
});

adminRouter.delete('/dealers/:id', async (req, res) => {
  const dealer = await DealerModel.findByIdAndDelete(dealerId(req.params.id)).lean();
  if (!dealer) throw notFound('That dealer no longer exists.');
  res.status(204).end();
});

// ---------------------------------------------------------------- website analytics (GA4)
adminRouter.get('/analytics', async (req, res) => {
  const days = [7, 28, 90].includes(Number(req.query.days)) ? Number(req.query.days) : 28;
  try {
    res.json(await analyticsReport(days));
  } catch (err) {
    console.error(err);
    throw new HttpError(502, 'Google Analytics could not be reached. Please try again in a few minutes.');
  }
});
