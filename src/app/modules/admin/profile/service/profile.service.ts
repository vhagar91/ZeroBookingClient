import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {
  BaseUrl,
  getProfile,
  login,
  putProfile,
  putProfilePicture
} from '@app/core/app.config';
import { Observable } from 'rxjs';
import { Profile } from '@app/model/profile';
import { AuthService } from '@app/core/auth/auth.service';

@Injectable()
export class ProfileService {
  constructor(private http: HttpClient) {}

  getProfile(userId: number): Observable<any> {
    const queryUrl = `${BaseUrl + getProfile + userId}`;
    return this.http.get<any>(queryUrl);
  }
  updateProfilePicture(pictureId: number, img: File): Observable<any> {
    const formData = new FormData(); // Note: FormData values can only be string or File/Blob objects
    formData.append('thumbnail', img);
    formData.append('normal', img);
    const queryUrl = `${BaseUrl + putProfilePicture + pictureId + '/'}`;
    return this.http.put<any>(queryUrl, formData);
  }
  updateProfile(userId: number, profile: Profile): Observable<any> {
    // const formData = new FormData(); // Note: FormData values can only be string or File/Blob objects
    // formData.append('thumbnail', img);
    // formData.append('normal', img);
    const queryUrl = `${BaseUrl + putProfile + userId + '/'}`;
    return this.http.patch<any>(queryUrl, profile);
  }
}
