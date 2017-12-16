import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemmanagementComponent } from './itemmanagement.component';
import { TabService } from '../tab.service';
import { BackendService } from '../backend.service';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-modialog';
import { GlobalstatisticsComponent } from '../globalstatistics/globalstatistics.component';
import { TimespanFilterComponent } from '../timespan-filter/timespan-filter.component';
import { PaginatorComponent } from '../paginator/paginator.component';

describe('ItemmanagementComponent', () => {
  let component: ItemmanagementComponent;
  let fixture: ComponentFixture<ItemmanagementComponent>;

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
      declarations: [ GlobalstatisticsComponent, ItemmanagementComponent, PaginatorComponent, TimespanFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemmanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /*it('should create', () => {
    expect(component).toBeTruthy();
  });*/
});
