import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickmenuComponent } from './quickmenu.component';

describe('QuickmenuComponent', () => {
  let component: QuickmenuComponent;
  let fixture: ComponentFixture<QuickmenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuickmenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickmenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
