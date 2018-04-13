import { Injectable } from '@angular/core';


const LOCALSTORAGEKEY = "CERVISIA_FRONTEND_ADMIN_PASSWORD";

@Injectable()
export class PasswordCheckService {

  private proxiedPasswordCopy: string = this.loadPasswordOrNull();

  constructor() { }

  private loadPasswordOrNull(): string {
    const c = localStorage.getItem(LOCALSTORAGEKEY);
    if (c == null || c.trim().length == 0) {
      return null;
    } else {
      return c;
    }
  }

  private getPasswordOrNull(): string {
    return this.proxiedPasswordCopy;
  }

  private clearPassword() {
    localStorage.removeItem(LOCALSTORAGEKEY);
  }

  storePassword(passwordToStore: string) {
    if (passwordToStore == null || passwordToStore.length == 0) {
      this.clearPassword();
    } else {
      localStorage.setItem(LOCALSTORAGEKEY, passwordToStore);
    }
    this.proxiedPasswordCopy = this.loadPasswordOrNull();
  }

  equalsPassword(plaintextToCompareToStoredPassword: String): boolean {
    const c = this.getPasswordOrNull();
    if (c == null) {
      return true;
    } else {
      return c === plaintextToCompareToStoredPassword;
    }
  }

  checkPasswordAnyway() : boolean {
    const c = prompt("Bitte gib das Administrationspasswort ein um fortzufahren.");
      if (this.equalsPassword(c)) {
        return true;
      } else {
        alert("Falsches Passwort!");
        return false;
      }
  }

  checkPassword(): boolean {
    //do not check if password is null
    if (this.getPasswordOrNull() == null) {
      return true;
    } else {
      return this.checkPasswordAnyway();
    }
  }

  changePassword() {
    if (this.checkPassword()) {
      const c = prompt("Gib ein neues Passwort ein.");
      const d = prompt("Bitte gib das Passwort zur Bestätigung erneut ein.");
      if (c === d) {
        
      this.storePassword(c);

    } else {
      alert("Die eingegebenen Passwörter waren nicht identisch, breche Vorgang ohne Änderungen des Passworts ab.")
    }
    }
  }
}
