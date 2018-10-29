import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { BaseUrl, userList, getAvatar } from '../../../../core/app.config';

@Injectable()
export class UsersService {
  constructor(private http: HttpClient) {}
  getUsers(pageIndex: number = 1): Observable<any> {
    const params = new HttpParams().append('page', `${pageIndex}`);
    const queryUrl = `${BaseUrl + userList}?${params}`;
    return this.http.get<any>(queryUrl);
  }
}