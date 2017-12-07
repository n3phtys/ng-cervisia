import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FullPurchaseComponent } from './full-purchase.component';

describe('FullPurchaseComponent', () => {
  let component: FullPurchaseComponent;
  let fixture: ComponentFixture<FullPurchaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FullPurchaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullPurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
