import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {ReactiveFormsModule, FormsModule, FormControl} from '@angular/forms';

import { AppComponent } from './app.component';
import { BackendService } from './backend.service';

// Import HttpClientModule from @angular/common/http
import {HttpClientModule} from '@angular/common/http';
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
    TimespanFilterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    ModalModule.forRoot(),
    BootstrapModalModule
  ],
  providers: [BackendService, TabService],
  bootstrap: [AppComponent],

  // IMPORTANT:
  // Since 'AdditionCalculateWindow' is never explicitly used (in a template)
  // we must tell angular about it.
  entryComponents: [ QuickmenuComponent ]
})
export class AppModule { }
