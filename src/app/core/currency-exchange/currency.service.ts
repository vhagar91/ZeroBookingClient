import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class CurrencyService {
  url = 'https://ratesapi.io/api/latest';

  constructor(private http: HttpClient) {}
  Exchange(amount: number, from: string, to: string): Observable<any> {
    const params = new HttpParams()
      .append('base', `${from}`)
      .append('symbols', `${to}`);

    const queryUrl = `${this.url}?${params}`;
    return this.http.get<any>(queryUrl);
  }
}
