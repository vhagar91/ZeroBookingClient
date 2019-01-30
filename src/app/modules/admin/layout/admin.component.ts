import {
  Component,
  HostBinding,
  Input,
  OnChanges,
  OnDestroy,
  OnInit
} from '@angular/core';
import { environment as env } from '../../../../environments/environment';
import { routeAnimations, selectAuth } from '../../../core/index';
import { Observable, Subject } from 'rxjs';
import { OverlayContainer } from '@angular/cdk/overlay';
import { select, Store } from '@ngrx/store';
import { map, takeUntil } from 'rxjs/operators';
import { AppState } from '../../../core/index';
import { BreakpointObserver } from '@angular/cdk/layout';
import { User } from '@app/model/user';
import { MediaChange, MediaObserver } from '@angular/flex-layout';

import { SettingsState } from '@app/settings';

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
  @HostBinding('class')
  componentCssClass;
  version = env.versions.app;
  user: User = null;
  logo = require('../../../../assets/logo.png');

  settings: SettingsState;
  isAuthenticated: boolean;

  constructor(
    private media: MediaObserver,
    private breakpointObserver: BreakpointObserver,
    public overlayContainer: OverlayContainer,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.media.media$.subscribe((mediaChange: MediaChange) => {
      this.toggleView();
    });
    this.setTheme();
    this.subscribeToIsAuthenticated();
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
        if (auth) {
          this.isAuthenticated = auth.isAuthenticated;
          this.user = auth.user;
        }
      });
  }

  private setTheme() {
    this.componentCssClass = 'black-theme';
    const classList = this.overlayContainer.getContainerElement().classList;
    const toRemove = Array.from(classList).filter((item: string) =>
      item.includes('-theme')
    );
    if (toRemove.length) {
      classList.remove(...toRemove);
    }
    classList.add('black-theme');
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
