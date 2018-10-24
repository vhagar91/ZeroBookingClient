import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from '@app/home/main/main.component';
import { routes as MainRoutes } from '@app/home';
import { routes as AdminRoutes } from '@app/admin';
import { AdminComponent } from '@app/admin/admin/admin.component';
import { LoginComponent } from '@app/admin/login/login.component';
import { AdminGuard } from '@app/admin/admin.guard';

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
  {
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: false,
      scrollPositionRestoration: 'enabled'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
