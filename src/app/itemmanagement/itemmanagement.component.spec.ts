import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemmanagementComponent } from './itemmanagement.component';

describe('ItemmanagementComponent', () => {
  let component: ItemmanagementComponent;
  let fixture: ComponentFixture<ItemmanagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
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
