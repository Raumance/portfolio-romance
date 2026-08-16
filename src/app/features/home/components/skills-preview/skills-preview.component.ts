import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { SkillService } from '../../../../core/services/skill.service';
import { SkillBadgeComponent } from '../../../../shared/components/skill-badge/skill-badge.component';

@Component({
  selector: 'app-skills-preview',
  imports: [RouterLink, SkillBadgeComponent],
  templateUrl: './skills-preview.component.html',
  styleUrl: './skills-preview.component.scss'
})
export class SkillsPreviewComponent {
  private skillService = inject(SkillService);
  private allSkills = toSignal(this.skillService.getAll(), { initialValue: [] });
  private index = signal(0);
  private readonly visibleCount = 3;

  rankedSkills = computed(() =>
    [...this.allSkills()].sort((a, b) => b.level - a.level)
  );

  visibleSkills = computed(() => {
    const skills = this.rankedSkills();
    if (skills.length === 0) {
      return [];
    }
    const count = Math.min(this.visibleCount, skills.length);
    const start = this.index() % skills.length;
    return Array.from({ length: count }, (_, offset) => skills[(start + offset) % skills.length]);
  });

  prev(): void {
    const total = this.rankedSkills().length;
    if (total === 0) {
      return;
    }
    this.index.update((value) => (value - 1 + total) % total);
  }

  next(): void {
    const total = this.rankedSkills().length;
    if (total === 0) {
      return;
    }
    this.index.update((value) => (value + 1) % total);
  }
}
