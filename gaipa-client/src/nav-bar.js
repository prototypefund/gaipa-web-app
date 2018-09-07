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
export class NavBar {
  constructor(router, authService) {
    this.auth = authService;
    this.router = router;
  }

  bind() {
    this.user = this.auth.getUser();
    console.log(this.user);
  }

  logOut() {
    this.auth.logOut();
    this.user = undefined;
    this.router.navigateToRoute('login');
  }
}
