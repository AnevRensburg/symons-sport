import { DOCUMENT, NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  computed,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { PRODUCT_CATEGORIES, ProductCategory } from '../../data/products';
import { Icon } from '../../shared/icon/icon';
import { ProductCard } from '../../shared/product-card/product-card';

@Component({
  selector: 'app-products',
  imports: [NgTemplateOutlet, RouterLink, Icon, ProductCard],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './products.html',
  styleUrl: './products.scss',
})
export class Products {
  private readonly document = inject(DOCUMENT);
  private readonly results = viewChild.required<ElementRef<HTMLElement>>('results');

  protected readonly categories = PRODUCT_CATEGORIES;
  protected readonly query = signal('');

  /** Categories whose title matches keep all products; otherwise only matching products are shown. */
  protected readonly filtered = computed<readonly ProductCategory[]>(() => {
    const q = this.query().trim().toLowerCase();
    if (!q) return this.categories;
    return this.categories
      .map((category) =>
        category.title.toLowerCase().includes(q)
          ? category
          : {
              ...category,
              products: category.products.filter((p) =>
                `${p.name ?? ''} ${p.detail ?? ''} ${p.alt}`.toLowerCase().includes(q),
              ),
            },
      )
      .filter((category) => category.products.length > 0);
  });

  protected readonly matchCount = computed(() =>
    this.filtered().reduce((n, c) => n + c.products.length, 0),
  );

  protected onSearch(event: Event): void {
    this.query.set((event.target as HTMLInputElement).value);
    // The list may get much shorter: bring the top of the results back into view.
    const results = this.results().nativeElement;
    if (results.getBoundingClientRect().top < 0) results.scrollIntoView({ block: 'start' });
  }

  /** Brand menu: clear any search so the section exists, then scroll to it. */
  protected goTo(event: Event, id: string): void {
    event.preventDefault();
    this.query.set('');
    // Wait for the cleared list to render before scrolling.
    requestAnimationFrame(() => {
      this.document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.replaceState(history.state, '', `${location.pathname}#${id}`);
    });
  }
}
