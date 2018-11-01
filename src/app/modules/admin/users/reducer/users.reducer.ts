import { UsersActions } from 'app/modules/admin/users/reducer/users.actions';
import { UserListState } from '../state/users';
import { UserActionTypes } from 'app/modules/admin/users/reducer/users.actions';

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
      return {
        ...state,
        users: null,
        page: null,
        total: null
      };
    case UserActionTypes.SEARCH_SUCCESS:
      return {
        ...state,
        users: action.payload.results,
        page: state.page + 1,
        total: action.payload.count
      };
    case UserActionTypes.AddUserSuccess:
      return {
        ...state,
        users: [...state.users, action.payload],
        page: state.page,
        total: state.total + 1
      };
    case UserActionTypes.SEARCH_FAIL:
      return state;
    default:
      return state;
  }
}
