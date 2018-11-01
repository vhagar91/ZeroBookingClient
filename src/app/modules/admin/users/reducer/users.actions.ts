import { Action } from '@ngrx/store';

export enum UserActionTypes {
  SEARCH = '[Users] Search',
  SEARCH_SUCCESS = '[Users] Search Success',
  SEARCH_FAIL = '[Users] Search Fail',
  AddUser = '[Users] Add User',
  AddUserSuccess = '[Users] Add User Success'
}

export class ActionSearchUsers implements Action {
  constructor(public payload: any) {}
  readonly type = UserActionTypes.SEARCH;
}
export class ActionSearchSuccessUsers implements Action {
  constructor(public payload: any) {}
  readonly type = UserActionTypes.SEARCH_SUCCESS;
}
export class ActionSearchFailUsers implements Action {
  constructor(public payload: any) {}
  readonly type = UserActionTypes.SEARCH_FAIL;
}
export class ActionAddUser implements Action {
  constructor(public payload: any) {}
  readonly type = UserActionTypes.AddUser;
}
export class ActionAddUserSuccess implements Action {
  constructor(public payload: any) {}
  readonly type = UserActionTypes.AddUserSuccess;
}
export type UsersActions =
  | ActionSearchUsers
  | ActionSearchSuccessUsers
  | ActionAddUser
  | ActionAddUserSuccess
  | ActionSearchFailUsers;
