import {
  inject
} from 'aurelia-framework';
import {
  AuthService
} from './services/auth';
import {
  Router
} from 'aurelia-router';
import {
  EventAggregator
} from 'aurelia-event-aggregator';


@inject(Router, AuthService, EventAggregator)
export class NavBar {
  constructor(router, authService, eventAggregator) {
    this.auth = authService;
    this.router = router;
    this.eventAggregator = eventAggregator;
  }

  bind() {
    this.user = this.auth.getUser();
  }

  attached() {
    this.userChanged = this.subscribe();
  }

  subscribe() {
    this.eventAggregator.subscribe('user-changed', s => {
      this.user = this.auth.getUser();
    });
  }

  detached() {
    this.userChanged.dispose();
  }

  logOut() {
    this.auth.logOut();
    this.user = undefined;
    this.router.navigateToRoute('login');
  }
}
