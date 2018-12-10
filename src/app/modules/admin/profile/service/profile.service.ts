import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  getProfile,
  putProfile,
  putProfilePicture
} from '@app/core/app.config';
import { Observable } from 'rxjs';
import { Profile } from '@app/model/profile';
import { environment } from '@env/environment';

@Injectable()
export class ProfileService {
  constructor(private http: HttpClient) {}

  getProfile(userId: number): Observable<any> {
    const queryUrl = `${environment.BaseUrl + getProfile + userId}`;
    return this.http.get<any>(queryUrl);
  }
  updateProfilePicture(pictureId: number, img: File): Observable<any> {
    const formData = new FormData(); // Note: FormData values can only be string or File/Blob objects
    formData.append('thumbnail', img);
    formData.append('normal', img);
    const queryUrl = `${environment.BaseUrl +
      putProfilePicture +
      pictureId +
      '/'}`;
    return this.http.put<any>(queryUrl, formData);
  }
  updateProfile(userId: number, profile: Profile): Observable<any> {
    const queryUrl = `${environment.BaseUrl + putProfile + userId + '/'}`;
    return this.http.patch<any>(queryUrl, profile);
  }
}
