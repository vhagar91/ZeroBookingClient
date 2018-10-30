import {
  ProfileActionTypes,
  ActionGetProfile,
  ActionGetProfileSuccess,
  ActionGetProfileFail,
  ActionUpdateProfile
} from '@app/modules/admin/profile/reducer/profile.actions';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { ProfileService } from '@app/modules/admin/profile/service/profile.service';
import {
  ActionSearchUsers,
  UserActionTypes
} from '@app/modules/admin/users/reducer/users.actions';

@Injectable()
export class ProfileEffects {
  returnUrl: string;
  constructor(
    private actions$: Actions<Action>,
    private router: Router,
    private profileService: ProfileService
  ) {}
  @Effect()
  getProfile = this.actions$.pipe(
    ofType<ActionGetProfile>(ProfileActionTypes.GETPROFILE),
    tap(action => console.log(action)),
    map(action => action),
    switchMap(action =>
      this.profileService.getProfile(action.payload.userId).pipe(
        map(profile => new ActionGetProfileSuccess(profile)),
        catchError(err => of(new ActionGetProfileFail(err)))
      )
    )
  );
  @Effect()
  putProfile = this.actions$.pipe(
    ofType<ActionUpdateProfile>(ProfileActionTypes.UPDATE),
    tap(action => console.log(action)),
    map(action => action),
    switchMap(action =>
      this.profileService
        .updateProfile(action.payload.userId, action.payload.profile)
        .pipe(
          map(profile => new ActionGetProfileSuccess(profile)),
          catchError(err => of(new ActionGetProfileFail(err)))
        )
    )
  );

  @Effect()
  putProfilePicture = this.actions$.pipe(
    ofType<ActionGetProfile>(ProfileActionTypes.UPDATEPROFILEPIC),
    tap(action => console.log(action)),
    map(action => action),
    switchMap(action =>
      this.profileService
        .updateProfilePicture(action.payload.picId, action.payload.file)
        .pipe(
          map(profile => new ActionGetProfile(action.payload)),
          catchError(err => of(new ActionGetProfileFail(err)))
        )
    )
  );
}
