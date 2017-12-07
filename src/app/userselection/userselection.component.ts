import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend.service';

import {ReactiveFormsModule, FormsModule, FormControl} from '@angular/forms'
import {Observable, Observer} from 'rxjs/Rx'
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';



@Component({
  selector: 'app-userselection',
  templateUrl: './userselection.component.html',
  styleUrls: ['./userselection.component.css']
})
export class UserselectionComponent implements OnInit {
  searchControl: FormControl = new FormControl();

  constructor(private backend: BackendService) { 
  }

  ngOnInit() {
    //this.searchControl.valueChanges.subscribe(e => console.log("Term = " + e));
    const backend = this.backend;
    this.searchControl.valueChanges
    .debounceTime(250)
    .distinctUntilChanged()
    .subscribe((term: string) => {
      console.log("Triggered with term = " + term);
      backend.updateUserlist(term);
    });

    backend.updateUserlist("");
  }

}
