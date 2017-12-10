import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { BackendService } from './backend.service';
import { ModalModule } from 'ngx-modialog';
import { BootstrapModalModule } from 'ngx-modialog/plugins/bootstrap';

import {ReactiveFormsModule, FormsModule, FormControl} from '@angular/forms'

import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { UserselectionComponent } from './userselection/userselection.component';
import { QuickmenuComponent } from './quickmenu/quickmenu.component';
import { FullPurchaseComponent } from './full-purchase/full-purchase.component';
import { TabService } from './tab.service';
import { UsermanagementComponent } from './usermanagement/usermanagement.component';
import { ItemmanagementComponent } from './itemmanagement/itemmanagement.component';
import { AdministrationComponent } from './administration/administration.component';
import { BillmanagementComponent } from './billmanagement/billmanagement.component';
import { GlobalstatisticsComponent } from './globalstatistics/globalstatistics.component';
import { PersonalstatisticsComponent } from './personalstatistics/personalstatistics.component';
import { GiveoutComponent } from './giveout/giveout.component';
import { PaginatorComponent } from './paginator/paginator.component';
describe('AppComponent', () => {
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
      providers: [BackendService, TabService],
      declarations: [
        AppComponent,
        UserselectionComponent,
        QuickmenuComponent,
        FullPurchaseComponent,
        UsermanagementComponent,
        ItemmanagementComponent,
        AdministrationComponent,
        BillmanagementComponent,
        GlobalstatisticsComponent,
        PersonalstatisticsComponent,
        GiveoutComponent,
        PaginatorComponent,
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
  /*it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to');
  }));*/
});
