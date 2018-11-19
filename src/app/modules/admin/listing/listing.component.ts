import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AppConfig } from '@app/core/app.config';
import { Router } from '@angular/router';
import { ActionSearchListings } from '@app/modules/admin/listing/reducer/listing.actions';
import { Subject } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { takeUntil } from 'rxjs/operators';
import { MatPaginator } from '@angular/material';
import { getListingListState, State } from '@app/modules/admin/admin.state';

@Component({
  selector: 'zerofee-app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss']
})
export class ListingComponent implements OnInit, OnDestroy {
  public showLoader = false;
  public displayListings = [];
  resultsLength = 0;
  pageIndex = 1;
  pageSize = 20;
  private unsubscribe$: Subject<void> = new Subject<void>();
  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  constructor(private router: Router, private store: Store<State>) {}

  ngOnInit() {
    this.subscribeToListings();
    this.subscribeToPage();
  }
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
  reload() {
    this.showLoader = true;
    setTimeout(() => {
      this.showLoader = false;
    }, 2000);
  }
  seeDetails(id: number): void {
    this.router.navigate([
      AppConfig.routes.admin + '/' + AppConfig.routes.adminListings + '/' + id
    ]);
  }
  searchListings(reset = false): void {
    if (reset) {
      this.pageIndex = 1;
      this.pageSize = 20;
    }
    const payload = {
      pageIndex: this.pageIndex,
      pageSize: this.pageSize
    };
    this.store.dispatch(new ActionSearchListings(payload));
  }
  private subscribeToPage() {
    this.paginator.page.subscribe(event => {
      this.pageIndex = event.pageIndex + 1;
      this.pageSize = event.pageSize;
      this.searchListings();
    });
  }
  private subscribeToListings() {
    this.store
      .pipe(
        select(getListingListState),
        takeUntil(this.unsubscribe$)
      )
      .subscribe(
        listings => {
          if (listings) {
            this.displayListings = listings.listings;
            this.resultsLength = listings.total;
          }
        },
        error1 => {}
      );
    this.searchListings();
  }
}
