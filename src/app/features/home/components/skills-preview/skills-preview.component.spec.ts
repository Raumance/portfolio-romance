import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';

import { SkillsPreviewComponent } from './skills-preview.component';

describe('SkillsPreviewComponent', () => {
  let component: SkillsPreviewComponent;
  let fixture: ComponentFixture<SkillsPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkillsPreviewComponent],
      providers: [provideHttpClient(), provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(SkillsPreviewComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
