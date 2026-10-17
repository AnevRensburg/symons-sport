import { ImageKey } from './image-manifest';

export interface Product {
  /** Card title; omitted for photo-only cards (as on the original MTB stand section). */
  readonly name?: string;
  /** Extra line under the title, e.g. available colours. */
  readonly detail?: string;
  readonly image: ImageKey;
  readonly alt: string;
}

export interface ProductCategory {
  /** Anchor id, kept from the original page where one existed. */
  readonly id: string;
  readonly title: string;
  readonly products: readonly Product[];
}

export const PRODUCT_CATEGORIES: readonly ProductCategory[] = [
  {
    id: 'enduro-engineering',
    title: 'Enduro Engineering',
    products: [
      {
        name: 'Skidplate',
        image: 'products/ee-skidplate',
        alt: 'Enduro Engineering aluminium skid plate',
      },
      {
        name: 'Billet Radiator Guards',
        image: 'products/ee-billet-radiator-guards',
        alt: 'Enduro Engineering billet aluminium radiator guards',
      },
      {
        name: 'Radiator Braces',
        image: 'products/ee-radiator-braces',
        alt: 'Enduro Engineering radiator braces',
      },
      {
        name: 'Lower Fork Protector',
        image: 'products/ee-lower-fork-protector',
        alt: 'Enduro Engineering lower fork protector',
      },
      {
        name: 'Front Disc Guard',
        image: 'products/ee-front-disc-guard',
        alt: 'Enduro Engineering front brake disc guard',
      },
      {
        name: 'Rear Disc Guard',
        image: 'products/ee-rear-disc-guard',
        alt: 'Enduro Engineering rear brake disc guard',
      },
      {
        name: 'Xtreme Skidplate',
        image: 'products/ee-xtreme-skidplate',
        alt: 'Enduro Engineering Xtreme skid plate with frame and linkage protection',
      },
      {
        name: 'Bar Risers',
        image: 'products/ee-bar-risers',
        alt: 'Enduro Engineering handlebar risers',
      },
      { name: 'Tools', image: 'products/ee-tools', alt: 'Enduro Engineering trail tools' },
      {
        name: 'Handguards - Silver',
        image: 'products/ee-handguards-silver',
        alt: 'Enduro Engineering handguards in silver',
      },
      {
        name: 'Handguards - Black',
        image: 'products/ee-handguards-black',
        alt: 'Enduro Engineering handguards in black',
      },
      {
        name: 'Plastic Shields',
        detail: 'Different colours',
        image: 'products/ee-plastic-shields',
        alt: 'Enduro Engineering plastic handguard shields in several colours',
      },
    ],
  },
  {
    id: 'mtb-e-bike-stand',
    title: 'MTB / E-bike Stand',
    products: [
      { image: 'products/mtb-stand', alt: 'MTB and e-bike workshop stand' },
      {
        image: 'products/mtb-stand-with-bike',
        alt: 'Mountain bike held on the MTB and e-bike stand',
      },
    ],
  },
  {
    id: 'excel',
    title: 'Excel Rims and Spokes',
    products: [
      { name: 'Excel Rims', image: 'products/excel-rims', alt: 'Excel motocross rims' },
      {
        name: 'Excel Torque Wrench Set',
        image: 'products/excel-torque-wrench-set',
        alt: 'Excel spoke torque wrench set',
      },
      {
        name: 'Excel Spokes',
        image: 'products/excel-spokes',
        alt: 'Excel motorcycle wheel spokes',
      },
    ],
  },
  {
    id: 'kite',
    title: 'Kite Wheels',
    products: [
      {
        name: 'Complete Wheels',
        image: 'products/kite-complete-wheel',
        alt: 'Kite complete off-road motorcycle wheel',
      },
      { name: 'Hubs', image: 'products/kite-hubs', alt: 'Kite wheel hubs' },
      {
        name: 'Alpina Spokes',
        image: 'products/kite-alpina-spokes',
        alt: 'Kite wheel built with Alpina spokes',
      },
    ],
  },
  {
    id: 'risk-racing',
    title: 'Risk Racing',
    products: [
      {
        name: 'Seal Doctor',
        image: 'products/risk-seal-doctor',
        alt: 'Risk Racing Seal Doctor fork seal cleaning tool',
      },
      {
        name: 'Palm Protectors',
        image: 'products/risk-palm-protectors',
        alt: 'Risk Racing palm protectors',
      },
      {
        name: 'Lock-n-Load Pro',
        image: 'products/risk-lock-n-load-pro',
        alt: 'Risk Racing Lock-n-Load Pro motorcycle transport system',
      },
    ],
  },
  {
    id: 'haan-wheels',
    title: 'Haan Spokes',
    products: [{ name: 'Haan Spokes', image: 'products/haan-spokes', alt: 'Haan Wheels spokes' }],
  },
  {
    id: 'runleader',
    title: 'Hour Meters',
    products: [
      {
        name: 'Hour Meters',
        detail: 'Black, Blue, Orange',
        image: 'products/runleader-hour-meters',
        alt: 'Runleader engine hour meters in black, blue and orange',
      },
      {
        name: 'Tacho Meters',
        image: 'products/runleader-tacho-meter',
        alt: 'Runleader tachometer and hour meter',
      },
      {
        name: '4.5 - 60V DC Hour Meter',
        image: 'products/runleader-dc-hour-meter',
        alt: 'Runleader 4.5 to 60 volt DC hour meter',
      },
      {
        name: 'Vibration Hour Meters',
        image: 'products/runleader-vibration-hour-meter',
        alt: 'Runleader vibration-activated hour meter',
      },
    ],
  },
  {
    id: 'supersprox',
    title: 'Supersprox',
    products: [
      {
        name: 'Stealth Sprockets',
        image: 'products/supersprox-stealth-sprockets',
        alt: 'Supersprox Stealth rear sprockets',
      },
      {
        name: 'Aluminium Sprockets',
        image: 'products/supersprox-aluminium-sprockets',
        alt: 'Supersprox aluminium rear sprockets',
      },
      {
        name: 'Front Sprockets',
        image: 'products/supersprox-front-sprockets',
        alt: 'Supersprox steel front sprockets',
      },
      {
        name: 'Steel Sprockets',
        image: 'products/supersprox-steel-sprockets',
        alt: 'Supersprox black steel rear sprocket',
      },
    ],
  },
  {
    id: 'tm-designworks',
    title: 'TM Designworks',
    products: [
      {
        name: 'Chain Guides',
        image: 'products/tmd-chain-guides',
        alt: 'TM Designworks chain guides',
      },
      {
        name: 'Chain Guides',
        image: 'products/tmd-chain-guide',
        alt: 'TM Designworks rear chain guide',
      },
    ],
  },
  {
    id: 'flex-levers',
    title: 'Flex Levers',
    products: [
      {
        name: 'Pivot MX',
        image: 'products/flex-pivot-mx-levers',
        alt: 'Pivot MX flex clutch and brake levers',
      },
    ],
  },
  {
    id: 'bolts',
    title: 'Bolts',
    products: [
      { name: 'Pro Packs', image: 'products/bolts-pro-pack', alt: 'Motorcycle bolt kit, pro pack' },
      {
        name: 'Track Packs',
        image: 'products/bolts-track-pack',
        alt: 'Motorcycle bolt kit, track pack',
      },
      {
        name: 'Plastics Fastener Kit',
        image: 'products/bolts-plastics-fastener-kit',
        alt: 'Plastics fastener bolt kit',
      },
      {
        name: 'Sprocket and Disc Bolts',
        image: 'products/bolts-sprocket-disc',
        alt: 'Sprocket and brake disc bolts',
      },
    ],
  },
  {
    id: 'brake-discs',
    title: 'Brake Discs',
    products: [
      {
        name: 'Brake Discs',
        image: 'products/brake-discs',
        alt: 'Wave-cut off-road motorcycle brake disc',
      },
    ],
  },
];
