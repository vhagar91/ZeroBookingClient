const packageJson = require('../../package.json');

export const environment = {
  appName: 'Zero App',
  envName: 'PROD',
  production: true,
  BaseUrl: 'https://zerofeeapi.herokuapp.com/',
  apiKey: 'fd3e3acc-c99d-48ed-80d5-12e749f4dbe2',
  test: false,
  i18nPrefix: '/zeroapp',
  versions: {
    app: packageJson.version,
    angular: packageJson.dependencies['@angular/core'],
    ngrx: packageJson.dependencies['@ngrx/store'],
    material: packageJson.dependencies['@angular/material'],
    bootstrap: packageJson.dependencies.bootstrap,
    rxjs: packageJson.dependencies.rxjs,
    ngxtranslate: packageJson.dependencies['@ngx-translate/core'],
    fontAwesome:
      packageJson.dependencies['@fortawesome/fontawesome-free-webfonts'],
    angularCli: packageJson.devDependencies['@angular/cli'],
    typescript: packageJson.devDependencies['typescript'],
    cypress: packageJson.devDependencies['cypress']
  }
};
