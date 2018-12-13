import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { routes as MainRoutes } from '@app/modules/zeroapp';
import { routes as AdminRoutes } from '@app/modules/admin';
import { AdminComponent } from '@app/modules/admin';
import { LoginComponent } from '@app/modules/admin/login/login.component';
import { AdminGuard } from '@app/modules/admin/admin.guard';
import { AppConfig } from '@app/core/app.config';
import { MainComponent } from '@app/modules/zeroapp/layout/main.component';
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
  { path: '**', redirectTo: 'home/' + AppConfig.routes.error404 }
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
