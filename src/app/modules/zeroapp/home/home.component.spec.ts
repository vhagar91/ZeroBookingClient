import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { TestingModule } from '../../../../testing/utils';
import { HeaderComponent } from './header/header.component';
import { SearchboxComponent } from '@app/modules/zeroapp/home/searchbox/searchbox.component';
import { SharedModule } from '@app/shared';
import { NotificationService } from '@app/core/notifications/notification.service';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule],
      providers: [NotificationService],
      declarations: [HomeComponent, HeaderComponent, SearchboxComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
