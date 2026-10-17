import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PRODUCT_CATEGORIES } from '../../data/products';
import { Icon } from '../../shared/icon/icon';
import { ProductCard } from '../../shared/product-card/product-card';

@Component({
  selector: 'app-products',
  imports: [RouterLink, Icon, ProductCard],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './products.html',
  styleUrl: './products.scss',
})
export class Products {
  protected readonly categories = PRODUCT_CATEGORIES;
  /** Categories rendered and hydrated straight away; the rest hydrate when scrolled into view. */
  protected readonly eagerCount = 1;
}
