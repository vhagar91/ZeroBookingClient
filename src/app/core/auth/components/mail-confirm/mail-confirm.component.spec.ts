import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { MockStore, TestingModule } from '../../../../../testing/utils';
import { CoreModule } from '../../../index';
import { State, Store } from '@ngrx/store';
import { MailConfirmComponent } from '@app/core/auth/components/mail-confirm/mail-confirm.component';

describe('MailConfirmComponent', () => {
  let component: MailConfirmComponent;
  let fixture: ComponentFixture<MailConfirmComponent>;
  let store: MockStore<State<any>>;
  let dispatchSpy: jasmine.Spy;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CoreModule, TestingModule],
      providers: [],
      declarations: [MailConfirmComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MailConfirmComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);
    dispatchSpy = spyOn(store, 'dispatch').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
