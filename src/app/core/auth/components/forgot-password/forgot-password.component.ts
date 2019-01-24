import {
  Component,
  HostBinding,
  OnDestroy,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppState, ROUTE_ANIMATIONS_ELEMENTS } from '@app/core';
import { select, Store } from '@ngrx/store';
import { selectSettings, SettingsState } from '@app/settings';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { OverlayContainer } from '@angular/cdk/overlay';

@Component({
  selector: 'forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {
  forgotPasswordForm: FormGroup;
  private unsubscribe$: Subject<void> = new Subject<void>();
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  settings: SettingsState;
  @HostBinding('class')
  componentCssClass;
  /**
   * Constructor
   *
   * @param {FuseConfigService} _fuseConfigService
   * @param {FormBuilder} _formBuilder
   */
  constructor(
    private _formBuilder: FormBuilder,
    private store: Store<AppState>,
    public overlayContainer: OverlayContainer
  ) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    this.forgotPasswordForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
    this.subscribeToSettings();
    this.setTheme();
  }
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
  private subscribeToSettings() {
    this.store
      .pipe(
        select(selectSettings),
        takeUntil(this.unsubscribe$)
      )
      .subscribe(settings => {
        this.settings = settings;
      });
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
