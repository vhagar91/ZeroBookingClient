import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PricesComponent } from './prices.component';
import { CoreModule } from '@app/core';
import { TestingModule, MockStore } from '@testing/utils';
import { By } from '@angular/platform-browser';
import { ActionUpdatePrices } from '../../reducer/listing.actions';
import { Store, State } from '@ngrx/store';
import { AdminState } from '@app/modules/admin/admin.state';

describe('PricesComponent', () => {
  let component: PricesComponent;
  let fixture: ComponentFixture<PricesComponent>;
  let store: MockStore<State<AdminState>>;
  let dispatchSpy: jasmine.Spy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CoreModule, TestingModule],
      declarations: [PricesComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PricesComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);
    dispatchSpy = spyOn(store, 'dispatch').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch an action ActionUpdatePrices', () => {
    const action = new ActionUpdatePrices({
      pk: null,
      data: {}
    });
    component.onSubmitPrices();
    expect(dispatchSpy).toHaveBeenCalledTimes(1);
    expect(dispatchSpy).toHaveBeenCalledWith(action);
  });
});
