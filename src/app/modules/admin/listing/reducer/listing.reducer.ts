import { ListingActions } from '@app/modules/admin/listing/reducer/listing.actions';
import { ListingsListState } from '@app/modules/admin/listing/state/listings';
import { ListingActionTypes } from '@app/modules/admin/listing/reducer/listing.actions';

export const initialState: ListingsListState = {
  listings: null,
  page: 1,
  total: null
};

export function listingsReducer(
  state: ListingsListState = initialState,
  action: ListingActions
): ListingsListState {
  switch (action.type) {
    case ListingActionTypes.SEARCH:
      return {
        ...state,
        listings: null,
        page: null,
        total: null
      };
    case ListingActionTypes.SEARCH_SUCCESS:
      return {
        ...state,
        listings: action.payload.results,
        page: state.page + 1,
        total: action.payload.count
      };
    case ListingActionTypes.SEARCH_FAIL:
      return state;
    default:
      return state;
  }
}
