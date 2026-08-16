import { Component, computed, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { SkillService } from '../../../core/services/skill.service';
import { AdminNoticeService } from '../../../core/services/admin-notice.service';
import { Skill } from '../../../core/models/skill.model';

@Component({
  selector: 'app-skills-manager',
  imports: [ReactiveFormsModule],
  templateUrl: './skills-manager.component.html',
  styleUrl: '../projects-manager/projects-manager.component.scss'
})
export class SkillsManagerComponent {
  private fb = inject(FormBuilder);
  private skillService = inject(SkillService);
  private notice = inject(AdminNoticeService);

  skills = signal<Skill[]>([]);
  editingId = signal<string | null>(null);
  isFormOpen = signal(false);
  isSaving = signal(false);

  categories: Skill['category'][] = ['Frontend', 'Backend', 'Bases de données', 'Mobile', 'Outils'];

  groupedSkills = computed(() =>
    this.categories
      .map((category) => ({
        category,
        items: this.skills()
          .filter((skill) => skill.category === category)
          .sort((a, b) => b.level - a.level)
      }))
      .filter((group) => group.items.length)
  );

  form = this.fb.nonNullable.group({
    name: ['', Validators.required],
    category: ['Frontend' as Skill['category'], Validators.required],
    level: [70, [Validators.required, Validators.min(0), Validators.max(100)]],
    icon: ['']
  });

  constructor() {
    this.loadSkills();
  }

  loadSkills(): void {
    this.skillService.getAll().subscribe({
      next: (data) => this.skills.set(data),
      error: () => this.notice.error('Impossible de charger les compétences.')
    });
  }

  openCreateForm(): void {
    this.editingId.set(null);
    this.form.reset({ name: '', category: 'Frontend', level: 70, icon: '' });
    this.isFormOpen.set(true);
  }

  openEditForm(skill: Skill): void {
    this.editingId.set(skill._id ?? null);
    this.form.reset({
      name: skill.name,
      category: skill.category,
      level: skill.level,
      icon: skill.icon
    });
    this.isFormOpen.set(true);
  }

  cancelForm(): void {
    this.isFormOpen.set(false);
    this.editingId.set(null);
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSaving.set(true);
    const payload = this.form.getRawValue();
    const id = this.editingId();
    const request = id ? this.skillService.update(id, payload) : this.skillService.create(payload);

    request.subscribe({
      next: () => {
        this.isSaving.set(false);
        this.isFormOpen.set(false);
        this.notice.success(id ? 'Compétence mise à jour.' : 'Compétence ajoutée.');
        this.loadSkills();
      },
      error: () => {
        this.isSaving.set(false);
        this.notice.error("L'enregistrement a échoué.");
      }
    });
  }

  deleteSkill(skill: Skill): void {
    if (!skill._id) return;
    if (!confirm(`Supprimer la compétence « ${skill.name} » ?`)) return;
    this.skillService.delete(skill._id).subscribe({
      next: () => {
        this.notice.success('Compétence supprimée.');
        this.loadSkills();
      },
      error: () => this.notice.error('Suppression impossible.')
    });
  }
}
