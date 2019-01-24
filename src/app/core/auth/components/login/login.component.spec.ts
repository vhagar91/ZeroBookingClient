import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { MockStore, TestingModule } from '../../../../../testing/utils';
import { ActionAuthLogin, CoreModule } from '../../../index';
import { By } from '@angular/platform-browser';
import { State, Store } from '@ngrx/store';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let store: MockStore<State<any>>;
  let dispatchSpy: jasmine.Spy;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CoreModule, TestingModule],
      providers: [],
      declarations: [LoginComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);
    dispatchSpy = spyOn(store, 'dispatch').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should dispatch an action to Login', () => {
    const action = new ActionAuthLogin({
      email: '',
      password: ''
    });
    component.onLoginClick();
    expect(dispatchSpy).toHaveBeenCalledTimes(1);
    expect(dispatchSpy).toHaveBeenCalledWith(action);
  });
  it('should emit action event on button click Login', () => {
    spyOn(component, 'onLoginClick');
    fixture.debugElement
      .query(By.css('button'))
      .triggerEventHandler('click', {});
    expect(component.onLoginClick).toHaveBeenCalled();
  });
  it('should emit action event on google Login', () => {
    spyOn(component, 'socialSignIn');
    fixture.debugElement
      .query(By.css('.google'))
      .triggerEventHandler('click', {});
    expect(component.socialSignIn).toHaveBeenCalledWith('google');
  });
  it('should emit action event on facebook Login', () => {
    spyOn(component, 'socialSignIn');
    fixture.debugElement
      .query(By.css('.facebook'))
      .triggerEventHandler('click', {});
    expect(component.socialSignIn).toHaveBeenCalledWith('facebook');
  });
  it('should have h1 with "zerofee-app.menu.login"', () => {
    const bannerElement: HTMLElement = fixture.nativeElement;
    const h1 = bannerElement.querySelector('h1');
    expect(h1.textContent).toEqual('zerofee-app.menu.login');
  });
});
