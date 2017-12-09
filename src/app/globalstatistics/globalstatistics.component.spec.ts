import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalstatisticsComponent } from './globalstatistics.component';
import { BackendService } from '../backend.service';
import { TabService } from '../tab.service';

describe('GlobalstatisticsComponent', () => {
  let component: GlobalstatisticsComponent;
  let fixture: ComponentFixture<GlobalstatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [BackendService, TabService],
      declarations: [ GlobalstatisticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalstatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
