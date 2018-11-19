import { Action } from '@ngrx/store';

export enum ListingActionTypes {
  SEARCH = '[Listing] Search',
  SEARCH_SUCCESS = '[Listing] Search Success',
  SEARCH_FAIL = '[Listing] Search Fail',
  SELECT_LISTING = '[Listing] Select',
  SELECT_SUCCESS_LISTING = '[Listing] Select Success',
  UPDATE_LISTING = '[Listing] UPDATE LISTING'
}

export class ActionSearchListings implements Action {
  constructor(public payload: any) {}
  readonly type = ListingActionTypes.SEARCH;
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
export type ListingActions =
  | ActionUpdateListing
  | ActionSearchListings
  | ActionSearchSuccessListings
  | ActionSelectSuccessListing
  | ActionSelectListing
  | ActionSearchFailListings;
