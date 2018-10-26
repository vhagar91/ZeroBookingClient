import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from '@app/zeroapp/layout/main.component';
import { routes as MainRoutes } from '@app/zeroapp';
import { routes as AdminRoutes } from '@app/admin';
import { AdminComponent } from '@app/admin/layout/admin.component';
import { LoginComponent } from '@app/admin/login/login.component';
import { AdminGuard } from '@app/admin/admin.guard';
import { ProfileComponent } from '@app/admin/profile/profile.component';
import { AppConfig } from '@app/core/app.config';
import { Error404PageComponent } from '@app/shared/error404-page/error404-page.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home/about',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: MainComponent,
    children: MainRoutes
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AdminGuard],
    children: AdminRoutes,
    data: { title: 'zerofee-app.title.admin' }
  },

  // otherwise redirect to 404
  { path: '**', redirectTo: 'zeroapp/' + AppConfig.routes.error404 }
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
