import { TestBed } from '@angular/core/testing';

import { PAcsService } from './pacs.service';

describe('PAcsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PAcsService = TestBed.get(PAcsService);
    expect(service).toBeTruthy();
  });
});
