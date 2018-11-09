import { Component, HostBinding, OnInit } from '@angular/core';
import browser from 'browser-detect';
import { OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import {
  ActionAuthLogin,
  ActionAuthLogout,
  routeAnimations,
  AppState
} from '../../../core/index';
import { environment as env } from '../../../../environments/environment';

import {
  selectSettings,
  SettingsState,
  ActionSettingsPersist,
  ActionSettingsChangeLanguage,
  ActionSettingsChangeAnimationsPageDisabled
} from '../../../settings/index';
import { OverlayContainer } from '@angular/cdk/overlay';

@Component({
  selector: 'zerofee-app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  animations: [routeAnimations]
})
export class MainComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject<void>();
  @HostBinding('class')
  componentCssClass;
  isProd = env.production;
  envName = env.envName;
  version = env.versions.app;
  year = new Date().getFullYear();
  logo = require('../../../../assets/logo.png');
  languages = ['en', 'de', 'sk', 'fr', 'es', 'pt-br'];
  navigation = [{ link: './features', label: 'zerofee-app.menu.features' }];
  navigationSideMenu = [
    ...this.navigation,
    { link: 'settings', label: 'zerofee-app.menu.settings' }
  ];

  settings: SettingsState;
  isAuthenticated: boolean;
  isHeaderSticky: true;

  constructor(
    private store: Store<AppState>,
    public overlayContainer: OverlayContainer
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
      });
  }
  ngOnInit(): void {
    this.subscribeToSettings();
    this.setTheme();
  }
  private setTheme() {
    this.componentCssClass = 'default-theme';
    const classList = this.overlayContainer.getContainerElement().classList;
    const toRemove = Array.from(classList).filter((item: string) =>
      item.includes('-theme')
    );
    if (toRemove.length) {
      classList.remove(...toRemove);
    }
    classList.add('default-theme');
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
}
