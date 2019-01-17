import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { TestingModule } from '@testing/utils';
import { CoreModule } from '@app/core';
import { By } from '@angular/platform-browser';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should emit action event on button click', () => {
    spyOn(component, 'onLoginClick');
    fixture.debugElement
      .query(By.css('button'))
      .triggerEventHandler('click', {});
    expect(component.onLoginClick).toHaveBeenCalled();
  });

  it('should have h1 with "zerofee-app.menu.login"', () => {
    const bannerElement: HTMLElement = fixture.nativeElement;
    const h1 = bannerElement.querySelector('h1');
    expect(h1.textContent).toEqual(' zerofee-app.menu.login ');
  });
});
