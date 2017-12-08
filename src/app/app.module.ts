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



@NgModule({
  declarations: [
    AppComponent,
    QuickmenuComponent,
    UserselectionComponent,
    FullPurchaseComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    ModalModule.forRoot(),
    BootstrapModalModule
  ],
  providers: [BackendService],
  bootstrap: [AppComponent],

  // IMPORTANT:
  // Since 'AdditionCalculateWindow' is never explicitly used (in a template)
  // we must tell angular about it.
  entryComponents: [ QuickmenuComponent ]
})
export class AppModule { }
