import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterComponent } from './filter.component';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef
} from '@angular/material';
import { TestingModule } from '../../../../../../testing/utils';
import { CoreModule } from '../../../../../core';
import { TranslateService } from '@ngx-translate/core';
import { By } from '@angular/platform-browser';

describe('FilterComponent', () => {
  let component: FilterComponent;
  let fixture: ComponentFixture<FilterComponent>;
  let translateService: TranslateService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CoreModule, TestingModule, MatDialogModule],
      declarations: [FilterComponent],
      providers: [
        TranslateService,
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterComponent);
    component = fixture.componentInstance;
    translateService = TestBed.get(TranslateService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should have as h1 Filters', () => {
    const bannerElement: HTMLElement = fixture.nativeElement;
    const h1 = bannerElement.querySelector('h1');
    const Tittle = translateService.instant('zerofee.filters');
    expect(h1.textContent).toEqual(Tittle);
  });
  it('should call onNoClick in cancel button', () => {
    spyOn(component, 'onNoClick');
    fixture.debugElement
      .query(By.css('#cancel'))
      .triggerEventHandler('click', {});
    expect(component.onNoClick).toHaveBeenCalled();
  });
  it('should have a 2 buttons', () => {
    expect(fixture.debugElement.queryAll(By.css('button')).length).toEqual(2);
  });
  it('should have a 2 fields', () => {
    expect(
      fixture.debugElement.queryAll(By.css('.mat-form-field')).length
    ).toEqual(2);
  });
});
