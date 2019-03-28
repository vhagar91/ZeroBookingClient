import { Component, Input, OnInit } from '@angular/core';
import { State } from '@app/modules/admin/admin.state';
import { FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Currency } from '@app/model/currency';
import { ActionUpdatePrices } from '@app/modules/admin/listing/reducer/listing.actions';

@Component({
  selector: 'zerofee-app-prices',
  templateUrl: './prices.component.html',
  styleUrls: ['./prices.component.scss']
})
export class PricesComponent implements OnInit {
  @Input()
  priceData: FormGroup;
  @Input()
  listingId: number = null;
  currencies: Currency[];
  constructor(private store: Store<State>) {}

  ngOnInit() {
    this.currencies = [{ id: 1, name: 'Euro', code: 'EUR' }];
  }
  onSubmitPrices() {
    let updatedData = {};
    if (this.priceData) {
      updatedData = this.priceData.value;
    }
    const payload = {
      pk: this.listingId,
      data: updatedData
    };
    this.store.dispatch(new ActionUpdatePrices(payload));
  }
}
