import { Action } from '@ngrx/store';

export enum UserActionTypes {
  SEARCH = '[Users] Search',
  SEARCH_SUCCESS = '[Users] Search Success'
}

export class ActionSearchUsers implements Action {
  constructor(public payload: any) {}
  readonly type = UserActionTypes.SEARCH;
}
export class ActionSearchSuccessUsers implements Action {
  constructor(public payload: any) {}
  readonly type = UserActionTypes.SEARCH_SUCCESS;
}

export type UsersActions = ActionSearchUsers | ActionSearchSuccessUsers;
