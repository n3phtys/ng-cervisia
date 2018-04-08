import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { User } from '../backend-types';
import { BackendService } from '../backend.service';
import { FormControl } from '@angular/forms';
import { FFAUserPageSize } from '../constants.layouts';

@Component({
  selector: 'app-single-user-selection',
  templateUrl: './single-user-selection.component.html',
  styleUrls: ['./single-user-selection.component.css']
})
export class SingleUserSelectionComponent implements OnInit {
  searchControl: FormControl = new FormControl();
  term: string = '';

  pagesize = FFAUserPageSize;


  @Output() selectionChanged = new EventEmitter<User>();

  selected: User = null;

  constructor(public backend: BackendService) { }

  ngOnInit() {
    this.backend.setAllUserPageSize(this.pagesize);
    this.selected = null;
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

  selectUser(user: User) {
    this.selected = user;
    this.selectionChanged.emit(user);
  }

  pageNavigation(page : number) {
    console.log("Navigating to page " + page);
    BackendService.moveToPage(this.backend.viewstate.all_users.pagination, page, this.pagesize);
    this.backend.updateAllUserlist(this.term);
} 

}
