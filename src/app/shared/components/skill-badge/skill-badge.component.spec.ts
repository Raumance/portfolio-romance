import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillBadgeComponent } from './skill-badge.component';
import { Skill } from '../../../core/models/skill.model';

const skill: Skill = {
  _id: 'angular',
  name: 'Angular',
  category: 'Frontend',
  level: 70,
  icon: 'angular.svg'
};

describe('SkillBadgeComponent', () => {
  let component: SkillBadgeComponent;
  let fixture: ComponentFixture<SkillBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkillBadgeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SkillBadgeComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('skill', skill);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
