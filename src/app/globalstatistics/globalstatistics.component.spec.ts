import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalstatisticsComponent } from './globalstatistics.component';

describe('GlobalstatisticsComponent', () => {
  let component: GlobalstatisticsComponent;
  let fixture: ComponentFixture<GlobalstatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
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
