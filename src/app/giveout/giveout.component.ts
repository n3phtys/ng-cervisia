import { Component, OnInit } from '@angular/core';
import { TabService } from '../tab.service';
import { TabActive } from '../tab-active.enum';

@Component({
  selector: 'app-giveout',
  templateUrl: './giveout.component.html',
  styleUrls: ['./giveout.component.css']
})
export class GiveoutComponent implements OnInit {

  constructor(public tabs: TabService) { }

  ngOnInit() {
  }

}
