import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListingComponent } from './listing.component';
import { MockStore, TestingModule } from '@testing/utils';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { CoreModule } from '@app/core';
import {
  MatExpansionModule,
  MatMenuModule,
  MatPaginatorModule,
  MatProgressBarModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ActionSearchUsers } from '@app/modules/admin/users/reducer/users.actions';
import { State, Store } from '@ngrx/store';
import { ActionSearchListings } from '@app/modules/admin/listing/reducer/listing.actions';

describe('ListingComponent', () => {
  let component: ListingComponent;
  let fixture: ComponentFixture<ListingComponent>;
  let store: MockStore<State<any>>;
  let dispatchSpy: jasmine.Spy;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CoreModule,
        TestingModule,
        MatMenuModule,
        MatExpansionModule,
        FlexLayoutModule,
        PerfectScrollbarModule,
        MatProgressBarModule,
        MatPaginatorModule
      ],
      declarations: [ListingComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListingComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);
    dispatchSpy = spyOn(store, 'dispatch').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should dispatch an action to load listings when created', () => {
    const action = new ActionSearchListings({
      pageIndex: 1,
      pageSize: 20
    });

    expect(dispatchSpy).toHaveBeenCalledTimes(1);
    expect(dispatchSpy).toHaveBeenCalledWith(action);
  });
});
