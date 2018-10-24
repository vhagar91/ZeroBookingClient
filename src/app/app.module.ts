import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { StaticModule } from './home';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminModule } from '@app/admin/admin.module';
import { BreadcrumbComponent } from '@app/admin/breadcrumb/breadcrumb.component';
import { LoaderComponent } from '@app/core/loader/loader.component';
import { LoginComponent } from '@app/admin/login/login.component';
import { SharedModule } from '@app/shared';
import { AdminGuard } from '@app/admin/admin.guard';

@NgModule({
  imports: [
    // angular
    BrowserAnimationsModule,
    BrowserModule,
    // features
    StaticModule,
    AdminModule,
    SharedModule,
    // app
    AppRoutingModule
  ],
  declarations: [AppComponent, LoaderComponent, LoginComponent],
  providers: [AdminGuard],
  bootstrap: [AppComponent]
})
export class AppModule {}
