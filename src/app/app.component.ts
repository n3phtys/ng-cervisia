import { Component } from '@angular/core';
import { TabService } from './tab.service';
import { TabActive } from './tab-active.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'The Official AVH Cervisia Frontend';
  public tab = TabActive;


  constructor(public tabservice: TabService) {
      
  }
}
