import { Component, OnInit } from '@angular/core';
import { TabService } from '../tab.service';
import { TabActive } from '../tab-active.enum';
import { FreebyEnum } from '../freeby-enum.enum';
import { User, Item } from '../backend-types';
import { BackendService } from '../backend.service';
import { MultiItemSelection } from '../multi-item-selection/multi-item-selection.component';
import { DonationProcessSuccess, DonationConfirm, DonationProcessFailure, DonationInputIncorrect, DonationSubmitButtonLabel } from '../constants.locale';

@Component({
  selector: 'app-giveout',
  templateUrl: './giveout.component.html',

  styleUrls: ['./giveout.component.css']
})
export class GiveoutComponent implements OnInit {
  submitBtnText = DonationSubmitButtonLabel;

  freebytypes = FreebyEnum;

  processing = false;
  allowed = true;

  freebytype: FreebyEnum;
  message: string;
  selectedPersonId: User;
  selectedItems: Array<Item>;
  selectedCategories: Array<string>;
  amountEuro: number;
  amountUnits: number;


  constructor(public tabs: TabService, public backend: BackendService) {
  }

  ngOnInit() {
    this.clear();
  }

  clear() {
    this.freebytype = FreebyEnum.FFA;
    this.message = "";
    this.selectedPersonId = null;
    this.selectedItems = [];
    this.selectedCategories = [];
    this.amountEuro = 1;
    this.amountUnits = 1;
    this.processing = false;
    this.allowed = this.isPossible();
  }

  isPossible(): boolean {
    let x = true;
    switch (+this.freebytype) {
      case FreebyEnum.Budget: {
        x = this.selectedPersonId != null && this.amountEuro > 0;
        break;
      }
      case FreebyEnum.Set: {
        x = this.selectedPersonId != null && this.amountUnits > 0 && this.selectedCategories.length + this.selectedItems.length > 0;
        break;
      }
      case FreebyEnum.FFA: {
        x = this.amountUnits > 0 && this.selectedCategories.length + this.selectedItems.length > 0;
        break;
      }
    }
    return x;
  }

  isPossibleWithAlert(): boolean {
    const x = this.isPossible();
    if (!x) {
      alert(DonationInputIncorrect);
    }
    return x;
  }

  finalize() {
    

    this.allowed = this.isPossible();
    const doner_id: number = this.backend.viewstate.personal_detail_infos.user_id;
    if ((this.freebytype == FreebyEnum.FFA || this.selectedUser != null) && this.isPossible() && confirm(DonationConfirm)) {
      this.processing = true;
      console.log("switching: ");
      console.log(this.freebytype);
      switch (+this.freebytype) { // reason for '+': https://stackoverflow.com/a/43178834/1907778
        case FreebyEnum.Budget: {
          console.log("Budget!");
          const recipient_id: number = this.selectedPersonId.user_id;
          this.backend.createBudgetFreeby(doner_id, recipient_id, this.amountEuro * 100, this.message).subscribe(() => {
            alert(DonationProcessSuccess)
            this.processing = false;
            this.tabs.goToUserSelection();
          }, err => {
            alert(DonationProcessFailure);
            this.processing = false;
          });
          break;
        }
        case FreebyEnum.Set: {
          console.log("Count!");
          const recipient_id: number = this.selectedPersonId.user_id;
          const allowedItems: Array<number> = this.selectedItems.map((it, idx) => it.item_id);
          this.backend.createCountFreeby(doner_id, recipient_id, allowedItems, this.selectedCategories, this.amountUnits, this.message).subscribe(() => {
            alert(DonationProcessSuccess)
            this.processing = false;
            this.tabs.goToUserSelection();
          }, err => {
            alert(DonationProcessFailure);
            this.processing = false;
          });
          break;
        }
        case FreebyEnum.FFA: {
          console.log("FFA!");
          const allowedItems: Array<number> = this.selectedItems.map((it, idx) => it.item_id);
          this.backend.createFFAFreeby(doner_id, allowedItems, this.selectedCategories, this.amountUnits, this.message).subscribe(() => {
            this.backend.toastr.success(DonationProcessSuccess);
            this.processing = false;
            this.tabs.goToUserSelection();
          }, err => {
            this.backend.toastr.success(DonationProcessFailure);
            this.processing = false;
          });
          break;
        }
      }
    }
  }

  selectedUser(user: User) {
    console.log(user);
    this.selectedPersonId = user;
    this.allowed = this.isPossible();
  }

  selectedItemsAndCategories(selection: MultiItemSelection) {
    console.log(selection);
    if (selection != null) {
      this.selectedCategories = selection.categories;
      this.selectedItems = selection.items;
    }
    this.allowed = this.isPossible();
  }

  static calcInputPlusRounded(oldValue: number, isPositive: boolean, amount: number, min: number, max: number): number {
    const oldMod = Math.floor(oldValue / amount);
    const procValue = amount * (oldMod + (isPositive ? (1) : ( oldMod * amount == oldValue ? -1 : 0)));

    console.log("oldValue = " + oldValue + " oldMod = " + oldMod + " leads to procValue = " + procValue);

    const newValue = Math.min(max, Math.max(min, procValue));
    return newValue;
  }

  setInputPlusRounded(id: string, val: string, isPositive: boolean, amount: number) {
    //after this operation, value % 0 == true
    const oldValue: number = this[val];
    const min: number = document.getElementById(id)['min'] != null ? document.getElementById(id)['min'] : 0; // or set to 0
    const max: number = document.getElementById(id)['max'] != null ? document.getElementById(id)['max'] : Number.MAX_SAFE_INTEGER; // or set to max number

    this[val] = GiveoutComponent.calcInputPlusRounded(oldValue, isPositive, amount, min, max);


    //todo: do not set input, do set local variable
  }
}
