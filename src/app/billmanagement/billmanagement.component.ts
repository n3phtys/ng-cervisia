import { Component, OnInit } from '@angular/core';
import { TabService } from '../tab.service';
import { ViewContainerRef } from '@angular/core';
import { Overlay, overlayConfigFactory } from 'ngx-modialog';
import { Modal, BSModalContext } from 'ngx-modialog/plugins/bootstrap';
import { TabActive } from '../tab-active.enum';
import { BackendService } from '../backend.service';
import { ParametersPurchaseLogGlobalCount, Bill, ExportBill } from '../backend-types';
import { BillDetailModalComponent } from '../bill-detail-modal/bill-detail-modal.component';
import { BillManagementPageSize } from '../constants.layouts';
import { promptModal } from '../password-check.service';

@Component({
  selector: 'app-billmanagement',
  templateUrl: './billmanagement.component.html',
  styleUrls: ['./billmanagement.component.css']
})
export class BillmanagementComponent implements OnInit {
  //TODO: is missing option to select single or multiple specific users when creating a new bill

  dt1: Date;
  dt2: Date;
  commentField: string;
  filter: ParametersPurchaseLogGlobalCount;


  pagesize = BillManagementPageSize;

  constructor(public tabs: TabService, public backend: BackendService, public modal: Modal) { }

  ngOnInit() {
    this.backend.viewstate.bills.count_pars.scope_user_id = null;
    this.dt2 = new Date();
    this.dt1 = new Date(this.dt2.getTime() - (1000 * 24 * 3600 * 60));
    this.backend.viewstate.bills.count_pars.start_inclusive = 0;
    this.backend.viewstate.bills.count_pars.end_exclusive = new Date().getTime();
    this.backend.updateBills();
    console.log("date: " + this.dt1.toISOString());
    this.commentField = "";
  }


  pageNavigation(page: number) {
    console.log("Navigating to page " + page);
    BackendService.moveToPage(this.backend.viewstate.global_log.pagination, page, this.pagesize);
    this.backend.updateBills();
  }

  timeFilterChange(filter: ParametersPurchaseLogGlobalCount) {
    console.log("received filter");
    console.log(filter);
    this.backend.viewstate.bills.count_pars.end_exclusive = filter.millis_end;
    this.backend.viewstate.bills.count_pars.start_inclusive = filter.millis_start;
    this.backend.updateBills();
  }

  exportBill(bill: Bill) {
    promptModal("An welche Email-Adresse soll die Abrechnung geschickt werden? Lasse das Feld frei um den Vorgang abzubrechen", this.modal).forEach(c => {
      if (c != null && c.length > 0) {
        this.backend.exportBillToEmail(
          <ExportBill>{
            timestamp_from: bill.timestamp_from,
            timestamp_to: bill.timestamp_to,
            limit_to_user: null,
            email_address: c,
          });
      }
    });
  }

  createBill() {
    console.log(this.dt1);
    console.log(this.dt2);
    console.log(this.dt1.getTime());
    console.log(this.dt2.getTime());
    if (this.dt1 != null && !Number.isNaN(this.dt1.getTime()) && this.dt2 != null && !Number.isNaN(this.dt2.getTime()) && this.dt1.getTime() < this.dt2.getTime() && confirm("Willst du wirklich eine neue Abrechnung erstellen?")) {
      this.backend.createBill(this.commentField, this.dt1.getTime(), this.dt2.getTime());
      this.ngOnInit();
    }
  }

  openBillModal(bill: Bill) {
    this.backend.viewstate.bill_detail_infos.timestamp_from = bill.timestamp_from;
    this.backend.viewstate.bill_detail_infos.timestamp_to = bill.timestamp_to;
    this.backend.refreshDetailedBill();

    return this.modal.open(BillDetailModalComponent, overlayConfigFactory({ comment: bill.comment, timestamp_from: bill.timestamp_from, timestamp_to: bill.timestamp_to, exclude_user_ids: bill.users_that_will_not_be_billed }, BSModalContext));
  }

  datify1(event): void {
    const d = new Date(event);
    if (!Number.isNaN(d.getTime())) {
      this.dt1 = d;
    }
  }
  datify2(event): void {
    const d = new Date(event);
    if (!Number.isNaN(d.getTime())) {
      this.dt2 = d;
    }
  }

}
