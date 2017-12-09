import { Component, OnInit } from '@angular/core';
import { TabService } from '../tab.service';
import { TabActive } from '../tab-active.enum';

@Component({
  selector: 'app-globalstatistics',
  templateUrl: './globalstatistics.component.html',
  styleUrls: ['./globalstatistics.component.css']
})
export class GlobalstatisticsComponent implements OnInit {


  
  constructor(public tabs: TabService) { }
  
    ngOnInit() {
    }

}
