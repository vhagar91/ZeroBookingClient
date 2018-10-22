import { NgModule } from '@angular/core';
import { StaticRoutingModule } from '@app/home/static-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from '@app/shared';
import { CoreModule } from '@app/core';
import { AdminComponent } from '@app/admin/admin/admin.component';
import { RouterModule } from '@angular/router';
import { BreadcrumbComponent } from '@app/admin/breadcrumb/breadcrumb.component';
import { MatExpansionModule } from '@angular/material';

@NgModule({
  imports: [
    // angular
    BrowserAnimationsModule,
    BrowserModule,
    // core & shared
    CoreModule,
    SharedModule,
    MatExpansionModule,

    // app
    StaticRoutingModule
  ],
  declarations: [AdminComponent]
})
export class AdminModule {}
