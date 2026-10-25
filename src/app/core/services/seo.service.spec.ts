import { TestBed } from '@angular/core/testing';
import { Title, Meta } from '@angular/platform-browser';
import { SeoService } from './seo.service';

describe('SeoService', () => {
  let service: SeoService;
  let title: Title;
  let meta: Meta;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeoService);
    title = TestBed.inject(Title);
    meta = TestBed.inject(Meta);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should apply title, description and canonical', () => {
    service.apply({
      title: 'À propos — Romance Nguema',
      description: 'Parcours de Romance Nguema à Libreville.',
      path: '/a-propos'
    });

    expect(title.getTitle()).toBe('À propos — Romance Nguema');
    expect(meta.getTag('name="description"')?.content).toBe('Parcours de Romance Nguema à Libreville.');
    expect(document.querySelector('link[rel="canonical"]')?.getAttribute('href')).toContain('/a-propos');
  });
});
