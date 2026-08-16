import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechStackBannerComponent } from './tech-stack-banner.component';

describe('TechStackBannerComponent', () => {
  let component: TechStackBannerComponent;
  let fixture: ComponentFixture<TechStackBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TechStackBannerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TechStackBannerComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
