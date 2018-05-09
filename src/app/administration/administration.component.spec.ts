import { async, ComponentFixture, TestBed, getTestBed } from '@angular/core/testing';

import { AdministrationComponent } from './administration.component';
import { BackendService } from '../backend.service';
import { TabService } from '../tab.service';
import { PasswordCheckService } from '../password-check.service';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-modialog';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('AdministrationComponent', () => {
  let component: AdministrationComponent;
  let fixture: ComponentFixture<AdministrationComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BackendService, TabService,
        ReactiveFormsModule,
        FormsModule,
        ModalModule.forRoot()],
      declarations: [ AdministrationComponent ]
    })
    .compileComponents();
    httpMock = getTestBed().get(HttpTestingController);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /*it('should create', () => {
    const req = httpMock.expectOne(` /api/admin/checkpassword`);
    expect(component).toBeTruthy();
  });*/
});
