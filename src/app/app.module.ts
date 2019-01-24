import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { StaticModule } from '@app/modules/zeroapp';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminModule } from '@app/modules/admin/admin.module';
import { LoaderComponent } from '@app/core/loader/loader.component';
import { LoginComponent } from '@app/core/auth/components/login/login.component';
import { SharedModule } from '@app/shared';
import { AdminGuard } from '@app/modules/admin/admin.guard';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ForgotPasswordComponent } from '@app/core/auth/components/forgot-password/forgot-password.component';
import { MailConfirmComponent } from '@app/core/auth/components/mail-confirm/mail-confirm.component';
import { RegisterComponent } from '@app/core/auth/components/register/register.component';
import { ResetPasswordComponent } from '@app/core/auth/components/reset-password/reset-password.component';

@NgModule({
  imports: [
    // angular
    BrowserAnimationsModule,
    BrowserModule,

    // features
    StaticModule,
    AdminModule,
    FlexLayoutModule,
    // core & shared
    SharedModule,
    // app
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    LoaderComponent,
    LoginComponent,
    ForgotPasswordComponent,
    MailConfirmComponent,
    RegisterComponent,
    ResetPasswordComponent
  ],
  providers: [AdminGuard],
  bootstrap: [AppComponent]
})
export class AppModule {}
