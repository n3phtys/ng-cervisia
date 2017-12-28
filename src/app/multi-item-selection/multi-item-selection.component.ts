import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Item } from '../backend-types';
import { BackendService } from '../backend.service';
import { FormControl } from '@angular/forms';

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

  selectedCategories : Set<string> = new Set();
  selectedItems : Set<Item> = new Set();

  searchControl: FormControl = new FormControl();

  constructor(private backend: BackendService) { }

  ngOnInit() {

    const backend = this.backend;
    this.searchControl.valueChanges
      .debounceTime(250)
      .distinctUntilChanged()
      .subscribe((term: string) => {
        console.log('Triggered with term = ' + term);
        backend.updateItemlist(term);
      });

    backend.updateItemlist('');

    this.selectedCategories.clear();
    this.selectedItems.clear();
  }

  emit() {
    this.selectionChanged.emit(new MultiItemSelection(
      Array.from(this.selectedItems),
      Array.from(this.selectedCategories)
    ))
  }
  
  onClickedItem(item: Item, event) {
    console.log("Marking:");
    console.log(item);

    //check if already in
    if (this.selectedItems.has(item)) {
      this.selectedItems.delete(item);
    } else {
      this.selectedItems.add(item);
    }
    this.emit();
  }

  onClickedCategory(category: string, event) {
    console.log("Marking:");
    console.log(category);

    //check if already in
    if (this.selectedCategories.has(category)) {
      this.selectedCategories.delete(category);
    } else {
      this.selectedCategories.add(category);
    }
    this.emit();
  }

}
