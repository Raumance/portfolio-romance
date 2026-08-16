import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ContactService } from '../../../../core/services/contact.service';

@Component({
  selector: 'app-contact-form',
  imports: [ReactiveFormsModule],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.scss'
})
export class ContactFormComponent {
  private fb = inject(FormBuilder);
  private contactService = inject(ContactService);

  status = signal<'idle' | 'sending' | 'success' | 'saved' | 'error'>('idle');

  form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(80)]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(120)]],
    subject: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(120)]],
    message: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(2000)]],
    // Honeypot : champ invisible pour un humain, rempli automatiquement par la plupart des bots
    website: ['']
  });

  get f() {
    return this.form.controls;
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    // Honeypot rempli => très probablement un bot : on fait semblant que ça a marché, sans appeler l'API
    if (this.form.controls.website.value) {
      this.status.set('success');
      this.form.reset();
      return;
    }

    this.status.set('sending');
    const { name, email, subject, message } = this.form.getRawValue();

    this.contactService.send({ name, email, subject, message }).subscribe({
      next: (response) => {
        this.status.set(response.emailSent === false ? 'saved' : 'success');
        this.form.reset();
      },
      error: () => {
        this.status.set('error');
      }
    });
  }
}
