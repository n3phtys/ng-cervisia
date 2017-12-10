import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimespanFilterComponent } from './timespan-filter.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ModalModule } from 'ngx-modialog';
import { BackendService } from '../backend.service';
import { TabService } from '../tab.service';
import { GlobalstatisticsComponent } from '../globalstatistics/globalstatistics.component';
import { PaginatorComponent } from '../paginator/paginator.component';

describe('TimespanFilterComponent', () => {
  let component: TimespanFilterComponent;
  let fixture: ComponentFixture<TimespanFilterComponent>;

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
      declarations: [GlobalstatisticsComponent, PaginatorComponent, TimespanFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimespanFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
