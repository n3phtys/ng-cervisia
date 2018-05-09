import { TestBed, inject } from '@angular/core/testing';

import { TabService } from './tab.service';
import { PasswordCheckService } from './password-check.service';
import { BackendService } from './backend.service';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { ToastsManager, ToastOptions } from 'ng2-toastr';

describe('TabService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        HttpClientModule
      ],
      providers: [TabService, PasswordCheckService, BackendService, ToastsManager, ToastOptions]
    });
  });

  it('should be created', inject([TabService], (service: TabService) => {
    expect(service).toBeTruthy();
  }));
});
