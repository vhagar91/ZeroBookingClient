import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SidemenuItemComponent } from './sidemenu-item.component';
import { CoreModule } from '@app/core';
import { MatExpansionModule, MatMenuModule } from '@angular/material';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { TestingModule } from '@testing/utils';
import { FlexLayoutModule } from '@angular/flex-layout';
import { By } from 'protractor';
import { menus } from '@app/modules/admin/layout/core/sidemenu/menu-element';

describe('SidemenuItemComponent', () => {
  let component: SidemenuItemComponent;
  let fixture: ComponentFixture<SidemenuItemComponent>;

  // mock the hero supplied by the parent component
  const expectedMenu = menus;

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
      declarations: [SidemenuItemComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidemenuItemComponent);
    component = fixture.componentInstance;
    // simulate the parent setting the input property with that hero
    component.menu = expectedMenu;

    // trigger initial data binding
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should display menu items', () => {
    expect(component.menu).toBe(expectedMenu);
  });
});
