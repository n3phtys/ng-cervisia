import { Injectable } from '@angular/core';
import { BackendService } from './backend.service';
import { Observable } from 'rxjs/Observable';
import { ToastsManager } from 'ng2-toastr';
import 'rxjs/add/observable/of';


@Injectable()
export class PasswordCheckService {


  private isEmpty: boolean;

  constructor(private backend: BackendService, public toastr: ToastsManager) {
      this.isEmpty = false;
  }


  checkPasswordAnyway(): Observable<boolean> {
    const c = prompt("Bitte gib das Administrationspasswort ein um fortzufahren.");
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
