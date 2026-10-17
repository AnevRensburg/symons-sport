import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Picture } from '../../shared/picture/picture';

@Component({
  selector: 'app-home',
  imports: [RouterLink, Picture],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="hero container" aria-labelledby="home-title">
      <div class="hero__media">
        <app-picture
          src="hero/home-hero"
          alt="Off-road motorcycle rider on a dirt trail"
          sizes="(min-width: 80em) 76rem, 100vw"
          [priority]="true"
        />
      </div>
      <div class="hero__welcome">
        <p class="hero__kicker">Welcome to</p>
        <h1 id="home-title" class="hero__title">Symons Sport International</h1>
        <p>
          We are importers and distributors of quality MX and Off-Road motorcycle parts. We
          distribute our products through reputable dealerships throughout Southern Africa.
        </p>
        <p class="hero__cta"><a routerLink="/contact">Contact us</a> to become a dealer.</p>
        <div class="hero__actions">
          <a class="button" routerLink="/products">View products</a>
          <a class="button button--ghost" routerLink="/dealers">Find a dealer</a>
        </div>
      </div>
    </section>
  `,
  styles: `
    .hero {
      display: grid;
      padding-block: 0 var(--space-5);
    }
    .hero__media {
      grid-area: 1 / 1;
      block-size: 16rem;
      margin-inline: calc(var(--gutter) * -1);
      --picture-fit: cover;
      --picture-position: top;
      --picture-height: 100%;
    }
    .hero__media app-picture {
      block-size: 100%;
    }
    .hero__welcome {
      position: relative;
      margin: -3rem var(--space-1) 0;
      padding: var(--space-4);
      background: rgb(255 255 255 / 0.94);
      box-shadow: 0 0.5rem 2rem rgb(0 0 0 / 0.12);
    }
    .hero__kicker {
      margin: 0;
      font-family: var(--font-heading);
      font-size: 1.4rem;
    }
    .hero__title {
      margin-block: var(--space-2) var(--space-4);
    }
    .hero__cta a {
      font-weight: 600;
    }
    .hero__actions {
      display: flex;
      flex-wrap: wrap;
      gap: var(--space-2);
      margin-block-start: var(--space-4);
    }
    @media (min-width: 48em) {
      .hero {
        padding-block: var(--space-4) var(--space-6);
      }
      .hero__media {
        grid-area: 1 / 1;
        block-size: min(80vh, 44rem);
        margin-inline: 0;
      }
      .hero__welcome {
        grid-area: 1 / 1;
        align-self: start;
        max-inline-size: 26rem;
        margin: var(--space-5);
        background: rgb(255 255 255 / 0.82);
        backdrop-filter: blur(2px);
      }
    }
  `,
})
export class Home {}
