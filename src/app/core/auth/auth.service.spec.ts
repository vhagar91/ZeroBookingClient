import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { AppState, LocalStorageService } from '@app/core';
import { MockStore } from '@testing/utils';
import { Store, StoreModule } from '@ngrx/store';
import { AuthState } from '@app/core/auth/auth.models';

describe('AuthService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let store: MockStore<AppState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({}), HttpClientTestingModule],
      providers: [AuthService, LocalStorageService]
    });

    // Inject the http service and test controller for each test
    httpClient = TestBed.get(HttpClient);
    store = TestBed.get(Store);
    httpTestingController = TestBed.get(HttpTestingController);
  });
  it('should be created', () => {
    const service: AuthService = TestBed.get(AuthService);
    expect(service).toBeTruthy();
  });
});
function createState(authState: AuthState) {
  return {
    auth: authState
  } as AppState;
}
