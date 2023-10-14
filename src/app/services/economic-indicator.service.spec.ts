import { TestBed } from '@angular/core/testing';

import { EconomicIndicatorService } from './economic-indicator.service';

describe('EconomicIndicatorService', () => {
  let service: EconomicIndicatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EconomicIndicatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
