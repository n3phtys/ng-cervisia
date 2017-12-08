import { Component, OnInit } from '@angular/core';
import { BackendService, Item, AllResults, User } from '../backend.service';

import { DialogRef, ModalComponent, CloseGuard } from 'ngx-modialog';
import { BSModalContext } from 'ngx-modialog/plugins/bootstrap';

export class CustomModalContext extends BSModalContext {
  public user: User;
  public content: AllResults;
}

@Component({
  selector: 'app-quickmenu',
  templateUrl: './quickmenu.component.html',
  styleUrls: ['./quickmenu.component.css']
})
export class QuickmenuComponent implements CloseGuard, ModalComponent<CustomModalContext> {

  public context: CustomModalContext;

  constructor(public dialog: DialogRef<CustomModalContext>) {
    this.context = dialog.context;
    console.log(this.context);
    dialog.setCloseGuard(this);
  }



  beforeDismiss(): boolean {
    return false;
  }

  beforeClose(): boolean {
    return false;
  }

  onClickedItem(item: Item, event) {
      console.log("Buying item = " + item.name);
      this.close();
  }

  close() {
    console.log('closing modal');
    this.dialog.close();
  }

  showDetail() {

  }

  showPersonalLog() {

  }

  showGiveoutDialog() {

  }

}
