import { TestBed, async } from '@angular/core/testing';

import { TestingModule } from '@testing/utils';
import { CoreModule } from '@app/core';
import { MainComponent } from '@app/modules/zeroapp/layout/main.component';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CoreModule, TestingModule, PerfectScrollbarModule],
      declarations: [MainComponent]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(MainComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
