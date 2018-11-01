import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { BaseUrl, userList, getAvatar } from '../../../../core/app.config';
import { createUser } from '@app/core/app.config';

@Injectable()
export class UsersService {
  constructor(private http: HttpClient) {}
  getUsers(pageIndex: number = 1, pageSize: number = 20): Observable<any> {
    const params = new HttpParams()
      .append('page', `${pageIndex}`)
      .append('page_size', `${pageSize}`);

    const queryUrl = `${BaseUrl + userList}?${params}`;
    return this.http.get<any>(queryUrl);
  }
  addUser(user: any): Observable<any> {
    const queryUrl = `${BaseUrl + createUser}`;
    return this.http.post<any>(queryUrl, user);
  }
}
