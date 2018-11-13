import { Action } from '@ngrx/store';

export enum ListingActionTypes {
  SEARCH = '[Listing] Search',
  SEARCH_SUCCESS = '[Listing] Search Success',
  SEARCH_FAIL = '[Listing] Search Fail'
}

export class ActionSearchListings implements Action {
  constructor(public payload: any) {}
  readonly type = ListingActionTypes.SEARCH;
}
export class ActionSearchSuccessListings implements Action {
  constructor(public payload: any) {}
  readonly type = ListingActionTypes.SEARCH_SUCCESS;
}
export class ActionSearchFailListings implements Action {
  constructor(public payload: any) {}
  readonly type = ListingActionTypes.SEARCH_FAIL;
}

export type ListingActions =
  | ActionSearchListings
  | ActionSearchSuccessListings
  | ActionSearchFailListings;
