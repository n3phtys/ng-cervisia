import { Component, OnInit } from '@angular/core';
import { BackendService, ShoppingCartElement } from '../backend.service';

import { ReactiveFormsModule, FormsModule, FormControl } from '@angular/forms';
import { Observable, Observer } from 'rxjs/Rx';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import { TabService } from '../tab.service';
import { TabActive } from '../tab-active.enum';
import { Item } from '../backend-types';
import { PurchaseOtherPrompt } from '../constants.locale';
import { FullPurchaseItemPageSize } from '../constants.layouts';


@Component({
  selector: 'app-full-purchase',
  templateUrl: './full-purchase.component.html',
  styleUrls: ['./full-purchase.component.css']
})
export class FullPurchaseComponent implements OnInit {

  shoppingCart: Array<ShoppingCartElement> = [];

  pagesize = FullPurchaseItemPageSize;

  specialCounter = -1;

  searchControl: FormControl = new FormControl();

  constructor(public backend: BackendService, public tabs: TabService) { }

  ngOnInit() {
    BackendService.moveToPage(this.backend.viewstate.all_items.pagination, 0, this.pagesize);

    const backend = this.backend;
    this.searchControl.valueChanges
      .debounceTime(250)
      .distinctUntilChanged()
      .subscribe((term: string) => {
        console.log('Triggered with term = ' + term);
        backend.updateItemlist(term);
      });

    backend.updateItemlist('');

    this.shoppingCart = [];

  }


  onClickedItem(item: Item, event) {
    console.log("Buying:");
    console.log(item);

    const idx = this.shoppingCart.findIndex(x => x.item.item_id === item.item_id);
    if (idx >= 0) {
      this.shoppingCart[idx].count = this.shoppingCart[idx].count + 1;
    } else {
      this.shoppingCart.push({ count: 1, item: item });
    }
  }

  onSpecialClicked() {
    const c = prompt(PurchaseOtherPrompt);
    if (c != null && c.length > 0) {
      const id = this.specialCounter;
      this.specialCounter--;
      this.shoppingCart.push({
        count: 1, item: {
          name: c,
          item_id: id,
          category: null,
          cost_cents: 0.00,
          deleted: false,
        }
      })
    }
  }

  onShoppingCarElementPressed(item: Item, idx: number, event) {
    console.log("weniger von:");
    console.log(item);
    console.log(idx);
    console.log(event);
    if (idx >= 0) {
      const oldv = this.shoppingCart[idx].count;
      if (oldv > 1) {
        this.shoppingCart[idx].count = oldv - 1;
      } else {
        this.shoppingCart.splice(idx, 1);
      }
    }
  }

  onOkayPressed(event) {
    const v : ShoppingCartElement[] = [];
    for (let i = 0; i < this.shoppingCart.length; i++) {
      v.push(this.shoppingCart[i]);
    }
    this.shoppingCart = [];
    console.log("v = ");
    console.log(v);
    this.backend.purchaseList(this.backend.detailUsername, this.backend.viewstate.personal_detail_infos.user_id, v);
    this.tabs.goToUserSelection();
  }



}
