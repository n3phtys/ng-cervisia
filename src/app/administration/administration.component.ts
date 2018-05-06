import { Component, OnInit } from '@angular/core';
import { TabService } from '../tab.service';
import { TabActive } from '../tab-active.enum';
import { PasswordCheckService } from '../password-check.service';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.css']
})
export class AdministrationComponent implements OnInit {


  constructor(public tabs: TabService, public passmanager: PasswordCheckService) { }

  ngOnInit() {
  }


}
