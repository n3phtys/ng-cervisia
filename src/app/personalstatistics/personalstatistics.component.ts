import { Component, OnInit } from '@angular/core';
import { TabActive } from '../tab-active.enum';
import { TabService } from '../tab.service';
import { BackendService } from '../backend.service';
import { PersonalLogPageSize, PersonalLogBillPageSize } from '../constants.layouts';
import { ParametersPurchaseLogGlobalCount, Bill, ExportBill } from '../backend-types';

@Component({
  selector: 'app-personalstatistics',
  templateUrl: './personalstatistics.component.html',
  styleUrls: ['./personalstatistics.component.css']
})
export class PersonalstatisticsComponent implements OnInit {

  pageSizePersonalLog = PersonalLogPageSize;
  pageSizePersonalBill = PersonalLogBillPageSize;

  constructor(public tabs: TabService, public backend: BackendService) { }

  ngOnInit() {
    this.backend.viewstate.personal_log.pagination.start_inclusive = 0;
    this.backend.viewstate.personal_log.pagination.end_exclusive = this.pageSizePersonalLog;
    this.backend.updatePersonalLog();
    this.backend.updateIncomingFreebies();
    this.backend.updateOutgoingFreebies();
    this.backend.updatePersonalBills();
  }



  pageNavigationForPersonalLog(page: number) {
    console.log("Navigating to page " + page);
    BackendService.moveToPage(this.backend.viewstate.personal_log.pagination, page, this.pageSizePersonalLog);
    this.backend.updatePersonalLog();
  }

  pageNavigationBills(page: number) {
    console.log("Navigating to page " + page);
    BackendService.moveToPage(this.backend.viewstate.bills.pagination, page, this.pageSizePersonalLog);
    this.backend.updateBills();
  }

  exportBill(bill: Bill) {
    let email = prompt("Bitte gib deine Email-Adresse ein. Wir senden dir die Abrechnung mit Detailaufstellung dann zu.");
    if (email.trim().length > 1) {
      let b: ExportBill = {
        email_address: email,
        limit_to_user: this.backend.viewstate.bills.count_pars.scope_user_id,
        timestamp_from: bill.timestamp_from,
        timestamp_to: bill.timestamp_to
      };
      this.backend.exportBillToEmail(b);
    }
  }


  timeFilterChange(filter: ParametersPurchaseLogGlobalCount) {
    this.backend.viewstate.personal_log.count_pars.millis_start = filter.millis_start;
    this.backend.viewstate.personal_log.count_pars.millis_end = filter.millis_end;
    this.backend.updatePersonalLog();
  }


}
