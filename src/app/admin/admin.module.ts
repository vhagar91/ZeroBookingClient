import { NgModule } from '@angular/core';
import { StaticRoutingModule } from '@app/zeroapp/static-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from '@app/shared';
import { CoreModule } from '@app/core';
import { AdminComponent } from '@app/admin/layout/admin.component';
import { BreadcrumbComponent } from '@app/admin/breadcrumb/breadcrumb.component';
import {
  MatExpansionModule,
  MatMenuModule,
  MatPaginatorModule,
  MatTableDataSource,
  MatTableModule
} from '@angular/material';

import { UsersComponent } from './users/users.component';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { adminReducers } from '@app/admin/admin.state';

import { UsersEffects } from '@app/admin/users/reducer/users.effects';
import { UsersService } from '@app/admin/users/service/users.service';
import { AvatarModule } from 'ngx-avatar';
import {
  PERFECT_SCROLLBAR_CONFIG,
  PerfectScrollbarModule
} from 'ngx-perfect-scrollbar';
import { DEFAULT_PERFECT_SCROLLBAR_CONFIG } from '@app/core/app.config';
import { ProfileComponent } from '@app/admin/profile/profile.component';

@NgModule({
  imports: [
    // angular
    BrowserAnimationsModule,
    BrowserModule,
    MatTableModule,
    MatPaginatorModule,
    AvatarModule,
    MatMenuModule,
    PerfectScrollbarModule,
    // core & shared
    CoreModule,
    SharedModule,
    MatExpansionModule,
    // app
    StaticRoutingModule,
    // store
    StoreModule.forFeature('admin', adminReducers),
    EffectsModule.forFeature([UsersEffects])
  ],
  providers: [
    UsersService,
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ],
  declarations: [AdminComponent, UsersComponent, ProfileComponent]
})
export class AdminModule {}
