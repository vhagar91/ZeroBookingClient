import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared';
import { StaticRoutingModule } from './static-routing.module';
import { AboutComponent } from './about/about.component';
import { FeaturesComponent } from './features/features.component';
import { MainComponent } from './layout/main.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { SettingsModule } from '@app/settings';
import { CoreModule } from '@app/core';
import { Error404PageComponent } from '@app/shared/error404-page/error404-page.component';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { DEFAULT_PERFECT_SCROLLBAR_CONFIG } from '@app/core/app.config';

@NgModule({
  imports: [
    // angular
    BrowserAnimationsModule,
    BrowserModule,
    // core & shared
    CoreModule,
    SharedModule,
    // features
    SettingsModule,
    PerfectScrollbarModule,
    // app
    StaticRoutingModule
  ],
  declarations: [
    AboutComponent,
    FeaturesComponent,
    MainComponent,
    Error404PageComponent
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ]
})
export class StaticModule {}
