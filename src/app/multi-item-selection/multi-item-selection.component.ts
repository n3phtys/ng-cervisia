import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Item } from '../backend-types';

export class MultiItemSelection {
  constructor(public items: Array<Item>, public categories: Array<string>) {}
}

@Component({
  selector: 'app-multi-item-selection',
  templateUrl: './multi-item-selection.component.html',
  styleUrls: ['./multi-item-selection.component.css']
})
export class MultiItemSelectionComponent implements OnInit {
  @Output() selectionChanged = new EventEmitter<MultiItemSelection>();

  constructor() { }

  ngOnInit() {
  }

}
