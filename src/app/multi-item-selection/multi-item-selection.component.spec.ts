import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiItemSelectionComponent } from './multi-item-selection.component';

describe('MultiItemSelectionComponent', () => {
  let component: MultiItemSelectionComponent;
  let fixture: ComponentFixture<MultiItemSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiItemSelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiItemSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
