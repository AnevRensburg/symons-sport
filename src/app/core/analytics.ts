import { inject, provideAppInitializer } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const isAdmin = (path: string) => /^\/admin(\/|\?|#|$)/.test(path);

/**
 * Google Analytics 4 (the report on the admin page's Website analytics tab). With an empty
 * measurement ID nothing loads. The script loads once the page has finished loading, so it doesn't
 * slow the first view; page views are sent on every route change. The admin page is not tracked.
 */
export function provideAnalytics(measurementId: string) {
  return provideAppInitializer(() => {
    if (!measurementId || typeof window === 'undefined' || isAdmin(location.pathname)) return;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer.push(arguments);
    };
    window.gtag('js', new Date());
    window.gtag('config', measurementId, { send_page_view: false });
    const load = () => {
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
      document.head.append(script);
    };
    if (document.readyState === 'complete') load();
    else window.addEventListener('load', load, { once: true });
    inject(Router)
      .events.pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe((e) => {
        if (!isAdmin(e.urlAfterRedirects)) {
          window.gtag?.('event', 'page_view', {
            page_path: e.urlAfterRedirects,
            page_title: document.title,
          });
        }
      });
  });
}
