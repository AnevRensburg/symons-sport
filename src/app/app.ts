import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from './core/footer/footer';
import { Header } from './core/header/header';
import { SeoService } from './core/seo.service';
import { BrandCarousel } from './shared/brand-carousel/brand-carousel';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, BrandCarousel],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-header />
    <main id="main" tabindex="-1">
      <router-outlet />
    </main>
    @defer (on viewport; hydrate never) {
      <app-brand-carousel />
    } @placeholder {
      <div class="carousel-placeholder"></div>
    }
    <app-footer />
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      min-block-size: 100dvh;
    }
    main {
      flex: 1;
      outline: none;
    }
    .carousel-placeholder {
      block-size: var(--carousel-height);
    }
  `,
})
export class App {
  constructor() {
    inject(SeoService).init();
  }
}
