import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Product } from '../../data/products';
import { Picture } from '../picture/picture';

@Component({
  selector: 'app-product-card',
  imports: [Picture],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="card">
      @if (product().name; as name) {
        <h3 class="card__title">
          {{ name }}
          @if (product().detail; as detail) {
            <span class="card__detail">{{ detail }}</span>
          }
        </h3>
      }
      <app-picture
        class="card__image"
        [src]="product().image"
        [alt]="product().alt"
        sizes="(min-width: 48em) 280px, 80vw"
      />
    </article>
  `,
  styles: `
    :host {
      display: block;
    }
    .card {
      display: flex;
      flex-direction: column;
      block-size: 100%;
      overflow: hidden;
      border: 1px solid var(--color-border);
      border-radius: var(--radius);
      background: var(--color-bg);
      transition: box-shadow 0.2s;
    }
    .card:hover {
      box-shadow: 0 0.5rem 1.5rem rgb(0 0 0 / 0.08);
    }
    .card__title {
      margin: 0;
      padding: var(--space-3);
      border-block-end: 1px solid var(--color-border);
      background: var(--color-surface);
      font-family: var(--font-body);
      font-size: 1.05rem;
      font-weight: 600;
      text-align: center;
    }
    .card__detail {
      display: block;
      color: var(--color-muted);
      font-size: 0.9rem;
      font-weight: 400;
    }
    .card__image {
      flex: 1;
      aspect-ratio: 4 / 3;
      padding: var(--space-3);
      --picture-width: 100%;
      --picture-height: 100%;
    }
  `,
})
export class ProductCard {
  readonly product = input.required<Product>();
}
