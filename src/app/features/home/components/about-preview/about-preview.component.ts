import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, of } from 'rxjs';
import { ProfileService } from '../../../../core/services/profile.service';
import { DEFAULT_PROFILE } from '../../../../core/models/profile.model';

@Component({
  selector: 'app-about-preview',
  imports: [RouterLink],
  templateUrl: './about-preview.component.html',
  styleUrl: './about-preview.component.scss'
})
export class AboutPreviewComponent {
  private profileService = inject(ProfileService);

  profile = toSignal(
    this.profileService.get().pipe(catchError(() => of(DEFAULT_PROFILE))),
    { initialValue: DEFAULT_PROFILE }
  );

  stats = [
    { number: '8+', label: 'Projets réalisés' },
    { number: '12+', label: 'Technologies maîtrisées' },
    { number: '1', label: 'Formation en cours' }
  ];
}
