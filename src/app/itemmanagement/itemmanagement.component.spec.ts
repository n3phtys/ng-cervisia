import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemmanagementComponent } from './itemmanagement.component';
import { TabService } from '../tab.service';
import { BackendService } from '../backend.service';

describe('ItemmanagementComponent', () => {
  let component: ItemmanagementComponent;
  let fixture: ComponentFixture<ItemmanagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [BackendService, TabService],
      declarations: [ ItemmanagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemmanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
