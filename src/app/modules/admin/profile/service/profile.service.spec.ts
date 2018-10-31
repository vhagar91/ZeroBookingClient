import { TestBed } from '@angular/core/testing';

import { ProfileService } from './profile.service';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { AppErrorHandler } from '@app/core/error-handler/app-error-handler.service';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import {
  BaseUrl,
  getProfile,
  putProfile,
  putProfilePicture
} from '@app/core/app.config';
import { Profile } from '@app/model/profile';
import { Picture } from '@app/model/picture';

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
  /// Profile service method tests begin ///

  describe('#getProfile', () => {
    let expectedProfile: Profile;

    beforeEach(() => {
      profileService = TestBed.get(ProfileService);
      expectedProfile = {
        username: 'Manolo',
        email: 'manole@email.com',
        first_name: 'Manuel',
        last_name: 'Perez',
        gender: 'M',
        picture: null,
        address: 'Calle 5ta #50',
        city: 'Havana',
        country: 'Cuba'
      };
    });

    it('should return expected profile(called once)', () => {
      const userId = 1;
      profileService
        .getProfile(userId)
        .subscribe(
          profile =>
            expect(profile).toEqual(
              expectedProfile,
              'should return expected profile'
            ),
          fail
        );

      // ProfileService should have made one request to GET profile from expected URL
      const queryUrl = `${BaseUrl + getProfile + userId}`;
      const req = httpTestingController.expectOne(queryUrl);
      expect(req.request.method).toEqual('GET');

      // Respond with the mock profile
      req.flush(expectedProfile);
    });
  });
  describe('#updateProfilePicture', () => {
    let updatedPicture: Picture;

    beforeEach(() => {
      profileService = TestBed.get(ProfileService);
      updatedPicture = {
        id: 1,
        thumbnail: 'asdad',
        normal: 'asdasd'
      };
    });
    it('should update a picture and return it', () => {
      const pictureId = 1;
      const content = 'Image';
      const data = new Blob([content], { type: 'application/img' });
      const arrayOfBlob = [new Blob()];
      arrayOfBlob.push(data);
      const img = new File(arrayOfBlob, 'avatar.png');
      profileService
        .updateProfilePicture(pictureId, img)
        .subscribe(
          res =>
            expect(res).toEqual(updatedPicture, 'should return the picture'),
          fail
        );
      // ProfileSerice should have made one request to PUT ProfilePicture
      const formData = new FormData(); // Note: FormData values can only be string or File/Blob objects
      formData.append('thumbnail', img);
      formData.append('normal', img);
      const queryUrl = `${BaseUrl + putProfilePicture + pictureId + '/'}`;
      const req = httpTestingController.expectOne(queryUrl);
      expect(req.request.method).toEqual('PUT');
      expect(req.request.body).toEqual(formData);

      // Expect server to return the profile after PUT
      const expectedResponse = new HttpResponse({
        status: 200,
        statusText: 'OK',
        body: updatedPicture
      });
      req.event(expectedResponse);
    });
  });

  describe('#updateProfile', () => {
    // Expecting the query form of URL so should not 404 when id not found

    it('should update a profile and return it', () => {
      const userId = 1;
      const updateProfile: Profile = {
        username: 'Manolo',
        email: 'manole@email.com',
        first_name: 'Manuel',
        last_name: 'Perez',
        gender: 'M',
        picture: null,
        address: 'Calle 5ta #50',
        city: 'Havana',
        country: 'Cuba'
      };
      profileService
        .updateProfile(userId, updateProfile)
        .subscribe(
          data =>
            expect(data).toEqual(updateProfile, 'should return the profile'),
          fail
        );

      // ProfileServie should have made one request to Patch profile
      const queryUrl = `${BaseUrl + putProfile + userId + '/'}`;
      const req = httpTestingController.expectOne(queryUrl);
      expect(req.request.method).toEqual('PATCH');
      expect(req.request.body).toEqual(updateProfile);

      // Expect server to return the profile after PUT
      const expectedResponse = new HttpResponse({
        status: 200,
        statusText: 'OK',
        body: updateProfile
      });
      req.event(expectedResponse);
    });
  });
});
