import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillmanagementComponent } from './billmanagement.component';

describe('BillmanagementComponent', () => {
  let component: BillmanagementComponent;
  let fixture: ComponentFixture<BillmanagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
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
