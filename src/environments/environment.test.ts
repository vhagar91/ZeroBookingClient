const packageJson = require('../../package.json');

export const environment = {
  appName: 'Zero App',
  envName: 'TEST',
  production: false,
  BaseUrl: 'http://localhost:8000/',
  apiKey: '00a32714-f553-4564-af67-1025e59573df',
  test: true,
  i18nPrefix: '',
  versions: {
    app: packageJson.version,
    angular: packageJson.dependencies['@angular/core'],
    ngrx: packageJson.dependencies['@ngrx/store'],
    material: packageJson.dependencies['@angular/material'],
    flex: packageJson.dependencies['@angular/flex-layout'],
    rxjs: packageJson.dependencies.rxjs,
    ngxtranslate: packageJson.dependencies['@ngx-translate/core'],
    fontAwesome: packageJson.dependencies['@fortawesome/fontawesome-free'],
    angularCli: packageJson.devDependencies['@angular/cli'],
    typescript: packageJson.devDependencies['typescript'],
    cypress: packageJson.devDependencies['cypress']
  }
};
