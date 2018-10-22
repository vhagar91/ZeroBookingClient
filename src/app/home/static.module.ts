import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared';
import { StaticRoutingModule } from './static-routing.module';
import { AboutComponent } from './about/about.component';
import { FeaturesComponent } from './features/features.component';
import { MainComponent } from './main/main.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { SettingsModule } from '@app/settings';
import { CoreModule } from '@app/core';

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
    // app
    StaticRoutingModule
  ],
  declarations: [AboutComponent, FeaturesComponent, MainComponent]
})
export class StaticModule {}
