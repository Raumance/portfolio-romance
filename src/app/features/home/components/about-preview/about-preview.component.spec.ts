import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';

import { AboutPreviewComponent } from './about-preview.component';

describe('AboutPreviewComponent', () => {
  let component: AboutPreviewComponent;
  let fixture: ComponentFixture<AboutPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutPreviewComponent],
      providers: [provideHttpClient(), provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(AboutPreviewComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
