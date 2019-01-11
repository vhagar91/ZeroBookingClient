import { Action, UPDATE } from '@ngrx/store';

export enum ListingActionTypes {
  SEARCH = '[Listing] Search',
  SEARCH_SUCCESS = '[Listing] Search Success',
  SEARCH_FAIL = '[Listing] Search Fail',

  SELECT_LISTING = '[Listing] Select',
  SELECT_SUCCESS_LISTING = '[Listing] Select Success',

  UPDATE_LISTING = '[Listing] UPDATE GENERAL',
  UPDATE_LISTING_SUCCESS = '[Listing] UPDATE GENERAL SUCCESS',

  UPDATE_LISTING_DESCRIPTION = '[Listing] UPDATE DESCRIPTION',
  UPDATE_LISTING_DESCRIPTION_SUCCESS = '[Listing] UPDATE DESCRIPTION SUCCESS',

  UPDATE_LISTING_TERMS = '[Listing] UPDATE TERMS',
  UPDATE_LISTING_TERMS_SUCCESS = '[Listing] UPDATE TERMS SUCCESS',

  UPDATE_LISTING_ADDRESS = '[Listing] UPDATE ADDRESS',
  UPDATE_LISTING_ADDRESS_SUCCESS = '[Listing] UPDATE ADDRESS SUCCESS',

  UPDATE_LISTING_PRICES = '[Listing] UPDATE PRICES',
  UPDATE_LISTING_PRICES_SUCCESS = '[Listing] UPDATE PRICES SUCCESS',

  GET_LISTING_GALLERY = '[Listing] GET LISTING GALLERY',
  GET_LISTING_GALLERY_SUCCESS = '[Listing] GET LISTING GALLERY SUCCESS',

  UPDATE_LISTING_PICTURE = '[Listing] UPDATE LISTING PICTURE',
  UPDATE_LISTING_PICTURE_SUCCESS = '[Listing] UPDATE LISTING PICTURE SUCCESS',
  DELETE_LISTING_PICTURE = '[Listing] DELETE LISTING PICTURE ',
  DELETE_LISTING_PICTURE_SUCCESS = '[Listing] DELETE LISTING PICTURE SUCCESS'
}

export class ActionSearchListings implements Action {
  constructor(public payload: any) {}
  readonly type = ListingActionTypes.SEARCH;
}
export class ActionUpdateGeneralSuccess implements Action {
  constructor(public payload: any) {}
  readonly type = ListingActionTypes.UPDATE_LISTING_SUCCESS;
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
export class ActionUpdateListingPicture implements Action {
  constructor(public payload: any) {}
  readonly type = ListingActionTypes.UPDATE_LISTING_PICTURE;
}
export class ActionUpdateListingPictureSuccess implements Action {
  constructor(public payload: any) {}
  readonly type = ListingActionTypes.UPDATE_LISTING_PICTURE_SUCCESS;
}
export class ActionDeleteListingPicture implements Action {
  constructor(public payload: any) {}
  readonly type = ListingActionTypes.DELETE_LISTING_PICTURE;
}
export class ActionDeleteListingPictureSuccess implements Action {
  constructor(public payload: any) {}
  readonly type = ListingActionTypes.DELETE_LISTING_PICTURE_SUCCESS;
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
  | ActionUpdateGeneralSuccess
  | ActionGetListingGallerySuccess
  | ActionUpdateListingPicture
  | ActionUpdateListingPictureSuccess
  | ActionDeleteListingPicture
  | ActionDeleteListingPictureSuccess;
