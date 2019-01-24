import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { routes as MainRoutes } from '@app/modules/zeroapp';
import { routes as AdminRoutes } from '@app/modules/admin';
import { AdminComponent } from '@app/modules/admin';
import { LoginComponent } from '@app/core/auth/components/login/login.component';
import { AdminGuard } from '@app/modules/admin/admin.guard';
import { AppConfig } from '@app/core/app.config';
import { MainComponent } from '@app/modules/zeroapp/layout/main.component';
import { Error404Component } from '@app/shared/404/error-404.component';
import { ForgotPasswordComponent } from '@app/core/auth/components/forgot-password/forgot-password.component';
import { MailConfirmComponent } from '@app/core/auth/components/mail-confirm/mail-confirm.component';
import { RegisterComponent } from '@app/core/auth/components/register/register.component';
import { ResetPasswordComponent } from '@app/core/auth/components/reset-password/reset-password.component';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'home/main',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: MainComponent,
    children: MainRoutes
  },
  { path: AppConfig.routes.error404, component: Error404Component },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent
  },
  {
    path: 'mail-confirmation',
    component: MailConfirmComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AdminGuard],
    children: AdminRoutes,
    data: { title: 'zerofee-app.title.admin' }
  },

  // otherwise redirect to 404
  { path: '**', redirectTo: AppConfig.routes.error404 }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: false,
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
