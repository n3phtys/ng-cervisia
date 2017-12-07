import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { BackendService } from './backend.service';

import {ReactiveFormsModule, FormsModule, FormControl} from '@angular/forms'

import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { UserselectionComponent } from './userselection/userselection.component';
import { QuickmenuComponent } from './quickmenu/quickmenu.component';
import { FullPurchaseComponent } from './full-purchase/full-purchase.component';
describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule,
      ],
      providers: [BackendService],
      declarations: [
        AppComponent,
        UserselectionComponent,
        QuickmenuComponent,
        FullPurchaseComponent,
      ],
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'app'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('The Official AVH Cervisia Frontend');
  }));
  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to');
  }));
});
