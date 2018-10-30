import { Action } from '@ngrx/store';

export enum ProfileActionTypes {
  GETPROFILE = '[Profile] Get',
  UPDATEPROFILEPIC = '[Profile] Update',
  SUCCESS = '[Profile] Success',
  FAIL = '[Profile] FAIL',
  UPDATE = '[Profile] UPDATE'
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
export class ActionUpdateProfilePicture implements Action {
  constructor(public payload: any) {}
  readonly type = ProfileActionTypes.UPDATEPROFILEPIC;
}
export class ActionUpdateProfile implements Action {
  constructor(public payload: any) {}
  readonly type = ProfileActionTypes.UPDATE;
}

export type ProfileActions =
  | ActionGetProfile
  | ActionGetProfileSuccess
  | ActionUpdateProfile
  | ActionGetProfileFail
  | ActionUpdateProfilePicture;
