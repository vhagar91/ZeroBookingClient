import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap, tap } from 'rxjs/operators';

import { LocalStorageService } from '../local-storage/local-storage.service';

import {
  ActionAuthLogin,
  ActionAuthLogout,
  AuthActionTypes,
  LogInFailure,
  LogInSuccess
} from './auth.actions';
import { Observable } from 'rxjs';
import { AuthService } from '@app/core/auth/auth.service';

export const AUTH_KEY = 'AUTH';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions<Action>,
    private localStorageService: LocalStorageService,
    private router: Router,
    private authService: AuthService
  ) {}

  @Effect()
  login = this.actions$.pipe(
    // filter out the actions, except '[Customers Page] Get'
    ofType<ActionAuthLogin>(AuthActionTypes.LOGIN),
    switchMap(action =>
      // call the service
      this.authService.login(action.payload).pipe(
        // return a Success action when everything went OK
        map(
          access_token => {
            return new LogInSuccess({
              token: access_token.token.access,
              user: access_token.user,
              refresh: access_token.token.refresh
            });
          },
          error => {
            return new LogInFailure({ error: error });
          }
        )
      )
    )
  );

  @Effect({ dispatch: false })
  LogInSuccess: Observable<any> = this.actions$.pipe(
    ofType(AuthActionTypes.LOGIN_SUCCESS),
    tap(access_token => {
      this.localStorageService.setItem(
        'currentUser',
        access_token.payload.user
      );
      this.localStorageService.setItem('Token', access_token.payload.token);
      this.localStorageService.setItem('Refresh', access_token.payload.refresh);
      this.localStorageService.setItem(AUTH_KEY, { isAuthenticated: true });
      this.router.navigateByUrl('/');
    })
  );

  @Effect({ dispatch: false })
  logout = this.actions$.pipe(
    ofType<ActionAuthLogout>(AuthActionTypes.LOGOUT),
    tap(() => {
      this.localStorageService.setItem(AUTH_KEY, { isAuthenticated: false });
      this.router.navigate(['home']);
    })
  );

  @Effect({ dispatch: false })
  LogInFailure: Observable<any> = this.actions$.pipe(
    ofType(AuthActionTypes.LOGIN_FAILURE)
  );
}
