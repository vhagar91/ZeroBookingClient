import { ActionAuthLogin, ActionAuthLogout } from './auth.actions';
import {
  initialState,
  usersReducer
} from 'app/modules/admin/users/reducer/users.reducer';
import { UserListState } from '../state/users';
describe('UsersReducer', () => {
  it('should return default state', () => {
    const action = {} as any;
    const state = usersReducer(undefined, action);

    expect(state).toBe(initialState);
  });
});
