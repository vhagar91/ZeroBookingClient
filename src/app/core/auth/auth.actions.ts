import { Action } from '@ngrx/store';

export enum AuthActionTypes {
  LOGIN = '[Auth] Login',
  LOGOUT = '[Auth] Logout',
  LOGIN_SUCCESS = '[Auth] Success',
  LOGIN_FAILURE = '[Auth] Failure'
}

export class ActionAuthLogin implements Action {
  constructor(public payload: any) {}

  readonly type = AuthActionTypes.LOGIN;
}

export class LogInSuccess implements Action {
  readonly type = AuthActionTypes.LOGIN_SUCCESS;
  constructor(public payload: any) {}
}

export class ActionAuthLogout implements Action {
  readonly type = AuthActionTypes.LOGOUT;
}
export class LogInFailure implements Action {
  readonly type = AuthActionTypes.LOGIN_FAILURE;
  constructor(public payload: any) {}
}

export type AuthActions =
  | ActionAuthLogin
  | ActionAuthLogout
  | LogInSuccess
  | LogInFailure;
