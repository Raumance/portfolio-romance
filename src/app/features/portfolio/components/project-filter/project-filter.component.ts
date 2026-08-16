import { TitleCasePipe } from '@angular/common';
import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-project-filter',
  imports: [TitleCasePipe],
  templateUrl: './project-filter.component.html',
  styleUrl: './project-filter.component.scss'
})
export class ProjectFilterComponent {
  categories = input.required<string[]>();
  technologies = input<string[]>([]);
  activeCategory = input<string>('all');
  activeTechnology = input<string>('all');
  categoryChange = output<string>();
  technologyChange = output<string>();

  selectCategory(category: string): void {
    this.categoryChange.emit(category);
  }

  selectTechnology(technology: string): void {
    this.technologyChange.emit(technology);
  }
}
