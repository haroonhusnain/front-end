import { TestBed } from '@angular/core/testing';

import { GlobalApiCallService } from './global-api-call.service';

describe('GlobalApiCallService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GlobalApiCallService = TestBed.get(GlobalApiCallService);
    expect(service).toBeTruthy();
  });
});
