import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { startWith } from 'rxjs';
import { ProfileService } from '../../../core/services/profile.service';
import { AdminNoticeService } from '../../../core/services/admin-notice.service';
import { DEFAULT_PROFILE } from '../../../core/models/profile.model';

@Component({
  selector: 'app-profile-manager',
  imports: [ReactiveFormsModule],
  templateUrl: './profile-manager.component.html',
  styleUrl: '../projects-manager/projects-manager.component.scss'
})
export class ProfileManagerComponent {
  private fb = inject(FormBuilder);
  private profileService = inject(ProfileService);
  private notice = inject(AdminNoticeService);

  isSaving = signal(false);
  isUploading = signal(false);

  form = this.fb.nonNullable.group({
    headline: ['', Validators.required],
    introduction: ['', Validators.required],
    bio: ['', Validators.required],
    softSkills: [''],
    interests: [''],
    cvUrl: ['assets/cv-romance-nguema.pdf']
  });

  private draft = toSignal(this.form.valueChanges.pipe(startWith(this.form.getRawValue())), {
    initialValue: this.form.getRawValue()
  });

  previewSkills = computed(() => this.split(this.draft().softSkills ?? ''));
  previewInterests = computed(() => this.split(this.draft().interests ?? ''));

  constructor() {
    this.profileService.get().subscribe({
      next: (profile) => this.patch(profile),
      error: () => this.patch(DEFAULT_PROFILE)
    });
  }

  onCvSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;
    this.isUploading.set(true);
    this.profileService.uploadFile(file).subscribe({
      next: ({ url }) => {
        this.isUploading.set(false);
        this.form.patchValue({ cvUrl: url });
        this.notice.success('CV envoyé.');
      },
      error: () => {
        this.isUploading.set(false);
        this.notice.error("Échec de l'envoi du CV.");
      }
    });
    input.value = '';
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.notice.error('Complète les champs obligatoires.');
      return;
    }

    this.isSaving.set(true);
    const raw = this.form.getRawValue();
    this.profileService.update({
      headline: raw.headline,
      introduction: raw.introduction,
      bio: raw.bio,
      softSkills: this.split(raw.softSkills),
      interests: this.split(raw.interests),
      cvUrl: raw.cvUrl
    }).subscribe({
      next: () => {
        this.isSaving.set(false);
        this.notice.success('Page À propos mise à jour.');
      },
      error: () => {
        this.isSaving.set(false);
        this.notice.error("L'enregistrement a échoué.");
      }
    });
  }

  private patch(profile: typeof DEFAULT_PROFILE): void {
    this.form.reset({
      headline: profile.headline,
      introduction: profile.introduction,
      bio: profile.bio,
      softSkills: profile.softSkills.join(', '),
      interests: profile.interests.join(', '),
      cvUrl: profile.cvUrl
    });
  }

  private split(value: string): string[] {
    return value.split(',').map((item) => item.trim()).filter(Boolean);
  }
}
