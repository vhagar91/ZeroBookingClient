import { ActionAuthLogin, ActionAuthLogout } from './auth.actions';
import {
  initialState,
  usersReducer
} from '@app/admin/users/reducer/users.reducer';
import { UserListState } from '@app/admin/users/state/users';
describe('UsersReducer', () => {
  it('should return default state', () => {
    const action = {} as any;
    const state = usersReducer(undefined, action);

    expect(state).toBe(initialState);
  });
});
