import { Component, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { filter } from 'rxjs';
import { PageLoaderComponent } from './shared/components/page-loader/page-loader.component';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, PageLoaderComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  private router = inject(Router);
  private title = inject(Title);
  private meta = inject(Meta);
  private document = inject(DOCUMENT);

  constructor() {
    this.router.events.pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd)).subscribe(() => {
      let current = this.router.routerState.root;
      let pageTitle: string | undefined;
      let description: string | undefined;
      while (current) {
        pageTitle = (current.snapshot.data['title'] as string | undefined) ?? pageTitle;
        description = (current.snapshot.data['description'] as string | undefined) ?? description;
        if (!current.firstChild) {
          break;
        }
        current = current.firstChild;
      }

      const fullTitle = pageTitle
        ? `${pageTitle} — Romance Nguema`
        : 'Romance Nguema — Développeur web et mobile';
      const metaDescription =
        description ??
        'Portfolio de Romance Nguema, développeur full-stack à Libreville — Angular, Node.js, MongoDB, Flutter.';
      const path = this.router.url.split('?')[0];
      const url = `${environment.siteUrl}${path === '/' ? '/' : path}`;
      const isAdmin = path.startsWith('/admin');

      this.title.setTitle(fullTitle);
      this.meta.updateTag({ name: 'description', content: metaDescription });
      this.meta.updateTag({ name: 'robots', content: isAdmin ? 'noindex, nofollow' : 'index, follow' });
      this.meta.updateTag({ property: 'og:title', content: fullTitle });
      this.meta.updateTag({ property: 'og:description', content: metaDescription });
      this.meta.updateTag({ property: 'og:url', content: url });
      this.meta.updateTag({ name: 'twitter:title', content: fullTitle });
      this.meta.updateTag({ name: 'twitter:description', content: metaDescription });
      this.setCanonical(url);
    });
  }

  private setCanonical(url: string): void {
    let link = this.document.querySelector('link[rel="canonical"]');
    if (!link) {
      link = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.document.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }
}
