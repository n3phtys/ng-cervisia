import { Injectable } from '@angular/core';
import { TabActive } from './tab-active.enum';
import { PasswordCheckService } from './password-check.service';

@Injectable()
export class TabService {


  public showUserselection = true;
  public showAdministration = false;
  public showLog = false;
  public showPrivateStatistics = false;
  public showGiveout = false;
  public showFullPurchase = false;
  public showItemmanagement = false;
  public showUsermanagement = false;
  public showBillmanagement = false;
  public showPartyMode = false;


  resetFlags(flag: TabActive) {
    this.showUserselection = flag == TabActive.UserSelectionPage;
    this.showAdministration = flag == TabActive.AdministrationPage;
    this.showLog = flag == TabActive.GlobalStatisticsPage;
    this.showPrivateStatistics = flag == TabActive.UserStatisticsPage;
    this.showGiveout = flag == TabActive.UserGiveoutPage;
    this.showFullPurchase = flag == TabActive.UserDetailPage;
    this.showItemmanagement = flag == TabActive.ItemmanagementPage;
    this.showUsermanagement = flag == TabActive.UsermanagementPage;
    this.showBillmanagement = flag == TabActive.BillmanagementPage;
    this.showPartyMode = flag == TabActive.PartyModePage;
  }


  constructor(public passmanager: PasswordCheckService) {
    this.resetFlags(TabActive.UserSelectionPage);
  }


  public goToLog() {
    // console.log("Changed openTab from " + this.openTab);
    // console.log(TabActive.GlobalStatisticsPage);
    // this.openTab = TabActive.GlobalStatisticsPage;
    // console.log("Changed openTab to " + this.openTab);
    this.resetFlags(TabActive.GlobalStatisticsPage);
  }

  public goToAdministrationWithoutPassword() {
    this.resetFlags(TabActive.AdministrationPage);
  }

  public goToAdministration() {
    this.passmanager.checkPassword().subscribe(t => {
      if (t) {
        // console.log("Changed openTab from " + this.openTab);
        // console.log(TabActive.AdministrationPage);
        // this.openTab = TabActive.AdministrationPage;
        // console.log("Changed openTab to " + this.openTab);
        this.resetFlags(TabActive.AdministrationPage);
      } else {
        this.passmanager.toastr.error('Wrong password entered');
      }
    });
  }

  public goToItemManagement() {
    // console.log("Changed openTab from " + this.openTab);
    // console.log(TabActive.ItemmanagementPage);
    // this.openTab = TabActive.ItemmanagementPage;
    // console.log("Changed openTab to " + this.openTab);
    this.resetFlags(TabActive.ItemmanagementPage);
  }

  public goToPartyMode() {
    this.resetFlags(TabActive.PartyModePage);
  }

  public goToUserManagement() {
    // console.log("Changed openTab from " + this.openTab);
    // console.log(TabActive.GlobalStatisticsPage);
    // this.openTab = TabActive.GlobalStatisticsPage;
    // console.log("Changed openTab to " + this.openTab);
    this.resetFlags(TabActive.UsermanagementPage);
  }

  public goToBillManagement() {
    // console.log("Changed openTab from " + this.openTab);
    // console.log(TabActive.BillmanagementPage);
    // this.openTab = TabActive.BillmanagementPage;
    // console.log("Changed openTab to " + this.openTab);
    this.resetFlags(TabActive.BillmanagementPage);
  }

  public goToUserSelection() {
    // console.log("Changed openTab from " + this.openTab);
    // console.log(TabActive.UserSelectionPage);
    // this.openTab == TabActive.UserSelectionPage;
    // console.log("Changed openTab to " + this.openTab);
    this.resetFlags(TabActive.UserSelectionPage);
  }

  public goToFullpurchase() {
    this.resetFlags(TabActive.UserDetailPage);
  }

  public goToPersonalLog() {
    this.resetFlags(TabActive.UserStatisticsPage);
  }

  public goToGiveout() {
    this.resetFlags(TabActive.UserGiveoutPage);
  }
}
