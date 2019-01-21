import { NgModule, Optional, SkipSelf, ErrorHandler } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { environment } from '@env/environment';
import { LocalStorageService } from './local-storage/local-storage.service';
import { AuthEffects } from './auth/auth.effects';
import { AuthGuardService } from './auth/auth-guard.service';
import { AnimationsService } from './animations/animations.service';
import { SeoService } from './seo/seo.service';
import { reducers, metaReducers } from './core.state';
import { AppErrorHandler } from './error-handler/app-error-handler.service';
import { httpInterceptorProviders } from '@app/core/http-interceptors';
import {
  StoreRouterConnectingModule,
  RouterStateSerializer
} from '@ngrx/router-store';
import { CustomSerializer } from './router/custom-serializer';
import { AuthService } from '@app/core/auth/auth.service';
import { Error } from 'tslint/lib/error';
import { BreadcrumbComponent } from '../admin/breadcrumb/breadcrumb.component';
import { LoaderService } from '@app/core/loader/loader.service';
import { CurrencyCustomPipe } from './pipes/currency.pipe';
import { CurrencyService } from '@app/core/currency-exchange/currency.service';
import { NotificationService } from '@app/core/notifications/notification.service';

@NgModule({
  imports: [
    // angular
    CommonModule,
    HttpClientModule,

    // ngrx
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreRouterConnectingModule.forRoot(),
    EffectsModule.forRoot([AuthEffects]),
    environment.production
      ? []
      : StoreDevtoolsModule.instrument({
          name: 'Zero'
        }),

    // 3rd party
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  declarations: [CurrencyCustomPipe],
  providers: [
    NotificationService,
    LocalStorageService,
    AuthGuardService,
    AnimationsService,
    httpInterceptorProviders,
    SeoService,
    LoaderService,
    CurrencyPipe,
    CurrencyService,
    AuthService,
    { provide: ErrorHandler, useClass: AppErrorHandler },
    { provide: RouterStateSerializer, useClass: CustomSerializer }
  ],
  exports: [TranslateModule, CurrencyCustomPipe]
})
export class CoreModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: CoreModule
  ) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import only in AppModule');
    }
  }
}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(
    http,
    `${environment.i18nPrefix}/assets/i18n/`,
    '.json'
  );
}
