/**
 * Loads the dealer list from the website's data file (src/app/data/dealers.ts) into an EMPTY
 * database. Run once per database: `npm run seed`. It refuses to overwrite dealers that are there.
 */
import mongoose from 'mongoose';
import { env } from '../env.ts';
import { DealerModel } from '../models.ts';
import { REGION_IDS, toTel, type RegionId } from '../regions.ts';

// Imported by path so the API's type check doesn't include the Angular project's files.
const websiteData = new URL('../../../src/app/data/dealers.ts', import.meta.url).href;
const { DEALER_REGIONS } = (await import(websiteData)) as {
  DEALER_REGIONS: { id: string; dealers: { name: string; phone: string; tel: string; address?: string }[] }[];
};

await mongoose.connect(env.mongoUrl);
const existing = await DealerModel.countDocuments();
if (existing) {
  console.log(`The database already has ${existing} dealers; nothing changed.`);
} else {
  const docs = DEALER_REGIONS.flatMap((region) => {
    if (!REGION_IDS.includes(region.id as RegionId)) throw new Error(`Unknown region ${region.id}`);
    return region.dealers.map((d) => {
      // The stored tel: number is always worked out from the phone number; warn if that changes a link.
      if (toTel(d.phone) !== d.tel) console.warn(`${d.name}: tel ${d.tel} becomes ${toTel(d.phone)}`);
      return { name: d.name, region: region.id, phone: d.phone, tel: toTel(d.phone), address: d.address ?? '' };
    });
  });
  await DealerModel.insertMany(docs);
  console.log(`Added ${docs.length} dealers.`);
}
await mongoose.disconnect();
