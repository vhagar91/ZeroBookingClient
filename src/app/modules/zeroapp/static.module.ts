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
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { DEFAULT_PERFECT_SCROLLBAR_CONFIG } from '@app/core/app.config';
import { FooterComponent } from './footer/footer.component';
import { ListingcardComponent } from './listingcard/listingcard.component';
import { HomeComponent } from './home/home.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HeaderComponent } from './home/header/header.component';
import { SearchboxComponent } from './home/searchbox/searchbox.component';
import { Error404Component } from '@app/shared/404/error-404.component';

@NgModule({
  imports: [
    // angular
    BrowserAnimationsModule,
    BrowserModule,
    // core & shared
    CoreModule,
    SharedModule,
    FlexLayoutModule,
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
    Error404Component,
    FooterComponent,
    ListingcardComponent,
    HomeComponent,
    HeaderComponent,
    SearchboxComponent
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ]
})
export class StaticModule {}
