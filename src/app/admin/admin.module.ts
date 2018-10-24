import { NgModule } from '@angular/core';
import { StaticRoutingModule } from '@app/home/static-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from '@app/shared';
import { CoreModule } from '@app/core';
import { AdminComponent } from '@app/admin/admin/admin.component';
import { RouterModule } from '@angular/router';
import { BreadcrumbComponent } from '@app/admin/breadcrumb/breadcrumb.component';
import {
  MatExpansionModule,
  MatPaginatorModule,
  MatTableDataSource,
  MatTableModule
} from '@angular/material';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { UsersComponent } from './users/users.component';
import { SettingsEffects } from '@app/settings/settings.effects';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { settingsReducer } from '@app/settings/settings.reducer';
import { adminReducers } from '@app/admin/admin.state';
import { AuthEffects } from '@app/core/auth/auth.effects';
import { UsersEffects } from '@app/admin/users/reducer/users.effects';
import { UsersService } from '@app/admin/users/service/users.service';

@NgModule({
  imports: [
    // angular
    BrowserAnimationsModule,
    BrowserModule,
    MatTableModule,
    MatPaginatorModule,
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
  providers: [UsersService],
  declarations: [AdminComponent, UsersComponent]
})
export class AdminModule {}
