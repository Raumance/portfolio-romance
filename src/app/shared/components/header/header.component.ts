import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, of } from 'rxjs';
import { ProfileService } from '../../../core/services/profile.service';
import { DEFAULT_PROFILE } from '../../../core/models/profile.model';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  private profileService = inject(ProfileService);
  isMenuOpen = signal(false);

  profile = toSignal(
    this.profileService.get().pipe(catchError(() => of(DEFAULT_PROFILE))),
    { initialValue: DEFAULT_PROFILE }
  );

  toggleMenu(): void {
    this.isMenuOpen.update((open) => !open);
  }

  closeMenu(): void {
    this.isMenuOpen.set(false);
  }
}
