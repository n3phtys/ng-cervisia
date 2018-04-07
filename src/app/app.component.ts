import { Component, ViewContainerRef } from '@angular/core';
import { TabService } from './tab.service';
import { TabActive } from './tab-active.enum';
import { BackendService } from './backend.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'The Official AVH Cervisia Frontend';
  public tab = TabActive;


  constructor(public tabservice: TabService, public backendService: BackendService , vcr: ViewContainerRef) {
    this.backendService.toastr.setRootViewContainerRef(vcr);
      
  }
}
