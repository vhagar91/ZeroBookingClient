import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { getListingListState, State } from '@app/modules/admin/admin.state';
import { select, Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SelectedListing } from '@app/modules/admin/listing/state/selectedListing';

@Component({
  selector: 'zerofee-app-listingheader',
  templateUrl: './listingheader.component.html',
  styleUrls: ['./listingheader.component.scss']
})
export class ListingheaderComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject<void>();
  listing: SelectedListing;
  constructor(private store: Store<State>) {}

  ngOnInit() {
    this.subscribeToSelectedListing();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
  private subscribeToSelectedListing() {
    this.store
      .pipe(
        select(getListingListState),
        takeUntil(this.unsubscribe$)
      )
      .subscribe(
        listings => {
          if (listings) {
            this.listing = listings.selected;
          }
        },
        error1 => {}
      );
  }
}
