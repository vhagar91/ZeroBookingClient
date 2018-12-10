import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { getListingListState, State } from '@app/modules/admin/admin.state';
import { select, Store } from '@ngrx/store';
import { PictureListing } from '@app/model/pictureListing';
import { Subject } from 'rxjs';
import { ActionGetListingGallery } from '@app/modules/admin/listing/reducer/listing.actions';

@Component({
  selector: 'zerofee-app-pictures',
  templateUrl: './pictures.component.html',
  styleUrls: ['./pictures.component.scss']
})
export class PicturesComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject<void>();
  gallery: PictureListing[];
  @Input()
  listingId: number = null;
  constructor(private store: Store<State>) {}

  ngOnInit() {
    this.subscribeToGallery();
  }
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
  private subscribeToGallery() {
    this.store
      .pipe(
        select(getListingListState),
        takeUntil(this.unsubscribe$)
      )
      .subscribe(
        listings => {
          if (listings) {
            this.gallery = listings.selected.gallery;
          }
        },
        error1 => {}
      );
    this.selectGallery();
  }
  selectGallery(): void {
    this.store.dispatch(new ActionGetListingGallery(this.listingId));
  }
}
