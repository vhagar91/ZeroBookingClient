import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import {
  ActionAuthLogin,
  ActionAuthLogout,
  AuthActionTypes,
  LogInFailure,
  LogInSuccess
} from './auth.actions';
import { Observable, of } from 'rxjs';
import { UsersService } from '@app/admin/users/service/users.service';
import {
  ActionSearchFailUsers,
  ActionSearchSuccessUsers,
  ActionSearchUsers,
  UserActionTypes
} from '@app/admin/users/reducer/users.actions';
import { HttpErrorResponse } from '@angular/common/http';

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
    // filter out the actions, except '[Customers Page] Get'
    ofType<ActionSearchUsers>(UserActionTypes.SEARCH),
    tap(action => console.log(action)),
    map(action => action),
    switchMap(action =>
      this.usersService.getUsers(action.payload.pageIndex).pipe(
        map(users => new ActionSearchSuccessUsers(users)),
        catchError(err => of(new ActionSearchFailUsers(err)))
      )
    )
  );

  @Effect({ dispatch: false })
  SearchFailure: Observable<any> = this.actions$.pipe(
    ofType(UserActionTypes.SEARCH_FAIL),
    tap(error => {
      switch (error.payload.status) {
        case 401: {
          const newpayload = {
            pageIndex: 1
          };
          return new ActionSearchSuccessUsers(newpayload);
        }
      }
    })
  );
}
