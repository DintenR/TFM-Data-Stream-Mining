import { TestBed } from '@angular/core/testing';

import { WaterPumpWebSocketService } from './water-pump-web-socket.service';

describe('WaterPumpWebSocketService', () => {
  let service: WaterPumpWebSocketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WaterPumpWebSocketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
