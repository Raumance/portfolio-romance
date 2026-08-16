import { Component, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { ExperienceService } from '../../../../core/services/experience.service';

@Component({
  selector: 'app-timeline',
  imports: [DatePipe],
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.scss'
})
export class TimelineComponent {
  private experienceService = inject(ExperienceService);
  experiences = toSignal(this.experienceService.getAll(), { initialValue: [] });
}
