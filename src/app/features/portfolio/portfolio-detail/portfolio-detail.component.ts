import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { switchMap, tap } from 'rxjs';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { FooterComponent } from '../../../shared/components/footer/footer.component';
import { ProjectService } from '../../../core/services/project.service';

@Component({
  selector: 'app-portfolio-detail',
  imports: [HeaderComponent, FooterComponent, RouterLink],
  templateUrl: './portfolio-detail.component.html',
  styleUrl: './portfolio-detail.component.scss'
})
export class PortfolioDetailComponent {
  private route = inject(ActivatedRoute);
  private projectService = inject(ProjectService);
  activeImage = signal<string | null>(null);

  project = toSignal(
    this.route.paramMap.pipe(
      switchMap((params) => this.projectService.getById(params.get('id')!)),
      tap((project) => this.activeImage.set(project.image))
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
