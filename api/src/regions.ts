/** Provinces and countries, in the order the dealers page lists them. */
export const REGIONS = [
  { id: 'gauteng', name: 'Gauteng' },
  { id: 'kwa-zulu-natal', name: 'Kwa-Zulu Natal' },
  { id: 'western-cape', name: 'Western Cape' },
  { id: 'free-state', name: 'Free State' },
  { id: 'eastern-cape', name: 'Eastern Cape' },
  { id: 'northern-cape', name: 'Northern Cape' },
  { id: 'mpumalanga', name: 'Mpumalanga' },
  { id: 'north-west-province', name: 'North West Province' },
  { id: 'limpopo', name: 'Limpopo' },
  { id: 'namibia', name: 'Namibia' },
  { id: 'mauritius', name: 'Mauritius' },
  { id: 'zimbabwe', name: 'Zimbabwe' },
] as const;

export type RegionId = (typeof REGIONS)[number]['id'];
export const REGION_IDS = REGIONS.map((r) => r.id) as [RegionId, ...RegionId[]];

/**
 * The tel: link number (E.164) for a phone number as it is displayed.
 * "021 975 9629" -> +27219759629 (South Africa); "+264 61 123" -> +26461123;
 * "+02 63 7722 68971" -> +263772268971 (leading zeros after + are dropped).
 * Only the first number counts when there are more: "012 271 0070/1" -> +27122710070.
 */
export function toTel(phone: string): string {
  const first = phone.split(/[/,;]/)[0].trim();
  const digits = first.replace(/\D/g, '');
  if (first.startsWith('+')) return `+${digits.replace(/^0+/, '')}`;
  if (digits.startsWith('0')) return `+27${digits.slice(1)}`;
  return `+${digits}`;
}
