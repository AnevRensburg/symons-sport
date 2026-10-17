import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="page container prose">
      <h1>Page not found</h1>
      <p>Sorry, we couldn't find that page. It may have moved when we updated our website.</p>
      <ul>
        <li><a routerLink="/">Home</a></li>
        <li><a routerLink="/products">Products</a></li>
        <li><a routerLink="/dealers">Find a dealer</a></li>
        <li><a routerLink="/contact">Contact us</a></li>
      </ul>
    </div>
  `,
  styles: `
    ul {
      display: grid;
      gap: var(--space-2);
      padding-inline-start: 1.2rem;
    }
  `,
})
export class NotFound {}
