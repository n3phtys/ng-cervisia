import { Component, OnInit } from '@angular/core';
import { ViewContainerRef } from '@angular/core';
import { Overlay, overlayConfigFactory } from 'ngx-modialog';
import { Modal, BSModalContext } from 'ngx-modialog/plugins/bootstrap';
import { BackendService } from '../backend.service';
import { Freeby, EnrichedFFA } from '../backend-types';
import { FfaModalComponent } from '../ffa-modal/ffa-modal.component';

@Component({
  selector: 'app-ffa-list',
  templateUrl: './ffa-list.component.html',
  styleUrls: ['./ffa-list.component.css']
})
export class FfaListComponent implements OnInit {

  constructor(public backend: BackendService, public modal: Modal) { }

  counter(i: number) {
    return new Array(i);
  }

  ngOnInit() {
    this.backend.updateOpenFFAs();
  }

  openFFAModal(f: EnrichedFFA) {
    return this.modal.open(FfaModalComponent, overlayConfigFactory({ freeby: f }, BSModalContext));
  }
}
