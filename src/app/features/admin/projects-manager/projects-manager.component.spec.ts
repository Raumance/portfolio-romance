import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';

import { ProjectsManagerComponent } from './projects-manager.component';

describe('ProjectsManagerComponent', () => {
  let component: ProjectsManagerComponent;
  let fixture: ComponentFixture<ProjectsManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectsManagerComponent],
      providers: [provideHttpClient(), provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectsManagerComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
