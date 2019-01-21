import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchboxComponent } from './searchbox.component';
import { TestingModule } from '../../../../../testing/utils';
import { NotificationService } from '@app/core/notifications/notification.service';
import { TranslateService } from '@ngx-translate/core';

describe('SearchboxComponent', () => {
  let component: SearchboxComponent;
  let fixture: ComponentFixture<SearchboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule],
      providers: [NotificationService, TranslateService],
      declarations: [SearchboxComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should modify location on onLocationChange', () => {
    component.onLocationChange('new location');

    expect(component.searchLocation).toBe('new location');
  });
  it('should modify location on onGuestsChange', () => {
    component.onGuestsChange('3');

    expect(component.guests).toBe('3');
  });
  it('should modify location on onDateChange', () => {
    component.onDateChange('1/18/2019');

    expect(component.fromDate).toBe('1/18/2019');
  });
});
