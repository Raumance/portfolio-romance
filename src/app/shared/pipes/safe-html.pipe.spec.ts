import { TestBed } from '@angular/core/testing';
import { SafeHtmlPipe } from './safe-html.pipe';

describe('SafeHtmlPipe', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('create an instance', () => {
    const pipe = TestBed.runInInjectionContext(() => new SafeHtmlPipe());
    expect(pipe).toBeTruthy();
  });

  it('marks HTML as trusted', () => {
    const pipe = TestBed.runInInjectionContext(() => new SafeHtmlPipe());
    expect(pipe.transform('<p>Bonjour</p>')).toBeTruthy();
  });
});
