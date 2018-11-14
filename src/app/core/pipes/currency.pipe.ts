import { Pipe, PipeTransform } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

@Pipe({
  name: 'Exchange'
})
export class CurrencyCustomPipe implements PipeTransform {
  result: any;
  constructor(private currencyPipe: CurrencyPipe) {}
  transform(value: any, from: string, to: string, rates: any): any {
    if (value != null) {
      if (rates[from]) {
        return this.currencyPipe.transform(value / rates[from], to);
      }
      return this.currencyPipe.transform(value, to);
    } else {
      return this.currencyPipe.transform(10, 'USD', 'USD');
    }
  }
}
