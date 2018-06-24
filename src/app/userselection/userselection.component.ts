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
  selector: 'app-userselection',
  templateUrl: './userselection.component.html',
  styleUrls: ['./userselection.component.css'],
  providers: [Modal]
})
export class UserselectionComponent implements OnInit {
  searchControl: FormControl = new FormControl();

  currentTime = new Date();

  constructor(public backend: BackendService, public modal: Modal, public tabs: TabService) {
    //clock ticks
    IntervalObservable.create(1000).subscribe(e => this.currentTime = new Date());


  }

  ngOnInit() {
    this.backend.setAllUserPageSize(AllUserSelectionPageSize);
    this.searchControl.setValue('');
    const backend = this.backend;
    this.searchControl.valueChanges
      .debounceTime(250)
      .distinctUntilChanged()
      .subscribe((term: string) => {
        console.log('Triggered with term = ' + term);
        backend.updateMainUserlist(term);
      });

    this.backend.purchaseDone.subscribe(t => {
      if (t) {
        this.searchControl.setValue('');
      }
    });

    backend.updateMainUserlist('');
    backend.refreshLastPurchase();
  }


  public pressedUser(event, user: User) {
    console.log('Pressed User:');
    console.log(user);
    this.openPopup(user);
  }


  public openPopup(user: User) {

    this.backend.quickselect(user);

    this.openQuickmenu(user);

    /*
    const dialogRef = this.modal.alert()
    .size('lg')
    .showClose(true)
    .title('Quickmenu for ' + user.username)
    .body(`
    <app-quickmenu></app-quickmenu>`)
    .open();*/

    //dialogRef.result
    //.then( result => alert(`The result is: ${result}`) )
    //;
  }

  openQuickmenu(u: User) {
    return this.modal.open(QuickmenuComponent, overlayConfigFactory({ user: u }, BSModalContext));
  }
}
