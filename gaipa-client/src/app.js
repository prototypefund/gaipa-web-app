import {PLATFORM, DOM} from 'aurelia-pal';
import { inject } from "aurelia-framework";

@inject(Element)
export class App {
  primaryColor = '#09943d';
  accentColor = '#f7a500';
  errorColor = '#FF0000';

  constructor(element) {
    this.element = element;
    this.element.style.setProperty('--primary-color', this.primaryColor);
    this.element.style.setProperty('--accent-color', this.accentColor);
    this.element.style.setProperty('--error-color', this.errorColor);

  }

  configureRouter(config, router) {
    config.title = 'gaipa';
    config.options.pushState = true;
    config.options.root = '/';
    config.map([
      { route: '', name: 'overview', moduleId: PLATFORM.moduleName('./home'),      nav: true, title: 'Home' },
      { route: 'home', redirect: ''},
      { route: 'card/*path', name: 'card', moduleId: PLATFORM.moduleName('./nav-assistant-card'), nav: false, title: 'Nav assistant card' },
      { route: 'solution/:articleId', name: 'article', moduleId: PLATFORM.moduleName('./solution-article'), nav: false, title: 'Solution Article' },
      { route: 'solution/:articleId/:chapterId', name: 'chapter', moduleId: PLATFORM.moduleName('./solution-chapter'), nav: false, title: 'Solution Chapter' },
      { route: 'provider/:providerId/service/:serviceId', name: 'service', moduleId: PLATFORM.moduleName('./solution-service'), nav: false, title: 'Solution Service' },
      { route: 'settings', name: 'settings', moduleId: PLATFORM.moduleName('./settings'), nav: true, title: 'Settings' },
      { route: 'search', name: 'search', moduleId: PLATFORM.moduleName('./search'), nav: false, title: 'Search' }
    ]);

    this.router = router;
  }
}

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/custom-sw-name.js').then(registration => {
      console.log('SW registered: ', registration);
    }).catch(error => {
      console.log('SW registration failed: ', error);
    });
  });
}
