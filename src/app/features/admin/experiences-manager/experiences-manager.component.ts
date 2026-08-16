import { Component, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DatePipe } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ExperienceService } from '../../../core/services/experience.service';
import { AdminNoticeService } from '../../../core/services/admin-notice.service';
import { Experience } from '../../../core/models/experience.model';

@Component({
  selector: 'app-experiences-manager',
  imports: [ReactiveFormsModule, DatePipe],
  templateUrl: './experiences-manager.component.html',
  styleUrl: '../projects-manager/projects-manager.component.scss'
})
export class ExperiencesManagerComponent {
  private fb = inject(FormBuilder);
  private experienceService = inject(ExperienceService);
  private notice = inject(AdminNoticeService);

  experiences = signal<Experience[]>([]);
  editingId = signal<string | null>(null);
  isFormOpen = signal(false);
  isSaving = signal(false);
  types: Experience['type'][] = ['Formation', 'Expérience', 'Projet'];

  form = this.fb.nonNullable.group({
    title: ['', Validators.required],
    institution: ['', Validators.required],
    type: ['Formation' as Experience['type'], Validators.required],
    startDate: ['', Validators.required],
    endDate: [''],
    ongoing: [false],
    description: ['', Validators.required]
  });

  constructor() {
    this.load();
    this.form.controls.ongoing.valueChanges.pipe(takeUntilDestroyed()).subscribe((ongoing) => {
      if (ongoing) {
        this.form.controls.endDate.setValue('');
        this.form.controls.endDate.disable();
      } else {
        this.form.controls.endDate.enable();
      }
    });
  }

  load(): void {
    this.experienceService.getAll().subscribe({
      next: (data) => this.experiences.set(data),
      error: () => this.notice.error('Impossible de charger le parcours.')
    });
  }

  openCreateForm(): void {
    this.editingId.set(null);
    this.form.reset({
      type: 'Formation',
      title: '',
      institution: '',
      startDate: '',
      endDate: '',
      ongoing: false,
      description: ''
    });
    this.form.controls.endDate.enable();
    this.isFormOpen.set(true);
  }

  openEditForm(item: Experience): void {
    this.editingId.set(item._id ?? null);
    this.form.reset({
      title: item.title,
      institution: item.institution,
      type: item.type,
      startDate: item.startDate?.slice(0, 10) ?? '',
      endDate: item.endDate?.slice(0, 10) ?? '',
      ongoing: !item.endDate,
      description: item.description
    });
    if (!item.endDate) {
      this.form.controls.endDate.disable();
    } else {
      this.form.controls.endDate.enable();
    }
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
    const raw = this.form.getRawValue();
    const payload: Partial<Experience> = {
      title: raw.title,
      institution: raw.institution,
      type: raw.type,
      startDate: raw.startDate,
      endDate: raw.ongoing ? undefined : raw.endDate || undefined,
      description: raw.description
    };

    const id = this.editingId();
    const request = id ? this.experienceService.update(id, payload) : this.experienceService.create(payload);

    request.subscribe({
      next: () => {
        this.isSaving.set(false);
        this.isFormOpen.set(false);
        this.notice.success(id ? 'Étape mise à jour.' : 'Étape ajoutée.');
        this.load();
      },
      error: () => {
        this.isSaving.set(false);
        this.notice.error("L'enregistrement a échoué.");
      }
    });
  }

  deleteItem(item: Experience): void {
    if (!item._id) return;
    if (!confirm(`Supprimer « ${item.title} » ?`)) return;
    this.experienceService.delete(item._id).subscribe({
      next: () => {
        this.notice.success('Étape supprimée.');
        this.load();
      },
      error: () => this.notice.error('Suppression impossible.')
    });
  }
}
