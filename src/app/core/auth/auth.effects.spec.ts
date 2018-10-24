import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { AppState, LocalStorageService } from '@app/core';
import { EffectsMetadata, getEffectsMetadata } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action, Store, StoreModule } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthEffects, AUTH_KEY } from './auth.effects';
import { AuthState } from './auth.models';
import { AuthService } from '@app/core/auth/auth.service';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { MockStore, TestingModule } from '@testing/utils';
import { RouterTestingModule } from '@angular/router/testing';

describe('AuthEffects', () => {
  const actions$: Observable<Action> = null;
  let authEffect: AuthEffects;
  let metadata: EffectsMetadata<AuthEffects>;
  let localStorageService: any;
  let router: Router;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let store: MockStore<AppState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        AuthEffects,
        AuthService,
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
    authEffect = TestBed.get(AuthEffects);
    router = TestBed.get(Router);
    // Inject the http service and test controller for each test
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    store = TestBed.get(Store);
  });

  it('should be created', () => {
    expect(authEffect).toBeTruthy();
  });

  it('login should dispatch any action', () => {
    metadata = getEffectsMetadata(authEffect);
    expect(metadata.login).toEqual({ dispatch: true });
  });

  it('logout should not dispatch any action', () => {
    metadata = getEffectsMetadata(authEffect);
    expect(metadata.logout).toEqual({ dispatch: false });
  });

  it('should call setItem on LocalStorageService for login action', () => {
    const loginState: AuthState = {
      isAuthenticated: false,
      user: null,
      errorMessage: null
    };

    authEffect.login.subscribe(() => {
      expect(localStorageService.setItem).toHaveBeenCalledWith(
        AUTH_KEY,
        loginState
      );
    });
  });

  it('should call setItem on LocalStorageService for logout action and navigate to about', () => {
    const logoutState: AuthState = {
      isAuthenticated: false,
      user: null,
      errorMessage: null
    };

    authEffect.logout.subscribe(() => {
      expect(localStorageService.setItem).toHaveBeenCalledWith(
        AUTH_KEY,
        logoutState
      );
      expect(router.navigate).toHaveBeenCalledWith(['']);
    });
  });
});
function createState(authState: AuthState) {
  return {
    auth: authState
  } as AppState;
}
