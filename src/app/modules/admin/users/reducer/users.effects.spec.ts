import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AppState, LocalStorageService } from '../../../../core/index';
import { EffectsMetadata, getEffectsMetadata } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action, Store, StoreModule } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthEffects, AUTH_KEY } from './auth.effects';
import { AuthState } from './auth.models';
import { AuthService } from '../../../../core/auth/auth.service';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { MockStore } from '../../../../../testing/utils';
import { UsersEffects } from 'app/modules/admin/users/reducer/users.effects';
import { UsersService } from '../service/users.service';
import { AdminState } from '../../admin.state';

describe('UsersEffects', () => {
  const actions$: Observable<Action> = null;
  let userEffects: UsersEffects;
  let localStorageService: any;
  let router: Router;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let store: MockStore<AdminState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({}), HttpClientTestingModule],
      providers: [
        UsersEffects,
        UsersService,
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
    userEffects = TestBed.get(UsersEffects);
    router = TestBed.get(Router);
    // Inject the http service and test controller for each test
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    store = TestBed.get(Store);
  });

  it('should be created', () => {
    expect(userEffects).toBeTruthy();
  });
});
