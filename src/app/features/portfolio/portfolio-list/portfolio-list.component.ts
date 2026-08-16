import { Component, inject, signal, computed } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { FooterComponent } from '../../../shared/components/footer/footer.component';
import { ProjectCardComponent } from '../../../shared/components/project-card/project-card.component';
import { ProjectFilterComponent } from '../components/project-filter/project-filter.component';
import { ProjectService } from '../../../core/services/project.service';

@Component({
  selector: 'app-portfolio-list',
  imports: [HeaderComponent, FooterComponent, ProjectCardComponent, ProjectFilterComponent],
  templateUrl: './portfolio-list.component.html',
  styleUrl: './portfolio-list.component.scss'
})
export class PortfolioListComponent {
  private projectService = inject(ProjectService);
  private allProjects = toSignal(this.projectService.getAll(), { initialValue: [] });

  activeCategory = signal<string>('all');
  activeTechnology = signal<string>('all');

  categories = computed<string[]>(() => {
    const set = new Set(this.allProjects().map((project) => project.category.toLowerCase().trim()));
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  });

  technologies = computed<string[]>(() => {
    const set = new Set(
      this.allProjects().flatMap((project) => project.technologies.map((tech) => tech.trim())).filter(Boolean)
    );
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  });

  filteredProjects = computed(() => {
    const category = this.activeCategory();
    const technology = this.activeTechnology();
    return this.allProjects().filter((project) => {
      const matchesCategory = category === 'all' || project.category.toLowerCase().trim() === category;
      const matchesTechnology =
        technology === 'all' ||
        project.technologies.some((tech) => tech.toLowerCase() === technology.toLowerCase());
      return matchesCategory && matchesTechnology;
    });
  });

  onCategoryChange(category: string): void {
    this.activeCategory.set(category);
  }

  onTechnologyChange(technology: string): void {
    this.activeTechnology.set(technology);
  }
}
