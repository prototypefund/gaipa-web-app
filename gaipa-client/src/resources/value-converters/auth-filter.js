import {
  AuthService
} from '../../services/auth';
import {
  inject
} from 'aurelia-framework';


@inject(AuthService)
export class AuthFilterValueConverter {

  constructor(authService) {
    this.auth = authService;
  }

  toView(routes) {
    let isAuthenticated = this.auth.isLoggedIn();
    //let isAdmin = isAuthenticated && this.auth.getUser().admin;

    return routes.filter(r => r.settings.auth === undefined ||
      (r.settings.auth === isAuthenticated &&
        (!r.settings.admin || isAdmin)));
  }
}
