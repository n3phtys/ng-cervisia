import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { BackendService } from '../backend.service';

import {ReactiveFormsModule, FormsModule, FormControl} from '@angular/forms';

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickmenuComponent } from './quickmenu.component';
import { ModalModule } from 'ngx-modialog';
import { BootstrapModalModule } from 'ngx-modialog/plugins/bootstrap';

describe('QuickmenuComponent', () => {
  let component: QuickmenuComponent;
  let fixture: ComponentFixture<QuickmenuComponent>;

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
      declarations: [ QuickmenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickmenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

});
