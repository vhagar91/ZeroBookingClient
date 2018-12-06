import { Component, HostBinding, OnInit, ViewChild } from '@angular/core';
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
  ActionSettingsChangeAnimationsPageDisabled,
  ActionSettingsChangeCurrency
} from '@app/settings';
import { OverlayContainer } from '@angular/cdk/overlay';
import { NavigationEnd, Router } from '@angular/router';
import { PerfectScrollbarComponent } from 'ngx-perfect-scrollbar';

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
  version = env.versions.app;
  logo = require('../../../../assets/logo.png');
  languages = ['en', 'de', 'sk', 'fr', 'es', 'pt-br'];
  currencies = ['USD', 'EUR'];
  navigation = [{ link: './features', label: 'zerofee-app.menu.features' }];
  navigationSideMenu = [
    ...this.navigation,
    { link: 'settings', label: 'zerofee-app.menu.settings' }
  ];
  @ViewChild(PerfectScrollbarComponent)
  componentRef?: PerfectScrollbarComponent;
  settings: SettingsState;
  isAuthenticated: boolean;
  isHeaderSticky: true;

  constructor(
    private store: Store<AppState>,
    public overlayContainer: OverlayContainer,
    private router: Router
  ) {}

  private static isIEorEdgeOrSafari() {
    return ['ie', 'edge', 'safari'].includes(browser().name);
  }
  public scrollToTop(): void {
    if (this.componentRef && this.componentRef.directiveRef) {
      this.componentRef.directiveRef.scrollToTop();
    }
  }
  private subscribeToRouterEvents() {
    this.router.events.pipe(takeUntil(this.unsubscribe$)).subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.scrollToTop();
      }
    });
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
    this.subscribeToRouterEvents();
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
  onCurrencySelect({ value: currency }) {
    const payload = {
      from: currency,
      to: this.currencies
    };
    this.store.dispatch(new ActionSettingsChangeCurrency(payload));
    this.store.dispatch(new ActionSettingsPersist({ settings: this.settings }));
  }
}
