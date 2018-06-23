
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BackendService } from '../backend.service';

import { ReactiveFormsModule, FormsModule, FormControl } from '@angular/forms'

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FullPurchaseComponent } from './full-purchase.component';
import { TabService } from '../tab.service';


import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTabsModule } from '@angular/material/tabs';


import { IKeyboardLayouts, keyboardLayouts, MAT_KEYBOARD_LAYOUTS, MatKeyboardModule } from '@ngx-material-keyboard/core';

describe('FullPurchaseComponent', () => {
  let component: FullPurchaseComponent;
  let fixture: ComponentFixture<FullPurchaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        HttpClientModule,
        MatButtonModule,
        MatIconModule,
        MatInputModule,
        MatSelectModule,
        MatSlideToggleModule,
        MatTabsModule,

        MatKeyboardModule,
        ReactiveFormsModule,
        FormsModule,
      ],
      providers: [BackendService, TabService],
      declarations: [FullPurchaseComponent]
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
