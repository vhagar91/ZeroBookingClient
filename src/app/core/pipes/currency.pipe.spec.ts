import { CurrencyCustomPipe } from '@app/core/pipes/currency.pipe';
import { CurrencyPipe } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AppErrorHandler } from '@app/core/error-handler/app-error-handler.service';

describe('CurrencyCustomPipe', () => {
  let pipe: CurrencyCustomPipe;
  let currencyPipe: CurrencyPipe;
  const inputValue: any = 0.259;
  beforeEach(() => {
    TestBed.configureTestingModule({
      // Import the HttpClient mocking services
      imports: [HttpClientTestingModule],
      // Provide the service-under-test and its dependencies
      providers: [AppErrorHandler]
    });
    currencyPipe = new CurrencyPipe('en');
    pipe = new CurrencyCustomPipe(currencyPipe);
  });

  it('pipe is defined', () => {
    expect(pipe instanceof CurrencyCustomPipe).toBeTruthy();
  });

  describe('transform ', () => {
    it('correct value', () => {
      expect(pipe.transform(null, null, null, null)).toBe('USD10.00');
    });
  });
});
