import {
  ActionSearchSuccessUsers,
  ActionSearchUsers
} from 'app/modules/admin/users/reducer/users.actions';
import { UserActionTypes } from 'app/modules/admin/users/reducer/users.actions';
import {
  ActionAddUser,
  ActionAddUserSuccess,
  ActionSearchFailUsers
} from '@app/modules/admin/users/reducer/users.actions';

describe('Users Actions', () => {
  it('should create UsersSearch action', () => {
    const action = new ActionSearchUsers('');
    expect(action.type).toEqual(UserActionTypes.SEARCH);
  });
  it('should create ActionSearchSuccessUsers action', () => {
    const action = new ActionSearchSuccessUsers('');
    expect(action.type).toEqual(UserActionTypes.SEARCH_SUCCESS);
  });
  it('should create ActionAddUser action', () => {
    const action = new ActionAddUser('');
    expect(action.type).toEqual(UserActionTypes.AddUser);
  });
  it('should create ActionAddUserSuccess action', () => {
    const action = new ActionAddUserSuccess('');
    expect(action.type).toEqual(UserActionTypes.AddUserSuccess);
  });
  it('should create ActionSearchFailUsers action', () => {
    const action = new ActionSearchFailUsers('');
    expect(action.type).toEqual(UserActionTypes.SEARCH_FAIL);
  });
});
