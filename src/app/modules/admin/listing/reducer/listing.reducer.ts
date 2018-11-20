import { ListingActions } from '@app/modules/admin/listing/reducer/listing.actions';
import { ListingsListState } from '@app/modules/admin/listing/state/listings';
import { ListingActionTypes } from '@app/modules/admin/listing/reducer/listing.actions';

export const initialState: ListingsListState = {
  listings: null,
  page: 1,
  total: null,
  selected: null
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
    case ListingActionTypes.UPDATE_LISTING_DESCRIPTION_SUCCESS:
      return {
        ...state,
        selected: {
          ...state.selected,
          description: action.payload.description
        }
      };
    case ListingActionTypes.SEARCH_FAIL:
      return state;
    case ListingActionTypes.SELECT_SUCCESS_LISTING:
      return {
        ...state,
        selected: action.payload
      };
    case ListingActionTypes.UPDATE_LISTING_TERMS_SUCCESS:
      return {
        ...state,
        selected: {
          ...state.selected,
          minNights: action.payload.min,
          maxNights: action.payload.max
        }
      };
    case ListingActionTypes.UPDATE_LISTING_ADDRESS_SUCCESS:
      return {
        ...state,
        selected: {
          ...state.selected,
          address: action.payload
        }
      };
    case ListingActionTypes.UPDATE_LISTING_PRICES_SUCCESS:
      return {
        ...state,
        selected: {
          ...state.selected,
          price: action.payload
        }
      };
    default:
      return state;
  }
}
