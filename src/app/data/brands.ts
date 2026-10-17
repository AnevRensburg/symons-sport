import { ImageKey } from './image-manifest';

export interface Brand {
  readonly name: string;
  readonly logo: ImageKey;
}

/** Brands shown in the logo carousel, in the order of the original site. */
export const BRANDS: readonly Brand[] = [
  { name: 'Enduro Engineering', logo: 'logos/enduro-engineering' },
  { name: 'Excel', logo: 'logos/excel' },
  { name: 'Kite', logo: 'logos/kite' },
  { name: 'Risk Racing', logo: 'logos/risk-racing' },
  { name: 'Haan Wheels', logo: 'logos/haan-wheels' },
  { name: 'CrossPro', logo: 'logos/crosspro' },
  { name: 'Runleader', logo: 'logos/runleader' },
  { name: 'Supersprox', logo: 'logos/supersprox' },
  { name: 'TM Designworks', logo: 'logos/tm-designworks' },
];
