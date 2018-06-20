import {PLATFORM} from 'aurelia-pal';

export class App {
  primaryColor = '#9b924c';
  accentColor = '#f7a500';
  errorColor = '#FF0000';

  configureRouter(config, router) {
    config.title = 'gaipa';
    config.map([
      { route: ['', 'home'], name: 'overview',      moduleId: PLATFORM.moduleName('./home'),      nav: true, title: 'Home' },
      { route: 'settings',  name: 'settings', moduleId: PLATFORM.moduleName('./settings'), nav: true, title: 'Settings' },
      { route: 'search',  name: 'search', moduleId: PLATFORM.moduleName('./search'), nav: false, title: 'Search' }
    ]);

    this.router = router;
  }
}
