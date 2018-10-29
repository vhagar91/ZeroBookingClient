import { async, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Error404PageComponent } from './error404-page.component';
import { AppConfig, APP_CONFIG } from '@app/core/app.config';
import { TestingModule } from '@testing/utils';

describe('Error404Page', () => {
  let fixture;
  let component;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule],
      declarations: [Error404PageComponent],
      providers: [{ provide: APP_CONFIG, useValue: AppConfig }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(Error404PageComponent);
    fixture.detectChanges();
    component = fixture.debugElement.componentInstance;
  }));

  it('should create error 404 component', () => {
    expect(component).toBeTruthy();
  });
});
