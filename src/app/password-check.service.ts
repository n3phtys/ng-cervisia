import { Injectable } from '@angular/core';
import { BackendService } from './backend.service';
import { Observable } from 'rxjs/Observable';
import { ToastsManager } from 'ng2-toastr';
import { fromPromise } from 'rxjs/observable/fromPromise';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/of';
import { Modal } from 'ngx-modialog/plugins/bootstrap';

export function promptModal(msg: string, modal: Modal): Observable<string> {
  //create modal with input

  //if aborted, call falseCallback

  //if true, call trueCallback

  return fromPromise(modal.prompt()
    .size('sm')
    .isBlocking(true)
    .showClose(false)
    .keyboard(27)
    .title('Eingabe erforderlich')
    .body(msg)
    .open().result.catch(e => console.log('Error in modal!')));

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
