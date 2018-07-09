import {PLATFORM} from 'aurelia-pal';

export class App {
  primaryColor = '#9b924c';
  accentColor = '#f7a500';
  errorColor = '#FF0000';

  configureRouter(config, router) {
    config.title = 'gaipa';
    config.options.pushState = true;
    config.options.root = '/';
    config.map([
      { route: '', name: 'overview', moduleId: PLATFORM.moduleName('./home'),      nav: true, title: 'Home' },
      { route: 'home', redirect: ''},
      { route: 'card/*path',  name: 'card', moduleId: PLATFORM.moduleName('./nav-assistant-card'), nav: false, title: 'Nav assistant card' },
      { route: 'solution/:id',  name: 'solution', moduleId: PLATFORM.moduleName('./solution-article'), nav: false, title: 'Solution Article' },
      { route: 'settings',  name: 'settings', moduleId: PLATFORM.moduleName('./settings'), nav: true, title: 'Settings' },
      { route: 'search',  name: 'search', moduleId: PLATFORM.moduleName('./search'), nav: false, title: 'Search' }
    ]);

    this.router = router;
  }
}
