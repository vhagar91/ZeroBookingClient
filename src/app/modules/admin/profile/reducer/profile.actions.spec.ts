import {
  ActionUpdateProfile,
  ActionGetProfile,
  ActionGetProfileSuccess,
  ActionGetProfileFail,
  ActionUpdateProfilePicture
} from '@app/modules/admin/profile/reducer/profile.actions';
import { ProfileActionTypes } from '@app/modules/admin/profile/reducer/profile.actions';

describe('Profile Actions', () => {
  it('should create GetProfile action', () => {
    const action = new ActionGetProfile('');
    expect(action.type).toEqual(ProfileActionTypes.GETPROFILE);
  });
  it('should create ActionUpdateProfile action', () => {
    const action = new ActionUpdateProfile('');
    expect(action.type).toEqual(ProfileActionTypes.UPDATE);
  });
  it('should create ActionGetProfileSuccess action', () => {
    const action = new ActionGetProfileSuccess('');
    expect(action.type).toEqual(ProfileActionTypes.SUCCESS);
  });
  it('should create ActionGetProfileFail action', () => {
    const action = new ActionGetProfileFail('');
    expect(action.type).toEqual(ProfileActionTypes.FAIL);
  });
  it('should create ActionUpdateProfilePicture action', () => {
    const action = new ActionUpdateProfilePicture('');
    expect(action.type).toEqual(ProfileActionTypes.UPDATEPROFILEPIC);
  });
});
