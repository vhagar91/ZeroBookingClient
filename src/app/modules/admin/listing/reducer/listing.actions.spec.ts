import {
  ActionSearchSuccessListings,
  ActionSearchListings,
  ListingActionTypes,
  ActionUpdateListing,
  ActionSelectListing,
  ActionSelectSuccessListing,
  ActionUpdateTerms,
  ActionUpdateListingPicture,
  ActionUpdateListingPictureSuccess
} from '@app/modules/admin/listing/reducer/listing.actions';

describe('Listings Actions', () => {
  it('should create ListingsSearch action', () => {
    const action = new ActionSearchListings('');
    expect(action.type).toEqual(ListingActionTypes.SEARCH);
  });
  it('should create ActionSearchSuccessListings action', () => {
    const action = new ActionSearchSuccessListings('');
    expect(action.type).toEqual(ListingActionTypes.SEARCH_SUCCESS);
  });
  it('should create ActiongetListing action', () => {
    const action = new ActionSelectListing('');
    expect(action.type).toEqual(ListingActionTypes.SELECT_LISTING);
  });
  it('should create ActionUpdateLisiting action', () => {
    const action = new ActionUpdateListing('');
    expect(action.type).toEqual(ListingActionTypes.UPDATE_LISTING);
  });
  it('should create ActionUpdateLisitingSuccess action', () => {
    const action = new ActionSelectSuccessListing('');
    expect(action.type).toEqual(ListingActionTypes.SELECT_SUCCESS_LISTING);
  });
  it('should create ActionUpdateTerms action', () => {
    const action = new ActionUpdateTerms('');
    expect(action.type).toEqual(ListingActionTypes.UPDATE_LISTING_TERMS);
  });
  it('should create ActionSelectListing action', () => {
    const action = new ActionSelectListing('');
    expect(action.type).toEqual(ListingActionTypes.SELECT_LISTING);
  });
  it('should create ActionUpdateListingPicture action', () => {
    const action = new ActionUpdateListingPicture('');
    expect(action.type).toEqual(ListingActionTypes.UPDATE_LISTING_PICTURE);
  });
  it('should create ActionUpdateListingPictureSuccess action', () => {
    const action = new ActionUpdateListingPictureSuccess('');
    expect(action.type).toEqual(
      ListingActionTypes.UPDATE_LISTING_PICTURE_SUCCESS
    );
  });
});
