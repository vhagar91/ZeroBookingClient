import { Component, OnInit } from '@angular/core';
import {
  ActionSettingsChangeAnimationsPageDisabled,
  selectSettings,
  SettingsState
} from '@app/settings';
import { select, Store } from '@ngrx/store';
import { MainComponent } from '@app/modules/zeroapp/layout/main.component';
import { takeUntil } from 'rxjs/operators';
import { AppState } from '@app/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'zerofee-app-listingcard',
  templateUrl: './listingcard.component.html',
  styleUrls: ['./listingcard.component.scss']
})
export class ListingcardComponent implements OnInit {
  private unsubscribe$: Subject<void> = new Subject<void>();
  settings: SettingsState;
  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.subscribeToSettings();
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
}
