import { async, TestBed, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action, Store, StoreModule } from '@ngrx/store';
import { Observable, of, ReplaySubject, throwError } from 'rxjs';

import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { MockStore } from '../../../../../testing/utils';
import { AdminState } from '../../admin.state';
import { ProfileService } from '@app/modules/admin/profile/service/profile.service';
import { ProfileEffects } from '@app/modules/admin/profile/reducer/profile.effects';
import { getEffectsMetadata } from '@ngrx/effects';
import {
  ActionGetProfile,
  ActionGetProfileFail,
  ActionGetProfileSuccess,
  ActionUpdateProfile,
  ActionUpdateProfilePicture
} from '@app/modules/admin/profile/reducer/profile.actions';
import { ProfileState } from '@app/modules/admin/profile/state/profile.state';
import { cold } from 'jasmine-marbles';
import { getProfile } from '@app/core/app.config';

describe('ProfileEffects', () => {
  const actions$: Observable<Action> = null;
  let profileEffecs: ProfileEffects;
  let profileService: any;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let store: MockStore<AdminState>;
  let mockState: ProfileState;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({}), HttpClientTestingModule],
      providers: [
        ProfileEffects,
        provideMockActions(() => actions$),
        {
          provide: ProfileService,
          useValue: jasmine.createSpyObj('ProfileService', [
            'getProfile',
            'updateProfile',
            'updateProfilePicture'
          ])
        }
      ]
    });
  });
  beforeEach(() => {
    profileEffecs = TestBed.get(ProfileEffects);
    // Inject the http service and test controller for each test
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    profileService = TestBed.get(ProfileService);

    store = TestBed.get(Store);
    mockState = {
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
  });
  it('should be created', () => {
    expect(profileEffecs).toBeTruthy();
  });
  // Checking Meta Data
  it('getProfile should dispatch an action', () => {
    const metadata = getEffectsMetadata(profileEffecs);

    expect(metadata.getProfile).toEqual({ dispatch: true });
  });
  it('putProfile should dispatch an action', () => {
    const metadata = getEffectsMetadata(profileEffecs);

    expect(metadata.putProfile).toEqual({ dispatch: true });
  });
  it('putProfilePicture should dispatch an action', () => {
    const metadata = getEffectsMetadata(profileEffecs);

    expect(metadata.putProfilePicture).toEqual({ dispatch: true });
  });

  // Success Calls
  it('should emit getProfileSuccess Action on GetProfile success', () => {
    const payload = { userID: 1 };
    const retrieveAction1 = new ActionGetProfile({
      payload
    });

    const successAction = new ActionGetProfileSuccess({
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
    });
    const values = {
      a: retrieveAction1,
      s: successAction
    };
    const source = cold('--a', values);
    /* a is mapped into s and debounced by 20ms, b and c get discarded by distinct until changed */
    const expected = cold('--s', values);
    const actions = new Actions(source);
    profileService.getProfile.and.returnValue(of(mockState.profile));
    const effects = new ProfileEffects(actions, profileService);

    expect(effects.getProfile).toBeObservable(expected);
    expect(profileService.getProfile).toHaveBeenCalled();
  });
  it('should emit getProfileSuccess Action on UpdateProfile success', () => {
    const payload = { userID: 1 };
    const retrieveAction1 = new ActionUpdateProfile({
      payload
    });

    const successAction = new ActionGetProfileSuccess({
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
    });
    const values = {
      a: retrieveAction1,
      s: successAction
    };
    const source = cold('--a', values);
    /* a is mapped into s and debounced by 20ms, b and c get discarded by distinct until changed */
    const expected = cold('--s', values);
    const actions = new Actions(source);
    profileService.updateProfile.and.returnValue(of(mockState.profile));
    const effects = new ProfileEffects(actions, profileService);

    expect(effects.putProfile).toBeObservable(expected);
    expect(profileService.updateProfile).toHaveBeenCalled();
  });
  it('should emit getProfileSuccess Action on UpdateProfilePicture success', () => {
    const payload = { userID: 1 };
    const retrieveAction1 = new ActionUpdateProfilePicture({
      payload
    });

    const successAction = new ActionGetProfile({
      payload
    });
    const values = {
      a: retrieveAction1,
      s: successAction
    };
    const source = cold('--a', values);
    /* a is mapped into s and debounced by 20ms, b and c get discarded by distinct until changed */
    const expected = cold('--s', values);
    const actions = new Actions(source);
    profileService.updateProfilePicture.and.returnValue(of(payload));
    const effects = new ProfileEffects(actions, profileService);

    expect(effects.putProfilePicture).toBeObservable(expected);
    expect(profileService.updateProfilePicture).toHaveBeenCalled();
  });

  //  Fail Calls
  it('should emit ActionGetProfileFail on error', () => {
    const payload = { userID: 1 };
    const retrieveAction = new ActionGetProfile({
      payload
    });
    const error = 'ERROR';
    const errorAction = new ActionGetProfileFail(error);
    const values = {
      a: retrieveAction,
      e: errorAction
    };
    const source = cold('--a', values);
    const expected = cold('--e', values);
    const actions = new Actions(source);

    profileService.getProfile.and.returnValue(throwError(error));

    const effects = new ProfileEffects(actions, profileService);
    expect(effects.getProfile).toBeObservable(expected);
  });
});
