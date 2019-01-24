import {
  Component,
  HostBinding,
  OnDestroy,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { AppState, ROUTE_ANIMATIONS_ELEMENTS } from '@app/core';
import { selectSettings, SettingsState } from '@app/settings';
import { select, Store } from '@ngrx/store';
import { OverlayContainer } from '@angular/cdk/overlay';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'mail-confirm',
  templateUrl: './mail-confirm.component.html',
  styleUrls: ['./mail-confirm.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MailConfirmComponent implements OnInit, OnDestroy {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  private unsubscribe$: Subject<void> = new Subject<void>();
  settings: SettingsState;
  @HostBinding('class')
  componentCssClass;
  /**
   * Constructor
   *
   * @param {FuseConfigService} _fuseConfigService
   */
  constructor(
    private store: Store<AppState>,
    public overlayContainer: OverlayContainer
  ) {}
  ngOnInit() {
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
