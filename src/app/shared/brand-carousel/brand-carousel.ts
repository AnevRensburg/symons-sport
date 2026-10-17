import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BRANDS } from '../../data/brands';
import { Picture } from '../picture/picture';

/**
 * Infinite logo strip in pure CSS: the list is rendered twice and the track slides by 50%.
 * With prefers-reduced-motion the logos simply wrap and stay still.
 */
@Component({
  selector: 'app-brand-carousel',
  imports: [Picture],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="carousel" aria-labelledby="brands-heading">
      <h2 id="brands-heading" class="visually-hidden">Brands we distribute</h2>
      <div class="carousel__track">
        @for (copy of copies; track copy) {
          <ul class="carousel__list" role="list" [attr.aria-hidden]="copy === 1 ? 'true' : null">
            @for (brand of brands; track brand.name) {
              <li class="carousel__item">
                <app-picture
                  [src]="brand.logo"
                  [alt]="copy === 0 ? brand.name + ' logo' : ''"
                  sizes="160px"
                />
              </li>
            }
          </ul>
        }
      </div>
    </section>
  `,
  styles: `
    .carousel {
      overflow: hidden;
      block-size: var(--carousel-height);
      background: var(--color-bg);
    }
    .carousel__track {
      display: flex;
      inline-size: max-content;
      block-size: 100%;
      animation: scroll 36s linear infinite;
    }
    .carousel__list {
      display: flex;
      align-items: center;
      margin: 0;
      padding: 0;
      list-style: none;
    }
    .carousel__item {
      display: grid;
      place-items: center;
      inline-size: 11rem;
      block-size: 100%;
      padding-inline: var(--space-4);
      --picture-height: 3.25rem;
      --picture-width: 100%;
    }
    @keyframes scroll {
      to {
        transform: translateX(-50%);
      }
    }
    @media (prefers-reduced-motion: reduce) {
      .carousel {
        block-size: auto;
      }
      .carousel__track {
        inline-size: auto;
        animation: none;
      }
      .carousel__list {
        flex-wrap: wrap;
        justify-content: center;
        padding-block: var(--space-3);
      }
      .carousel__list[aria-hidden] {
        display: none;
      }
      .carousel__item {
        block-size: 5rem;
      }
    }
  `,
})
export class BrandCarousel {
  protected readonly brands = BRANDS;
  protected readonly copies = [0, 1];
}
