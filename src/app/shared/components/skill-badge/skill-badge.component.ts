import { Component, input } from '@angular/core';
import { Skill } from '../../../core/models/skill.model';

@Component({
  selector: 'app-skill-badge',
  imports: [],
  templateUrl: './skill-badge.component.html',
  styleUrl: './skill-badge.component.scss'
})
export class SkillBadgeComponent {
  skill = input.required<Skill>();
}
