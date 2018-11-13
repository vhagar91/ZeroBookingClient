import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector
} from '@ngrx/store';
import { AppState } from '../../core/core.state';
import { UserListState } from '@app/modules/admin/users/state/users';
import { usersReducer } from '@app/modules/admin/users/reducer/users.reducer';
import { ProfileState } from '@app/modules/admin/profile/state/profile.state';
import { profileReducer } from '@app/modules/admin/profile/reducer/profile.reducer';
import { ListingsListState } from '@app/modules/admin/listing/state/listings';
import { listingsReducer } from '@app/modules/admin/listing/reducer/listing.reducer';

export interface AdminState {
  users: UserListState;
  profile: ProfileState;
  listings: ListingsListState;
}
export interface State extends AppState {
  admin: AdminState;
}

export const adminReducers: ActionReducerMap<AdminState> = {
  users: usersReducer,
  profile: profileReducer,
  listings: listingsReducer
};

export const selectAdminState = createFeatureSelector<State, AdminState>(
  'admin'
);

export const getAdminState = createSelector(
  selectAdminState,
  (state: AdminState) => state
);
export const getUserListState = createSelector(
  getAdminState,
  (state: AdminState) => state.users
);
export const getListingListState = createSelector(
  getAdminState,
  (state: AdminState) => state.listings
);

export const getProfileState = createSelector(
  getAdminState,
  (state: AdminState) => state.profile
);
