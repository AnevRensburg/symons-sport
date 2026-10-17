import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DEALER_COUNT, DEALER_REGIONS, DealerRegion } from '../../data/dealers';
import { Icon } from '../../shared/icon/icon';

@Component({
  selector: 'app-dealers',
  imports: [RouterLink, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dealers.html',
  styleUrl: './dealers.scss',
})
export class Dealers {
  protected readonly regions = DEALER_REGIONS;
  protected readonly total = DEALER_COUNT;
  protected readonly query = signal('');

  protected readonly filtered = computed<readonly DealerRegion[]>(() => {
    const q = this.query().trim().toLowerCase();
    if (!q) return this.regions;
    return this.regions
      .map((region) => ({
        ...region,
        dealers: region.dealers.filter((d) =>
          `${d.name} ${d.address ?? ''} ${region.name}`.toLowerCase().includes(q),
        ),
      }))
      .filter((region) => region.dealers.length > 0);
  });

  protected readonly matchCount = computed(() =>
    this.filtered().reduce((n, r) => n + r.dealers.length, 0),
  );

  protected onSearch(event: Event): void {
    this.query.set((event.target as HTMLInputElement).value);
  }
}
