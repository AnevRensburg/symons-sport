import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SITE } from '../../core/site';
import { Icon } from '../../shared/icon/icon';

@Component({
  selector: 'app-contact',
  imports: [Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="page container">
      <h1>Contact Info</h1>
      <p class="intro prose">
        Get in touch for product enquiries, stock availability or to become a dealer.
      </p>

      <div class="cards">
        @for (phone of site.phones; track phone.tel) {
          <a class="card" [href]="'tel:' + phone.tel">
            <app-icon name="phone" class="card__icon" />
            <span class="card__label">{{ phone.label }}</span>
            <span class="card__value">{{ phone.display }}</span>
          </a>
        }
        <a class="card" [href]="'mailto:' + site.email">
          <app-icon name="email" class="card__icon" />
          <span class="card__label">Email</span>
          <span class="card__value">{{ site.email }}</span>
        </a>
        <a class="card" [href]="site.mapUrl" target="_blank" rel="noopener">
          <app-icon name="map-pin" class="card__icon" />
          <span class="card__label"
            >Address <span class="visually-hidden">(opens Google Maps in a new tab)</span></span
          >
          <address class="card__value">
            @for (line of site.address.lines; track line) {
              {{ line }}<br />
            }
          </address>
        </a>
      </div>
    </div>
  `,
  styles: `
    .intro {
      color: var(--color-muted);
    }
    .cards {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(min(100%, 20rem), 1fr));
      gap: var(--space-3);
      max-inline-size: 52rem;
      margin-block-start: var(--space-4);
    }
    .card {
      display: grid;
      grid-template-columns: auto 1fr;
      column-gap: var(--space-3);
      align-content: start;
      padding: var(--space-4);
      border: 1px solid var(--color-border);
      border-radius: var(--radius);
      color: var(--color-text);
      text-decoration: none;
      transition:
        border-color 0.2s,
        box-shadow 0.2s;
    }
    .card:hover {
      border-color: var(--color-accent);
      box-shadow: 0 0.5rem 1.5rem rgb(0 0 0 / 0.06);
      color: var(--color-text);
    }
    .card__icon {
      grid-row: span 2;
      color: var(--color-accent-text);
      font-size: 1.5rem;
    }
    .card__label {
      color: var(--color-muted);
      font-size: 0.9rem;
    }
    .card__value {
      font-size: 1.15rem;
      font-style: normal;
      font-weight: 600;
      overflow-wrap: anywhere;
    }
  `,
})
export class Contact {
  protected readonly site = SITE;
}
