import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { AdminApi, type Analytics } from './admin-api';
import { LineChart, ShareList } from './charts';

/** Website analytics tab (GA4), the same report as the other businesses' dashboards. */
@Component({
  selector: 'app-admin-analytics',
  imports: [LineChart, ShareList],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="page-head">
      <div>
        <h1>Website analytics</h1>
        <p class="muted">Visitors to symons-sport.co.za, from Google Analytics.</p>
      </div>
      <div class="tabs" role="group" aria-label="Period">
        @for (d of [7, 28, 90]; track d) {
          <button
            type="button"
            [class.on]="days() === d"
            [attr.aria-pressed]="days() === d"
            (click)="load(d)"
          >
            {{ d }} days
          </button>
        }
      </div>
    </header>
    @if (error()) {
      <p class="error" role="alert">{{ error() }}</p>
    }
    @if (report(); as r) {
      @if (r.source === 'sample') {
        <p class="notice">
          <strong>Sample data.</strong> The real visitor numbers appear here once Google Analytics
          is connected.
        </p>
      }
      <section class="kpis">
        <div class="card kpi">
          <span>Visitors</span><strong>{{ r.totals.users.toLocaleString('en-ZA') }}</strong>
        </div>
        <div class="card kpi">
          <span>Visits</span><strong>{{ r.totals.sessions.toLocaleString('en-ZA') }}</strong>
        </div>
        <div class="card kpi">
          <span>Pages viewed</span><strong>{{ r.totals.pageViews.toLocaleString('en-ZA') }}</strong>
        </div>
        <div class="card kpi">
          <span>Avg. visit</span><strong>{{ duration(r.totals.avgSessionSeconds) }}</strong>
        </div>
      </section>
      <section class="card">
        <div class="card__head">
          <h2>Visitors per day</h2>
          <span class="muted legend"><i></i> visitors <i class="dash"></i> visits</span>
        </div>
        <app-line-chart [data]="daily()" label="Visitors per day" />
      </section>
      <section class="grid-3">
        <div class="card">
          <h2>Most viewed pages</h2>
          <app-share-list [data]="pages()" />
        </div>
        <div class="card">
          <h2>Where visitors come from</h2>
          <app-share-list [data]="channels()" />
        </div>
        <div class="card">
          <h2>Devices</h2>
          <app-share-list [data]="devices()" />
        </div>
      </section>
    } @else if (!error()) {
      <p class="muted">Loading…</p>
    }
  `,
})
export class AnalyticsAdmin {
  private readonly api = inject(AdminApi);
  readonly report = signal<Analytics | null>(null);
  readonly days = signal(28);
  readonly error = signal('');
  readonly daily = computed(() =>
    (this.report()?.daily ?? []).map((d) => ({
      key: new Date(d.date + 'T12:00:00+02:00').toLocaleDateString('en-ZA', {
        day: 'numeric',
        month: 'short',
      }),
      value: d.users,
      value2: d.sessions,
    })),
  );
  readonly pages = computed(() =>
    (this.report()?.topPages ?? []).map((p) => ({ name: p.path, value: p.views })),
  );
  readonly channels = computed(() =>
    (this.report()?.channels ?? []).map((c) => ({ name: c.name, value: c.sessions })),
  );
  readonly devices = computed(() =>
    (this.report()?.devices ?? []).map((c) => ({
      name: c.name[0].toUpperCase() + c.name.slice(1),
      value: c.sessions,
    })),
  );
  readonly duration = (s: number) => `${Math.floor(s / 60)}m ${String(s % 60).padStart(2, '0')}s`;

  constructor() {
    void this.load(28);
  }

  async load(days: number): Promise<void> {
    this.days.set(days);
    this.error.set('');
    try {
      this.report.set(await this.api.analytics(days));
    } catch (e) {
      this.error.set((e as Error).message);
    }
  }
}
