import { Component, OnInit } from '@angular/core';
import { BackendService, Item, DetailInfo, User, Purchase } from '../backend.service';

import {ReactiveFormsModule, FormsModule, FormControl} from '@angular/forms';
import {Observable, Observer} from 'rxjs/Rx';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import { TabService } from '../tab.service';
import { TabActive } from '../tab-active.enum';

@Component({
  selector: 'app-full-purchase',
  templateUrl: './full-purchase.component.html',
  styleUrls: ['./full-purchase.component.css']
})
export class FullPurchaseComponent implements OnInit {
  searchControl: FormControl = new FormControl();

  constructor(private backend: BackendService, public tabs: TabService) { }

  ngOnInit() {

    const backend = this.backend;
    this.searchControl.valueChanges
    .debounceTime(250)
    .distinctUntilChanged()
    .subscribe((term: string) => {
      console.log('Triggered with term = ' + term);
      backend.updateItemlist(term);
    });

    backend.updateItemlist('');

  }


  onClickedItem(item: Item, event) {
    console.log("Buying:");
    console.log(item);
  }




  
}
