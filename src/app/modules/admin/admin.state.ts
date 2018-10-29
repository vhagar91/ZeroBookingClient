import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector
} from '@ngrx/store';
import { AppState } from '../../core/core.state';
import { UserListState } from '@app/modules/admin/users/state/users';
import { usersReducer } from '@app/modules/admin/users/reducer/users.reducer';

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
