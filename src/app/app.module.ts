import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';

import { ReactiveFormsModule, FormsModule, FormControl } from '@angular/forms';

import { AppComponent } from './app.component';
import { BackendService } from './backend.service';

// Import HttpClientModule from @angular/common/http
import { HttpClientModule } from '@angular/common/http';
import { QuickmenuComponent } from './quickmenu/quickmenu.component';
import { UserselectionComponent } from './userselection/userselection.component';
import { FullPurchaseComponent } from './full-purchase/full-purchase.component';
import { ModalModule } from 'ngx-modialog';
import { BootstrapModalModule } from 'ngx-modialog/plugins/bootstrap';
import { GiveoutComponent } from './giveout/giveout.component';
import { PersonalstatisticsComponent } from './personalstatistics/personalstatistics.component';
import { GlobalstatisticsComponent } from './globalstatistics/globalstatistics.component';
import { UsermanagementComponent } from './usermanagement/usermanagement.component';
import { ItemmanagementComponent } from './itemmanagement/itemmanagement.component';
import { BillmanagementComponent } from './billmanagement/billmanagement.component';
import { AdministrationComponent } from './administration/administration.component';
import { TabService } from './tab.service';
import { PaginatorComponent } from './paginator/paginator.component';
import { TimespanFilterComponent } from './timespan-filter/timespan-filter.component';
import { PasswordCheckService } from './password-check.service';
import { EnumPipePipe } from './enum-pipe.pipe';
import { SingleUserSelectionComponent } from './single-user-selection/single-user-selection.component';
import { MultiItemSelectionComponent } from './multi-item-selection/multi-item-selection.component';
import { FfaModalComponent } from './ffa-modal/ffa-modal.component';
import { FfaListComponent } from './ffa-list/ffa-list.component';
import { BillDetailModalComponent } from './bill-detail-modal/bill-detail-modal.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import { ToastModule } from 'ng2-toastr/ng2-toastr';

registerLocaleData(localeDe);

@NgModule({
  declarations: [
    AppComponent,
    QuickmenuComponent,
    UserselectionComponent,
    FullPurchaseComponent,
    GiveoutComponent,
    PersonalstatisticsComponent,
    GlobalstatisticsComponent,
    UsermanagementComponent,
    ItemmanagementComponent,
    BillmanagementComponent,
    AdministrationComponent,
    PaginatorComponent,
    TimespanFilterComponent,
    EnumPipePipe,
    SingleUserSelectionComponent,
    MultiItemSelectionComponent,
    FfaModalComponent,
    FfaListComponent,
    BillDetailModalComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    ModalModule.forRoot(),
    ToastModule.forRoot(),
    BootstrapModalModule
  ],
  providers: [{ provide: LOCALE_ID, useValue: "de-DE" }, BackendService, TabService, PasswordCheckService],
  bootstrap: [AppComponent],

  // IMPORTANT:
  // Since 'AdditionCalculateWindow' is never explicitly used (in a template)
  // we must tell angular about it.
  entryComponents: [QuickmenuComponent, FfaModalComponent, BillDetailModalComponent]
})
export class AppModule {

}
