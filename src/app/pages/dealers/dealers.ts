import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  afterNextRender,
  computed,
  signal,
  viewChild,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { apiUrl } from '../../core/api';
import { DEALER_REGIONS, Dealer, DealerRegion } from '../../data/dealers';

interface DealerRow extends Dealer {
  readonly key: string;
  readonly regionId: string;
  readonly region: string;
  /** Lower-cased text the search matches against. */
  readonly haystack: string;
}

/** Every dealer in one list, in region order then data order. */
const toRows = (regions: readonly DealerRegion[]): DealerRow[] =>
  regions.flatMap((region) =>
    region.dealers.map((d, i) => ({
      ...d,
      key: `${region.id}/${d.name}/${i}`,
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
  /**
   * The prerendered page shows the list from data/dealers.ts (for search engines, and while the
   * API wakes up); in the browser it is replaced by the live list the owner edits on /admin.
   */
  protected readonly regions = signal<readonly DealerRegion[]>(DEALER_REGIONS);
  private readonly allRows = computed(() => toRows(this.regions()));
  protected readonly total = computed(() => this.allRows().length);
  protected readonly query = signal('');
  protected readonly region = signal<string | null>(null);

  private readonly gridBox = viewChild.required<ElementRef<HTMLElement>>('gridBox');

  constructor() {
    afterNextRender(() => void this.loadLive());
  }

  private async loadLive(): Promise<void> {
    try {
      const res = await fetch(`${apiUrl()}/api/dealers`);
      if (!res.ok) return;
      const live = (await res.json()) as DealerRegion[];
      if (Array.isArray(live) && live.length) this.regions.set(live);
    } catch {
      // API unreachable: keep showing the built-in list.
    }
  }

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
    const rows = this.allRows();
    if (!match) return rows.map((row) => ({ row, hit: false }));
    const hits = rows.filter(match);
    const rest = rows.filter((row) => !match(row));
    return [
      ...hits.map((row) => ({ row, hit: true })),
      ...rest.map((row) => ({ row, hit: false })),
    ];
  });

  protected readonly hitCount = computed(() => this.rows().filter((r) => r.hit).length);

  protected readonly regionName = computed(
    () => this.regions().find((r) => r.id === this.region())?.name ?? '',
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
