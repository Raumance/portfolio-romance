import { Component, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ExperienceService } from '../../../../core/services/experience.service';
import { LoaderComponent } from '../../../../shared/components/loader/loader.component';
import { toLoadableSignal } from '../../../../core/utils/to-loadable-signal';
import { Experience } from '../../../../core/models/experience.model';

@Component({
  selector: 'app-timeline',
  imports: [DatePipe, LoaderComponent],
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.scss'
})
export class TimelineComponent {
  private experienceService = inject(ExperienceService);
  private loaded = toLoadableSignal<Experience[]>(this.experienceService.getAll(), []);
  experiences = this.loaded.data;
  readonly isLoading = this.loaded.isLoading;
}
