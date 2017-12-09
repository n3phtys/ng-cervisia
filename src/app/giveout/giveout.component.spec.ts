import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GiveoutComponent } from './giveout.component';
import { BackendService } from '../backend.service';
import { TabService } from '../tab.service';

describe('GiveoutComponent', () => {
  let component: GiveoutComponent;
  let fixture: ComponentFixture<GiveoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [BackendService, TabService],
      declarations: [ GiveoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GiveoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
