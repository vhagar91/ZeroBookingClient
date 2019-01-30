import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../../../core/index';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action, Store, StoreModule } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { MockStore } from '../../../../../testing/utils';
import { UsersEffects } from 'app/modules/admin/users/reducer/users.effects';
import { UsersService } from '../service/users.service';
import { AdminState } from '../../admin.state';
import { ProfileService } from '@app/modules/admin/profile/service/profile.service';
import { ProfileState } from '@app/modules/admin/profile/state/profile.state';
import { UserListState } from '@app/modules/admin/users/state/users';
import { Actions, getEffectsMetadata } from '@ngrx/effects';
import {
  ActionGetProfile,
  ActionGetProfileSuccess,
  ActionUpdateProfile,
  ActionUpdateProfilePicture
} from '@app/modules/admin/profile/reducer/profile.actions';
import { cold } from 'jasmine-marbles';
import { ProfileEffects } from '@app/modules/admin/profile/reducer/profile.effects';
import {
  ActionAddUser,
  ActionAddUserSuccess,
  ActionSearchSuccessUsers,
  ActionSearchUsers
} from '@app/modules/admin/users/reducer/users.actions';

describe('UsersEffects', () => {
  const actions$: Observable<Action> = null;
  let userEffects: UsersEffects;
  let userService: any;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let store: MockStore<AdminState>;
  let mockState: UserListState;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({}), HttpClientTestingModule],
      providers: [
        UsersEffects,
        provideMockActions(() => actions$),
        {
          provide: UsersService,
          useValue: jasmine.createSpyObj('UserService', ['getUsers', 'addUser'])
        }
      ]
    });
    userEffects = TestBed.get(UsersEffects);
    // Inject the http service and test controller for each test
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    store = TestBed.get(Store);
    userService = TestBed.get(UsersService);
    mockState = {
      users: [],
      page: 1,
      total: 20
    };
  });

  it('should be created', () => {
    expect(userEffects).toBeTruthy();
  });
  // Checking Meta Data
  it('searchUsers should dispatch an action', () => {
    const metadata = getEffectsMetadata(userEffects);

    expect(metadata.searchUsers).toEqual({ dispatch: true });
  });
  it('SearchFailure should not dispatch an action', () => {
    const metadata = getEffectsMetadata(userEffects);

    expect(metadata.SearchFailure).toEqual({ dispatch: false });
  });
  it('addUser should dispatch an action', () => {
    const metadata = getEffectsMetadata(userEffects);

    expect(metadata.addUser).toEqual({ dispatch: true });
  });
  // Success Calls
  it('should emit ActionSearchSuccessUsers Action on SearhUsers success', () => {
    const payload = { page: 1, pageSize: 20 };
    const retrieveAction1 = new ActionSearchUsers({
      payload
    });

    const successAction = new ActionSearchSuccessUsers({
      users: [],
      page: 1,
      total: 20
    });
    const values = {
      a: retrieveAction1,
      s: successAction
    };
    const source = cold('--a', values);
    /* a is mapped into s and debounced by 20ms, b and c get discarded by distinct until changed */
    const expected = cold('--s', values);
    const actions = new Actions(source);
    userService.getUsers.and.returnValue(of(mockState));
    const effects = new UsersEffects(actions, userService);

    expect(effects.searchUsers).toBeObservable(expected);
    expect(userService.getUsers).toHaveBeenCalled();
  });
  it('should emit ActionAddUserSuccess Action on AddUser success', () => {
    const payload = { user: null };
    const retrieveAction1 = new ActionAddUser({
      payload
    });
    const mockStateUser = {
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
    };
    const successAction = new ActionAddUserSuccess(mockStateUser);
    const values = {
      a: retrieveAction1,
      s: successAction
    };
    const source = cold('--a', values);
    /* a is mapped into s and debounced by 20ms, b and c get discarded by distinct until changed */
    const expected = cold('--s', values);
    const actions = new Actions(source);
    userService.addUser.and.returnValue(of(mockStateUser));
    const effects = new UsersEffects(actions, userService);

    expect(effects.addUser).toBeObservable(expected);
    expect(userService.addUser).toHaveBeenCalled();
  });
});
