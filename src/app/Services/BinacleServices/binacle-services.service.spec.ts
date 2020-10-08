import { TestBed } from '@angular/core/testing';

import { BinacleService } from './binacle-services.service';

describe('BinacleServicesService', () => {
  let service: BinacleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BinacleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
