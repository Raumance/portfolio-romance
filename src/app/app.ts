import { Component, inject } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { filter } from 'rxjs';
import { PageLoaderComponent } from './shared/components/page-loader/page-loader.component';

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
      this.title.setTitle(
        pageTitle ? `${pageTitle} — Romance Nguema` : 'Romance Nguema — Développeur web et mobile'
      );
      if (description) {
        this.meta.updateTag({ name: 'description', content: description });
      }
    });
  }
}
