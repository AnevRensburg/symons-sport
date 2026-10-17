import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon } from '../../shared/icon/icon';
import { NAV_LINKS } from '../header/header';
import { SITE } from '../site';

@Component({
  selector: 'app-footer',
  imports: [RouterLink, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <footer class="footer">
      <div class="container footer__grid">
        <section aria-labelledby="footer-contact">
          <h2 id="footer-contact" class="footer__heading">{{ site.name }}</h2>
          <ul class="footer__list" role="list">
            @for (phone of site.phones; track phone.tel) {
              <li>
                <a class="footer__item" [href]="'tel:' + phone.tel">
                  <app-icon name="phone" />
                  <span
                    >{{ phone.display }} <small>({{ phone.label }})</small></span
                  >
                </a>
              </li>
            }
            <li>
              <a class="footer__item" [href]="'mailto:' + site.email">
                <app-icon name="email" />
                <span>{{ site.email }}</span>
              </a>
            </li>
            <li>
              <a class="footer__item" [href]="site.mapUrl" rel="noopener" target="_blank">
                <app-icon name="map-pin" />
                <span
                  >{{ site.address.lines[0] }}, {{ site.address.lines[1] }}
                  <span class="visually-hidden">(opens Google Maps in a new tab)</span></span
                >
              </a>
            </li>
          </ul>
        </section>
        <nav aria-label="Footer">
          <h2 class="footer__heading">Pages</h2>
          <ul class="footer__links" role="list">
            @for (link of links; track link.path) {
              <li>
                <a [routerLink]="link.path">{{ link.label }}</a>
              </li>
            }
          </ul>
        </nav>
      </div>
      <p class="footer__copy container">&copy; {{ year }} {{ site.name }}. All rights reserved.</p>
    </footer>
  `,
  styles: `
    .footer {
      margin-block-start: auto;
      padding-block: var(--space-6) var(--space-4);
      background: var(--color-surface-dark);
      color: var(--color-on-dark);
      font-size: 0.95rem;
    }
    a {
      color: inherit;
      text-decoration: none;
    }
    a:hover {
      color: #fff;
      text-decoration: underline;
    }
    .footer__grid {
      display: grid;
      gap: var(--space-5);
    }
    .footer__heading {
      margin: 0 0 var(--space-3);
      color: #fff;
      font-size: 1.25rem;
    }
    .footer__list,
    .footer__links {
      display: grid;
      gap: var(--space-2);
      margin: 0;
      padding: 0;
      list-style: none;
    }
    .footer__links {
      grid-template-columns: repeat(2, max-content);
      column-gap: var(--space-5);
    }
    .footer__item {
      display: inline-flex;
      align-items: flex-start;
      gap: var(--space-2);
      padding-block: 0.2rem;
    }
    .footer__item app-icon {
      margin-block-start: 0.1em;
      color: var(--color-accent);
    }
    .footer__copy {
      margin-block: var(--space-5) 0;
      padding-block-start: var(--space-3);
      border-block-start: 1px solid rgb(255 255 255 / 0.15);
      font-size: 0.85rem;
    }
    @media (min-width: 48em) {
      .footer__grid {
        grid-template-columns: 2fr 1fr;
      }
    }
  `,
})
export class Footer {
  protected readonly site = SITE;
  protected readonly links = NAV_LINKS;
  protected readonly year = new Date().getFullYear();
}
