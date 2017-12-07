import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserselectionComponent } from './userselection.component';

describe('UserselectionComponent', () => {
  let component: UserselectionComponent;
  let fixture: ComponentFixture<UserselectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserselectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserselectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
