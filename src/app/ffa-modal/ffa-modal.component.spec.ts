import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FfaModalComponent } from './ffa-modal.component';

describe('FfaModalComponent', () => {
  let component: FfaModalComponent;
  let fixture: ComponentFixture<FfaModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FfaModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FfaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

});
