import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap, tap } from 'rxjs/operators';
import {
  ActionAuthLogin,
  ActionAuthLogout,
  AuthActionTypes,
  LogInFailure,
  LogInSuccess
} from './auth.actions';
import { Observable } from 'rxjs';
import { AuthService } from '@app/core/auth/auth.service';
import { UsersService } from '@app/admin/users/service/users.service';
import {
  ActionSearchSuccessUsers,
  ActionSearchUsers,
  UserActionTypes
} from '@app/admin/users/reducer/users.actions';

@Injectable()
export class UsersEffects {
  returnUrl: string;
  constructor(
    private actions$: Actions<Action>,
    private router: Router,
    private usersService: UsersService
  ) {}

  @Effect()
  searchUsers = this.actions$.pipe(
    ofType<ActionSearchUsers>(UserActionTypes.SEARCH),
    switchMap(action =>
      // call the service
      this.usersService.getUsers(action.payload.pageIndex).pipe(
        // return a Success action when everything went OK
        map(payload => {
          return new ActionSearchSuccessUsers({
            users: payload.results,
            total: payload.count
          });
        })
      )
    )
  );
}
