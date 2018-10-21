import { environment as env } from '@env/environment';
import { Feature } from './features.model';

export const features: Feature[] = [
  {
    name: 'Angular',
    version: env.versions.angular,
    description: 'zerofee-app.features.angular',
    github: 'https://github.com/angular/angular',
    documentation: 'https://angular.io/docs/ts/latest/'
  },
  {
    name: 'Angular Material',
    version: env.versions.material,
    description: 'zerofee-app.features.angular-material',
    github: 'https://github.com/angular/material2/',
    documentation: 'https://material.angular.io/'
  },
  {
    name: 'Angular Cli',
    version: env.versions.angularCli,
    description: 'zerofee-app.features.angular-cli',
    github: 'https://github.com/angular/angular-cli',
    documentation: 'https://cli.angular.io/'
  },
  {
    name: 'NgRx',
    version: env.versions.ngrx,
    description: 'zerofee-app.features.ngrx',
    github: 'https://github.com/ngrx/platform',
    documentation: 'http://ngrx.github.io/',
    medium:
      'https://medium.com/@tomastrajan/object-assign-vs-object-spread-in-angular-ngrx-reducers-3d62ecb4a4b0'
  },
  {
    name: 'RxJS',
    version: env.versions.rxjs,
    description: 'zerofee-app.features.rxjs',
    github: 'https://github.com/ReactiveX/RxJS',
    documentation: 'http://reactivex.io/rxjs/',
    medium:
      'https://medium.com/@tomastrajan/practical-rxjs-in-the-wild-requests-with-concatmap-vs-mergemap-vs-forkjoin-11e5b2efe293'
  },
  {
    name: 'Bootstrap',
    version: env.versions.bootstrap,
    description: 'zerofee-app.features.bootstrap',
    github: 'https://github.com/twbs/bootstrap',
    documentation: 'https://getbootstrap.com/docs/4.0/layout/grid/',
    medium:
      'https://medium.com/@tomastrajan/how-to-build-responsive-layouts-with-bootstrap-4-and-angular-6-cfbb108d797b'
  },
  {
    name: 'Typescript',
    version: env.versions.typescript,
    description: 'zerofee-app.features.typescript',
    github: 'https://github.com/Microsoft/TypeScript',
    documentation: 'https://www.typescriptlang.org/docs/home.html'
  },
  {
    name: 'I18n',
    version: env.versions.ngxtranslate,
    description: 'zerofee-app.features.ngxtranslate',
    github: 'https://github.com/ngx-translate/core',
    documentation: 'http://www.ngx-translate.com/'
  },
  {
    name: 'Font Awesome 5',
    version: env.versions.fontAwesome,
    description: 'zerofee-app.features.fontawesome',
    github: 'https://github.com/FortAwesome/Font-Awesome',
    documentation: 'https://fontawesome.com/icons'
  },
  {
    name: 'Cypress',
    version: env.versions.cypress,
    description: 'zerofee-app.features.cypress',
    github: 'https://github.com/cypress-io/cypress',
    documentation: 'https://www.cypress.io/'
  },
  {
    name: 'zerofee-app.features.themes.title',
    description: 'zerofee-app.features.themes',
    documentation: 'https://material.angular.io/guide/theming',
    medium:
      'https://medium.com/@tomastrajan/the-complete-guide-to-angular-material-themes-4d165a9d24d1'
  },
  {
    name: 'zerofee-app.features.lazyloading.title',
    description: 'zerofee-app.features.lazyloading',
    documentation:
      'https://angular.io/guide/router#lazy-loading-route-configuration'
  }
];
