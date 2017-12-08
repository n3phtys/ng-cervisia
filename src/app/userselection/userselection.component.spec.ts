import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { BackendService } from '../backend.service';

import {ReactiveFormsModule, FormsModule, FormControl} from '@angular/forms'

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserselectionComponent } from './userselection.component';
import { ModalModule } from 'ngx-modialog';
import { BootstrapModalModule } from 'ngx-modialog/plugins/bootstrap';

describe('UserselectionComponent', () => {
  let component: UserselectionComponent;
  let fixture: ComponentFixture<UserselectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule,
        ModalModule.forRoot(),
        BootstrapModalModule
      ],
      providers: [BackendService],
      declarations: [ UserselectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserselectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /*it('should create', () => {
    expect(component).toBeTruthy();
  });*/
});
