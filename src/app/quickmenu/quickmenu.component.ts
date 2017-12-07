import { Component, OnInit } from '@angular/core';
import { BackendService, Item } from '../backend.service';

@Component({
  selector: 'app-quickmenu',
  templateUrl: './quickmenu.component.html',
  styleUrls: ['./quickmenu.component.css']
})
export class QuickmenuComponent implements OnInit {


  //@Input() items: any[]
  //@Output() onUpdate: EventEmitter<MyReactiveInputEvent> = new EventEmitter()

  constructor(private backend: BackendService) { }

  ngOnInit() {
  }


  onClickedItem(item: Item, event) {

  }

}
