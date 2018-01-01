import { Component, OnInit } from '@angular/core';

import { DialogRef, ModalComponent, CloseGuard } from 'ngx-modialog';
import { BSModalContext } from 'ngx-modialog/plugins/bootstrap';
import { BackendService } from '../backend.service';
import { User, EditBill } from '../backend-types';

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


   changeUserselection(user: User) {
    throw new Error("Not yet implemented");
  }

  finalizateBill() {
    throw new Error("Not yet implemented");
  }

  //TODO: setting of special prices

  close() {
    this.dialog.close();
  }

  storeCommentChange() {
    const c = <EditBill> {
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
