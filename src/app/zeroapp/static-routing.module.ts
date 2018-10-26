import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { FeaturesComponent } from './features/features.component';
import { SettingsContainerComponent } from '@app/settings';
import { Error404PageComponent } from '@app/shared/error404-page/error404-page.component';
import { AppConfig } from '@app/core/app.config';

export const routes: Routes = [
  {
    path: 'home',
    redirectTo: 'home/about',
    pathMatch: 'full'
  },
  {
    path: 'about',
    component: AboutComponent,
    data: { title: 'zerofee-app.menu.about' }
  },
  {
    path: 'features',
    component: FeaturesComponent,
    data: { title: 'zerofee-app.menu.features' }
  },
  { path: AppConfig.routes.error404, component: Error404PageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaticRoutingModule {}
