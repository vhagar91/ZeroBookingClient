import { Pipe, PipeTransform } from '@angular/core';
import { Currency } from '@app/model/currency';
import { CurrencyPipe } from '@angular/common';
import { CurrencyService } from '@app/core/currency-exchange/currency.service';
@Pipe({
  name: 'Exchange'
})
export class CurrencyCustomPipe implements PipeTransform {
  constructor(
    private currencyPipe: CurrencyPipe,
    private exchangeService: CurrencyService
  ) {}
  transform(value: any, currency: Currency): any {
    if (value != null) {
      let amount;
      this.exchangeService.Exchange(value, 'USD', 'EUR').subscribe(data => {
        amount = data.rates.EUR;
      });
      value = value / 0.88;
      return this.currencyPipe.transform(value, 'EUR');
    } else {
      return this.currencyPipe.transform(10, 'USD', 'USD');
    }
  }
}
