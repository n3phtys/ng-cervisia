import { Component, OnInit } from '@angular/core';
import { TabActive } from '../tab-active.enum';
import { ReactiveFormsModule, FormsModule, FormControl } from '@angular/forms';
import { Observable, Observer } from 'rxjs/Rx';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import { TabService } from '../tab.service';
import { BackendService, User } from '../backend.service';

@Component({
  selector: 'app-usermanagement',
  templateUrl: './usermanagement.component.html',
  styleUrls: ['./usermanagement.component.css']
})
export class UsermanagementComponent implements OnInit {
  searchControl: FormControl = new FormControl();
  term: string = '';

  detailUser: User = null;



  constructor(public tabs: TabService, public backend: BackendService) { }

  ngOnInit() {
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
    const c = prompt("Enter the name of the new user or leave empty to cancel");
    if (c != null && c.length > 0) {
      this.backend.createUser(c);
    }
  }

  editUser(user: User) {
    const det: User = JSON.parse(JSON.stringify(user));
    this.detailUser = det;
  }

  deleteUser(user_id: number) {
    if (confirm('Do you really want to delete the user with id = ' + user_id + ' ?')) {
      this.backend.deleteUser(user_id);
    }
  }


  pageNavigation(page : number) {
    console.log("Navigating to page " + page);
    BackendService.moveToPage(this.backend.viewstate.all_users.pagination, page);
    this.backend.updateAllUserlist(this.term);
} 

}
