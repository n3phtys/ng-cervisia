import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalstatisticsComponent } from './globalstatistics.component';
import { BackendService } from '../backend.service';
import { TabService } from '../tab.service';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-modialog';

describe('GlobalstatisticsComponent', () => {
  let component: GlobalstatisticsComponent;
  let fixture: ComponentFixture<GlobalstatisticsComponent>;

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
