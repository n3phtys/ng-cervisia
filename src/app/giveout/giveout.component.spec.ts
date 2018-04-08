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
import { ToastModule } from 'ng2-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('GiveoutComponent', () => {
  let component: GiveoutComponent;
  let fixture: ComponentFixture<GiveoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        BrowserAnimationsModule,
        BrowserModule,
        ReactiveFormsModule,
        FormsModule,
        ModalModule.forRoot(),
        ToastModule.forRoot()
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
    //fixture = TestBed.createComponent(GiveoutComponent);
    //component = fixture.componentInstance;
    //fixture.detectChanges();
  });

  it('should round correctly 1', () => {
    expect(GiveoutComponent.calcInputPlusRounded(6, true, 10, 1, 100000 )).toBe(10);
  });
  it('should round correctly 2', () => {
    expect(GiveoutComponent.calcInputPlusRounded(10, true, 10, 1, 100000 )).toBe(20);
  });
  it('should round correctly 3', () => {
    expect(GiveoutComponent.calcInputPlusRounded(6, false, 10, 1, 100000 )).toBe(1);
  });
  it('should round correctly 4', () => {
    expect(GiveoutComponent.calcInputPlusRounded(19, false, 10, 1, 100000 )).toBe(10);
  });
});
