import { DOCUMENT, Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { SITE } from './site';

/** SEO settings for a route, provided as `data: { seo: {...} }`. */
export interface PageSeo {
  readonly title: string;
  readonly description: string;
  /** Canonical path, e.g. "/about/" (trailing slash matches the GitHub Pages folder URL). */
  readonly path: string;
  readonly noindex?: boolean;
  readonly jsonLd?: object;
}

const JSON_LD_ID = 'page-json-ld';

/** Applies title, description, canonical, Open Graph, Twitter and JSON-LD tags from route data. */
@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly router = inject(Router);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly document = inject(DOCUMENT);

  init(): void {
    this.router.events.pipe(filter((e) => e instanceof NavigationEnd)).subscribe(() => {
      const seo = this.deepestChild(this.router.routerState.snapshot.root).data['seo'] as
        PageSeo | undefined;
      if (seo) this.apply(seo);
    });
  }

  private apply(seo: PageSeo): void {
    const url = `${SITE.url}${seo.path}`;
    const image = `${SITE.url}${SITE.ogImage}`;

    this.title.setTitle(seo.title);
    this.setName('description', seo.description);
    this.setName('robots', seo.noindex ? 'noindex, follow' : 'index, follow');

    this.setProperty('og:type', 'website');
    this.setProperty('og:site_name', SITE.name);
    this.setProperty('og:locale', 'en_ZA');
    this.setProperty('og:title', seo.title);
    this.setProperty('og:description', seo.description);
    this.setProperty('og:url', url);
    this.setProperty('og:image', image);
    this.setProperty('og:image:width', '1200');
    this.setProperty('og:image:height', '630');
    this.setProperty('og:image:alt', `${SITE.name} logo over an off-road motorcycle scene`);

    this.setName('twitter:card', 'summary_large_image');
    this.setName('twitter:title', seo.title);
    this.setName('twitter:description', seo.description);
    this.setName('twitter:image', image);

    this.setCanonical(seo.noindex ? null : url);
    this.setJsonLd(seo.jsonLd ?? null);
  }

  private deepestChild(route: ActivatedRouteSnapshot): ActivatedRouteSnapshot {
    return route.firstChild ? this.deepestChild(route.firstChild) : route;
  }

  private setName(name: string, content: string): void {
    this.meta.updateTag({ name, content }, `name="${name}"`);
  }

  private setProperty(property: string, content: string): void {
    this.meta.updateTag({ property, content }, `property="${property}"`);
  }

  private setCanonical(href: string | null): void {
    let link = this.document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!href) {
      link?.remove();
      return;
    }
    if (!link) {
      link = this.document.createElement('link');
      link.rel = 'canonical';
      this.document.head.appendChild(link);
    }
    link.href = href;
  }

  private setJsonLd(data: object | null): void {
    // Re-use the tag written during prerendering so hydration does not duplicate it.
    let script = this.document.getElementById(JSON_LD_ID);
    if (!data) {
      script?.remove();
      return;
    }
    if (!script) {
      script = this.document.createElement('script');
      script.id = JSON_LD_ID;
      script.setAttribute('type', 'application/ld+json');
      this.document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(data);
  }
}
