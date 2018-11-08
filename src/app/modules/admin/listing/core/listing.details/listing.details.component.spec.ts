import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListingDetailsComponent } from './listing.details.component';
import { ListingheaderComponent } from '../listingheader/listingheader.component';
import { TestingModule } from '../../../../../../testing/utils';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { CoreModule } from '../../../../../core';
import { MatExpansionModule, MatMenuModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CalendarComponent } from '../calendar/calendar.component';
import { MapComponent } from '../map/map.component';
import { PropertyComponent } from '../property/property.component';
import { PricesComponent } from '../prices/prices.component';
import { PicturesComponent } from '../pictures/pictures.component';

describe('Listing.DetailsComponent', () => {
  let component: ListingDetailsComponent;
  let fixture: ComponentFixture<ListingDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CoreModule,
        TestingModule,
        MatMenuModule,
        MatExpansionModule,
        FlexLayoutModule,
        PerfectScrollbarModule
      ],
      declarations: [
        ListingDetailsComponent,
        ListingheaderComponent,
        CalendarComponent,
        MapComponent,
        PropertyComponent,
        PricesComponent,
        ListingDetailsComponent,
        PicturesComponent
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListingDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
