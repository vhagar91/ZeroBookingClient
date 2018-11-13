import {
  ActionSearchSuccessListings,
  ActionSearchListings,
  ListingActionTypes
} from '@app/modules/admin/listing/reducer/listing.actions';

describe('Users Actions', () => {
  it('should create UsersSearch action', () => {
    const action = new ActionSearchListings('');
    expect(action.type).toEqual(ListingActionTypes.SEARCH);
  });
  it('should create ActionSearchSuccessUsers action', () => {
    const action = new ActionSearchSuccessListings('');
    expect(action.type).toEqual(ListingActionTypes.SEARCH_SUCCESS);
  });
});
