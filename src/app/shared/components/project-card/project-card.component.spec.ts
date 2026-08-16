import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { ProjectCardComponent } from './project-card.component';
import { Project } from '../../../core/models/project.model';

const project: Project = {
  _id: 'ovea',
  title: 'Ovea',
  shortDescription: 'Gestion scolaire',
  description: 'Application Flutter de gestion scolaire.',
  technologies: ['Flutter', 'Dart'],
  category: 'mobile',
  image: 'assets/images/ovea.png',
  featured: true
};

describe('ProjectCardComponent', () => {
  let component: ProjectCardComponent;
  let fixture: ComponentFixture<ProjectCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectCardComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectCardComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('project', project);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
