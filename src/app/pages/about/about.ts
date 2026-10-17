import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="page container">
      <div class="prose">
        <h1>Who we are</h1>
        <p class="lead">
          We are Importers and Distributors of leading international brand motorcycle products in
          Southern Africa. Our dealer network covers the entire South Africa, as well as some
          neighbouring countries. We source quality motorcycle parts from all over the world. With
          our roots in MX and Offroad, we are also growing in the Adventure Bike market.
        </p>

        <h2>History</h2>
        <p>
          Symons Sport International got its name from the two Symons brothers, Philip and
          <a routerLink="/elmer">Elmer Symons</a>. The business was started by the two brothers in
          2003. While Elmer was racing championships in the United States he discovered good quality
          off road bike protection and got his brother Philip involved in importing and distributing
          to all dealers in South Africa.
        </p>
        <p>
          Since 2013, Hanco and Sonja Janse van Rensburg are the owners and managers of SSI. Their
          family-based business in Cape Town, South Africa prides itself with the high quality
          products and excellent service they provide to the Motorcycle Industry.
        </p>

        <div class="actions">
          <a class="button" routerLink="/products">Our products</a>
          <a class="button button--ghost" routerLink="/contact">Contact us</a>
        </div>
      </div>
    </article>
  `,
  styles: `
    h2 {
      margin-block-start: var(--space-5);
    }
    p {
      line-height: 1.9;
    }
    .lead {
      font-size: 1.15rem;
    }
    .actions {
      display: flex;
      flex-wrap: wrap;
      gap: var(--space-2);
      margin-block-start: var(--space-5);
    }
  `,
})
export class About {}
