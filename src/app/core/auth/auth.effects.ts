import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import { LocalStorageService } from '../local-storage/local-storage.service';

import {
  ActionAuthLogin,
  ActionAuthLogout,
  AuthActionTypes,
  LogInFailure,
  LogInSuccess
} from './auth.actions';
import { Observable, of } from 'rxjs';
import { AuthService } from '@app/core/auth/auth.service';

export const AUTH_KEY = 'AUTH';

@Injectable()
export class AuthEffects {
  returnUrl: string;
  constructor(
    private actions$: Actions<Action>,
    private localStorageService: LocalStorageService,
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}

  @Effect()
  login = this.actions$.pipe(
    // filter out the actions, except '[Customers Page] Get'
    ofType<ActionAuthLogin>(AuthActionTypes.LOGIN),
    tap(action => console.log(action)),
    map(action => action),
    switchMap(campaign =>
      this.authService.login(campaign.payload).pipe(
        map(credentials => new LogInSuccess(credentials)),
        catchError(err => of(new LogInFailure(err)))
      )
    )
  );

  @Effect({ dispatch: false })
  LogInSuccess: Observable<any> = this.actions$.pipe(
    ofType(AuthActionTypes.LOGIN_SUCCESS),
    tap(access_token => {
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
      this.localStorageService.setItem(
        'Token',
        access_token.payload.token.access
      );
      this.localStorageService.setItem(
        'Refresh',
        access_token.payload.token.refresh
      );
      this.localStorageService.setItem(AUTH_KEY, {
        isAuthenticated: true,
        user: {
          ...access_token.payload.user,
          access: access_token.payload.token.access,
          refresh: access_token.payload.token.refresh
        }
      });
      this.router.navigateByUrl(this.returnUrl);
    })
  );

  @Effect({ dispatch: false })
  logout = this.actions$.pipe(
    ofType<ActionAuthLogout>(AuthActionTypes.LOGOUT),
    tap(() => {
      this.localStorageService.setItem(AUTH_KEY, { isAuthenticated: false });
      this.router.navigate(['zeroapp']);
    })
  );

  @Effect({ dispatch: false })
  LogInFailure: Observable<any> = this.actions$.pipe(
    ofType(AuthActionTypes.LOGIN_FAILURE)
  );
}
