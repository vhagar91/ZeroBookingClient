import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListingheaderComponent } from './listingheader.component';
import { TestingModule } from '../../../../../../testing/utils';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { CoreModule } from '../../../../../core';
import { MatExpansionModule, MatMenuModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

describe('ListingheaderComponent', () => {
  let component: ListingheaderComponent;
  let fixture: ComponentFixture<ListingheaderComponent>;

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
      declarations: [ListingheaderComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListingheaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
