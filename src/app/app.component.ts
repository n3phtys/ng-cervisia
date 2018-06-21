import { Component, ViewContainerRef } from '@angular/core';
import { TabService } from './tab.service';
import { TabActive } from './tab-active.enum';
import { BackendService } from './backend.service';
import { min } from 'rxjs/operator/min';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'The Official AVH Cervisia Frontend';
  public tab = TabActive;


  constructor(public tabservice: TabService, public backendService: BackendService, vcr: ViewContainerRef) {
    this.backendService.toastr.setRootViewContainerRef(vcr);

    this.reloadAfterRandomPeriod();

  }


  reloadAfterRandomPeriod() {
    let hour = 1000 * 3600
    let minimalMillis = hour * 24;
    let maximalMillis = hour * 48;
    let actualMillis = Math.random() * (maximalMillis - minimalMillis) + minimalMillis;

    setTimeout(function () { window.location.reload(true); }, actualMillis);
  }
}

