import { TestBed } from '@angular/core/testing';

import { ReadingsServiceService } from './readings-service.service';

describe('ReadingsServiceService', () => {
  let service: ReadingsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReadingsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
