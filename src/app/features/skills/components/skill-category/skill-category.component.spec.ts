import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillCategoryComponent } from './skill-category.component';
import { Skill } from '../../../../core/models/skill.model';

const skills: Skill[] = [
  {
    _id: 'angular',
    name: 'Angular',
    category: 'Frontend',
    level: 70,
    icon: 'angular.svg'
  }
];

describe('SkillCategoryComponent', () => {
  let component: SkillCategoryComponent;
  let fixture: ComponentFixture<SkillCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkillCategoryComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SkillCategoryComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('label', 'Frontend');
    fixture.componentRef.setInput('skills', skills);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
