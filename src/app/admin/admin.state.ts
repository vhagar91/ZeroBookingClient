import {
  ActionReducerMap,
  MetaReducer,
  createFeatureSelector,
  createSelector
} from '@ngrx/store';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { storeFreeze } from 'ngrx-store-freeze';
import { AppState } from '@app/core/core.state';
import { authReducer } from '@app/core/auth/auth.reducer';
import { RouterStateUrl } from '@app/core/router/router.state';
import { AuthState } from '@app/core/auth/auth.models';
import { UserListState } from '@app/admin/users/state/users';
import { usersReducer } from '@app/admin/users/reducer/users.reducer';

export interface AdminState {
  users: UserListState;
}
export interface State extends AppState {
  admin: AdminState;
}

export const adminReducers: ActionReducerMap<AdminState> = {
  users: usersReducer
};

export const selectAdminState = createFeatureSelector<State, AdminState>(
  'admin'
);

export const getAdminState = createSelector(
  selectAdminState,
  (state: AdminState) => state
);
