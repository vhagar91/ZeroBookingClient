import { Action } from '@ngrx/store';

export enum ProfileActionTypes {
  GETPROFILE = '[Profile] Get',
  UPDATEPROFILE = '[Profile] Update',
  SUCCESS = '[Profile] Success',
  FAIL = '[Profile] FAIL'
}

export class ActionGetProfile implements Action {
  constructor(public payload: any) {}
  readonly type = ProfileActionTypes.GETPROFILE;
}
export class ActionGetProfileSuccess implements Action {
  constructor(public payload: any) {}
  readonly type = ProfileActionTypes.SUCCESS;
}
export class ActionGetProfileFail implements Action {
  constructor(public payload: any) {}
  readonly type = ProfileActionTypes.FAIL;
}

export type ProfileActions =
  | ActionGetProfile
  | ActionGetProfileSuccess
  | ActionGetProfileFail;
