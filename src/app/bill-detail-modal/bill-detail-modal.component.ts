import { Component, OnInit } from '@angular/core';

import { DialogRef, ModalComponent, CloseGuard } from 'ngx-modialog';
import { BSModalContext } from 'ngx-modialog/plugins/bootstrap';
import { BackendService } from '../backend.service';
import { User } from '../backend-types';

export class CustomBillDetailModalContext extends BSModalContext {
  
}

@Component({
  selector: 'app-bill-detail-modal',
  templateUrl: './bill-detail-modal.component.html',
  styleUrls: ['./bill-detail-modal.component.css']
})
export class BillDetailModalComponent implements CloseGuard, ModalComponent<CustomBillDetailModalContext> {

  context: CustomBillDetailModalContext;


  constructor(public dialog: DialogRef<CustomBillDetailModalContext>, public backend: BackendService) {
    this.context = dialog.context;
    console.log(this.context);
    dialog.setCloseGuard(this);
   }


   changeUserselection(user: User) {
    throw new Error("Not yet implemented");
  }

  finalizateBill() {
    throw new Error("Not yet implemented");
  }

  //TODO: setting of special prices
  
  //TODO: changes of message

  close() {
    this.dialog.close();
  }
  storeCommentChange() {
    this.dialog.close();
    throw new Error("not yet implemented");
  }


  beforeDismiss(): boolean {
    return false;
  }

  beforeClose(): boolean {
    return false;
  }
}
