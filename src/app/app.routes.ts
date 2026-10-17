import { Routes } from '@angular/router';
import { LOCAL_BUSINESS_JSON_LD } from './core/site';
import { PageSeo } from './core/seo.service';

const seo = (value: PageSeo) => ({ seo: value });

const notFound = seo({
  title: 'Page Not Found | Symons Sport International',
  description:
    'The page you are looking for does not exist. Browse our motorcycle parts or contact us.',
  path: '/404.html',
  noindex: true,
});

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./pages/home/home').then((m) => m.Home),
    data: seo({
      title: 'Symons Sport International | Motorcycle Parts Distributor, Cape Town',
      description:
        'Importer and distributor of MX, enduro and off-road motorcycle parts in Bellville, Cape Town: Enduro Engineering, Excel, Kite, Risk Racing, Supersprox and more.',
      path: '/',
      jsonLd: LOCAL_BUSINESS_JSON_LD,
    }),
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about').then((m) => m.About),
    data: seo({
      title: 'About Us | Symons Sport International, Bellville',
      description:
        'Family-run importer of quality motorcycle parts since 2003, based in Bellville, Cape Town, supplying dealers across South Africa and neighbouring countries.',
      path: '/about/',
    }),
  },
  {
    path: 'products',
    loadComponent: () => import('./pages/products/products').then((m) => m.Products),
    data: seo({
      title: 'Motorcycle Parts & Brands | Symons Sport International',
      description:
        'Enduro Engineering skid plates and guards, Excel rims, Kite wheels, Supersprox sprockets, Risk Racing tools, TM Designworks chain guides, bolts and brake discs.',
      path: '/products/',
    }),
  },
  {
    path: 'elmer',
    loadComponent: () => import('./pages/elmer/elmer').then((m) => m.Elmer),
    data: seo({
      title: 'Elmer Symons Tribute | Symons Sport International',
      description:
        'Remembering co-founder Elmer Symons, enduro racer from KwaZulu-Natal and Dakar Rally rider. Watch him ride and read tributes from friends and fans.',
      path: '/elmer/',
    }),
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact/contact').then((m) => m.Contact),
    data: seo({
      title: 'Contact Us | Symons Sport International, Bellville',
      description:
        'Call 021 975 9629 or email symons.sport@gmail.com. Visit us at Unit 3, 30 Bella Rosa St, Bellville, Cape Town. Ask about becoming a dealer.',
      path: '/contact/',
      jsonLd: LOCAL_BUSINESS_JSON_LD,
    }),
  },
  // Prerendered and copied to 404.html for GitHub Pages by scripts/postbuild.mjs.
  {
    path: '404',
    loadComponent: () => import('./pages/not-found/not-found').then((m) => m.NotFound),
    data: notFound,
  },
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found').then((m) => m.NotFound),
    data: notFound,
  },
];
