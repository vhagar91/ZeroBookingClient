import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PicturesComponent } from './pictures.component';
import { TestingModule } from '@testing/utils';
import { CoreModule } from '@app/core';

describe('PicturesComponent', () => {
  let component: PicturesComponent;
  let fixture: ComponentFixture<PicturesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CoreModule, TestingModule],
      declarations: [PicturesComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PicturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
