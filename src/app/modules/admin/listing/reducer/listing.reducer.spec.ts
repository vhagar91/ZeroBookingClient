import {
  initialState,
  listingsReducer
} from '@app/modules/admin/listing/reducer/listing.reducer';

describe('Listings Reducer', () => {
  it('should return default state', () => {
    const action = {} as any;
    const state = listingsReducer(undefined, action);

    expect(state).toBe(initialState);
  });
});
