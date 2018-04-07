import { TestBed, inject } from '@angular/core/testing';

import { BackendService } from './backend.service';
import { HttpClient } from '@angular/common/http';
import {HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-modialog';
import { ToastModule } from 'ng2-toastr';

describe('BackendService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [
      BrowserModule,
      BrowserAnimationsModule,
      HttpClientModule,
      ReactiveFormsModule,
      FormsModule,
      ModalModule.forRoot(),
      ToastModule.forRoot()
  ],
      providers: [BackendService]
    });
  });

  it('should be created', inject([BackendService], (service: BackendService) => {
    expect(service).toBeTruthy();
  }));
});
