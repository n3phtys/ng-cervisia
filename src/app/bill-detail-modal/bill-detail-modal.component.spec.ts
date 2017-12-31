import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillDetailModalComponent } from './bill-detail-modal.component';

describe('BillDetailModalComponent', () => {
  let component: BillDetailModalComponent;
  let fixture: ComponentFixture<BillDetailModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillDetailModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillDetailModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

});
