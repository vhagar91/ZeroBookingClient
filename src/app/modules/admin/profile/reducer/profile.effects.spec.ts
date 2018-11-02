import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../../../core/index';

import { provideMockActions } from '@ngrx/effects/testing';
import { Action, Store, StoreModule } from '@ngrx/store';
import { Observable } from 'rxjs';

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
import { ProfileEffects } from '@app/modules/admin/profile/reducer/profile.effects';

describe('UsersEffects', () => {
  const actions$: Observable<Action> = null;
  let profileEffecs: ProfileEffects;
  let localStorageService: any;
  let router: Router;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let store: MockStore<AdminState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({}), HttpClientTestingModule],
      providers: [
        ProfileEffects,
        ProfileService,
        provideMockActions(() => actions$),
        {
          provide: LocalStorageService,
          useValue: jasmine.createSpyObj('LocalStorageService', ['setItem'])
        },
        {
          provide: Router,
          useValue: jasmine.createSpyObj('Router', ['navigateByUrl'])
        }
      ]
    });
    localStorageService = TestBed.get(LocalStorageService);
    profileEffecs = TestBed.get(ProfileEffects);
    router = TestBed.get(Router);
    // Inject the http service and test controller for each test
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    store = TestBed.get(Store);
  });

  it('should be created', () => {
    expect(profileEffecs).toBeTruthy();
  });
});
