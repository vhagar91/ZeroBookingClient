import { Injectable } from '@angular/core';
import { login, tokenRefresh } from '@app/core/app.config';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthService {
  static BASE_URL = environment.BaseUrl;
  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) {}

  login(payload: any) {
    return this.http.post<any>(AuthService.BASE_URL + login, {
      username_or_email: payload.email,
      password: payload.password
    });
  }
  refreshToken(): Observable<any> {
    const token = this.localStorageService.getItem('Refresh');
    const Url = `${AuthService.BASE_URL + tokenRefresh}`;

    return this.http.post<any>(Url, { refresh: token }).pipe(
      map(newToken => {
        if (newToken) {
          this.localStorageService.setItem('Token', newToken.access);
        }

        return <any>newToken;
      })
    );
  }

  getToken(): string {
    const token = this.localStorageService.getItem('Token');

    if (token != null) {
      return token;
    }

    return '';
  }
}
