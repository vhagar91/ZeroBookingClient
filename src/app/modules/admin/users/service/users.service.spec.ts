import { TestBed } from '@angular/core/testing';

import { UsersService } from './users.service';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { AppErrorHandler } from '@app/core/error-handler/app-error-handler.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { User } from '@app/modules/admin/users/state/user';
import { userList } from '@app/core/app.config';
import { environment } from '@env/environment';

describe('UsersService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let userService: UsersService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      // Import the HttpClient mocking services
      imports: [HttpClientTestingModule],
      // Provide the service-under-test and its dependencies
      providers: [UsersService, AppErrorHandler]
    });

    // Inject the http, test controller, and service-under-test
    // as they will be referenced by each test.
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    userService = TestBed.get(UsersService);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });
  it('should be created', () => {
    expect(userService).toBeTruthy();
  });
  /// HeroService method tests begin ///

  describe('#getUsers', () => {
    let expectedUsers: User[];

    beforeEach(() => {
      userService = TestBed.get(UsersService);
      expectedUsers = [
        {
          id: '1',
          username: 'A',
          email: 'a@mail.com',
          first_name: 'A1',
          last_name: 'A2',
          is_staff: 'true',
          groups: null
        },
        {
          id: '2',
          username: 'B',
          email: 'B@mail.com',
          first_name: 'B1',
          last_name: 'B2',
          is_staff: 'false',
          groups: null
        }
      ] as User[];
    });

    it('should return expected users(called once)', () => {
      const pageIndex = 1;
      const pageSize = 20;
      userService
        .getUsers(pageIndex, pageSize, {})
        .subscribe(
          users =>
            expect(users).toEqual(
              expectedUsers,
              'should return expected users'
            ),
          fail
        );

      // UserService should have made one request to GET users from expected URL
      const params = new HttpParams()
        .append('page', `${pageIndex}`)
        .append('page_size', `${pageSize}`);
      const queryUrl = `${environment.BaseUrl + userList}?${params}`;
      const req = httpTestingController.expectOne(queryUrl);
      expect(req.request.method).toEqual('GET');

      // Respond with the mock heroes
      req.flush(expectedUsers);
    });

    it('should be OK returning no users', () => {
      const pageIndex = 1;
      const pageSize = 20;
      userService
        .getUsers(pageIndex, pageSize, {})
        .subscribe(
          users =>
            expect(users.length).toEqual(0, 'should have empty users array'),
          fail
        );
      const params = new HttpParams()
        .append('page', `${pageIndex}`)
        .append('page_size', `${pageSize}`);
      const queryUrl = `${environment.BaseUrl + userList}?${params}`;
      const req = httpTestingController.expectOne(queryUrl);
      req.flush([]); // Respond with no heroes
    });

    it('should return expected heroes (called multiple times)', () => {
      userService.getUsers(1, 20, {}).subscribe();
      userService.getUsers(1, 20, {}).subscribe();
      userService
        .getUsers(1, 20, {})
        .subscribe(
          users =>
            expect(users).toEqual(
              expectedUsers,
              'should return expected users'
            ),
          fail
        );
      const pageIndex = 1;
      const pageSize = 20;
      const params = new HttpParams()
        .append('page', `${pageIndex}`)
        .append('page_size', `${pageSize}`);
      const queryUrl = `${environment.BaseUrl + userList}?${params}`;
      const requests = httpTestingController.match(queryUrl);
      expect(requests.length).toEqual(3, 'calls to getUsers()');

      // Respond to each request with different mock user results
      requests[0].flush([]);
      requests[1].flush([{ id: 1, username: 'bob' }]);
      requests[2].flush(expectedUsers);
    });
  });

  // TODO: test other UsersService methods
});
