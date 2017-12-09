import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalstatisticsComponent } from './personalstatistics.component';

describe('PersonalstatisticsComponent', () => {
  let component: PersonalstatisticsComponent;
  let fixture: ComponentFixture<PersonalstatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonalstatisticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalstatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
