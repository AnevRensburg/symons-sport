import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { Footer } from './core/footer/footer';
import { Header } from './core/header/header';
import { SeoService } from './core/seo.service';
import { BrandCarousel } from './shared/brand-carousel/brand-carousel';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, BrandCarousel],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (isAdmin()) {
      <router-outlet />
    } @else {
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
    }
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
  /** The admin page has its own layout, without the website's header, carousel and footer. */
  protected readonly isAdmin = signal(
    typeof location !== 'undefined' && /^\/admin(\/|$)/.test(location.pathname),
  );

  constructor() {
    inject(SeoService).init();
    inject(Router)
      .events.pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe((e) => this.isAdmin.set(/^\/admin(\/|\?|#|$)/.test(e.urlAfterRedirects)));
  }
}
