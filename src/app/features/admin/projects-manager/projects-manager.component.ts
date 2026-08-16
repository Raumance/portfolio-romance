import { Component, computed, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ProjectService } from '../../../core/services/project.service';
import { AdminNoticeService } from '../../../core/services/admin-notice.service';
import { Project } from '../../../core/models/project.model';

@Component({
  selector: 'app-projects-manager',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './projects-manager.component.html',
  styleUrl: './projects-manager.component.scss'
})
export class ProjectsManagerComponent {
  private fb = inject(FormBuilder);
  private projectService = inject(ProjectService);
  private notice = inject(AdminNoticeService);

  projects = signal<Project[]>([]);
  query = signal('');
  editingId = signal<string | null>(null);
  isFormOpen = signal(false);
  isSaving = signal(false);
  isUploading = signal(false);
  uploadError = signal<string | null>(null);
  screenshots = signal<string[]>([]);
  categories = ['web', 'mobile', 'api', 'logiciel'];

  filteredProjects = computed(() => {
    const q = this.query().trim().toLowerCase();
    if (!q) {
      return this.projects();
    }
    return this.projects().filter((project) =>
      [project.title, project.category, ...(project.technologies ?? [])]
        .join(' ')
        .toLowerCase()
        .includes(q)
    );
  });

  form = this.fb.nonNullable.group({
    title: ['', Validators.required],
    shortDescription: ['', Validators.required],
    description: ['', Validators.required],
    technologies: ['', Validators.required],
    category: ['web', Validators.required],
    image: ['', Validators.required],
    imageFit: this.fb.nonNullable.control<'contain' | 'cover'>('contain'),
    imageZoom: [100],
    githubUrl: [''],
    demoUrl: [''],
    apkUrl: [''],
    featured: [false]
  });

  constructor() {
    this.loadProjects();
  }

  techPreview(): string[] {
    return this.form.controls.technologies.value
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);
  }

  loadProjects(): void {
    this.projectService.getAll().subscribe({
      next: (data) => this.projects.set(data),
      error: () => this.notice.error('Impossible de charger les projets.')
    });
  }

  openCreateForm(): void {
    this.editingId.set(null);
    this.screenshots.set([]);
    this.form.reset({ featured: false, category: 'web', image: '', imageFit: 'contain', imageZoom: 100, githubUrl: '', demoUrl: '', apkUrl: '' });
    this.isFormOpen.set(true);
  }

  openEditForm(project: Project): void {
    this.editingId.set(project._id ?? null);
    this.screenshots.set(project.screenshots ?? []);
    this.form.reset({
      title: project.title,
      shortDescription: project.shortDescription,
      description: project.description,
      technologies: project.technologies.join(', '),
      category: project.category,
      image: project.image,
      imageFit: project.imageFit ?? 'contain',
      imageZoom: project.imageZoom ?? 100,
      githubUrl: project.githubUrl ?? '',
      demoUrl: project.demoUrl ?? '',
      apkUrl: project.apkUrl ?? '',
      featured: project.featured
    });
    this.isFormOpen.set(true);
  }

  cancelForm(): void {
    this.isFormOpen.set(false);
    this.editingId.set(null);
  }

  onCoverSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;
    this.upload(file, (url) => this.form.patchValue({ image: url }));
    input.value = '';
  }

  onScreenshotsSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    Array.from(input.files ?? []).forEach((file) => {
      this.upload(file, (url) => this.screenshots.update((list) => [...list, url]));
    });
    input.value = '';
  }

  removeScreenshot(url: string): void {
    this.screenshots.update((list) => list.filter((item) => item !== url));
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.notice.error('Complète les champs obligatoires.');
      return;
    }

    this.isSaving.set(true);
    const raw = this.form.getRawValue();
    const payload: Partial<Project> = {
      title: raw.title,
      shortDescription: raw.shortDescription,
      description: raw.description,
      technologies: this.techPreview(),
      category: raw.category,
      image: raw.image,
      imageFit: raw.imageFit,
      imageZoom: Number(raw.imageZoom),
      screenshots: this.screenshots(),
      githubUrl: raw.githubUrl || undefined,
      demoUrl: raw.demoUrl || undefined,
      apkUrl: raw.apkUrl || undefined,
      featured: raw.featured
    };

    const id = this.editingId();
    const request = id ? this.projectService.update(id, payload) : this.projectService.create(payload);

    request.subscribe({
      next: () => {
        this.isSaving.set(false);
        this.isFormOpen.set(false);
        this.notice.success(id ? 'Projet mis à jour.' : 'Projet publié.');
        this.loadProjects();
      },
      error: () => {
        this.isSaving.set(false);
        this.notice.error("L'enregistrement a échoué.");
      }
    });
  }

  deleteProject(project: Project): void {
    if (!project._id) return;
    if (!confirm(`Supprimer le projet « ${project.title} » ?`)) return;
    this.projectService.delete(project._id).subscribe({
      next: () => {
        this.notice.success('Projet supprimé.');
        this.loadProjects();
      },
      error: () => this.notice.error('Suppression impossible.')
    });
  }

  private upload(file: File, onUrl: (url: string) => void): void {
    this.isUploading.set(true);
    this.uploadError.set(null);
    this.projectService.uploadFile(file).subscribe({
      next: ({ url }) => {
        this.isUploading.set(false);
        onUrl(url);
      },
      error: () => {
        this.isUploading.set(false);
        this.uploadError.set("Échec de l'envoi du fichier.");
        this.notice.error("Échec de l'envoi du fichier.");
      }
    });
  }
}
