import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { State } from '@app/modules/admin/admin.state';
import { Store } from '@ngrx/store';
import { ActionUpdateAddress } from '@app/modules/admin/listing/reducer/listing.actions';

@Component({
  selector: 'zerofee-app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  @Input()
  addressData: FormGroup;
  @Input()
  listingId: number = null;
  constructor(private store: Store<State>) {}

  ngOnInit() {}

  onSubmitAddress() {
    const updatedData = this.addressData.value;
    console.log(updatedData);
    const payload = {
      pk: this.listingId,
      data: updatedData
    };
    this.store.dispatch(new ActionUpdateAddress(payload));
  }
}
