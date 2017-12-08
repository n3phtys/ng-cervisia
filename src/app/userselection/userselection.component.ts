import { Component, OnInit } from '@angular/core';
import { ViewContainerRef } from '@angular/core';
import { Overlay, overlayConfigFactory } from 'ngx-modialog';
import { Modal, BSModalContext } from 'ngx-modialog/plugins/bootstrap';
import {CustomModalContext, QuickmenuComponent} from '../quickmenu/quickmenu.component';
import { BackendService , User } from '../backend.service';

import {ReactiveFormsModule, FormsModule, FormControl} from '@angular/forms';
import {Observable, Observer} from 'rxjs/Rx';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';



@Component({
  selector: 'app-userselection',
  templateUrl: './userselection.component.html',
  styleUrls: ['./userselection.component.css'],
  providers: [Modal]
})
export class UserselectionComponent implements OnInit {
  searchControl: FormControl = new FormControl();



  constructor(private backend: BackendService, public modal: Modal) {
  }

  ngOnInit() {
    //this.searchControl.valueChanges.subscribe(e => console.log("Term = " + e));
    const backend = this.backend;
    this.searchControl.valueChanges
    .debounceTime(250)
    .distinctUntilChanged()
    .subscribe((term: string) => {
      console.log('Triggered with term = ' + term);
      backend.updateUserlist(term);
    });

    backend.updateUserlist('');
  }


  public pressedUser(event, user: User) {
    console.log('Pressed User:');
    console.log(user);
    this.openPopup(user);
  }


  public openPopup(user: User) {

    this.backend.quickselect(user);

    this.backend.detailselect(user.user_id);

    this.openQuickmenu();

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

  openQuickmenu() {
    return this.modal.open(QuickmenuComponent,  overlayConfigFactory({ num1: 2, num2: 3 }, BSModalContext));
  }
}
