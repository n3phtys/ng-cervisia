import { Injectable } from '@angular/core';
import { BackendService } from './backend.service';
import { Observable } from 'rxjs/Observable';
import { ToastsManager } from 'ng2-toastr';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { Overlay, overlayConfigFactory } from 'ngx-modialog';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/of';
import { Modal, BSModalContext } from 'ngx-modialog/plugins/bootstrap';
import { AsyncSubject } from 'rxjs/AsyncSubject';
import { PrompterComponent, CustomPrompterContext } from './prompter/prompter.component';

export function promptModal(msg: string, modal: Modal): Observable<string> {
  //create modal with input

  //if aborted, call falseCallback

  //if true, call trueCallback


  //custom prompt with osk
  console.log("one");
  let subject = new AsyncSubject<string>();
  console.log("two");
  let context = new CustomPrompterContext();
  context.msg = msg;
  context.title = 'Eingabe erforderlich';
  context.result = subject;
  context.isBlocking = false;

  let overlay = overlayConfigFactory(context, BSModalContext);

  console.log("two point five");
  modal.open(PrompterComponent, overlay);
  console.log("six");
  return subject;

}

@Injectable()
export class PasswordCheckService {


  private isEmpty: boolean;

  constructor(private backend: BackendService, public modal: Modal, public toastr: ToastsManager) {
    this.isEmpty = false;


  }


  checkPasswordAnyway(): Observable<boolean> {
    return promptModal("Bitte gib das Administrationspasswort ein um fortzufahren.", this.modal).mergeMap(c => {
      if (c != null) {
        const b = this.backend.checkPasswordAgainstServer(c);
        return b.map(t => {
          if (t && c === '') {
            this.isEmpty = true;
          }
          return t;
        }
        );
      } else {
        return Observable.of(false);
      }
    });
  }

  checkPassword(): Observable<boolean> {
    //do not check if password is empty
    if (this.isEmpty) {
      return Observable.of(true);
    } else {
      return this.checkPasswordAnyway();
    }
  }
}
