import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillmanagementComponent } from './billmanagement.component';
import { TabService } from '../tab.service';
import { BackendService } from '../backend.service';

describe('BillmanagementComponent', () => {
  let component: BillmanagementComponent;
  let fixture: ComponentFixture<BillmanagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [BackendService, TabService],
      declarations: [ BillmanagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillmanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
