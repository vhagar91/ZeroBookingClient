import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, TestingModule } from '@testing/utils';
import { CoreModule } from '@app/core';
import { ProfileComponent } from 'app/modules/admin/profile/profile.component';
import { State, Store } from '@ngrx/store';
import { ActionSearchUsers } from '@app/modules/admin/users/reducer/users.actions';
import {
  ActionGetProfile,
  ActionUpdateProfile,
  ActionUpdateProfilePicture
} from '@app/modules/admin/profile/reducer/profile.actions';
import { By } from '@angular/platform-browser';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let store: MockStore<State<any>>;
  let dispatchSpy: jasmine.Spy;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CoreModule, TestingModule],
      providers: [],
      declarations: [ProfileComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);
    dispatchSpy = spyOn(store, 'dispatch');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should dispatch an action to load user when created', () => {
    const action = new ActionGetProfile({
      userId: null
    });

    expect(dispatchSpy).toHaveBeenCalledTimes(1);
    expect(dispatchSpy).toHaveBeenCalledWith(action);
  });
  it('should dispatch an action to update user', () => {
    dispatchSpy.calls.reset();
    const action = new ActionUpdateProfile({
      userId: null,
      profile: {
        username: '',
        last_name: '',
        first_name: '',
        email: '',
        about_me: '',
        gender: '',
        address: '',
        country: '',
        city: ''
      }
    });
    component.onSubmit();
    expect(dispatchSpy).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(action);
  });
});
