import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleUserSelectionComponent } from './single-user-selection.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-modialog';
import { PaginatorComponent } from '../paginator/paginator.component';
import { BackendService } from '../backend.service';

describe('SingleUserSelectionComponent', () => {
  let component: SingleUserSelectionComponent;
  let fixture: ComponentFixture<SingleUserSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule,
        ModalModule.forRoot(),
      ],
      providers: [BackendService],
      declarations: [ 
        PaginatorComponent,
        SingleUserSelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleUserSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
