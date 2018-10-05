import { BaseView } from './base';
import {
  AuthService
} from './services/auth';
import {
  inject
} from 'aurelia-framework';
import {ContentApi} from './api';


@inject(AuthService, ContentApi)
export class Profile extends BaseView {
  constructor(authService, contentApi, ...rest) {
    super(...rest);
    this.auth = authService;
    this.contentApi = contentApi;
  }

  bind() {
    this.user = this.auth.getUser();
    this.userData = this.getUserData(this.user);
  }

  getUserData(user) {
    this.contentApi.getUserData(user)
      .then(
        userData => {
          this.userData = userData;
          console.log(userData);
        }
      )
      .catch(error => {
        this.error = error.message;
      });
  }

  logOut() {
    this.auth.logOut();
    this.user = undefined;
    this.eventAggregator.publish(
      'user-changed', {message: 'logged out'}
    );
    this.router.navigateToRoute('login');
  }
}
