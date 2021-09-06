import { TestBed } from '@angular/core/testing';

import { CovidCountService } from './covid-count.service';

describe('CovidCountService', () => {
  let service: CovidCountService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CovidCountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
