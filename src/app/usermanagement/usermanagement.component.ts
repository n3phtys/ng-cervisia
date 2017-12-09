import { Component, OnInit } from '@angular/core';
import { TabActive } from '../tab-active.enum';
import { TabService } from '../tab.service';

@Component({
  selector: 'app-usermanagement',
  templateUrl: './usermanagement.component.html',
  styleUrls: ['./usermanagement.component.css']
})
export class UsermanagementComponent implements OnInit {


  
  constructor(public tabs: TabService) { }
  
    ngOnInit() {
    }
  
  
  
  

}
