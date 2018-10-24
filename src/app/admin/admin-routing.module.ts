import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SettingsContainerComponent } from '@app/settings';
import { UsersComponent } from '@app/admin/users/users.component';
export const routes: Routes = [
  {
    path: 'settings',
    component: SettingsContainerComponent,
    data: { title: 'zerofee-app.menu.settings' }
  },
  {
    path: 'users',
    component: UsersComponent,
    data: { title: 'zerofee-app.title.users' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
