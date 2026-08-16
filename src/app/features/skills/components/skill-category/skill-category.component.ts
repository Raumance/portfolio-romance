import { Component, input } from '@angular/core';
import { Skill } from '../../../../core/models/skill.model';
import { SkillBadgeComponent } from '../../../../shared/components/skill-badge/skill-badge.component';

@Component({
  selector: 'app-skill-category',
  imports: [SkillBadgeComponent],
  templateUrl: './skill-category.component.html',
  styleUrl: './skill-category.component.scss'
})
export class SkillCategoryComponent {
  label = input.required<string>();
  skills = input.required<Skill[]>();
}
