import { Component, OnInit } from '@angular/core';
import { ViewContainerRef } from '@angular/core';
import { Overlay, overlayConfigFactory } from 'ngx-modialog';
import { Modal, BSModalContext } from 'ngx-modialog/plugins/bootstrap';
import { CustomModalContext, QuickmenuComponent } from '../quickmenu/quickmenu.component';
import { BackendService } from '../backend.service';

import { ReactiveFormsModule, FormsModule, FormControl } from '@angular/forms';
import { IntervalObservable } from 'rxjs/observable/IntervalObservable';
import { Observable, Observer } from 'rxjs/Rx';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import { TabService } from '../tab.service';
import { User } from '../backend-types';
import { FFAUserPageSize, AllUserSelectionPageSize } from '../constants.layouts';



@Component({
  selector: 'app-partymode',
  templateUrl: './partymode.component.html',
  styleUrls: ['./partymode.component.css'],
  providers: [Modal]
})
export class PartymodeComponent implements OnInit {
  searchControl: FormControl = new FormControl();

  currentTime = new Date();

  constructor(public backend: BackendService, public modal: Modal, public tabs: TabService) {
    //clock ticks
    IntervalObservable.create(1000).subscribe(e => this.currentTime = new Date());


  }

  ngOnInit() {

  }
}
