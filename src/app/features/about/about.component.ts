import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { ProfileService } from '../../core/services/profile.service';
import { DEFAULT_PROFILE } from '../../core/models/profile.model';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-about',
  imports: [HeaderComponent, FooterComponent, TimelineComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {
  private profileService = inject(ProfileService);
  readonly cvImage = 'assets/images/cv-romance-nguema.png';

  profile = toSignal(
    this.profileService.get().pipe(catchError(() => of(DEFAULT_PROFILE))),
    { initialValue: DEFAULT_PROFILE }
  );
}
