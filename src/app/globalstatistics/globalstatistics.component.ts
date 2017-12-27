import { Component, OnInit } from '@angular/core';
import { TabService } from '../tab.service';
import { TabActive } from '../tab-active.enum';
import { BackendService } from '../backend.service';
import { ParametersBillsCount, ParametersPurchaseLogGlobalCount } from '../backend-types';

@Component({
  selector: 'app-globalstatistics',
  templateUrl: './globalstatistics.component.html',
  styleUrls: ['./globalstatistics.component.css']
})
export class GlobalstatisticsComponent implements OnInit {


  
  constructor(public tabs: TabService, public backend: BackendService) { }
  
    ngOnInit() {
      this.backend.updateGlobalLog();
    }




    pageNavigation(page : number) {
        console.log("Navigating to page " + page);
        BackendService.moveToPage(this.backend.viewstate.global_log.pagination, page);
        this.backend.updateGlobalLog();
    } 

    timeFilterChange(filter : ParametersPurchaseLogGlobalCount) {
      console.log("received filter");
      console.log(filter);
      this.backend.viewstate.global_log.count_pars = filter;
      this.backend.updateGlobalLog();
    }
}
