import { Component, OnInit } from '@angular/core';
import { BackendService, AllResults} from '../backend.service';

import { DialogRef, ModalComponent, CloseGuard } from 'ngx-modialog';
import { BSModalContext } from 'ngx-modialog/plugins/bootstrap';
import { TabService } from '../tab.service';
import { TabActive } from '../tab-active.enum';
import { User, Item } from '../backend-types';

export class CustomModalContext extends BSModalContext {
  public user: User;
}

@Component({
  selector: 'app-quickmenu',
  templateUrl: './quickmenu.component.html',
  styleUrls: ['./quickmenu.component.css']
})
export class QuickmenuComponent implements CloseGuard, ModalComponent<CustomModalContext> {

  public context: CustomModalContext;

  public shouldUseMyClass = true;

  public btnsDisabled = true;

  constructor(public dialog: DialogRef<CustomModalContext>, public backend: BackendService, public tabService : TabService) {
    this.context = dialog.context;
    this.context.dialogClass = 'modal-dialog modal-lg';
    console.log(this.context);
    dialog.setCloseGuard(this);
    this.btnsDisabled = false;
  }



  beforeDismiss(): boolean {
    return false;
  }

  beforeClose(): boolean {
    return false;
  }

  onClickedItem(item: Item, event) {
    if (!this.btnsDisabled) {
    this.btnsDisabled = true;
      console.log('Buying item = ' + item.name);
      this.backend.makeSimplePurchase(item.name, this.context.user.username, item.item_id, this.context.user.user_id);
      this.close();
    }
  }

  close() {
    console.log('closing modal');
    this.dialog.close();
  }

  showDetail() {
    console.log('showing detail dialog');
    this.dialog.close();
    this.backend.detailselect(this.context.user.user_id, this.context.user.username);
    this.tabService.goToFullpurchase();
  }

  showStatistics() {
    console.log('showing statistic dialog');
    this.dialog.close();
    this.backend.detailselect(this.context.user.user_id, this.context.user.username);
    this.tabService.goToPersonalLog();
  }

  showGiveoutDialog() {
    console.log('showing giveout dialog');
    this.dialog.close();
    this.backend.detailselect(this.context.user.user_id, this.context.user.username);
    this.tabService.goToGiveout();
  }

}
