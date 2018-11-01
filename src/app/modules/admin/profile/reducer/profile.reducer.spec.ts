import {
  initialState,
  profileReducer
} from '@app/modules/admin/profile/reducer/profile.reducer';
describe('ProfileReducer', () => {
  it('should return default state', () => {
    const action = {} as any;
    const state = profileReducer(undefined, action);

    expect(state).toBe(initialState);
  });
});
