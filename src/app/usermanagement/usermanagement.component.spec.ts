import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsermanagementComponent } from './usermanagement.component';
import { BackendService } from '../backend.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ModalModule } from 'ngx-modialog';
import { TabService } from '../tab.service';

describe('UsermanagementComponent', () => {
  let component: UsermanagementComponent;
  let fixture: ComponentFixture<UsermanagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule,
        ModalModule.forRoot()
      ],
      providers: [BackendService, TabService],
      declarations: [ UsermanagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsermanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
