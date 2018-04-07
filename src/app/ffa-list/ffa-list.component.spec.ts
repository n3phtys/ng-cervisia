import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FfaListComponent } from './ffa-list.component';
import { FreebyMessagePipe } from '../freeby-message.pipe';

describe('FfaListComponent', () => {
  let component: FfaListComponent;
  let fixture: ComponentFixture<FfaListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        FreebyMessagePipe, FfaListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FfaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  
});
