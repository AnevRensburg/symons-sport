import { Component, computed, input } from '@angular/core';

/** Lightweight SVG charts (no chart library: the admin page stays small and fast). */
@Component({
  selector: 'app-line-chart',
  template: `
    <svg
      [attr.viewBox]="'0 0 ' + width + ' ' + height"
      preserveAspectRatio="none"
      role="img"
      [attr.aria-label]="label()"
    >
      <path class="area" [attr.d]="area()" />
      <path class="line" [attr.d]="line()" />
      @if (line2()) {
        <path class="line line--2" [attr.d]="line2()" />
      }
    </svg>
    <div class="chart-axis">
      <span>{{ data()[0]?.key }}</span
      ><span>{{ data().at(-1)?.key }}</span>
    </div>
  `,
  styles: `
    :host {
      display: block;
    }
    svg {
      width: 100%;
      height: 200px;
      display: block;
      overflow: visible;
    }
    .line {
      fill: none;
      stroke: var(--accent);
      stroke-width: 2.5;
      vector-effect: non-scaling-stroke;
      stroke-linejoin: round;
    }
    .line--2 {
      stroke: var(--ink);
      opacity: 0.35;
      stroke-dasharray: 4 4;
    }
    .area {
      fill: var(--accent);
      opacity: 0.12;
    }
    .chart-axis {
      display: flex;
      justify-content: space-between;
      font-size: 0.75rem;
      color: var(--muted);
      margin-top: 0.35rem;
    }
  `,
})
export class LineChart {
  readonly data = input.required<{ key: string; value: number; value2?: number }[]>();
  readonly label = input('Chart');
  readonly width = 600;
  readonly height = 200;
  private readonly max = computed(() =>
    Math.max(1, ...this.data().flatMap((d) => [d.value, d.value2 ?? 0])),
  );
  private points(pick: (d: { value: number; value2?: number }) => number) {
    const d = this.data();
    const step = this.width / Math.max(1, d.length - 1);
    return d.map(
      (p, i) => [i * step, this.height - (pick(p) / this.max()) * (this.height - 10)] as const,
    );
  }
  readonly line = computed(() =>
    this.points((d) => d.value)
      .map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(1)},${y.toFixed(1)}`)
      .join(''),
  );
  readonly line2 = computed(() =>
    this.data().some((d) => d.value2 !== undefined)
      ? this.points((d) => d.value2 ?? 0)
          .map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(1)},${y.toFixed(1)}`)
          .join('')
      : '',
  );
  readonly area = computed(() => `${this.line()}L${this.width},${this.height}L0,${this.height}Z`);
}

/** Horizontal share bars, e.g. traffic channels. */
@Component({
  selector: 'app-share-list',
  template: `
    <ul>
      @for (r of rows(); track r.name) {
        <li>
          <div class="row">
            <span>{{ r.name }}</span
            ><strong>{{ r.value.toLocaleString('en-ZA') }}</strong>
          </div>
          <div class="track"><span [style.width.%]="r.pct"></span></div>
        </li>
      }
    </ul>
  `,
  styles: `
    ul {
      list-style: none;
      margin: 0;
      padding: 0;
      display: grid;
      gap: 0.7rem;
    }
    .row {
      display: flex;
      justify-content: space-between;
      font-size: 0.875rem;
      margin-bottom: 0.3rem;
      gap: 1rem;
    }
    .row span {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .track {
      height: 6px;
      border-radius: 99px;
      background: var(--line);
      overflow: hidden;
    }
    .track span {
      display: block;
      height: 100%;
      background: var(--accent);
      border-radius: 99px;
    }
  `,
})
export class ShareList {
  readonly data = input.required<{ name: string; value: number }[]>();
  readonly rows = computed(() => {
    const max = Math.max(1, ...this.data().map((d) => d.value));
    return this.data().map((d) => ({ ...d, pct: (d.value / max) * 100 }));
  });
}
