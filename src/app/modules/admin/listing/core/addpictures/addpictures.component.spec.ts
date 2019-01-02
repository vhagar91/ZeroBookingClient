import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddpicturesComponent } from './addpictures.component';
import { DropzoneComponent, DropzoneModule } from 'ngx-dropzone-wrapper';
import { TestingModule } from '../../../../../../testing/utils';
import { CoreModule } from '../../../../../core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

describe('AddpicturesComponent', () => {
  let component: AddpicturesComponent;
  let fixture: ComponentFixture<AddpicturesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CoreModule, TestingModule],
      declarations: [AddpicturesComponent],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddpicturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
