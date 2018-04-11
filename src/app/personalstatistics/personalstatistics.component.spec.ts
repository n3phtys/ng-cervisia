import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalstatisticsComponent } from './personalstatistics.component';
import { BackendService } from '../backend.service';
import { TabService } from '../tab.service';
import { PasswordCheckService } from '../password-check.service';
import { ModalModule } from 'ngx-modialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastModule } from 'ng2-toastr';
import { TimespanFilterComponent } from '../timespan-filter/timespan-filter.component';
import { PaginatorComponent } from '../paginator/paginator.component';

describe('PersonalstatisticsComponent', () => {
  let component: PersonalstatisticsComponent;
  let fixture: ComponentFixture<PersonalstatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        BrowserModule,
        BrowserAnimationsModule,
        ToastModule.forRoot(),
        ReactiveFormsModule,
        FormsModule,
        ModalModule.forRoot(),
      ],
      providers: [BackendService, TabService, PasswordCheckService],
      declarations: [ PersonalstatisticsComponent, TimespanFilterComponent, PaginatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalstatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  
});
