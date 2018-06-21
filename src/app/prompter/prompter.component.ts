import { Component, OnInit } from '@angular/core';
import { BackendService, AllResults } from '../backend.service';

import { DialogRef, ModalComponent, CloseGuard } from 'ngx-modialog';
import { BSModalContext } from 'ngx-modialog/plugins/bootstrap';
import { TabService } from '../tab.service';
import { TabActive } from '../tab-active.enum';
import { User, Item } from '../backend-types';
import { BehaviorSubject, AsyncSubject } from 'rxjs';

export class CustomPrompterContext extends BSModalContext {
  public msg: string;
  public title: string;
  public result: AsyncSubject<string>;
}

@Component({
  selector: 'app-prompter',
  templateUrl: './prompter.component.html',
  styleUrls: ['./prompter.component.css']
})
export class PrompterComponent implements CloseGuard, ModalComponent<CustomPrompterContext> {

  public context: CustomPrompterContext;

  public inputContent: string;

  constructor(public dialog: DialogRef<CustomPrompterContext>) {
    console.log("three");
    this.context = dialog.context;
    this.context.dialogClass = 'modal-dialog modal-sm';
    this.inputContent = '';
    console.log("four");
    dialog.setCloseGuard(this);
    console.log("five");
  }


  onOkay() {
    this.dialog.close();
    this.context.result.next(this.inputContent);
    this.context.result.complete();
  }

  onCancel() {
    this.dialog.close();
    this.context.result.next(null);
    this.context.result.complete();
  }

  beforeDismiss(): boolean {
    return false;
  }

  beforeClose(): boolean {
    return false;
  }

}
