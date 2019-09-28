import { Component, OnInit } from '@angular/core';
import { BackendService, AllResults } from '../backend.service';

import { DialogRef, ModalComponent, CloseGuard } from 'ngx-modialog';
import { BSModalContext } from 'ngx-modialog/plugins/bootstrap';
import { TabService } from '../tab.service';
import { TabActive } from '../tab-active.enum';
import { User, Item, Bill } from '../backend-types';

export class CustomQrCodeModalContext extends BSModalContext {
  public bill: Bill;
  public limitedToUser: number | null;
  public useSewobeForm: boolean;
}

//defined in /assets/js/qrcode.js
declare function generateQrCode(id: string, payload: string): any;
declare function printGenerateQrCode(id: string, payload: string): any;

@Component({
  selector: 'app-billqrcode',
  templateUrl: './billqrcode.component.html',
  styleUrls: ['./billqrcode.component.css']
})
export class BillQrCodeComponent implements CloseGuard, ModalComponent<CustomQrCodeModalContext> {

  public context: CustomQrCodeModalContext;


  constructor(public dialog: DialogRef<CustomQrCodeModalContext>, public backend: BackendService) {
    this.context = dialog.context;
    this.context.dialogClass = 'modal-dialog modal-lg';
    console.log(this.context);
    dialog.setCloseGuard(this);
    this.backend.updateBillQrCode(this.context.bill, this.context.limitedToUser, this.context.useSewobeForm).subscribe(payload => {
      console.log("received final: " + payload);
      printGenerateQrCode('qrCodePlaceHolder', payload);
      generateQrCode('qrCodePlaceHolder', payload);
    });
  }


  beforeDismiss(): boolean {
    return false;
  }

  beforeClose(): boolean {
    return false;
  }

  close() {
    console.log('closing qr modal');
    this.dialog.close();
  }

}
