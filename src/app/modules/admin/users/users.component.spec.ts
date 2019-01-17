import {
  async,
  ComponentFixture,
  fakeAsync,
  TestBed
} from '@angular/core/testing';

import { UsersComponent } from './users.component';
import {
  MatDialog,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatTableModule
} from '@angular/material';
import { MockStore, TestingModule } from '@testing/utils';
import { CoreModule } from '@app/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { By } from '@angular/platform-browser';
import { ActionSearchUsers } from '@app/modules/admin/users/reducer/users.actions';
import { UserListState } from '@app/modules/admin/users/state/users';
import { State, Store } from '@ngrx/store';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;
  let store: MockStore<State<any>>;
  let dispatchSpy: jasmine.Spy;
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
    store = TestBed.get(Store);
    dispatchSpy = spyOn(store, 'dispatch').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should dispatch an action to load users when created', () => {
    const action = new ActionSearchUsers({
      pageIndex: 1,
      pageSize: 20,
      filters: { username: '', email_filter: '' }
    });

    expect(dispatchSpy).toHaveBeenCalledTimes(1);
    expect(dispatchSpy).toHaveBeenCalledWith(action);
  });
  describe('#UserMatMenu', () => {
    beforeEach(() => {
      const compiledDom = fixture.debugElement.nativeElement;
      compiledDom.querySelector('#trigger-menu').click();
      fixture.detectChanges();
    });
    it('should have a menu with 2 options (native click)', () => {
      expect(
        fixture.debugElement.queryAll(By.css('.mat-menu-item')).length
      ).toEqual(2);
    });
    it('should call addNew() when Add button is clicked', () => {
      spyOn(component, 'addNew');
      fixture.debugElement
        .query(By.css('#addNew'))
        .triggerEventHandler('click', {});
      expect(component.addNew).toHaveBeenCalled();
    });
    it('should call openFilters() when Filters button is clicked', () => {
      spyOn(component, 'openFilters');
      fixture.debugElement
        .query(By.css('#filters'))
        .triggerEventHandler('click', {});
      expect(component.openFilters).toHaveBeenCalled();
    });
  });
});
