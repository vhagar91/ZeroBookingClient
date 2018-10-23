import { TestBed } from '@angular/core/testing';
import { LoaderService } from '@app/core/loader/loader.service';
import { LoaderComponent } from '@app/core/loader/loader.component';

describe('LoaderService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [LoaderService]
    }));

  it('should be created', () => {
    const service: LoaderService = TestBed.get(LoaderService);
    expect(service).toBeTruthy();
  });
});
