import { Component, inject, computed } from '@angular/core';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { SkillCategoryComponent } from './components/skill-category/skill-category.component';
import { LoaderComponent } from '../../shared/components/loader/loader.component';
import { SkillService } from '../../core/services/skill.service';
import { Skill } from '../../core/models/skill.model';
import { toLoadableSignal } from '../../core/utils/to-loadable-signal';

interface SkillGroup {
  category: Skill['category'];
  label: string;
  skills: Skill[];
}

const CATEGORY_LABELS: Record<Skill['category'], string> = {
  'Frontend': 'Frontend',
  'Backend': 'Backend',
  'Bases de données': 'Bases de données',
  'Mobile': 'Mobile',
  'Outils': 'Outils & Méthodes'
};

const CATEGORY_ORDER: Skill['category'][] = ['Frontend', 'Backend', 'Bases de données', 'Mobile', 'Outils'];

@Component({
  selector: 'app-skills',
  imports: [HeaderComponent, FooterComponent, SkillCategoryComponent, LoaderComponent],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss'
})
export class SkillsComponent {
  private skillService = inject(SkillService);
  private loaded = toLoadableSignal<Skill[]>(this.skillService.getAll(), []);
  private allSkills = this.loaded.data;
  readonly isLoading = this.loaded.isLoading;

  groups = computed<SkillGroup[]>(() =>
    CATEGORY_ORDER
      .map((category) => ({
        category,
        label: CATEGORY_LABELS[category],
        skills: this.allSkills().filter((s) => s.category === category)
      }))
      .filter((group) => group.skills.length > 0)
  );
}
