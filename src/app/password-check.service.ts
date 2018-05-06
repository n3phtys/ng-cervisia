import { Injectable } from '@angular/core';
import { BackendService } from './backend.service';
import { Observable } from 'rxjs/Observable';
import { ToastsManager } from 'ng2-toastr';
import 'rxjs/add/observable/of';


@Injectable()
export class PasswordCheckService {

  private isEmpty = false

  constructor(private backend: BackendService, public toastr: ToastsManager) {
    backend.checkPasswordAgainstServer('').subscribe(t => this.isEmpty = t);
  }


  checkPasswordAnyway(): Observable<boolean> {
    const c = prompt("Bitte gib das Administrationspasswort ein um fortzufahren.");
    if (c != null) {
      return this.backend.checkPasswordAgainstServer(c);
    } else {
      return Observable.of(false);
    }
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
