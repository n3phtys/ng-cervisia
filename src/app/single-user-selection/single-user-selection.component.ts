import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { User } from '../backend-types';

@Component({
  selector: 'app-single-user-selection',
  templateUrl: './single-user-selection.component.html',
  styleUrls: ['./single-user-selection.component.css']
})
export class SingleUserSelectionComponent implements OnInit {
  @Output() selectionChanged = new EventEmitter<User>();

  constructor() { }

  ngOnInit() {
  }

}
