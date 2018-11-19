import { TestBed } from '@angular/core/testing';
import { ListingsService } from '@app/modules/admin/listing/service/listings.service';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { AppErrorHandler } from '@app/core/error-handler/app-error-handler.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Listing } from '@app/modules/admin/listing/state/listing';
import { listingsList } from '@app/core/app.config';
import { environment } from '@env/environment';

describe('ListingService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let listingService: ListingsService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      // Import the HttpClient mocking services
      imports: [HttpClientTestingModule],
      // Provide the service-under-test and its dependencies
      providers: [ListingsService, AppErrorHandler]
    });

    // Inject the http, test controller, and service-under-test
    // as they will be referenced by each test.
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    listingService = TestBed.get(ListingsService);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });
  it('should be created', () => {
    expect(ListingsService).toBeTruthy();
  });
  /// HeroService method tests begin ///

  describe('#getListings', () => {
    let expectedListings: Listing[];

    beforeEach(() => {
      listingService = TestBed.get(ListingsService);
      expectedListings = [
        {
          pk: '1',
          nickname: 'A',
          publicName: 'a@mail.com',
          roomType: 1,
          propertyType: 2,
          isActive: true
        },
        {
          pk: '2',
          nickname: 'A',
          publicName: 'a@mail.com',
          roomType: 1,
          propertyType: 2,
          isActive: true
        }
      ] as Listing[];
    });

    it('should return expected listings(called once)', () => {
      const pageIndex = 1;
      const pageSize = 20;
      listingService
        .getListings(pageIndex, pageSize, {})
        .subscribe(
          listings =>
            expect(listings).toEqual(
              expectedListings,
              'should return expected listings'
            ),
          fail
        );

      // ListingService should have made one request to GET listings from expected URL
      const params = new HttpParams()
        .append('page', `${pageIndex}`)
        .append('page_size', `${pageSize}`);
      const queryUrl = `${environment.BaseUrl + listingsList}?${params}`;
      const req = httpTestingController.expectOne(queryUrl);
      expect(req.request.method).toEqual('GET');

      // Respond with the mock listings
      req.flush(expectedListings);
    });

    it('should be OK returning no listings', () => {
      const pageIndex = 1;
      const pageSize = 20;
      listingService
        .getListings(pageIndex, pageSize, {})
        .subscribe(
          listings =>
            expect(listings.length).toEqual(
              0,
              'should have empty listings array'
            ),
          fail
        );
      const params = new HttpParams()
        .append('page', `${pageIndex}`)
        .append('page_size', `${pageSize}`);
      const queryUrl = `${environment.BaseUrl + listingsList}?${params}`;
      const req = httpTestingController.expectOne(queryUrl);
      req.flush([]); // Respond with no listings
    });

    it('should return expected listings (called multiple times)', () => {
      listingService.getListings(1, 20, {}).subscribe();
      listingService.getListings(1, 20, {}).subscribe();
      listingService
        .getListings(1, 20, {})
        .subscribe(
          listings =>
            expect(listings).toEqual(
              expectedListings,
              'should return expected listings'
            ),
          fail
        );
      const pageIndex = 1;
      const pageSize = 20;
      const params = new HttpParams()
        .append('page', `${pageIndex}`)
        .append('page_size', `${pageSize}`);
      const queryUrl = `${environment.BaseUrl + listingsList}?${params}`;
      const requests = httpTestingController.match(queryUrl);
      expect(requests.length).toEqual(3, 'calls to getListings()');

      // Respond to each request with different mock listing results
      requests[0].flush([]);
      requests[1].flush([{ id: '1', nickname: 'bob' }]);
      requests[2].flush(expectedListings);
    });
  });

  // TODO: test other UsersService methods
});
