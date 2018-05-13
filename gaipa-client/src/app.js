import {PLATFORM} from 'aurelia-pal';

export class App {
  primaryColor = '#ee6e73';
  accentColor = '#009688';
  errorColor = '#FF0000';

  configureRouter(config, router) {
    config.title = 'gaipa';
    config.map([
      { route: ['', 'home'], name: 'overview',      moduleId: PLATFORM.moduleName('./home'),      nav: true, title: 'Home' },
      { route: 'settings',  name: 'settings', moduleId: PLATFORM.moduleName('./settings'), nav: true, title: 'Settings' }
    ]);

    this.router = router;
  }
}
