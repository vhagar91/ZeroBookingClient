import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminComponent } from '@app/modules/admin';
import { TestingModule } from '@testing/utils';
import { CoreModule } from '@app/core';
import { MatExpansionModule, MatMenuModule } from '@angular/material';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { SidemenuComponent } from '@app/modules/admin/layout/core/sidemenu/sidemenu.component';
import { ToolbarComponent } from '@app/modules/admin/layout/core/toolbar/toolbar.component';
import { SidemenuItemComponent } from '@app/modules/admin/layout/core/sidemenu-item/sidemenu-item.component';
import { UserMenuComponent } from '@app/modules/admin/layout/core/user-menu/user-menu.component';
import { ToolbarNotificationComponent } from '@app/modules/admin/layout/core/toolbar-notification/toolbar-notification.component';
import { FlexLayoutModule } from '@angular/flex-layout';

describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;

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
        AdminComponent,
        SidemenuComponent,
        ToolbarComponent,
        SidemenuItemComponent,
        UserMenuComponent
      ]
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
