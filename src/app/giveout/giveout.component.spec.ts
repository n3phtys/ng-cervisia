import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GiveoutComponent } from './giveout.component';
import { BackendService } from '../backend.service';
import { TabService } from '../tab.service';
import { PasswordCheckService } from '../password-check.service';
import { MultiItemSelectionComponent } from '../multi-item-selection/multi-item-selection.component';
import { SingleUserSelectionComponent } from '../single-user-selection/single-user-selection.component';
import { EnumPipePipe } from '../enum-pipe.pipe';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { ModalModule } from 'ngx-modialog';
import { PaginatorComponent } from '../paginator/paginator.component';

describe('GiveoutComponent', () => {
  let component: GiveoutComponent;
  let fixture: ComponentFixture<GiveoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        BrowserModule,
        ReactiveFormsModule,
        FormsModule,
        ModalModule.forRoot(),
      ],
      providers: [BackendService, TabService, PasswordCheckService],
      declarations: [ GiveoutComponent, 
        PaginatorComponent,
        MultiItemSelectionComponent, 
        EnumPipePipe,
        SingleUserSelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GiveoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

   //it('should create', () => {
   //  expect(component).toBeTruthy();
   //});
});
