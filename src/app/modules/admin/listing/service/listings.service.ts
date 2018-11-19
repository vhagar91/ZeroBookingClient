import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import {
  getProfile,
  listingsGet,
  listingsList,
  listingsUpdateGeneral,
  listingsUpdateTerms,
  putProfile
} from '@app/core/app.config';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Profile } from '@app/model/profile';
import { SelectedListing } from '@app/modules/admin/listing/state/selectedListing';
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

  getListing(pk: number): Observable<any> {
    const queryUrl = `${environment.BaseUrl + listingsGet + pk}`;
    return this.http.get<any>(queryUrl);
  }
  updateGeneral(pk: number, generalData: any): Observable<any> {
    const queryUrl = `${environment.BaseUrl +
      listingsUpdateGeneral +
      pk +
      '/'}`;
    return this.http.patch<any>(queryUrl, generalData);
  }
  updateTerms(pk: number, termsData: any): Observable<any> {
    const queryUrl = `${environment.BaseUrl + listingsUpdateTerms + pk + '/'}`;
    return this.http.patch<any>(queryUrl, termsData);
  }
}
