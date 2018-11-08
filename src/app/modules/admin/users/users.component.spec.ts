import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersComponent } from './users.component';
import {
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatTableModule
} from '@angular/material';
import { TestingModule } from '@testing/utils';
import { CoreModule } from '@app/core';
import { FlexLayoutModule } from '@angular/flex-layout';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CoreModule,
        TestingModule,
        MatTableModule,
        MatPaginatorModule,
        MatProgressSpinnerModule,
        FlexLayoutModule,
        MatProgressBarModule
      ],
      declarations: [UsersComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
