import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BaseUrl, getProfile } from '@app/core/app.config';
import { Observable } from 'rxjs';
import { Profile } from '@app/model/profile';

@Injectable()
export class ProfileService {
  constructor(private http: HttpClient) {}

  getProfile(userId: number): Observable<any> {
    const queryUrl = `${BaseUrl + getProfile + userId}`;
    return this.http.get<any>(queryUrl);
  }
}
