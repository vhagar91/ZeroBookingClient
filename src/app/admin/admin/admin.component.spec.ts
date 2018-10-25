import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminComponent } from './admin.component';
import { TestingModule } from '@testing/utils';
import { CoreModule } from '@app/core';
import { MatExpansionModule, MatMenuModule } from '@angular/material';
import { AvatarModule } from 'ngx-avatar';

describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CoreModule,
        TestingModule,
        MatExpansionModule,
        AvatarModule,
        MatMenuModule
      ],
      declarations: [AdminComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
