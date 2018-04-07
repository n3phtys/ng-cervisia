import { Component, OnInit } from '@angular/core';
import { TabActive } from '../tab-active.enum';
import { TabService } from '../tab.service';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-personalstatistics',
  templateUrl: './personalstatistics.component.html',
  styleUrls: ['./personalstatistics.component.css']
})
export class PersonalstatisticsComponent implements OnInit {

  
  constructor(public tabs: TabService, public backend: BackendService) { }
  
    ngOnInit() {
    }
  
  
  
  

}
