import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment as env } from '@env/environment';
import { TranslateService } from '@ngx-translate/core';
import {
  AnimationsService,
  LocalStorageService,
  routeAnimations,
  selectAuth
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
import { AppConfig } from '@app/core/app.config';
import { User } from '@app/model/user';

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
  user: User;
  logo = require('../../../assets/logo.png');
  mainMenu = {
    Users: {
      Users: './users'
    }
  };
  settings: SettingsState;
  isAuthenticated: boolean;

  constructor(
    public overlayContainer: OverlayContainer,
    private store: Store<AppState>,
    private router: Router,
    private animationService: AnimationsService,
    private translate: TranslateService,
    private storageService: LocalStorageService
  ) {}

  private static isIEorEdgeOrSafari() {
    return ['ie', 'edge', 'safari'].includes(browser().name);
  }

  ngOnInit(): void {
    this.subscribeToSettings();
    this.subscribeToIsAuthenticated();
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
      .subscribe(auth => {
        this.isAuthenticated = auth.isAuthenticated;
        this.user = auth.user;
      });
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

  editProfile(): void {
    this.router.navigate([
      AppConfig.routes.admin +
        '/' +
        AppConfig.routes.profile +
        '/' +
        this.user.id
    ]);
  }
}
