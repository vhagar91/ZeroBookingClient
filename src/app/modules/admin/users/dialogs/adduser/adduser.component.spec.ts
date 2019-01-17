import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserComponent } from './adduser.component';
import { MockStore, TestingModule } from '@testing/utils';
import { CoreModule } from '@app/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef
} from '@angular/material';
import { By } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { State, Store } from '@ngrx/store';
import { UserListState } from '@app/modules/admin/users/state/users';
import { ActionAddUser } from '@app/modules/admin/users/reducer/users.actions';
import { Group } from '@app/modules/admin/users/state/group';

describe('AdduserComponent', () => {
  let component: AddUserComponent;
  let fixture: ComponentFixture<AddUserComponent>;
  let store: MockStore<State<UserListState>>;
  let dispatchSpy: jasmine.Spy;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CoreModule,
        TestingModule,
        MatDialogModule,
        ReactiveFormsModule,
        FormsModule
      ],
      declarations: [AddUserComponent],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUserComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);
    dispatchSpy = spyOn(store, 'dispatch').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should dispatch an action to Add User data', () => {
    const action = new ActionAddUser({
      user: {
        username: null,
        last_name: null,
        first_name: null,
        email: null,
        is_staff: false,
        password: '',
        group: ''
      }
    });
    component.submit();
    expect(dispatchSpy).toHaveBeenCalledTimes(1);
    expect(dispatchSpy).toHaveBeenCalledWith(action);
  });

  it('should have as h3 New User', () => {
    const bannerElement: HTMLElement = fixture.nativeElement;
    const h1 = bannerElement.querySelector('h3');
    expect(h1.textContent).toEqual('New User');
  });

  it('form invalid when empty', () => {
    expect(component.userForm.valid).toBeFalsy();
  });
  it('email field validity', () => {
    let errors = {};
    const email = component.userForm.controls['email'];
    expect(email.valid).toBeFalsy();

    // Email field is required
    errors = email.errors || {};
    expect(errors['required']).toBeTruthy();

    // Set email to something
    email.setValue('test');
    errors = email.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['email']).toBeTruthy();

    // Set email to something correct
    email.setValue('test@example.com');
    errors = email.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['email']).toBeFalsy();
  });
});
