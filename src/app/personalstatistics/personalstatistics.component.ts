import { Component, OnInit } from '@angular/core';
import { TabActive } from '../tab-active.enum';
import { TabService } from '../tab.service';

@Component({
  selector: 'app-personalstatistics',
  templateUrl: './personalstatistics.component.html',
  styleUrls: ['./personalstatistics.component.css']
})
export class PersonalstatisticsComponent implements OnInit {

  
  constructor(public tabs: TabService) { }
  
    ngOnInit() {
    }
  
  
  
  

}
