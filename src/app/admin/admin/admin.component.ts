import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { ActivationEnd, NavigationEnd, Router } from '@angular/router';
import { environment as env } from '@env/environment';
import { TranslateService } from '@ngx-translate/core';
import {
  AnimationsService,
  LocalStorageService,
  routeAnimations,
  selectAuth,
  TitleService
} from '@app/core';
import { Subject } from 'rxjs';
import { OverlayContainer } from '@angular/cdk/overlay';
import browser from 'browser-detect';
import {
  ActionSettingsChangeAnimationsPageDisabled,
  NIGHT_MODE_THEME,
  selectSettings,
  SettingsState
} from '@app/settings';
import { select, Store } from '@ngrx/store';
import { takeUntil } from 'rxjs/operators';

import { AppState } from '@app/core';

@Component({
  selector: 'zerofee-app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  animations: [routeAnimations]
})
export class AdminComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject<void>();

  @HostBinding('class')
  componentCssClass;
  version = env.versions.app;
  logo = require('../../../assets/logo.png');
  navigationSideMenu = [
    { link: './features', label: 'zerofee-app.menu.features' }
  ];
  mainMenu = {
    Users: {
      'anticon anticon-user': {
        Users: './users',
        Roles: './roles',
        Permissions: './permission'
      }
    },
    Listings: {
      'anticon anticon-home': {
        Listings: './listings',
        Reservations: './reservations',
        Bookings: './bookings'
      }
    }
  };
  settings: SettingsState;
  isAuthenticated: boolean;

  constructor(
    public overlayContainer: OverlayContainer,
    private store: Store<AppState>,
    private router: Router,
    private titleService: TitleService,
    private animationService: AnimationsService,
    private translate: TranslateService,
    private storageService: LocalStorageService
  ) {}

  private static isIEorEdgeOrSafari() {
    return ['ie', 'edge', 'safari'].includes(browser().name);
  }

  ngOnInit(): void {
    this.translate.setDefaultLang('en');
    this.subscribeToSettings();
    this.subscribeToIsAuthenticated();
    this.subscribeToRouterEvents();
    this.storageService.testLocalStorage();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
  private subscribeToIsAuthenticated() {
    this.store
      .pipe(
        select(selectAuth),
        takeUntil(this.unsubscribe$)
      )
      .subscribe(auth => (this.isAuthenticated = auth.isAuthenticated));
  }

  private subscribeToSettings() {
    if (AdminComponent.isIEorEdgeOrSafari()) {
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
        this.setTheme(settings);
        this.setLanguage(settings);
        this.animationService.updateRouteAnimationType(
          settings.pageAnimations,
          settings.elementsAnimations
        );
      });
  }

  private setTheme(settings: SettingsState) {
    const { theme, autoNightMode } = settings;
    const hours = new Date().getHours();
    const effectiveTheme = (autoNightMode && (hours >= 20 || hours <= 6)
      ? NIGHT_MODE_THEME
      : theme
    ).toLowerCase();
    this.componentCssClass = 'black-theme';
    const classList = this.overlayContainer.getContainerElement().classList;
    const toRemove = Array.from(classList).filter((item: string) =>
      item.includes('-theme')
    );
    if (toRemove.length) {
      classList.remove(...toRemove);
    }
    classList.add(effectiveTheme);
  }
  private setLanguage(settings: SettingsState) {
    const { language } = settings;
    if (language) {
      this.translate.use(language);
    }
  }
  private subscribeToRouterEvents() {
    this.router.events.pipe(takeUntil(this.unsubscribe$)).subscribe(event => {
      if (event instanceof ActivationEnd) {
        this.titleService.setTitle(event.snapshot);
      }
    });
  }
}
