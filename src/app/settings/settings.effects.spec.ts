import { AnimationsService, LocalStorageService } from '@app/core';
import { Actions, getEffectsMetadata } from '@ngrx/effects';
import { cold } from 'jasmine-marbles';
import { EMPTY } from 'rxjs';
import { ActionSettingsPersist } from './settings.actions';
import { SettingsEffects, SETTINGS_KEY } from './settings.effects';
import { SettingsState } from './settings.model';
import { CurrencyService } from '@app/core/currency-exchange/currency.service';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { UsersService } from '@app/modules/admin/users/service/users.service';
import { provideMockActions } from '@ngrx/effects/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('SettingsEffects', () => {
  let localStorageService: jasmine.SpyObj<LocalStorageService>;
  let animationsService: jasmine.SpyObj<AnimationsService>;
  let currencyService: CurrencyService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({}), HttpClientTestingModule],
      providers: [CurrencyService, HttpClientTestingModule]
    });
    localStorageService = jasmine.createSpyObj('LocalStorageService', [
      'setItem'
    ]);
    animationsService = jasmine.createSpyObj('AnimationsService', [
      'updateRouteAnimationType'
    ]);
    currencyService = TestBed.get(CurrencyService);
  });

  describe('persistSettings', () => {
    it('should not dispatch any action', () => {
      const actions = new Actions(EMPTY);
      const effect = new SettingsEffects(
        actions,
        localStorageService,
        animationsService,
        currencyService
      );
      const metadata = getEffectsMetadata(effect);

      expect(metadata.persistSettings).toEqual({ dispatch: false });
    });
  });

  it('should call methods on AnimationsService and LocalStorageService for PERSIST action', () => {
    const settings: SettingsState = {
      language: 'en',
      currency: 'USD',
      rates: { USD: 1.24 },
      pageAnimations: true,
      elementsAnimations: true,
      theme: 'default',
      autoNightMode: false,
      stickyHeader: false,
      pageAnimationsDisabled: true
    };
    const persistAction = new ActionSettingsPersist({ settings: settings });
    const source = cold('a', { a: persistAction });
    const actions = new Actions(source);
    const effect = new SettingsEffects(
      actions,
      localStorageService,
      animationsService,
      currencyService
    );

    effect.persistSettings.subscribe(() => {
      expect(localStorageService.setItem).toHaveBeenCalledWith(
        SETTINGS_KEY,
        persistAction.payload.settings
      );
      expect(animationsService.updateRouteAnimationType).toHaveBeenCalledWith(
        true,
        true
      );
    });
  });
});
