import {
  Component,
  HostBinding,
  Input,
  OnChanges,
  OnDestroy,
  OnInit
} from '@angular/core';
import { Router } from '@angular/router';
import { environment as env } from '../../../../environments/environment';
import { TranslateService } from '@ngx-translate/core';
import {
  AnimationsService,
  LocalStorageService,
  routeAnimations,
  selectAuth
} from '../../../core/index';
import { Observable, Subject } from 'rxjs';
import { OverlayContainer } from '@angular/cdk/overlay';
import browser from 'browser-detect';
import {
  ActionSettingsChangeAnimationsPageDisabled,
  NIGHT_MODE_THEME,
  selectSettings,
  SettingsState
} from '../../../settings/index';
import { select, Store } from '@ngrx/store';
import { map, takeUntil } from 'rxjs/operators';

import { AppState } from '../../../core/index';
import { AppConfig } from '../../../core/app.config';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { User } from '@app/model/user';
import { MediaChange, ObservableMedia } from '@angular/flex-layout';

@Component({
  selector: 'zerofee-app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  animations: [routeAnimations]
})
export class AdminComponent implements OnInit, OnDestroy, OnChanges {
  @Input()
  isVisible = true;
  visibility = 'shown';

  sideNavOpened = true;
  matDrawerOpened = false;
  matDrawerShow = true;
  sideNavMode = 'side';

  private unsubscribe$: Subject<void> = new Subject<void>();
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map(result => result.matches));
  @HostBinding('class')
  componentCssClass;
  version = env.versions.app;
  user: User = null;
  logo = require('../../../../assets/logo.png');

  settings: SettingsState;
  isAuthenticated: boolean;

  constructor(
    private media: ObservableMedia,
    private breakpointObserver: BreakpointObserver,
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
    this.media.subscribe((mediaChange: MediaChange) => {
      this.toggleView();
    });
    this.subscribeToSettings();
    this.subscribeToIsAuthenticated();
    this.storageService.testLocalStorage();
  }
  ngOnChanges() {
    this.visibility = this.isVisible ? 'shown' : 'hidden';
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

  toggleView() {
    if (this.media.isActive('gt-md')) {
      this.sideNavMode = 'side';
      this.sideNavOpened = true;
      this.matDrawerOpened = false;
      this.matDrawerShow = true;
    } else if (this.media.isActive('gt-xs')) {
      this.sideNavMode = 'side';
      this.sideNavOpened = false;
      this.matDrawerOpened = true;
      this.matDrawerShow = true;
    } else if (this.media.isActive('lt-sm')) {
      this.sideNavMode = 'over';
      this.sideNavOpened = false;
      this.matDrawerOpened = false;
      this.matDrawerShow = false;
    }
  }
}
