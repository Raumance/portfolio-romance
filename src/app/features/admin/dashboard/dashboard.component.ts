import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { forkJoin } from 'rxjs';
import { ProjectService } from '../../../core/services/project.service';
import { SkillService } from '../../../core/services/skill.service';
import { ExperienceService } from '../../../core/services/experience.service';
import { AdminInboxService } from '../../../core/services/admin-inbox.service';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: '../projects-manager/projects-manager.component.scss'
})
export class DashboardComponent {
  private projectService = inject(ProjectService);
  private skillService = inject(SkillService);
  private experienceService = inject(ExperienceService);
  private inbox = inject(AdminInboxService);

  projectCount = signal(0);
  skillCount = signal(0);
  experienceCount = signal(0);
  unreadCount = computed(() => this.inbox.unreadCount());
  messageCount = computed(() => this.inbox.messages().length);

  constructor() {
    forkJoin({
      projects: this.projectService.getAll(),
      skills: this.skillService.getAll(),
      experiences: this.experienceService.getAll()
    }).subscribe({
      next: ({ projects, skills, experiences }) => {
        this.projectCount.set(projects.length);
        this.skillCount.set(skills.length);
        this.experienceCount.set(experiences.length);
      }
    });
  }
}
