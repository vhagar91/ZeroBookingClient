import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap, tap } from 'rxjs/operators';
import { LocalStorageService, AnimationsService } from '@app/core';
import {
  ActionSettingsChangeCurrency,
  ActionSettingsChangeCurrencySuccess,
  ActionSettingsPersist,
  SettingsActionTypes
} from './settings.actions';
import { CurrencyService } from '@app/core/currency-exchange/currency.service';

export const SETTINGS_KEY = 'SETTINGS';

@Injectable()
export class SettingsEffects {
  constructor(
    private actions$: Actions<Action>,
    private localStorageService: LocalStorageService,
    private animationsService: AnimationsService,
    private changeCurrencyService: CurrencyService
  ) {}

  @Effect({ dispatch: false })
  persistSettings = this.actions$.pipe(
    ofType<ActionSettingsPersist>(SettingsActionTypes.PERSIST),
    tap(action => {
      const { settings } = action.payload;
      const { pageAnimations, elementsAnimations } = settings;
      this.localStorageService.setItem(SETTINGS_KEY, settings);
      this.animationsService.updateRouteAnimationType(
        pageAnimations,
        elementsAnimations
      );
    })
  );
  @Effect()
  changeCurrency = this.actions$.pipe(
    ofType<ActionSettingsChangeCurrency>(SettingsActionTypes.CHANGE_CURRENCY),
    tap(action => console.log(action)),
    map(action => action),
    switchMap(action =>
      this.changeCurrencyService
        .Exchange(action.payload.from, action.payload.to)
        .pipe(map(resp => new ActionSettingsChangeCurrencySuccess(resp)))
    )
  );
}
