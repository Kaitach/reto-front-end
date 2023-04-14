import { TestBed } from '@angular/core/testing';

import { AlertsservicesService } from './alertsservices.service';

describe('AlertsservicesService', () => {
  let service: AlertsservicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlertsservicesService);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });
});
