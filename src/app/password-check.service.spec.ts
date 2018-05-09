import { TestBed, inject } from '@angular/core/testing';

import { PasswordCheckService } from './password-check.service';
import { BackendService } from './backend.service';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { ToastsManager, ToastOptions } from 'ng2-toastr';

describe('PasswordCheckService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        HttpClientModule
      ],
      providers: [PasswordCheckService, BackendService, ToastsManager, ToastOptions]
    });
  });

  it('should be created', inject([PasswordCheckService], (service: PasswordCheckService) => {
    expect(service).toBeTruthy();
  }));
});
