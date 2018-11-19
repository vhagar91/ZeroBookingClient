import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { getListingListState, State } from '@app/modules/admin/admin.state';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { SelectedListing } from '@app/modules/admin/listing/state/selectedListing';
import { ActionSelectListing } from '@app/modules/admin/listing/reducer/listing.actions';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'zerofee-app-listing.details',
  templateUrl: './listing.details.component.html',
  styleUrls: ['./listing.details.component.scss']
})
export class ListingDetailsComponent implements OnInit {
  private unsubscribe$: Subject<void> = new Subject<void>();
  public selectedListings: SelectedListing;
  generalForm: FormGroup;
  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<State>
  ) {
    this.generalForm = new FormGroup({
      // I assume that data which is received from your WEBAPI contains a key usernames and want to set this in your formControl
      nickname: new FormControl(
        this.selectedListings ? this.selectedListings.nickname : '',
        [<any>Validators.required]
      ),
      publicName: new FormControl(
        this.selectedListings ? this.selectedListings.publicName : '',
        [<any>Validators.required]
      ),
      accommodates: new FormControl(
        this.selectedListings ? this.selectedListings.accommodates : '',
        [<any>Validators.required, Validators.min(1)]
      ),
      bedrooms: new FormControl(
        this.selectedListings ? this.selectedListings.bedrooms : '',
        [<any>Validators.required, Validators.min(1)]
      ),
      beds: new FormControl(
        this.selectedListings ? this.selectedListings.beds : '',
        [<any>Validators.required, Validators.min(1)]
      ),
      checkInTime: new FormControl(
        this.selectedListings ? this.selectedListings.checkInTime : '',
        [<any>Validators.required]
      ),
      checkOutTime: new FormControl(
        this.selectedListings ? this.selectedListings.checkOutTime : '',
        [<any>Validators.required]
      ),
      propertyType: new FormControl(
        this.selectedListings ? this.selectedListings.propertyType : '',
        [<any>Validators.required]
      ),
      roomType: new FormControl(
        this.selectedListings ? this.selectedListings.roomType : '',
        [<any>Validators.required]
      )
    });
  }

  ngOnInit() {
    this.subscribeToListings();
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
            this.selectedListings = listings.selected;
            this.setGeneralForm();
          }
        },
        error1 => {}
      );
    this.selectListing();
  }
  selectListing(): void {
    const payload = {
      id: this.activatedRoute.snapshot.paramMap.get('id')
    };
    this.store.dispatch(new ActionSelectListing(payload));
  }
  setGeneralForm() {
    this.generalForm.patchValue({
      nickname: this.selectedListings ? this.selectedListings.nickname : '',
      publicName: this.selectedListings ? this.selectedListings.publicName : '',
      accommodates: this.selectedListings
        ? this.selectedListings.accommodates
        : '',
      bedrooms: this.selectedListings ? this.selectedListings.bedrooms : '',
      beds: this.selectedListings ? this.selectedListings.beds : '',
      checkInTime: this.selectedListings
        ? this.selectedListings.checkInTime
        : '',
      checkOutTime: this.selectedListings
        ? this.selectedListings.checkOutTime
        : '',
      propertyType: this.selectedListings
        ? this.selectedListings.propertyType
        : '',
      roomType: this.selectedListings ? this.selectedListings.roomType : ''
    });
  }
}
