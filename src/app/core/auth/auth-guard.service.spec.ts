import { TestBed } from '@angular/core/testing';
import { AppState } from '@app/core';
import { Store, StoreModule } from '@ngrx/store';
import { MockStore, provideMockStore } from '@testing/utils';
import { AuthGuardService } from './auth-guard.service';
import { AuthState } from './auth.models';
import { AuthService } from '@app/core/auth/auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AuthGuardService', () => {
  let authGuardService: AuthGuardService;
  let store: MockStore<AppState>;
  let state: AppState;
  const authState: AuthState = {
    isAuthenticated: true,
    user: null,
    errorMessage: null
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
      providers: [
        AuthService,
        HttpClientTestingModule,
        AuthGuardService,
        provideMockStore()
      ]
    });
    authGuardService = TestBed.get(AuthGuardService);
    store = TestBed.get(Store);
    state = createState(authState);
    store.setState(state);
  });

  it('should be created', () => {
    expect(authGuardService).toBeTruthy();
  });

  it('should return isAuthenticated from authState', () => {
    authGuardService.canActivate().subscribe(canActivate => {
      expect(canActivate).toBe(state.auth.isAuthenticated);
    });
  });
});

function createState(authState: AuthState) {
  return {
    auth: authState
  } as AppState;
}
