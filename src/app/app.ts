import { Component, inject } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { PageLoaderComponent } from './shared/components/page-loader/page-loader.component';
import { SeoService } from './core/services/seo.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, PageLoaderComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  private router = inject(Router);
  private seo = inject(SeoService);

  constructor() {
    this.router.events.pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd)).subscribe(() => {
      let current = this.router.routerState.root;
      let pageTitle: string | undefined;
      let description: string | undefined;
      let titleAbsolute = false;
      let robots: string | undefined;
      while (current) {
        const data = current.snapshot.data;
        pageTitle = (data['title'] as string | undefined) ?? pageTitle;
        description = (data['description'] as string | undefined) ?? description;
        titleAbsolute = Boolean(data['titleAbsolute']) || titleAbsolute;
        robots = (data['robots'] as string | undefined) ?? robots;
        if (!current.firstChild) {
          break;
        }
        current = current.firstChild;
      }

      const path = this.router.url.split('?')[0];
      const isAdmin = path.startsWith('/admin');
      const fullTitle = titleAbsolute
        ? (pageTitle ?? 'Romance Nguema — Développeur web et mobile à Libreville')
        : pageTitle
          ? `${pageTitle} — Romance Nguema`
          : 'Romance Nguema — Développeur web et mobile à Libreville';

      this.seo.apply({
        title: fullTitle,
        description:
          description ??
          'Romance Nguema, développeur web et mobile à Libreville (Gabon). Applications Angular, Node.js, MongoDB et Flutter.',
        path,
        robots: robots ?? (isAdmin ? 'noindex, nofollow' : 'index, follow, max-image-preview:large')
      });
    });
  }
}
