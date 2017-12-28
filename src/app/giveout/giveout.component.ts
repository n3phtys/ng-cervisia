import { Component, OnInit } from '@angular/core';
import { TabService } from '../tab.service';
import { TabActive } from '../tab-active.enum';
import { FreebyEnum } from '../freeby-enum.enum';
import { User, Item } from '../backend-types';
import { BackendService } from '../backend.service';
import { MultiItemSelection } from '../multi-item-selection/multi-item-selection.component';

@Component({
  selector: 'app-giveout',
  templateUrl: './giveout.component.html',
  
  styleUrls: ['./giveout.component.css']
})
export class GiveoutComponent implements OnInit {

  freebytypes = FreebyEnum;


  freebytype: FreebyEnum;
  message: string;
  selectedPersonId: User;
  selectedItems: Array<Item>;
  selectedCategories: Array<string>;
  amountCents: number;
  amountUnits: number;


  constructor(public tabs: TabService, public backend: BackendService) { }

  ngOnInit() {
    this.clear();
  }

  clear() {
    this.freebytype = FreebyEnum.FFA;
    this.message = "";
    this.selectedPersonId = null;
    this.selectedItems = [];
    this.selectedCategories = [];
    this.amountCents = 100;
    this.amountUnits = 1;
  }

  finalize() {
      if (confirm("Do you really want to give this donation? Cannot be undone!")) {
        switch(this.freebytype) {
          case FreebyEnum.Budget: {
            throw new Error('Not yet implemented');
            //break;
          }
          case FreebyEnum.Set: {
            throw new Error('Not yet implemented');
            //break;
          }
          case FreebyEnum.FFA: {
            throw new Error('Not yet implemented');
            //break;
          }
        }
      }
  } 

  selectedUser(user: User) {
    console.log("selectedUser with user:");
    console.log(user);
    this.selectedPersonId = user;
  }

  selectedItemsAndCategories(selection: MultiItemSelection) {
    throw new Error('Not yet implemented');
  }
}
