import { Component, OnInit } from '@angular/core';
import { TabService } from '../tab.service';
import { TabActive } from '../tab-active.enum';
import { BackendService } from '../backend.service';
import { ParametersBillsCount, ParametersPurchaseLogGlobalCount } from '../backend-types';
import { PasswordCheckService } from '../password-check.service';

@Component({
  selector: 'app-globalstatistics',
  templateUrl: './globalstatistics.component.html',
  styleUrls: ['./globalstatistics.component.css']
})
export class GlobalstatisticsComponent implements OnInit {


  
  constructor(public tabs: TabService, public backend: BackendService, public passmanager: PasswordCheckService) { }
  
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

    undoPurchase(id : number, timestamp : number) {
      console.log("Trying to undo " + id);
      const breakpoint = timestamp + (30 * 1000);
      const now = (new Date()).valueOf();

      if (breakpoint > now) {
          this.backend.undoPurchaseByUser(id);
      } else if (this.passmanager.checkPassword()) {
        this.backend.undoPurchaseByUser(id);
      }
    }
}
