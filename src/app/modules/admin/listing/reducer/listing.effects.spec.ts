import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../../../core/index';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action, Store, StoreModule } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { MockStore } from '../../../../../testing/utils';
import { ListingEffects } from '@app/modules/admin/listing/reducer/listing.effects';
import { ListingsService } from '@app/modules/admin/listing/service/listings.service';
import { AdminState } from '../../admin.state';

describe('UsersEffects', () => {
  const actions$: Observable<Action> = null;
  let listingEffects: ListingEffects;
  let localStorageService: any;
  let router: Router;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let store: MockStore<AdminState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({}), HttpClientTestingModule],
      providers: [
        ListingEffects,
        ListingsService,
        provideMockActions(() => actions$),
        {
          provide: LocalStorageService,
          useValue: jasmine.createSpyObj('LocalStorageService', ['setItem'])
        },
        {
          provide: Router,
          useValue: jasmine.createSpyObj('Router', ['navigateByUrl'])
        }
      ]
    });
    localStorageService = TestBed.get(LocalStorageService);
    listingEffects = TestBed.get(ListingEffects);
    router = TestBed.get(Router);
    // Inject the http service and test controller for each test
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    store = TestBed.get(Store);
  });

  it('should be created', () => {
    expect(ListingEffects).toBeTruthy();
  });
});
