import { UsersActions } from '@app/admin/users/reducer/users.actions';
import { UserListState } from '@app/admin/users/state/users';
import { UserActionTypes } from '@app/admin/users/reducer/users.actions';

export const initialState: UserListState = {
  users: null,
  page: 1,
  total: null
};

export function usersReducer(
  state: UserListState = initialState,
  action: UsersActions
): UserListState {
  switch (action.type) {
    case UserActionTypes.SEARCH:
      return state;
    case UserActionTypes.SEARCH_SUCCESS:
      return {
        ...state,
        users: action.payload.users,
        page: state.page + 1,
        total: action.payload.total
      };
    case UserActionTypes.SEARCH_FAIL:
      return state;
    default:
      return state;
  }
}
