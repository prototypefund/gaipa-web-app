import { BaseView } from './base';
import {
  AuthService
} from './services/auth';
import {
  inject
} from 'aurelia-framework';


@inject(AuthService)
export class Profile extends BaseView {
  constructor(authService, ...rest) {
    super(...rest);
    this.auth = authService;
  }

  bind() {
    this.user = this.auth.getUser();
  }

  logOut() {
    this.auth.logOut();
    this.user = undefined;
    this.router.navigateToRoute('login');
  }
}
