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
import { of } from 'rxjs';
import { ProfileService } from '@app/modules/admin/profile/service/profile.service';

@Injectable()
export class ProfileEffects {
  returnUrl: string;
  constructor(
    private actions$: Actions<Action>,
    private profileService: ProfileService
  ) {}
  @Effect()
  getProfile = this.actions$.pipe(
    ofType<ActionGetProfile>(ProfileActionTypes.GETPROFILE),
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
