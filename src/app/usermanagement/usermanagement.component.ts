import { Component, OnInit } from '@angular/core';
import { TabActive } from '../tab-active.enum';
import { ReactiveFormsModule, FormsModule, FormControl } from '@angular/forms';
import { Observable, Observer } from 'rxjs/Rx';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import { TabService } from '../tab.service';
import { BackendService } from '../backend.service';
import { User } from '../backend-types';
import { UserManagementPageSize } from '../constants.layouts';

@Component({
  selector: 'app-usermanagement',
  templateUrl: './usermanagement.component.html',
  styleUrls: ['./usermanagement.component.css']
})
export class UsermanagementComponent implements OnInit {
  searchControl: FormControl = new FormControl();
  term: string = '';

  detailUser: User = null;

  pagesize = UserManagementPageSize; 


  constructor(public tabs: TabService, public backend: BackendService) { }

  ngOnInit() {
    this.backend.setAllUserPageSize(this.pagesize);
    this.searchControl.valueChanges
      .debounceTime(500)
      .distinctUntilChanged()
      .subscribe((term: string) => {
        this.term = term;
        console.log('Triggered with term = ' + term);
        this.backend.updateAllUserlist(term);
      });
    this.backend.updateAllUserlist('');
    this.term = '';
  }



  cancelDetail() {
    this.detailUser = null;
  }

  saveDetail() {
    const update: User = JSON.parse(JSON.stringify(this.detailUser));
    this.backend.updateUser(update);
    this.detailUser = null;
  }

  createUser() {
    const c = prompt("Gib den Namen des neuen Benutzers ein, oder lasse das Feld leer um den Vorgang abzubrechen. Neue Benutzer werden ohne SEWOBE Id und mit Grundeinstellungen erstellt. Der Name kann später noch geändert werden.");
    if (c != null && c.length > 0) {
      this.backend.createUser(c);
    }
  }

  editUser(user: User) {
    const det: User = JSON.parse(JSON.stringify(user));
    if (det.external_user_id == null) {
      det.external_user_id = '';
    }
    this.detailUser = det;
  }

  deleteUser(user_id: number) {
    if (confirm('Willst du wirklich den Benutzer mit der Id ' + user_id + ' endgültig löschen? Dieser Vorgang kann nicht rückgängig gemacht werden.')) {
      this.backend.deleteUser(user_id);
    }
  }


  pageNavigation(page : number) {
    console.log("Navigating to page " + page);
    BackendService.moveToPage(this.backend.viewstate.all_users.pagination, page, this.pagesize);
    this.backend.updateAllUserlist(this.term);
} 

}
