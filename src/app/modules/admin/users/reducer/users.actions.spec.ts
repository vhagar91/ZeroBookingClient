import {
  ActionSearchSuccessUsers,
  ActionSearchUsers,
  UsersActions
} from 'app/modules/admin/users/reducer/users.actions';
import { UserActionTypes } from 'app/modules/admin/users/reducer/users.actions';

describe('Users Actions', () => {
  it('should create UsersSearch action', () => {
    const action = new ActionSearchUsers('');
    expect(action.type).toEqual(UserActionTypes.SEARCH);
  });
  it('should create UsersSuccess action', () => {
    const action = new ActionSearchSuccessUsers('');
    expect(action.type).toEqual(UserActionTypes.SEARCH_SUCCESS);
  });
});
