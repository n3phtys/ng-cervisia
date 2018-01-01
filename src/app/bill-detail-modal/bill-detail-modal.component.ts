import { Component, OnInit } from '@angular/core';

import { DialogRef, ModalComponent, CloseGuard } from 'ngx-modialog';
import { BSModalContext } from 'ngx-modialog/plugins/bootstrap';
import { BackendService } from '../backend.service';
import { User, EditBill, SpecialPurchase, SetPriceForSpecial } from '../backend-types';

export class CustomBillDetailModalContext extends BSModalContext {
  timestamp_from: number;
  timestamp_to: number;
  comment: string;
  exclude_user_ids: Array<number>;
}

@Component({
  selector: 'app-bill-detail-modal',
  templateUrl: './bill-detail-modal.component.html',
  styleUrls: ['./bill-detail-modal.component.css']
})
export class BillDetailModalComponent implements CloseGuard, ModalComponent<CustomBillDetailModalContext> {

  context: CustomBillDetailModalContext;
  bill_comment: string;

  constructor(public dialog: DialogRef<CustomBillDetailModalContext>, public backend: BackendService) {
    this.context = dialog.context;
    console.log(this.context);
    dialog.setCloseGuard(this);
    this.bill_comment = this.context.comment;
  }

  finalizateBill() {
    if (confirm("Do you really want to finalize this bill? No changes will be possible afterwards")) {
    this.backend.finalizeBill({timestamp_from: this.context.timestamp_from,
      timestamp_to: this.context.timestamp_to,});
      this.close();
    }
  }

  deleteBill() {
    if (confirm("Do you really want to delete this bill?")) {
    this.backend.deleteBill({timestamp_from: this.context.timestamp_from,
      timestamp_to: this.context.timestamp_to,});
      this.close();
  }
}

  include(user: User) {
    let contained = false;
    let col: number[] = [];
    for (let idx of this.backend.content.BillDetails.results[0].users_excluded_internally_indices) {
      let id = this.backend.content.BillDetails.results[0].touched_users[idx].user_id;
      if (user.user_id === id) {
        contained = true;
      } else {
        col.push(id);
      }
    }
    if (contained) {
      console.log('changing exclude_user_ids to:');
      console.log(col);
      this.backend.editBill({
        timestamp_from: this.backend.content.BillDetails.results[0].timestamp_from,
        timestamp_to: this.backend.content.BillDetails.results[0].timestamp_to,
        comment: this.backend.content.BillDetails.results[0].comment,
        exclude_user_ids: col,
      });
    }
  }

  exclude(user: User) {
    let contained = false;
    let col: number[] = [];
    for (let idx of this.backend.content.BillDetails.results[0].users_excluded_internally_indices) {
      let id = this.backend.content.BillDetails.results[0].touched_users[idx].user_id;
      if (user.user_id === id) {
        contained = true;
      }
      col.push(id);
    }
    if (!contained) {
      console.log('changing exclude_user_ids to:');
      console.log(col);
      col.push(user.user_id);
      this.backend.editBill({
        timestamp_from: this.context.timestamp_from,
        timestamp_to: this.context.timestamp_to,
        comment: this.bill_comment,
        exclude_user_ids: col,
      });
    }
  }

  setSpecialPrice(special: SpecialPurchase) {
    console.log(special);
    const c = prompt("Please enter the price in cents for: " + special.special_name);
    if (c != null) {
      const ct = Number.parseInt(c);
      if (ct != null && !Number.isNaN(ct) && (ct > 0 || c.trim() == '0')) {
        this.backend.setPriceForSpecial({
          unique_id: special.unique_id,
          price: ct,
        });
      }
    }
  }

  close() {
    this.dialog.close();
  }

  storeCommentChange() {
    const c = <EditBill>{
      timestamp_from: this.context.timestamp_from,
      timestamp_to: this.context.timestamp_to,
      comment: this.bill_comment,
      exclude_user_ids: this.context.exclude_user_ids,
    };
    this.backend.editBill(c);
    this.close();
  }

  clearCommentChange() {
    this.bill_comment = this.context.comment;
  }


  beforeDismiss(): boolean {
    return false;
  }

  beforeClose(): boolean {
    return false;
  }
}
