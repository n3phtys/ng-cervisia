import { TestBed, inject } from '@angular/core/testing';

import { TabService } from './tab.service';
import { PasswordCheckService } from './password-check.service';

describe('TabService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TabService, PasswordCheckService]
    });
  });

  it('should be created', inject([TabService], (service: TabService) => {
    expect(service).toBeTruthy();
  }));
});
