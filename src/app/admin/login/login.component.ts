import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import {
  ActionSettingsChangeAnimationsPageDisabled,
  selectSettings,
  SettingsState
} from '@app/settings';
import {
  ActionAuthLogin,
  AnimationsService,
  AppState,
  LocalStorageService
} from '@app/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { select, Store } from '@ngrx/store';
import browser from 'browser-detect';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'zerofee-app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject<void>();
  @HostBinding('class')
  componentCssClass;
  logo = require('../../../assets/logo.png');
  hide = true;
  settings: SettingsState;
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);

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
    this.storageService.testLocalStorage();
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
}
