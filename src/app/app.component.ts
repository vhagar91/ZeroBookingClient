import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivationEnd, NavigationEnd, Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import {
  AnimationsService,
  AppState,
  LocalStorageService,
  selectAuth,
  SeoService
} from '@app/core';
import { Subject } from 'rxjs';
import {
  ActionSettingsChangeAnimationsPageDisabled,
  selectSettings,
  SettingsState
} from '@app/settings';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import browser from 'browser-detect';

@Component({
  selector: 'zerofee-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(
    private seoService: SeoService,
    private router: Router,
    private store: Store<AppState>,
    private animationService: AnimationsService,
    private translate: TranslateService,
    private storageService: LocalStorageService
  ) {}
  private unsubscribe$: Subject<void> = new Subject<void>();
  settings: SettingsState;
  isAuthenticated: boolean;
  private static isIEorEdgeOrSafari() {
    return ['ie', 'edge', 'safari'].includes(browser().name);
  }
  ngOnInit() {
    this.translate.setDefaultLang('en');
    this.subscribeToSettings();
    this.subscribeToIsAuthenticated();
    this.subscribeToRouterEvents();
    this.storageService.testLocalStorage();
  }
  ngOnDestroy(): void {
    if (this.unsubscribe$) {
      this.unsubscribe$.next();
      this.unsubscribe$.complete();
    }
  }

  private subscribeToRouterEvents() {
    this.router.events.pipe(takeUntil(this.unsubscribe$)).subscribe(event => {
      if (event instanceof ActivationEnd) {
        this.seoService.setMetaTags(event.snapshot);
      }
    });
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
    if (AppComponent.isIEorEdgeOrSafari()) {
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
        if (settings) {
          this.settings = settings;
          this.setLanguage(settings);
          this.animationService.updateRouteAnimationType(
            settings.pageAnimations,
            settings.elementsAnimations
          );
        }
      });
  }
  private setLanguage(settings: SettingsState) {
    const { language } = settings;
    if (language) {
      this.translate.use(language);
    }
  }
}
