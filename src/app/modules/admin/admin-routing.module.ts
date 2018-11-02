import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SettingsContainerComponent } from '@app/settings';
import { UsersComponent } from '@app/modules/admin/users/users.component';
import { ProfileComponent } from '@app/modules/admin/profile/profile.component';
import { AppConfig } from '@app/core/app.config';
import { DashboardComponent } from '@app/modules/admin/dashboard/dashboard.component';

export const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    data: { title: 'zerofee-app.dashboard' }
  },
  {
    path: AppConfig.routes.adminSettings,
    component: SettingsContainerComponent,
    data: { title: 'zerofee-app.menu.settings' }
  },

  {
    path: AppConfig.routes.adminUsers,
    component: UsersComponent,
    data: { title: 'zerofee-app.title.users' }
  },

  {
    path: AppConfig.routes.profile + '/:id',
    component: ProfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
