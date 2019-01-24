import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { AppErrorHandler } from '@app/core/error-handler/app-error-handler.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CurrencyService } from '@app/core/currency-exchange/currency.service';

describe('CurrencyExchangeService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let currencyService: CurrencyService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      // Import the HttpClient mocking services
      imports: [HttpClientTestingModule],
      // Provide the service-under-test and its dependencies
      providers: [CurrencyService, AppErrorHandler]
    });

    // Inject the http, test controller, and service-under-test
    // as they will be referenced by each test.
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    currencyService = TestBed.get(CurrencyService);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });
  it('should be created', () => {
    expect(currencyService).toBeTruthy();
  });
  /// HeroService method tests begin ///

  describe('#Exchange', () => {
    let expected: any;

    beforeEach(() => {
      currencyService = TestBed.get(CurrencyService);
      expected = [
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
      ];
    });

    it('should return expected ', () => {
      const from = 'USD';
      const to = 'EUR';
      currencyService
        .Exchange('USD', 'EUR')
        .subscribe(
          response =>
            expect(response).toEqual(expected, 'should return expected'),
          fail
        );
      // Currency should have made one request to GET  from expected URL
      const params = new HttpParams()
        .append('base', `${from}`)
        .append('symbols', `${to}`);
      const url = 'https://ratesapi.io/api/latest';
      const queryUrl = `${url}?${params}`;
      const req = httpTestingController.expectOne(queryUrl);
      expect(req.request.method).toEqual('GET');

      // Respond with the mock heroes
      req.flush(expected);
    });
  });
});
