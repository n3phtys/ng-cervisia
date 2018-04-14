import { Component, OnInit } from '@angular/core';
import { TabService } from '../tab.service';
import { TabActive } from '../tab-active.enum';
import { ReactiveFormsModule, FormsModule, FormControl } from '@angular/forms';
import { Observable, Observer } from 'rxjs/Rx';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import { BackendService } from '../backend.service';
import { Item } from '../backend-types';
import { ItemManagementPageSize } from '../constants.layouts';

@Component({
  selector: 'app-itemmanagement',
  templateUrl: './itemmanagement.component.html',
  styleUrls: ['./itemmanagement.component.css']
})
export class ItemmanagementComponent implements OnInit {

  pagesize = ItemManagementPageSize;
  searchControl: FormControl = new FormControl();
  term = '';
  
    detailItem: Item = null;
  
  
  
    constructor(public tabs: TabService, public backend: BackendService) { }
  
    ngOnInit() {
      BackendService.moveToPage(this.backend.viewstate.all_items.pagination, 0, this.pagesize);
      this.cancelDetail();
      this.searchControl.valueChanges
        .debounceTime(500)
        .distinctUntilChanged()
        .subscribe((term: string) => {
          //console.log('Triggered with term = ' + term);
          this.backend.updateItemlist(term);
          this.term = term;
          //console.log(this.backend.content.autocomplete_collection);
        });
      this.backend.updateItemlist('');
      this.term = '';
      //console.log(this.backend.content.autocomplete_collection);

    }
  
  
  
    cancelDetail() {
      this.detailItem = null;
    }
  
    saveDetail() {
      const update: Item = JSON.parse(JSON.stringify(this.detailItem));
      this.backend.updateItem(update);
      this.detailItem = null;
    }
  
    createItem() {
      const c = prompt("Gib den Namen des neuen Getränks ein, oder lasse das Feld leer um abzubrechen. Du kannst den Namen später noch ändern. Das Getränk wird mit 1€ Preis und ohne Kategorie angelegt.");
      if (c != null && c.length > 0) {
        this.backend.createItem(c, 100, null);
      }
    }
  
    editItem(item: Item) {
      const det:Item = JSON.parse(JSON.stringify(item));
      this.detailItem = det;
    }
  
    deleteItem(item_id: number) {
      if (confirm('Willst du das Getränk mit der Id ' + item_id + ' wirklich endgültig löschen? Dieser Vorgang kann nicht rückgängig gemacht werden!')) {
        this.backend.deleteItem(item_id);
      }
    }
  

    pageNavigation(page : number) {
      console.log("Navigating to page " + page);
      BackendService.moveToPage(this.backend.viewstate.all_items.pagination, page, this.pagesize);
      this.backend.updateItemlist(this.term);
  } 

}
