import { Component, OnInit } from '@angular/core';
import { BackendService, Item } from '../backend.service';

import { DialogRef, ModalComponent, CloseGuard } from 'ngx-modialog';
import { BSModalContext } from 'ngx-modialog/plugins/bootstrap';

export class CustomModalContext extends BSModalContext {
  public num1: number;
  public num2: number;
}

@Component({
  selector: 'app-quickmenu',
  templateUrl: './quickmenu.component.html',
  styleUrls: ['./quickmenu.component.css']
})
export class QuickmenuComponent implements CloseGuard, ModalComponent<CustomModalContext> {

  context: CustomModalContext;

    public wrongAnswer: boolean;

  //@Input() items: any[]
  //@Output() onUpdate: EventEmitter<MyReactiveInputEvent> = new EventEmitter()


  constructor(public dialog: DialogRef<CustomModalContext>) {
    this.context = dialog.context;
    this.wrongAnswer = true;
    dialog.setCloseGuard(this);
  }

  onKeyUp(value) {
    const i = parseInt(value, 10);
    this.wrongAnswer = i !== 5;
    this.dialog.close();
  }


  beforeDismiss(): boolean {
    return true;
  }

  beforeClose(): boolean {
    return this.wrongAnswer;
  }


  onClickedItem(item: Item, event) {

  }

}
