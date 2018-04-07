import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalstatisticsComponent } from './personalstatistics.component';
import { BackendService } from '../backend.service';
import { TabService } from '../tab.service';
import { PasswordCheckService } from '../password-check.service';
import { ModalModule } from 'ngx-modialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

describe('PersonalstatisticsComponent', () => {
  let component: PersonalstatisticsComponent;
  let fixture: ComponentFixture<PersonalstatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        BrowserModule,
        ReactiveFormsModule,
        FormsModule,
        ModalModule.forRoot(),
      ],
      providers: [BackendService, TabService, PasswordCheckService],
      declarations: [ PersonalstatisticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalstatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
