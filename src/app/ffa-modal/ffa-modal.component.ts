import { Component, OnInit } from '@angular/core';


import { DialogRef, ModalComponent, CloseGuard } from 'ngx-modialog';
import { BSModalContext } from 'ngx-modialog/plugins/bootstrap';
import { BackendService } from '../backend.service';
import { Item, Freeby, User, FFA, EnrichedFFA } from '../backend-types';


export class CustomFFAModalContext extends BSModalContext {
  public freeby: EnrichedFFA;
}

@Component({
  selector: 'app-ffa-modal',
  templateUrl: './ffa-modal.component.html',
  styleUrls: ['./ffa-modal.component.css']
})
export class FfaModalComponent implements CloseGuard, ModalComponent<CustomFFAModalContext> {

  public context: CustomFFAModalContext;

  constructor(public dialog: DialogRef<CustomFFAModalContext>, public backend: BackendService) {
    this.context = dialog.context;
    console.log(this.context);
    dialog.setCloseGuard(this);
  }

  close() {
    this.dialog.close();
  }

  consume(item: Item) {
    this.backend.makeFFAPurchase(this.context.freeby.donor.username, item.name, this.context.freeby.id, item.item_id);
    this.dialog.close();
  }

  beforeDismiss(): boolean {
    return false;
  }

  beforeClose(): boolean {
    return false;
  }
}
