import { createFeatureSelector, createSelector } from '@ngrx/store';

import { UserListState } from '@app/admin/users/state/users';
import { AdminState } from '@app/admin/admin.state';
import { AppState } from '@app/core';

export const selectUsersState = createFeatureSelector<
  AdminState,
  UserListState
>('users');

export const getState = createSelector(
  selectUsersState,
  (state: UserListState) => state
);

export const getUsers = createSelector(
  selectUsersState,
  (state: UserListState) => state.users
);
