import { Component, OnInit } from '@angular/core';
import { TabService } from '../tab.service';
import { TabActive } from '../tab-active.enum';

@Component({
  selector: 'app-itemmanagement',
  templateUrl: './itemmanagement.component.html',
  styleUrls: ['./itemmanagement.component.css']
})
export class ItemmanagementComponent implements OnInit {


  
  constructor(public tabs: TabService) { }
  
    ngOnInit() {
    }
  
  
  

}
