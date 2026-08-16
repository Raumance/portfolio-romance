import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';

import { MessagesManagerComponent } from './messages-manager.component';

describe('MessagesManagerComponent', () => {
  let component: MessagesManagerComponent;
  let fixture: ComponentFixture<MessagesManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MessagesManagerComponent],
      providers: [provideHttpClient(), provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(MessagesManagerComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
