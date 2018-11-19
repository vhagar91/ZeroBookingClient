import { Action } from '@ngrx/store';

export enum ListingActionTypes {
  SEARCH = '[Listing] Search',
  SEARCH_SUCCESS = '[Listing] Search Success',
  SEARCH_FAIL = '[Listing] Search Fail',
  SELECT_LISTING = '[Listing] Select',
  SELECT_SUCCESS_LISTING = '[Listing] Select Success',
  UPDATE_LISTING = '[Listing] UPDATE GENERAL',
  UPDATE_LISTING_DESCRIPTION = '[Listing] UPDATE DESCRIPTION',
  UPDATE_LISTING_TERMS = '[Listing] UPDATE TERMS',
  UPDATE_LISTING_TERMS_SUCCESS = '[Listing] UPDATE TERMS SUCCESS',
  UPDATE_LISTING_DESCRIPTION_SUCCESS = '[Listing] UPDATE DESCRIPTION SUCCESS'
}

export class ActionSearchListings implements Action {
  constructor(public payload: any) {}
  readonly type = ListingActionTypes.SEARCH;
}
export class ActionUpdateListingDescription implements Action {
  constructor(public payload: any) {}
  readonly type = ListingActionTypes.UPDATE_LISTING_DESCRIPTION;
}
export class ActionSearchSuccessListings implements Action {
  constructor(public payload: any) {}
  readonly type = ListingActionTypes.SEARCH_SUCCESS;
}
export class ActionSelectSuccessListing implements Action {
  constructor(public payload: any) {}
  readonly type = ListingActionTypes.SELECT_SUCCESS_LISTING;
}
export class ActionSearchFailListings implements Action {
  constructor(public payload: any) {}
  readonly type = ListingActionTypes.SEARCH_FAIL;
}
export class ActionSelectListing implements Action {
  constructor(public payload: any) {}
  readonly type = ListingActionTypes.SELECT_LISTING;
}
export class ActionUpdateListing implements Action {
  constructor(public payload: any) {}
  readonly type = ListingActionTypes.UPDATE_LISTING;
}
export class ActionUpdateDescriptionSuccess implements Action {
  constructor(public payload: any) {}
  readonly type = ListingActionTypes.UPDATE_LISTING_DESCRIPTION_SUCCESS;
}
export class ActionUpdateTermsSuccess implements Action {
  constructor(public payload: any) {}
  readonly type = ListingActionTypes.UPDATE_LISTING_TERMS_SUCCESS;
}
export class ActionUpdateTerms implements Action {
  constructor(public payload: any) {}
  readonly type = ListingActionTypes.UPDATE_LISTING_TERMS;
}
export type ListingActions =
  | ActionUpdateListing
  | ActionSearchListings
  | ActionSearchSuccessListings
  | ActionSelectSuccessListing
  | ActionSelectListing
  | ActionUpdateListingDescription
  | ActionUpdateDescriptionSuccess
  | ActionUpdateTerms
  | ActionUpdateTermsSuccess
  | ActionSearchFailListings;
