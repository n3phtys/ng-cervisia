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


import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTabsModule } from '@angular/material/tabs';


import { IKeyboardLayouts, keyboardLayouts, MAT_KEYBOARD_LAYOUTS, MatKeyboardModule } from '@ngx-material-keyboard/core';

describe('PersonalstatisticsComponent', () => {
  let component: PersonalstatisticsComponent;
  let fixture: ComponentFixture<PersonalstatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        BrowserModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatIconModule,
        MatInputModule,
        MatSelectModule,
        MatSlideToggleModule,
        MatTabsModule,

        MatKeyboardModule,
        ToastModule.forRoot(),
        ReactiveFormsModule,
        FormsModule,
        ModalModule.forRoot(),
      ],
      providers: [BackendService, TabService, PasswordCheckService],
      declarations: [PersonalstatisticsComponent, TimespanFilterComponent, PaginatorComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalstatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


});
