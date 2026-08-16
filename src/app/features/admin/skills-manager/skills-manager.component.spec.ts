import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';

import { SkillsManagerComponent } from './skills-manager.component';

describe('SkillsManagerComponent', () => {
  let component: SkillsManagerComponent;
  let fixture: ComponentFixture<SkillsManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkillsManagerComponent],
      providers: [provideHttpClient(), provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(SkillsManagerComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
