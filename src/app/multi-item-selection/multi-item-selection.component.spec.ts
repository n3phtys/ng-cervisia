import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiItemSelectionComponent } from './multi-item-selection.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-modialog';
import { BackendService } from '../backend.service';
import { PasswordCheckService } from '../password-check.service';
import { GiveoutComponent } from '../giveout/giveout.component';
import { PaginatorComponent } from '../paginator/paginator.component';
import { EnumPipePipe } from '../enum-pipe.pipe';
import { SingleUserSelectionComponent } from '../single-user-selection/single-user-selection.component';
import { TabService } from '../tab.service';

describe('MultiItemSelectionComponent', () => {
  let component: MultiItemSelectionComponent;
  let fixture: ComponentFixture<MultiItemSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        HttpClientModule,
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
    fixture = TestBed.createComponent(MultiItemSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
