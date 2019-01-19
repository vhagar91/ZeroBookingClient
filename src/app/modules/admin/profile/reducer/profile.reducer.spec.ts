import {
  initialState,
  profileReducer
} from '@app/modules/admin/profile/reducer/profile.reducer';
import { ActionGetProfileSuccess } from '@app/modules/admin/profile/reducer/profile.actions';
import { ProfileState } from '@app/modules/admin/profile/state/profile.state';
describe('ProfileReducer', () => {
  const TEST_INITIAL_STATE: ProfileState = {
    profile: {
      username: 'Antony',
      email: 'Antonio@uci.cu',
      first_name: 'lol',
      last_name: 'test',
      gender: 'm',
      picture: null,
      address: 'address test',
      city: 'testx',
      country: 'asd',
      about_me: 'asd'
    },
    error: null
  };
  it('should return default state', () => {
    const action = {} as any;
    const state = profileReducer(undefined, action);

    expect(state).toBe(initialState);
  });
  it('should get a profile', () => {
    const payload = {
      profile: {
        username: 'Pepe',
        email: 'Antonio@uci.cu',
        first_name: 'lol',
        last_name: 'test',
        gender: 'm',
        picture: null,
        address: 'address test',
        city: 'testx',
        country: 'asd',
        about_me: 'asd'
      },
      error: null
    };
    const action = new ActionGetProfileSuccess(payload.profile);
    const state = profileReducer(TEST_INITIAL_STATE, action);

    expect(state.profile).toBe(payload.profile);
  });
});
