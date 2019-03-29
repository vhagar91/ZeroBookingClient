import { TestBed, async } from '@angular/core/testing';

import { TestingModule } from '@testing/utils';
import { CoreModule } from '@app/core';

import { AppComponent } from './app.component';
import { LoaderComponent } from '@app/core/loader/loader.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CoreModule, TestingModule],
      declarations: [AppComponent, LoaderComponent]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
