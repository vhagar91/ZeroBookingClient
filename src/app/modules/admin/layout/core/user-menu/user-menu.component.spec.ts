import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMenuComponent } from './user-menu.component';
import { ActionAuthLogout, CoreModule } from '@app/core';
import { MatExpansionModule, MatMenuModule } from '@angular/material';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { MockStore, TestingModule } from '@testing/utils';
import { FlexLayoutModule } from '@angular/flex-layout';
import { By } from '@angular/platform-browser';
import { ActionAddUser } from '@app/modules/admin/users/reducer/users.actions';
import { State, Store } from '@ngrx/store';
import { UserListState } from '@app/modules/admin/users/state/users';
import { AuthState } from '@app/core/auth/auth.models';

describe('UserMenuComponent', () => {
  let component: UserMenuComponent;
  let fixture: ComponentFixture<UserMenuComponent>;
  let store: MockStore<State<AuthState>>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TestingModule,
        MatMenuModule,
        MatExpansionModule,
        FlexLayoutModule,
        PerfectScrollbarModule
      ],
      declarations: [UserMenuComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserMenuComponent);
    store = TestBed.get(Store);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call editProfile() when Filters button is clicked', () => {
    spyOn(component, 'editProfile');
    fixture.debugElement
      .query(By.css('#edit'))
      .triggerEventHandler('click', {});
    expect(component.editProfile).toHaveBeenCalled();
  });
  it('should call onLogoutClick() when Filters button is clicked', () => {
    spyOn(component, 'onLogoutClick');
    fixture.debugElement
      .query(By.css('#logout'))
      .triggerEventHandler('click', {});
    expect(component.onLogoutClick).toHaveBeenCalled();
  });
  it('should dispatch an action to LogOut User on click', () => {
    const action = new ActionAuthLogout();
    const dispatchSpy = spyOn(store, 'dispatch').and.callThrough();
    component.onLogoutClick();
    expect(dispatchSpy).toHaveBeenCalledTimes(1);
    expect(dispatchSpy).toHaveBeenCalledWith(action);
  });
  it('should have a menu with 4 options', () => {
    expect(
      fixture.debugElement.queryAll(By.css('.mat-list-item')).length
    ).toEqual(4);
  });
  it('should handle document click', () => {
    component.isOpen = true;
    document.dispatchEvent(new MouseEvent('click'));
    expect(component.isOpen).toBe(false);
  });
});
