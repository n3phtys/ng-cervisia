import { TestBed, inject } from '@angular/core/testing';

import { PasswordCheckService } from './password-check.service';

describe('PasswordCheckService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PasswordCheckService]
    });
  });

  it('should be created', inject([PasswordCheckService], (service: PasswordCheckService) => {
    expect(service).toBeTruthy();
  }));
});
