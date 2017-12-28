import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleUserSelectionComponent } from './single-user-selection.component';

describe('SingleUserSelectionComponent', () => {
  let component: SingleUserSelectionComponent;
  let fixture: ComponentFixture<SingleUserSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleUserSelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleUserSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
