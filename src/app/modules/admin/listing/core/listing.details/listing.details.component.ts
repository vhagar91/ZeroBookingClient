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
  termsForm: FormGroup;
  descriptionForm: FormGroup;
  addressForm: FormGroup;
  priceForm: FormGroup;
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
    this.termsForm = new FormGroup({
      minNights: new FormControl(
        this.selectedListings ? this.selectedListings.minNights : '',
        [<any>Validators.required, Validators.min(1)]
      ),
      maxNights: new FormControl(
        this.selectedListings ? this.selectedListings.maxNights : '',
        [<any>Validators.required, Validators.min(1)]
      )
    });
    this.descriptionForm = new FormGroup({
      description: new FormControl(
        this.selectedListings ? this.selectedListings.description : '',
        [<any>Validators.required]
      )
    });
    this.addressForm = new FormGroup({
      full: new FormControl(
        this.selectedListings ? this.selectedListings.address.full : '',
        [<any>Validators.required]
      ),
      country: new FormControl(
        this.selectedListings ? this.selectedListings.address.country : '',
        [<any>Validators.required]
      ),
      city: new FormControl(
        this.selectedListings ? this.selectedListings.address.city : '',
        [<any>Validators.required]
      ),
      street: new FormControl(
        this.selectedListings ? this.selectedListings.address.street : '',
        [<any>Validators.required]
      ),
      lat: new FormControl(
        this.selectedListings ? this.selectedListings.address.lat : '',
        [<any>Validators.required]
      ),
      lng: new FormControl(
        this.selectedListings ? this.selectedListings.address.lng : '',
        [<any>Validators.required]
      )
    });
    this.priceForm = new FormGroup({
      currency: new FormControl(
        this.selectedListings ? this.selectedListings.price.currency : '',
        [<any>Validators.required]
      ),
      basePrice: new FormControl(
        this.selectedListings ? this.selectedListings.price.basePrice : '',
        [<any>Validators.required]
      ),
      extraPersonFee: new FormControl(
        this.selectedListings ? this.selectedListings.price.extraPersonFee : '',
        [<any>Validators.required]
      ),
      breakfastFee: new FormControl(
        this.selectedListings ? this.selectedListings.price.breakfastFee : '',
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
            this.setTermsForm();
            this.setDescriptionForm();
            this.setAddressForm();
            this.setPriceForm();
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
  setTermsForm() {
    this.termsForm.patchValue({
      maxNights: this.selectedListings ? this.selectedListings.maxNights : '',
      minNights: this.selectedListings ? this.selectedListings.minNights : ''
    });
  }
  setDescriptionForm() {
    this.descriptionForm.patchValue({
      description: this.selectedListings
        ? this.selectedListings.description
        : ''
    });
  }
  setAddressForm() {
    this.addressForm.patchValue({
      full: this.selectedListings ? this.selectedListings.address.full : '',
      country: this.selectedListings
        ? this.selectedListings.address.country
        : '',
      city: this.selectedListings ? this.selectedListings.address.city : '',
      street: this.selectedListings ? this.selectedListings.address.street : '',
      lng: this.selectedListings ? this.selectedListings.address.lng : '',
      lat: this.selectedListings ? this.selectedListings.address.lat : ''
    });
  }
  setPriceForm() {
    this.priceForm.patchValue({
      currency: this.selectedListings
        ? this.selectedListings.price.currency
        : '',
      basePrice: this.selectedListings
        ? this.selectedListings.price.basePrice
        : '',
      extraPersonFee: this.selectedListings
        ? this.selectedListings.price.extraPersonFee
        : '',
      breakfastFee: this.selectedListings
        ? this.selectedListings.price.breakfastFee
        : ''
    });
  }
}
