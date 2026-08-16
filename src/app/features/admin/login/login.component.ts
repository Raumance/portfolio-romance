import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  errorMessage = signal<string | null>(null);
  isSubmitting = signal(false);

  constructor() {
    if (this.authService.isAuthenticated()) {
      void this.router.navigate(['/admin']);
    }
  }

  form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);
    this.errorMessage.set(null);
    const { email, password } = this.form.getRawValue();

    this.authService.login(email.trim(), password.trim()).subscribe({
      next: () => {
        this.router.navigate(['/admin']);
      },
      error: (error) => {
        this.isSubmitting.set(false);
        const status = error?.status;
        if (status === 429) {
          this.errorMessage.set('Trop de tentatives. Réessaie dans quelques minutes.');
          return;
        }
        if (status === 0) {
          this.errorMessage.set('API injoignable. Vérifie que le backend tourne sur le port 5000.');
          return;
        }
        this.errorMessage.set('Identifiants incorrects. Réessayez.');
      }
    });
  }
}
