import {
  inject
} from 'aurelia-framework';
import {
  AuthService
} from './services/auth';
import {
  Router
} from 'aurelia-router';


@inject(Router, AuthService)
export class Logout {
  constructor(authService, router) {
    this.authService = authService;
    this.router = router;
  }

  bind() {
    this.doLogOut();
  }

  doLogOut() {
    this.authService.logLogUser();
    //this.router.navigateToRoute('overview');
  }
}
