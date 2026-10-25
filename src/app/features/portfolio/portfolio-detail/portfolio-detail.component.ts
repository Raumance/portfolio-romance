import { Component, computed, effect, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, of, switchMap, tap } from 'rxjs';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { FooterComponent } from '../../../shared/components/footer/footer.component';
import { LoaderComponent } from '../../../shared/components/loader/loader.component';
import { ProjectService } from '../../../core/services/project.service';
import { SeoService } from '../../../core/services/seo.service';
import { Project } from '../../../core/models/project.model';

@Component({
  selector: 'app-portfolio-detail',
  imports: [HeaderComponent, FooterComponent, RouterLink, LoaderComponent],
  templateUrl: './portfolio-detail.component.html',
  styleUrl: './portfolio-detail.component.scss'
})
export class PortfolioDetailComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private projectService = inject(ProjectService);
  private seo = inject(SeoService);
  activeImage = signal<string | null>(null);
  isLoading = signal(true);

  project = toSignal(
    this.route.paramMap.pipe(
      tap(() => {
        this.isLoading.set(true);
        this.activeImage.set(null);
      }),
      switchMap((params) =>
        this.projectService.getById(params.get('id')!).pipe(
          tap((project) => {
            this.activeImage.set(project.image);
            this.isLoading.set(false);
          }),
          catchError(() => {
            this.isLoading.set(false);
            return of(null as Project | null);
          })
        )
      )
    )
  );

  gallery = computed(() => {
    const project = this.project();
    if (!project) {
      return [];
    }
    return [project.image, ...(project.screenshots ?? [])].filter(
      (url, index, list) => url && list.indexOf(url) === index
    );
  });

  selectImage(url: string): void {
    this.activeImage.set(url);
  }

  constructor() {
    effect(() => {
      const project = this.project();
      if (this.isLoading()) {
        return;
      }

      const path = this.router.url.split('?')[0];
      if (!project) {
        this.seo.apply({
          title: 'Projet introuvable — Romance Nguema',
          description: 'Ce projet est introuvable dans le portfolio de Romance Nguema.',
          path,
          robots: 'noindex, nofollow'
        });
        return;
      }

      const description = (project.shortDescription || project.description || project.title).slice(0, 160);
      this.seo.apply({
        title: `${project.title} — Portfolio — Romance Nguema`,
        description,
        path: `/portfolio/${project._id ?? this.route.snapshot.paramMap.get('id') ?? ''}`,
        image: project.image,
        type: 'article',
        jsonLd: {
          '@type': 'CreativeWork',
          name: project.title,
          description,
          image: project.image,
          url: `${this.seo.siteUrl}${path}`,
          keywords: (project.technologies ?? []).join(', '),
          author: { '@id': `${this.seo.siteUrl}/#romance` }
        }
      });
    });
  }
}
