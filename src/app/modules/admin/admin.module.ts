import { NgModule } from '@angular/core';
import { StaticRoutingModule } from '@app/modules/zeroapp';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from '@app/shared';
import { CoreModule } from '@app/core';
import { AdminComponent } from '@app/modules/admin/layout/admin.component';
import { BreadcrumbComponent } from '@app/admin/breadcrumb/breadcrumb.component';
import {
  MatDialogModule,
  MatExpansionModule,
  MatMenuModule,
  MatPaginatorModule,
  MatTableDataSource,
  MatTableModule,
  MatGridListModule,
  MatCardModule,
  MatIconModule,
  MatButtonModule,
  MatToolbarModule,
  MatListModule,
  MatSortModule,
  MatInputModule,
  MatChipsModule,
  MatFormFieldModule,
  MatSidenavModule,
  MatTabsModule,
  MatSliderModule,
  MatProgressBarModule
} from '@angular/material';

import { UsersComponent } from '@app/modules/admin/users/users.component';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { adminReducers } from '@app/modules/admin/admin.state';

import { UsersEffects } from '@app/modules/admin/users/reducer/users.effects';
import { UsersService } from '@app/modules/admin/users/service/users.service';
import {
  PERFECT_SCROLLBAR_CONFIG,
  PerfectScrollbarModule
} from 'ngx-perfect-scrollbar';
import { DEFAULT_PERFECT_SCROLLBAR_CONFIG } from '@app/core/app.config';
import { ProfileComponent } from '@app/modules/admin/profile/profile.component';
import { ProfileEffects } from '@app/modules/admin/profile/reducer/profile.effects';
import { ProfileService } from '@app/modules/admin/profile/service/profile.service';
import { AddUserComponent } from './users/dialogs/adduser/adduser.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LayoutModule } from '@angular/cdk/layout';
import { FilterComponent } from './users/dialogs/filter/filter.component';
import { SidemenuComponent } from '@app/modules/admin/layout/core/sidemenu/sidemenu.component';
import { SidemenuItemComponent } from '@app/modules/admin/layout/core/sidemenu-item/sidemenu-item.component';
import { ToolbarComponent } from '@app/modules/admin/layout/core/toolbar/toolbar.component';
import { UserMenuComponent } from '@app/modules/admin/layout/core/user-menu/user-menu.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ListingComponent } from './listing/listing.component';
import { ListingDetailsComponent } from './listing/core/listing.details/listing.details.component';
import { ListingheaderComponent } from './listing/core/listingheader/listingheader.component';

@NgModule({
  imports: [
    // angular
    BrowserAnimationsModule,
    BrowserModule,
    MatTableModule,
    MatPaginatorModule,
    MatMenuModule,
    MatDialogModule,
    PerfectScrollbarModule,
    MatListModule,
    MatButtonModule,
    MatInputModule,
    MatChipsModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatSidenavModule,
    MatTabsModule,
    MatSliderModule,
    MatProgressBarModule,
    // core & shared
    CoreModule,
    SharedModule,
    MatExpansionModule,
    // app
    StaticRoutingModule,
    // store
    StoreModule.forFeature('admin', adminReducers),
    EffectsModule.forFeature([UsersEffects, ProfileEffects]),
    MatGridListModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,
    MatListModule,
    MatSortModule
  ],
  providers: [
    UsersService,
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
    ProfileService,
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ],
  entryComponents: [AddUserComponent, FilterComponent],
  declarations: [
    AdminComponent,
    UsersComponent,
    ProfileComponent,
    AddUserComponent,
    DashboardComponent,
    FilterComponent,
    SidemenuComponent,
    SidemenuItemComponent,
    ToolbarComponent,
    UserMenuComponent,
    ListingComponent,
    ListingDetailsComponent,
    ListingheaderComponent
  ],
  exports: [
    SidemenuComponent,
    SidemenuItemComponent,
    ToolbarComponent,
    UserMenuComponent
  ]
})
export class AdminModule {}
