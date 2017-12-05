import { TestBed, inject } from '@angular/core/testing';

import { BackendService } from './backend.service';
import { HttpClient } from '@angular/common/http';
import {HttpClientModule} from '@angular/common/http';

describe('BackendService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [
    HttpClientModule,
  ],
      providers: [BackendService]
    });
  });

  it('should be created', inject([BackendService], (service: BackendService) => {
    expect(service).toBeTruthy();
  }));
});
