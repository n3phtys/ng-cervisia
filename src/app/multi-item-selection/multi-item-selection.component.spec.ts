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


import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTabsModule } from '@angular/material/tabs';


import { IKeyboardLayouts, keyboardLayouts, MAT_KEYBOARD_LAYOUTS, MatKeyboardModule } from '@ngx-material-keyboard/core';

describe('MultiItemSelectionComponent', () => {
  let component: MultiItemSelectionComponent;
  let fixture: ComponentFixture<MultiItemSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        HttpClientModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatIconModule,
        MatInputModule,
        MatSelectModule,
        MatSlideToggleModule,
        MatTabsModule,

        MatKeyboardModule,
        FormsModule,
        ModalModule.forRoot(),
      ],
      providers: [BackendService, TabService, PasswordCheckService],
      declarations: [GiveoutComponent,
        PaginatorComponent,
        MultiItemSelectionComponent,
        EnumPipePipe,
        SingleUserSelectionComponent]
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
