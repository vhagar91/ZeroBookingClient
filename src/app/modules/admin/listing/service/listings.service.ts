import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { listingsList } from '@app/core/app.config';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable()
export class ListingsService {
  constructor(private http: HttpClient) {}

  getListings(
    pageIndex: number = 1,
    pageSize: number = 20,
    filters: any
  ): Observable<any> {
    let params = new HttpParams()
      .append('page', `${pageIndex}`)
      .append('page_size', `${pageSize}`);

    for (const prop in filters) {
      if (filters[prop] !== '' && filters[prop] !== null) {
        params = params.append(prop, filters[prop]);
      }
    }

    const queryUrl = `${environment.BaseUrl + listingsList}?${params}`;
    return this.http.get<any>(queryUrl);
  }
}
