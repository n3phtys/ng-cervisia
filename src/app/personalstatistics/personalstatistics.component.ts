import { Component, OnInit } from '@angular/core';
import { TabActive } from '../tab-active.enum';
import { TabService } from '../tab.service';
import { BackendService } from '../backend.service';
import { PersonalLogPageSize } from '../constants.layouts';
import { ParametersPurchaseLogGlobalCount } from '../backend-types';

@Component({
  selector: 'app-personalstatistics',
  templateUrl: './personalstatistics.component.html',
  styleUrls: ['./personalstatistics.component.css']
})
export class PersonalstatisticsComponent implements OnInit {

  pageSizePersonalLog = PersonalLogPageSize;
  
  constructor(public tabs: TabService, public backend: BackendService) { }
  
    ngOnInit() {
      this.backend.viewstate.personal_log.pagination.start_inclusive = 0;
      this.backend.viewstate.personal_log.pagination.end_exclusive = this.pageSizePersonalLog;
      this.backend.updatePersonalLog();
      this.backend.updateIncomingFreebies();
      this.backend.updateOutgoingFreebies();
      this.backend.updatePersonalBills();
    }
  
  

    pageNavigationForPersonalLog(page : number) {
      console.log("Navigating to page " + page);
      BackendService.moveToPage(this.backend.viewstate.personal_log.pagination, page, this.pageSizePersonalLog);
      this.backend.updatePersonalLog();
  } 
  

  timeFilterChange(filter : ParametersPurchaseLogGlobalCount) {
    this.backend.viewstate.personal_log.count_pars.millis_start = filter.millis_start;
    this.backend.viewstate.personal_log.count_pars.millis_end = filter.millis_end;
    this.backend.updatePersonalLog();
  }
  

}
