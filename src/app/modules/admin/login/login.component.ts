import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import {
  ActionSettingsChangeAnimationsPageDisabled,
  selectSettings,
  SettingsState
} from '../../../settings/index';
import { ActionAuthLogin, AppState } from '../../../core/index';
import { select, Store } from '@ngrx/store';
import browser from 'browser-detect';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { FormControl, Validators } from '@angular/forms';
import { OverlayContainer } from '@angular/cdk/overlay';

@Component({
  selector: 'zerofee-app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject<void>();
  @HostBinding('class')
  componentCssClass;
  logo = require('../../../../assets/logo.png');
  hide = true;
  settings: SettingsState;
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);

  constructor(
    private store: Store<AppState>,
    public overlayContainer: OverlayContainer
  ) {}
  private static isIEorEdgeOrSafari() {
    return ['ie', 'edge', 'safari'].includes(browser().name);
  }
  getErrorMessage() {
    return this.email.hasError('required')
      ? 'You must enter a value'
      : this.email.hasError('email')
        ? 'Not a valid email'
        : '';
  }
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
  ngOnInit(): void {
    this.subscribeToSettings();
    this.setTheme();
  }

  private subscribeToSettings() {
    if (LoginComponent.isIEorEdgeOrSafari()) {
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

  onLoginClick() {
    const payload = {
      email: this.email.value,
      password: this.password.value
    };
    this.store.dispatch(new ActionAuthLogin(payload));
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
}
