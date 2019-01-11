import { ListingActions } from '@app/modules/admin/listing/reducer/listing.actions';
import { ListingsListState } from '@app/modules/admin/listing/state/listings';
import { ListingActionTypes } from '@app/modules/admin/listing/reducer/listing.actions';
import { PictureListing } from '@app/model/pictureListing';

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
    case ListingActionTypes.GET_LISTING_GALLERY_SUCCESS:
      return {
        ...state,
        selected: {
          ...state.selected,
          gallery: action.payload.gallery
        }
      };
    case ListingActionTypes.UPDATE_LISTING_SUCCESS:
      return {
        ...state,
        selected: {
          ...state.selected,
          publicName: action.payload.publicName,
          nickname: action.payload.nickname,
          accommodates: action.payload.accommodates,
          bedrooms: action.payload.bedrooms,
          beds: action.payload.beds,
          checkInTime: action.payload.checkInTime,
          checkOutTime: action.payload.checkOutTime,
          propertyType: action.payload.propertyType,
          roomType: action.payload.roomType
        }
      };
    case ListingActionTypes.DELETE_LISTING_PICTURE_SUCCESS:
      return {
        ...state,
        selected: {
          ...state.selected,
          gallery: state.selected.gallery.filter(picture => {
            if (picture.id !== action.payload.payload.pk) return picture; // return all the items not matching the action.id
          })
        }
      };
    case ListingActionTypes.UPDATE_LISTING_PICTURE_SUCCESS:
      return {
        ...state,
        selected: {
          ...state.selected,
          gallery: state.selected.gallery.map(Picture => {
            // Only call sub reducer if the incoming actions id matches
            if (Picture.id === action.payload.id) {
              return action.payload;
            }

            return {
              ...Picture,
              is_portrait: false
            };
          })
        }
      };
    default:
      return state;
  }
}
