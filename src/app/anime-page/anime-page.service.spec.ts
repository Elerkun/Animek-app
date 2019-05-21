import { TestBed } from '@angular/core/testing';

import { AnimePageService } from './anime-page.service';

describe('AnimePageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnimePageService = TestBed.get(AnimePageService);
    expect(service).toBeTruthy();
  });
});
