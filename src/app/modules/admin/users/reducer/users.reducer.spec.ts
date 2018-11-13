import {
  initialState,
  usersReducer
} from 'app/modules/admin/users/reducer/users.reducer';

describe('UsersReducer', () => {
  it('should return default state', () => {
    const action = {} as any;
    const state = usersReducer(undefined, action);

    expect(state).toBe(initialState);
  });
});
