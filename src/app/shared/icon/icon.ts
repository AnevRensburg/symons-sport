import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export type IconName = 'phone' | 'email' | 'map-pin' | 'close' | 'menu' | 'play' | 'arrow-up';

/** Small inline SVG icon set (stroke icons, 24px grid). Decorative: label the parent control instead. */
@Component({
  selector: 'app-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'aria-hidden': 'true', class: 'icon' },
  template: `
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      focusable="false"
    >
      @switch (name()) {
        @case ('phone') {
          <path
            d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"
          />
        }
        @case ('email') {
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="m22 7-10 6L2 7" />
        }
        @case ('map-pin') {
          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
          <circle cx="12" cy="10" r="3" />
        }
        @case ('close') {
          <path d="M18 6 6 18M6 6l12 12" />
        }
        @case ('menu') {
          <path d="M4 6h16M4 12h16M4 18h16" />
        }
        @case ('play') {
          <path d="M8 5v14l11-7z" fill="currentColor" />
        }
        @case ('arrow-up') {
          <path d="M12 19V5M5 12l7-7 7 7" />
        }
      }
    </svg>
  `,
  styles: `
    :host {
      display: inline-flex;
      inline-size: 1.25em;
      block-size: 1.25em;
      flex: none;
    }
    svg {
      inline-size: 100%;
      block-size: 100%;
    }
  `,
})
export class Icon {
  readonly name = input.required<IconName>();
}
