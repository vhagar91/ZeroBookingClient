import { ProfileActions } from '@app/modules/admin/profile/reducer/profile.actions';
import { ProfileState } from '@app/modules/admin/profile/state/profile.state';
import { ProfileActionTypes } from '@app/modules/admin/profile/reducer/profile.actions';

export const initialState: ProfileState = {
  profile: null,
  error: null
};

export function profileReducer(
  state: ProfileState = initialState,
  action: ProfileActions
): ProfileState {
  switch (action.type) {
    case ProfileActionTypes.GETPROFILE:
      return {
        ...state,
        profile: null,
        error: null
      };
    case ProfileActionTypes.SUCCESS:
      return {
        ...state,
        profile: action.payload,
        error: null
      };
    case ProfileActionTypes.FAIL:
      return state;
    default:
      return state;
  }
}
