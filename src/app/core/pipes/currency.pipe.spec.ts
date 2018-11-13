import { CurrencyCustomPipe } from '@app/core/pipes/currency.pipe';
import { CurrencyPipe } from '@angular/common';
import { CurrencyService } from '@app/core/currency-exchange/currency.service';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AppErrorHandler } from '@app/core/error-handler/app-error-handler.service';

describe('CurrencyCustomPipe', () => {
  let pipe: CurrencyCustomPipe;
  let currencyPipe: CurrencyPipe;
  let currencyService: CurrencyService;
  const inputValue: any = 0.259;
  beforeEach(() => {
    TestBed.configureTestingModule({
      // Import the HttpClient mocking services
      imports: [HttpClientTestingModule],
      // Provide the service-under-test and its dependencies
      providers: [CurrencyService, AppErrorHandler]
    });
    currencyService = TestBed.get(CurrencyService);
    currencyPipe = new CurrencyPipe('en');
    pipe = new CurrencyCustomPipe(currencyPipe, currencyService);
  });

  it('pipe is defined', () => {
    expect(pipe instanceof CurrencyCustomPipe).toBeTruthy();
  });

  describe('transform ', () => {
    it('correct value', () => {
      expect(pipe.transform(null, null)).toBe('USD10.00');
    });
  });
});
