import { Injectable } from '@angular/core';
import { BaseUrl, login, tokenRefresh } from '@app/core/urls';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalStorageService } from '@app/core';
import { Store } from '@ngrx/store';
import { AppState } from '@app/core';
import {
  ActionAuthLogin,
  ActionAuthLogout,
  AuthActionTypes,
  LogInSuccess
} from './auth.actions';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthService {
  static BASE_URL = BaseUrl;
  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService,
    private store: Store<AppState>
  ) {}

  login(payload: any) {
    return this.http.post<any>(AuthService.BASE_URL + login, {
      username_or_email: payload.email,
      password: payload.password
    });
  }
  refreshToken(): Observable<any> {
    const token = localStorage.getItem('Refresh');
    const Url = `${AuthService.BASE_URL + tokenRefresh + token}`;
    return this.http.post<any>(Url, { refresh: token }).pipe(
      map(newToken => {
        if (newToken) {
          localStorage.setItem('Token', newToken);
        }

        return <any>newToken;
      })
    );
  }
  logout() {
    this.store.dispatch(new ActionAuthLogout());
  }

  getToken(): string {
    const token = this.localStorageService.getItem('Token');

    if (token != null) {
      return token;
    }

    return '';
  }
}
