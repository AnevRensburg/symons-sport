import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  computed,
  signal,
  viewChild,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { DEALER_COUNT, DEALER_REGIONS, Dealer } from '../../data/dealers';

interface DealerRow extends Dealer {
  readonly key: string;
  readonly regionId: string;
  readonly region: string;
  /** Lower-cased text the search matches against. */
  readonly haystack: string;
}

/** Every dealer in one list, in region order (the order of DEALER_REGIONS) then data order. */
const ROWS: readonly DealerRow[] = DEALER_REGIONS.flatMap((region) =>
  region.dealers.map((d) => ({
    ...d,
    key: `${region.id}/${d.name}`,
    regionId: region.id,
    region: region.name,
    haystack: `${region.name} ${d.name} ${d.address ?? ''} ${d.phone}`.toLowerCase(),
  })),
);

@Component({
  selector: 'app-dealers',
  imports: [NgTemplateOutlet, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dealers.html',
  styleUrl: './dealers.scss',
})
export class Dealers {
  protected readonly regions = DEALER_REGIONS;
  protected readonly total = DEALER_COUNT;
  protected readonly query = signal('');
  protected readonly region = signal<string | null>(null);

  private readonly gridBox = viewChild.required<ElementRef<HTMLElement>>('gridBox');

  /** Does a row match the active search or region? (Only one of them is active at a time.) */
  private readonly matcher = computed<((row: DealerRow) => boolean) | null>(() => {
    const q = this.query().trim().toLowerCase();
    if (q) return (row) => row.haystack.includes(q);
    const region = this.region();
    if (region) return (row) => row.regionId === region;
    return null;
  });

  /** Matching rows move to the top (keeping their order); everything else follows. */
  protected readonly rows = computed(() => {
    const match = this.matcher();
    if (!match) return ROWS.map((row) => ({ row, hit: false }));
    const hits = ROWS.filter(match);
    const rest = ROWS.filter((row) => !match(row));
    return [
      ...hits.map((row) => ({ row, hit: true })),
      ...rest.map((row) => ({ row, hit: false })),
    ];
  });

  protected readonly hitCount = computed(() => this.rows().filter((r) => r.hit).length);

  protected readonly regionName = computed(
    () => this.regions.find((r) => r.id === this.region())?.name ?? '',
  );

  protected onSearch(event: Event): void {
    this.region.set(null);
    this.query.set((event.target as HTMLInputElement).value);
    this.scrollGridToTop();
  }

  protected selectRegion(id: string): void {
    this.query.set('');
    this.region.update((current) => (current === id ? null : id));
    this.scrollGridToTop();
  }

  private scrollGridToTop(): void {
    const box = this.gridBox().nativeElement;
    box.scrollTop = 0;
    if (box.getBoundingClientRect().top < 0) box.scrollIntoView({ block: 'start' });
  }
}
