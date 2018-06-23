import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BackendService } from './backend.service';
import { ModalModule } from 'ngx-modialog';
import { BootstrapModalModule } from 'ngx-modialog/plugins/bootstrap';

import { ReactiveFormsModule, FormsModule, FormControl } from '@angular/forms'

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
import { TimespanFilterComponent } from './timespan-filter/timespan-filter.component';
import { PasswordCheckService } from './password-check.service';
import { EnumPipePipe } from './enum-pipe.pipe';
import { SingleUserSelectionComponent } from './single-user-selection/single-user-selection.component';
import { MultiItemSelectionComponent } from './multi-item-selection/multi-item-selection.component';
import { FfaListComponent } from './ffa-list/ffa-list.component';
import { ToastModule } from 'ng2-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FreebyMessagePipe } from './freeby-message.pipe';


import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTabsModule } from '@angular/material/tabs';


import { IKeyboardLayouts, keyboardLayouts, MAT_KEYBOARD_LAYOUTS, MatKeyboardModule } from '@ngx-material-keyboard/core';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule,
        MatButtonModule,
        MatIconModule,
        MatInputModule,
        MatSelectModule,
        MatSlideToggleModule,
        MatTabsModule,

        MatKeyboardModule,
        ModalModule.forRoot(),
        ToastModule.forRoot(),
        BootstrapModalModule
      ],
      providers: [BackendService, TabService, PasswordCheckService],
      declarations: [
        AppComponent,
        FreebyMessagePipe,
        UserselectionComponent,
        QuickmenuComponent,
        SingleUserSelectionComponent,
        MultiItemSelectionComponent,
        FullPurchaseComponent,
        UsermanagementComponent,
        ItemmanagementComponent,
        EnumPipePipe,
        AdministrationComponent,
        BillmanagementComponent,
        GlobalstatisticsComponent,
        PersonalstatisticsComponent,
        GiveoutComponent,
        PaginatorComponent,
        TimespanFilterComponent,
        FfaListComponent,
      ],
    }).compileComponents();
  }));
  /*it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'app'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('The Official AVH Cervisia Frontend');
  }));*/
  /*it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to');
  }));*/
});
