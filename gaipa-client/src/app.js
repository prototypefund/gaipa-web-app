import {PLATFORM, DOM} from 'aurelia-pal';
import { inject } from "aurelia-framework";
import { HttpClient } from "aurelia-fetch-client";
import { AuthService } from './services/auth';


@inject(Element, HttpClient, AuthService)
export class App {
  primaryColor = '#9b924c';
  accentColor = '#f7a500';
  errorColor = '#FF0000';
  loading = false;

  constructor(element, httpFetch, authService) {
    this.element = element;
    this.element.style.setProperty('--primary-color', this.primaryColor);
    this.element.style.setProperty('--accent-color', this.accentColor);
    this.element.style.setProperty('--error-color', this.errorColor);

    this.auth = authService;
    const baseUrl = __GAIPA_API__;
    httpFetch.configure(config => {
      config
        .withBaseUrl(baseUrl)
        .withDefaults({
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-Requested-With': 'Fetch'
          }
        })
        .withInterceptor(this.auth.tokenInterceptor());
    });
  }


  configureRouter(config, router) {
    config.title = 'gaipa';
    config.options.pushState = true;
    config.options.root = '/';
    config.map([
      { route: '', name: 'overview', moduleId: PLATFORM.moduleName('./home'), nav: false, title: 'Home', settings: {icon: '../static/home.png'} },
      { route: 'home', redirect: ''},
      { route: 'card/*path', name: 'card', moduleId: PLATFORM.moduleName('./nav-assistant-card'), nav: false, title: 'Nav assistant card' },
      { route: 'solution/:articleId', name: 'article', moduleId: PLATFORM.moduleName('./solution-article'), nav: false, title: 'Solution Article' },
      { route: 'solution/:articleId/:chapterId', name: 'chapter', moduleId: PLATFORM.moduleName('./solution-chapter'), nav: false, title: 'Solution Chapter' },
      { route: 'provider/:providerId/service/:serviceId', name: 'service', moduleId: PLATFORM.moduleName('./solution-service'), nav: false, title: 'Solution Service' },
      { route: 'community', name: 'community', moduleId: PLATFORM.moduleName('./community'), nav: false, title: 'Community', settings: {icon: '../static/community.png'} },
      { route: 'settings', name: 'settings', moduleId: PLATFORM.moduleName('./settings'), nav: false, title: 'Settings' },
      { route: 'login', name: 'login', moduleId: PLATFORM.moduleName('./login'), nav: false, title: 'Login' },
      { route: 'register', name: 'register', moduleId: PLATFORM.moduleName('./register'), nav: false, title: 'Register' },
      { route: 'discourse-sso', name: 'discourse-sso', moduleId: PLATFORM.moduleName('./discourse-sso'), nav: false, title: 'Discourse SSO' },
      { route: 'profile', name: 'profile', moduleId: PLATFORM.moduleName('./profile'), nav: false, title: 'Profile' },
      { route: 'search', name: 'search', moduleId: PLATFORM.moduleName('./search'), nav: false, title: 'Search' },
      { route: 'download', name: 'download', moduleId: PLATFORM.moduleName('./download'), nav: false, title: 'Download' }
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
