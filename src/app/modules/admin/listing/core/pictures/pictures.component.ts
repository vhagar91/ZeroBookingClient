import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { getListingListState, State } from '@app/modules/admin/admin.state';
import { select, Store } from '@ngrx/store';
import { PictureListing } from '@app/model/pictureListing';
import { Subject } from 'rxjs';
import {
  ActionDeleteListingPicture,
  ActionGetListingGallery,
  ActionUpdateListingPicture
} from '@app/modules/admin/listing/reducer/listing.actions';
import { AddUserComponent } from '@app/modules/admin/users/dialogs/adduser/adduser.component';
import { MatDialog } from '@angular/material';
import { AddpicturesComponent } from '@app/modules/admin/listing/core/addpictures/addpictures.component';

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
  constructor(private store: Store<State>, public dialog: MatDialog) {}

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
  addPictures() {
    const dialogRef = this.dialog.open(AddpicturesComponent, {
      data: { listing: this.listingId }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.selectGallery();
    });
  }
  makePortrait(pk: any) {
    const payload = {
      pk: pk,
      data: { is_portrait: true }
    };
    this.store.dispatch(new ActionUpdateListingPicture(payload));
  }
  deletePicture(pk: any) {
    const payload = {
      pk: pk
    };
    this.store.dispatch(new ActionDeleteListingPicture(payload));
  }
}
