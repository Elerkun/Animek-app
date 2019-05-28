import { TestBed } from '@angular/core/testing';

import { CategoriesSearchService } from './categories-search.service';

describe('CategoriesSearchService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CategoriesSearchService = TestBed.get(CategoriesSearchService);
    expect(service).toBeTruthy();
  });
});
