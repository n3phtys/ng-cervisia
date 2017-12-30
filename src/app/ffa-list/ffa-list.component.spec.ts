import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FfaListComponent } from './ffa-list.component';

describe('FfaListComponent', () => {
  let component: FfaListComponent;
  let fixture: ComponentFixture<FfaListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FfaListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FfaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  
});
