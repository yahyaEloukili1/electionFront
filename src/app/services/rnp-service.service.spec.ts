import { TestBed } from '@angular/core/testing';

import { RnpServiceService } from './rnp-service.service';

describe('RnpServiceService', () => {
  let service: RnpServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RnpServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
