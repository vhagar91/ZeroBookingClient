import { Component, OnInit } from '@angular/core';
import browser from 'browser-detect';
import { OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Store, select } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import {
  ActionAuthLogin,
  ActionAuthLogout,
  AnimationsService,
  routeAnimations,
  AppState,
  LocalStorageService
} from '@app/core';
import { environment as env } from '@env/environment';

import {
  selectSettings,
  SettingsState,
  ActionSettingsPersist,
  ActionSettingsChangeLanguage,
  ActionSettingsChangeAnimationsPageDisabled
} from '@app/settings';

@Component({
  selector: 'zerofee-app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  animations: [routeAnimations]
})
export class MainComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject<void>();

  isProd = env.production;
  envName = env.envName;
  version = env.versions.app;
  year = new Date().getFullYear();
  logo = require('../../../assets/logo.png');
  languages = ['en', 'de', 'sk', 'fr', 'es', 'pt-br'];
  navigation = [{ link: './features', label: 'zerofee-app.menu.features' }];
  navigationSideMenu = [
    ...this.navigation,
    { link: 'settings', label: 'zerofee-app.menu.settings' }
  ];

  settings: SettingsState;
  isAuthenticated: boolean;
  isHeaderSticky: boolean;

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private animationService: AnimationsService,
    private translate: TranslateService,
    private storageService: LocalStorageService
  ) {}

  private static isIEorEdgeOrSafari() {
    return ['ie', 'edge', 'safari'].includes(browser().name);
  }
  private subscribeToSettings() {
    if (MainComponent.isIEorEdgeOrSafari()) {
      this.store.dispatch(
        new ActionSettingsChangeAnimationsPageDisabled({
          pageAnimationsDisabled: true
        })
      );
    }
    this.store
      .pipe(
        select(selectSettings),
        takeUntil(this.unsubscribe$)
      )
      .subscribe(settings => {
        this.settings = settings;
        this.setStickyHeader(settings);
      });
  }
  ngOnInit(): void {
    this.subscribeToSettings();
    this.storageService.testLocalStorage();
    this.translate.setDefaultLang('en');
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onLoginClick() {
    const payload = {
      email: 'layout@example.coms',
      password: 'root'
    };
    this.store.dispatch(new ActionAuthLogin(payload));
  }

  onLogoutClick() {
    this.store.dispatch(new ActionAuthLogout());
  }

  onLanguageSelect({ value: language }) {
    this.store.dispatch(new ActionSettingsChangeLanguage({ language }));
    this.store.dispatch(new ActionSettingsPersist({ settings: this.settings }));
  }
  private setStickyHeader(settings: SettingsState) {
    this.isHeaderSticky = settings.stickyHeader;
  }
}
