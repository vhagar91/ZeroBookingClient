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
  UPDATE_LISTING_ADDRESS = '[Listing] UPDATE ADDRESS',
  UPDATE_LISTING_ADDRESS_SUCCESS = '[Listing] UPDATE ADDRESS SUCCESS',
  UPDATE_LISTING_TERMS_SUCCESS = '[Listing] UPDATE TERMS SUCCESS',
  UPDATE_LISTING_DESCRIPTION_SUCCESS = '[Listing] UPDATE DESCRIPTION SUCCESS',
  UPDATE_LISTING_PRICES = '[Listing] UPDATE PRICES',
  UPDATE_LISTING_PRICES_SUCCESS = '[Listing] UPDATE PRICES SUCCESS',
  GET_LISTING_GALLERY = '[Listing] GET LISTING GALLERY',
  GET_LISTING_GALLERY_SUCCESS = '[Listing] GET LISTING GALLERY SUCCESS'
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
export class ActionUpdateAddress implements Action {
  constructor(public payload: any) {}
  readonly type = ListingActionTypes.UPDATE_LISTING_ADDRESS;
}
export class ActionUpdateAddressSuccess implements Action {
  constructor(public payload: any) {}
  readonly type = ListingActionTypes.UPDATE_LISTING_ADDRESS_SUCCESS;
}
export class ActionUpdatePrices implements Action {
  constructor(public payload: any) {}
  readonly type = ListingActionTypes.UPDATE_LISTING_PRICES;
}
export class ActionUpdatePricesSuccess implements Action {
  constructor(public payload: any) {}
  readonly type = ListingActionTypes.UPDATE_LISTING_PRICES_SUCCESS;
}
export class ActionGetListingGallery implements Action {
  constructor(public payload: any) {}
  readonly type = ListingActionTypes.GET_LISTING_GALLERY;
}
export class ActionGetListingGallerySuccess implements Action {
  constructor(public payload: any) {}
  readonly type = ListingActionTypes.GET_LISTING_GALLERY_SUCCESS;
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
  | ActionUpdateAddress
  | ActionUpdateAddressSuccess
  | ActionUpdatePrices
  | ActionUpdatePricesSuccess
  | ActionSearchFailListings
  | ActionGetListingGallery
  | ActionGetListingGallerySuccess;
