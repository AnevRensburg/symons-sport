import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { filter } from 'rxjs';
import { Picture } from '../../shared/picture/picture';

export const NAV_LINKS = [
  { path: '/', label: 'Home', exact: true },
  { path: '/about', label: 'About', exact: false },
  { path: '/products', label: 'Products', exact: false },
  { path: '/dealers', label: 'Dealers', exact: false },
  { path: '/elmer', label: 'Elmer', exact: false },
  { path: '/contact', label: 'Contact', exact: false },
] as const;

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, Picture],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '(document:keydown.escape)': 'closeAndFocusToggle()' },
})
export class Header {
  protected readonly links = NAV_LINKS;
  protected readonly menuOpen = signal(false);
  private readonly toggleButton = viewChild.required<ElementRef<HTMLButtonElement>>('menuButton');

  constructor() {
    inject(Router)
      .events.pipe(
        filter((e) => e instanceof NavigationEnd),
        takeUntilDestroyed(inject(DestroyRef)),
      )
      .subscribe(() => this.menuOpen.set(false));
  }

  protected toggle(): void {
    this.menuOpen.update((open) => !open);
  }

  protected closeAndFocusToggle(): void {
    if (!this.menuOpen()) return;
    this.menuOpen.set(false);
    this.toggleButton().nativeElement.focus();
  }
}
