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
  ListingActionTypes,
  ActionSelectSuccessListing,
  ActionUpdateDescriptionSuccess,
  ActionUpdateListing,
  ActionUpdateListingDescription,
  ActionUpdateTerms,
  ActionUpdateTermsSuccess,
  ActionUpdateAddress,
  ActionUpdateAddressSuccess,
  ActionUpdatePrices,
  ActionUpdatePricesSuccess,
  ActionGetListingGallerySuccess,
  ActionGetListingGallery,
  ActionUpdateGeneralSuccess,
  ActionUpdateListingPicture,
  ActionUpdateListingPictureSuccess,
  ActionDeleteListingPictureSuccess
} from '@app/modules/admin/listing/reducer/listing.actions';

@Injectable()
export class ListingEffects {
  returnUrl: string;
  constructor(
    private actions$: Actions<Action>,
    private listingService: ListingsService
  ) {}
  @Effect()
  searchListings = this.actions$.pipe(
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
          map(listing => new ActionSearchSuccessListings(listing)),
          catchError(err => of(new ActionSearchFailListings(err)))
        )
    )
  );
  @Effect()
  selectListing = this.actions$.pipe(
    ofType<ActionSearchListings>(ListingActionTypes.SELECT_LISTING),
    tap(action => console.log(action)),
    map(action => action),
    switchMap(action =>
      this.listingService.getListing(action.payload.id).pipe(
        map(listing => new ActionSelectSuccessListing(listing)),
        catchError(err => of(new ActionSearchFailListings(err)))
      )
    )
  );
  @Effect()
  updateGeneralListing = this.actions$.pipe(
    ofType<ActionUpdateListing>(ListingActionTypes.UPDATE_LISTING),
    tap(action => console.log(action)),
    map(action => action),
    switchMap(action =>
      this.listingService
        .updateGeneral(action.payload.pk, action.payload.data)
        .pipe(
          map(listing => new ActionUpdateGeneralSuccess(listing)),
          catchError(err => of(new ActionSearchFailListings(err)))
        )
    )
  );
  @Effect()
  updateDescriptionListing = this.actions$.pipe(
    ofType<ActionUpdateListingDescription>(
      ListingActionTypes.UPDATE_LISTING_DESCRIPTION
    ),
    tap(action => console.log(action)),
    map(action => action),
    switchMap(action =>
      this.listingService
        .updateGeneral(action.payload.pk, action.payload.data)
        .pipe(
          map(listing => new ActionUpdateDescriptionSuccess(listing)),
          catchError(err => of(new ActionSearchFailListings(err)))
        )
    )
  );
  @Effect()
  updateTermsListing = this.actions$.pipe(
    ofType<ActionUpdateTerms>(ListingActionTypes.UPDATE_LISTING_TERMS),
    tap(action => console.log(action)),
    map(action => action),
    switchMap(action =>
      this.listingService
        .updateTerms(action.payload.pk, action.payload.data)
        .pipe(
          map(listing => new ActionUpdateTermsSuccess(listing)),
          catchError(err => of(new ActionSearchFailListings(err)))
        )
    )
  );
  @Effect()
  updateAddressListing = this.actions$.pipe(
    ofType<ActionUpdateAddress>(ListingActionTypes.UPDATE_LISTING_ADDRESS),
    tap(action => console.log(action)),
    map(action => action),
    switchMap(action =>
      this.listingService
        .updateAddress(action.payload.pk, action.payload.data)
        .pipe(
          map(listing => new ActionUpdateAddressSuccess(listing)),
          catchError(err => of(new ActionSearchFailListings(err)))
        )
    )
  );
  @Effect()
  updatePricesListing = this.actions$.pipe(
    ofType<ActionUpdatePrices>(ListingActionTypes.UPDATE_LISTING_PRICES),
    map(action => action),
    switchMap(action =>
      this.listingService
        .updatePrices(action.payload.pk, action.payload.data)
        .pipe(
          map(listing => new ActionUpdatePricesSuccess(listing)),
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
  @Effect()
  getGallery = this.actions$.pipe(
    ofType<ActionGetListingGallery>(ListingActionTypes.GET_LISTING_GALLERY),
    map(action => action),
    switchMap(action =>
      this.listingService.getGallery(action.payload).pipe(
        map(gallery => new ActionGetListingGallerySuccess(gallery)),
        catchError(err => of(new ActionSearchFailListings(err)))
      )
    )
  );
  @Effect()
  makePicturePortrait = this.actions$.pipe(
    ofType<ActionUpdateListingPicture>(
      ListingActionTypes.UPDATE_LISTING_PICTURE
    ),
    map(action => action),
    switchMap(action =>
      this.listingService.updatePicture(action.payload).pipe(
        map(picture => new ActionUpdateListingPictureSuccess(picture)),
        catchError(err => of(new ActionSearchFailListings(err)))
      )
    )
  );
  @Effect()
  deletePicture = this.actions$.pipe(
    ofType<ActionUpdateListingPicture>(
      ListingActionTypes.DELETE_LISTING_PICTURE
    ),
    map(action => action),
    switchMap(action =>
      this.listingService.deletePicture(action.payload).pipe(
        map(picture => new ActionDeleteListingPictureSuccess(action)),
        catchError(err => of(new ActionSearchFailListings(err)))
      )
    )
  );
}
