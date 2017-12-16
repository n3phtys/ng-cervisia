import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillmanagementComponent } from './billmanagement.component';
import { TabService } from '../tab.service';
import { BackendService } from '../backend.service';
import { TimespanFilterComponent } from '../timespan-filter/timespan-filter.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { ModalModule } from 'ngx-modialog';
import { GlobalstatisticsComponent } from '../globalstatistics/globalstatistics.component';
import { PaginatorComponent } from '../paginator/paginator.component';

describe('BillmanagementComponent', () => {
  let component: BillmanagementComponent;
  let fixture: ComponentFixture<BillmanagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule,
        ModalModule.forRoot(),
      ],
      providers: [BackendService, TabService],
      declarations: [ GlobalstatisticsComponent, BillmanagementComponent, PaginatorComponent, TimespanFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillmanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /*it('should create', () => {
    expect(component).toBeTruthy();
  });*/
});
