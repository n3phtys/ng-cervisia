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


  freebytype: FreebyEnum = FreebyEnum.FFA;
  message: string;
  selectedPersonId: User;
  selectedItems: Array<Item>;
  selectedCategories: Array<string>;
  amountCents: number = 100;
  amountUnits: number = 1;


  constructor(public tabs: TabService, public backend: BackendService) { }

  ngOnInit() {
    this.clear();
  }

  clear() {
    throw new Error('Not yet implemented');
  }

  finalize() {
      if (confirm("Do you really want to give this donation? Cannot be undone!")) {
        throw new Error('Not yet implemented'); 
      }
  } 

  selectedUser(user: User) {
    throw new Error('Not yet implemented');
  }

  selectedItemsAndCategories(selection: MultiItemSelection) {
    throw new Error('Not yet implemented');
  }
}
