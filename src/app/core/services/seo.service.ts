import { Injectable, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import { environment } from '../../../environments/environment';

export interface SeoPage {
  title: string;
  description: string;
  path?: string;
  robots?: string;
  image?: string;
  type?: 'website' | 'article' | 'profile';
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

@Injectable({ providedIn: 'root' })
export class SeoService {
  private title = inject(Title);
  private meta = inject(Meta);
  private document = inject(DOCUMENT);

  readonly siteUrl = environment.siteUrl.replace(/\/$/, '');
  readonly defaultImage = `${this.siteUrl}/assets/images/NGUEMA.jpeg`;

  apply(page: SeoPage): void {
    const path = this.normalizePath(page.path ?? '/');
    const url = `${this.siteUrl}${path === '/' ? '/' : path}`;
    const image = this.toAbsoluteUrl(page.image ?? this.defaultImage);
    const robots = page.robots ?? 'index, follow, max-image-preview:large';

    this.title.setTitle(page.title);
    this.meta.updateTag({ name: 'description', content: page.description });
    this.meta.updateTag({ name: 'robots', content: robots });
    this.meta.updateTag({ name: 'googlebot', content: robots });
    this.meta.updateTag({ property: 'og:type', content: page.type ?? 'website' });
    this.meta.updateTag({ property: 'og:title', content: page.title });
    this.meta.updateTag({ property: 'og:description', content: page.description });
    this.meta.updateTag({ property: 'og:url', content: url });
    this.meta.updateTag({ property: 'og:image', content: image });
    this.meta.updateTag({ property: 'og:image:alt', content: page.title });
    this.meta.updateTag({ property: 'og:image:type', content: 'image/jpeg' });
    this.meta.updateTag({ name: 'twitter:title', content: page.title });
    this.meta.updateTag({ name: 'twitter:description', content: page.description });
    this.meta.updateTag({ name: 'twitter:image', content: image });
    this.meta.updateTag({ name: 'twitter:image:alt', content: page.title });
    this.setCanonical(url);
    this.setJsonLd(this.buildGraph(page, url));
  }

  private buildGraph(page: SeoPage, url: string): Record<string, unknown> {
    const extras = page.jsonLd ? (Array.isArray(page.jsonLd) ? page.jsonLd : [page.jsonLd]) : [];

    return {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Person',
          '@id': `${this.siteUrl}/#romance`,
          name: 'Romance Nguema',
          alternateName: ['NGUEMA Raumance', 'Raumance'],
          jobTitle: 'Développeur full-stack',
          description:
            'Développeur web et mobile à Libreville, Gabon. Applications Angular, Node.js, MongoDB et Flutter.',
          url: `${this.siteUrl}/`,
          image: this.defaultImage,
          email: 'mailto:rnguema288@gmail.com',
          telephone: ['+24166500198', '+24174994095'],
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Libreville',
            addressCountry: 'GA'
          },
          knowsAbout: [
            'Angular',
            'Node.js',
            'MongoDB',
            'Express',
            'Flutter',
            'TypeScript',
            'MEAN',
            'Développement web',
            'Développement mobile'
          ],
          sameAs: [
            'https://github.com/Raumance',
            'https://www.linkedin.com/in/romance-nguema-760b732a0/'
          ]
        },
        {
          '@type': 'WebSite',
          '@id': `${this.siteUrl}/#website`,
          url: `${this.siteUrl}/`,
          name: 'Romance Nguema',
          description: 'Portfolio de Romance Nguema, développeur web et mobile à Libreville.',
          inLanguage: 'fr-FR',
          publisher: { '@id': `${this.siteUrl}/#romance` }
        },
        {
          '@type': 'ProfessionalService',
          '@id': `${this.siteUrl}/#service`,
          name: 'Romance Nguema — Développement web et mobile',
          url: `${this.siteUrl}/`,
          image: this.defaultImage,
          areaServed: ['Libreville', 'Gabon'],
          serviceType: ['Développement web', 'Développement mobile', 'Applications MEAN', 'Applications Flutter'],
          founder: { '@id': `${this.siteUrl}/#romance` }
        },
        {
          '@type': 'WebPage',
          '@id': `${url}#webpage`,
          url,
          name: page.title,
          description: page.description,
          inLanguage: 'fr-FR',
          isPartOf: { '@id': `${this.siteUrl}/#website` },
          about: { '@id': `${this.siteUrl}/#romance` }
        },
        ...extras
      ]
    };
  }

  private setCanonical(url: string): void {
    let link = this.document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.document.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }

  private setJsonLd(data: Record<string, unknown>): void {
    let script = this.document.querySelector<HTMLScriptElement>('script#seo-jsonld');
    if (!script) {
      script = this.document.createElement('script');
      script.id = 'seo-jsonld';
      script.type = 'application/ld+json';
      this.document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(data);
  }

  private normalizePath(path: string): string {
    const clean = path.split('?')[0].split('#')[0];
    if (!clean || clean === '/') {
      return '/';
    }
    return clean.startsWith('/') ? clean : `/${clean}`;
  }

  private toAbsoluteUrl(value: string): string {
    if (value.startsWith('http://') || value.startsWith('https://')) {
      return value;
    }
    return `${this.siteUrl}${value.startsWith('/') ? value : `/${value}`}`;
  }
}
