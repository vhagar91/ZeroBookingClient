import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { ListingsService } from '@app/modules/admin/listing/service/listings.service';
import {
  ActionSearchListings,
  ActionSearchFailListings,
  ActionSearchSuccessListings,
  ListingActionTypes
} from '@app/modules/admin/listing/reducer/listing.actions';

@Injectable()
export class ListingEffects {
  returnUrl: string;
  constructor(
    private actions$: Actions<Action>,
    private listingService: ListingsService
  ) {}
  @Effect()
  searchUsers = this.actions$.pipe(
    // filter out the actions, except '[Customers Page] Get'
    ofType<ActionSearchListings>(ListingActionTypes.SEARCH),
    tap(action => console.log(action)),
    map(action => action),
    switchMap(action =>
      this.listingService
        .getListings(
          action.payload.pageIndex,
          action.payload.pageSize,
          action.payload.filters
        )
        .pipe(
          map(users => new ActionSearchSuccessListings(users)),
          catchError(err => of(new ActionSearchFailListings(err)))
        )
    )
  );

  @Effect({ dispatch: false })
  SearchFailure: Observable<any> = this.actions$.pipe(
    ofType(ListingActionTypes.SEARCH_FAIL),
    tap(error => {
      switch (error.payload.status) {
        case 401: {
          const newpayload = {
            pageIndex: 1
          };
          return of(new ActionSearchListings(newpayload));
        }
      }
    })
  );
}
