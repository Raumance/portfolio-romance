import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, of, switchMap, tap } from 'rxjs';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { FooterComponent } from '../../../shared/components/footer/footer.component';
import { LoaderComponent } from '../../../shared/components/loader/loader.component';
import { ProjectService } from '../../../core/services/project.service';
import { Project } from '../../../core/models/project.model';

@Component({
  selector: 'app-portfolio-detail',
  imports: [HeaderComponent, FooterComponent, RouterLink, LoaderComponent],
  templateUrl: './portfolio-detail.component.html',
  styleUrl: './portfolio-detail.component.scss'
})
export class PortfolioDetailComponent {
  private route = inject(ActivatedRoute);
  private projectService = inject(ProjectService);
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
}
