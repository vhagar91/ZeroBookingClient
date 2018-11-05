import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { BaseUrl, userList, getAvatar } from '../../../../core/app.config';
import { createUser } from '@app/core/app.config';
import { forEach } from '@angular/router/src/utils/collection';

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

    const queryUrl = `${BaseUrl + userList}?${params}`;
    return this.http.get<any>(queryUrl);
  }
  addUser(user: any): Observable<any> {
    const queryUrl = `${BaseUrl + createUser}`;
    return this.http.post<any>(queryUrl, user);
  }
}
