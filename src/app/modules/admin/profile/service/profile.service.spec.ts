import { TestBed } from '@angular/core/testing';

import { ProfileService } from './profile.service';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { UsersService } from '@app/modules/admin/users/service/users.service';
import { AppErrorHandler } from '@app/core/error-handler/app-error-handler.service';
import { HttpClient } from '@angular/common/http';

describe('ProfileService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let profileService: ProfileService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      // Import the HttpClient mocking services
      imports: [HttpClientTestingModule],
      // Provide the service-under-test and its dependencies
      providers: [ProfileService, AppErrorHandler]
    });

    // Inject the http, test controller, and service-under-test
    // as they will be referenced by each test.
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    profileService = TestBed.get(ProfileService);
  });

  it('should be created', () => {
    expect(profileService).toBeTruthy();
  });
});
