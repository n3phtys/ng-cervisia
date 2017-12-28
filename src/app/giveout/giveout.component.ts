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
      const doner_id: number = this.backend.viewstate.personal_detail_infos.user_id;
      if ((this.freebytype == FreebyEnum.FFA || this.selectedUser != null) && confirm("Do you really want to give this donation? Cannot be undone!")) {
        switch(this.freebytype) {
          case FreebyEnum.Budget: {
            const recipient_id: number = this.selectedPersonId.user_id;
            this.backend.createBudgetFreeby(doner_id, recipient_id, this.amountCents, this.message);
            break;
          }
          case FreebyEnum.Set: {
            const recipient_id: number = this.selectedPersonId.user_id;
            const allowedItems: Array<number> = this.selectedItems.map((it, idx) => it.item_id);
            this.backend.createCountFreeby(doner_id, recipient_id, allowedItems, this.selectedCategories, this.amountUnits, this.message);
            break;
          }
          case FreebyEnum.FFA: {
            const allowedItems: Array<number> = this.selectedItems.map((it, idx) => it.item_id);
            this.backend.createFFAFreeby(doner_id, allowedItems, this.selectedCategories, this.amountUnits, this.message);
            break;
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
    console.log("selectedUser with user:");
    console.log(selection);
    this.selectedCategories = selection.categories;
    this.selectedItems = selection.items;
  }
}
