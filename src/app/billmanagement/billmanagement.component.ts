import { Component, OnInit } from '@angular/core';
import { TabService } from '../tab.service';
import { TabActive } from '../tab-active.enum';

@Component({
  selector: 'app-billmanagement',
  templateUrl: './billmanagement.component.html',
  styleUrls: ['./billmanagement.component.css']
})
export class BillmanagementComponent implements OnInit {

  
  constructor(public tabs: TabService) { }
  
    ngOnInit() {
    }
  
}
