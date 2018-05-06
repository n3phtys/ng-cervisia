import { Component, OnInit } from '@angular/core';
import { TabService } from '../tab.service';
import { TabActive } from '../tab-active.enum';
import { BackendService } from '../backend.service';
import { ParametersBillsCount, ParametersPurchaseLogGlobalCount } from '../backend-types';
import { PasswordCheckService } from '../password-check.service';
import { GlobalLogPageSize } from '../constants.layouts';

@Component({
  selector: 'app-globalstatistics',
  templateUrl: './globalstatistics.component.html',
  styleUrls: ['./globalstatistics.component.css']
})
export class GlobalstatisticsComponent implements OnInit {

  pageSize = GlobalLogPageSize;

  ALLOWED_PASSED_MILLIS = 120 * 1000;

  breakpoint = new Date().getTime() - this.ALLOWED_PASSED_MILLIS;

  constructor(public tabs: TabService, public backend: BackendService, public passmanager: PasswordCheckService) { }
  
    ngOnInit() {
      this.backend.viewstate.global_log.pagination.start_inclusive = 0;
      this.backend.viewstate.global_log.pagination.end_exclusive = this.pageSize;
      this.breakpoint = new Date().getTime() - this.ALLOWED_PASSED_MILLIS;
      this.backend.updateGlobalLog();
    }




    pageNavigation(page : number) {
        console.log("Navigating to page " + page);
        BackendService.moveToPage(this.backend.viewstate.global_log.pagination, page, this.pageSize);
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
      const breakpoint = timestamp + this.ALLOWED_PASSED_MILLIS;
      const now = (new Date()).valueOf();

      if (breakpoint > now) {
          this.backend.undoPurchaseByUser(id);
      } 
    }
    
    undoPurchaseByAdmin(id : number, timestamp : number) {

      console.log("Trying to undo " + id);
      const breakpoint = timestamp + this.ALLOWED_PASSED_MILLIS;
      const now = (new Date()).valueOf();
      this.passmanager.checkPasswordAnyway().subscribe(t => {
        if (t) {
          this.backend.undoPurchaseByAdmin(id);
        } else {
          this.passmanager.toastr.error('Wrong password entered');
        }
      });
    }
}
