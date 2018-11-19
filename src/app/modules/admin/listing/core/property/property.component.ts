import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { State } from '@app/modules/admin/admin.state';
import { Store } from '@ngrx/store';
import { ActionUpdateListing } from '@app/modules/admin/listing/reducer/listing.actions';

@Component({
  selector: 'zerofee-app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.scss']
})
export class PropertyComponent implements OnInit {
  @Input()
  generalData: FormGroup;
  @Input()
  listingId: number = null;
  propertyTypes: any[];
  roomsTypes: any[];
  constructor(private store: Store<State>) {}

  ngOnInit() {
    this.propertyTypes = [
      {
        name: 'Apartament',
        value: 1
      },
      {
        name: 'Home',
        value: 2
      },
      {
        name: 'Villa',
        value: 3
      },
      {
        name: 'Penthouse',
        value: 4
      }
    ];
    this.roomsTypes = [
      { value: 1, name: 'Full Property' },
      { value: 2, name: 'Room' }
    ];
  }

  onSubmitGeneral() {
    const updatedData = this.generalData.value;
    const payload = {
      pk: this.listingId,
      data: updatedData
    };
    this.store.dispatch(new ActionUpdateListing(payload));
  }
}
