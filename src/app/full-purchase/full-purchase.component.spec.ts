
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { BackendService } from '../backend.service';

import {ReactiveFormsModule, FormsModule, FormControl} from '@angular/forms'

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FullPurchaseComponent } from './full-purchase.component';
import { TabService } from '../tab.service';

describe('FullPurchaseComponent', () => {
  let component: FullPurchaseComponent;
  let fixture: ComponentFixture<FullPurchaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule,
      ],
      providers: [BackendService, TabService],
      declarations: [ FullPurchaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullPurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /*
  it('should create', () => {
    expect(component).toBeTruthy();
  });*/
});
