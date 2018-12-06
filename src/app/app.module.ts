import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { StaticModule } from '@app/modules/zeroapp';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminModule } from '@app/modules/admin/admin.module';
import { LoaderComponent } from '@app/core/loader/loader.component';
import { LoginComponent } from '@app/modules/admin/login/login.component';
import { SharedModule } from '@app/shared';
import { AdminGuard } from '@app/modules/admin/admin.guard';

@NgModule({
  imports: [
    // angular
    BrowserAnimationsModule,
    BrowserModule,

    // features
    StaticModule,
    AdminModule,
    // core & shared
    SharedModule,
    // app
    AppRoutingModule
  ],
  declarations: [AppComponent, LoaderComponent, LoginComponent],
  providers: [AdminGuard],
  bootstrap: [AppComponent]
})
export class AppModule {}
