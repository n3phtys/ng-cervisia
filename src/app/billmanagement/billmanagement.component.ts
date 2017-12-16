import { Component, OnInit } from '@angular/core';
import { TabService } from '../tab.service';
import { TabActive } from '../tab-active.enum';
import { Bill, BackendService, Timespan } from '../backend.service';

@Component({
  selector: 'app-billmanagement',
  templateUrl: './billmanagement.component.html',
  styleUrls: ['./billmanagement.component.css']
})
export class BillmanagementComponent implements OnInit {
  //TODO: is missing option to select single or multiple specific users when creating a new bill

  dt: Date;
  commentField: string;
  

  constructor(public tabs: TabService, public backend: BackendService) { }
  
    ngOnInit() {
      this.backend.updateBills();
      this.dt = new Date();
      this.commentField = "";
    }
  

    pageNavigation(page : number) {
      console.log("Navigating to page " + page);
      BackendService.moveToPage(this.backend.viewstate.global_log.pagination, page);
      this.backend.updateBills();
  } 

  timeFilterChange(filter : Timespan) {
    console.log("received filter");
    console.log(filter);
    this.backend.viewstate.bills.count_pars.end_exclusive = filter.millis_end;
    this.backend.viewstate.bills.count_pars.start_inclusive = filter.millis_start;
    this.backend.updateBills();
  }
    
    exportBill(bill: Bill) {
      const c = prompt("To which email address should I sent this bill? Leave empty to cancel");
      if (c != null && c.length > 0) {
        this.backend.exportBillToEmail(null, bill.timestamp, c);
      }
    }

    createBill() {
      if (this.dt != null && !Number.isNaN(this.dt.getTime() )) {
          this.backend.createBill(this.dt, this.commentField);
      }
    }

}
