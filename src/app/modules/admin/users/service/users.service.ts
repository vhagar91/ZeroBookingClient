import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { userList } from '../../../../core/app.config';
import { environment } from '@env/environment';
import { createUser } from '@app/core/app.config';

@Injectable()
export class UsersService {
  constructor(private http: HttpClient) {}
  getUsers(
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

    const queryUrl = `${environment.BaseUrl + userList}?${params}`;
    return this.http.get<any>(queryUrl);
  }
  addUser(user: any): Observable<any> {
    const queryUrl = `${environment.BaseUrl + createUser}`;
    return this.http.post<any>(queryUrl, user);
  }
}
