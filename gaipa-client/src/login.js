import { AuthService } from './services/auth';
import { inject } from "aurelia-framework";
import { Router } from "aurelia-router";



@inject(Router, AuthService)
export class Login {
  login = '';
  password = '';

  constructor(router, authService) {
    this.router = router;
    this.auth = authService;
  }

  logIn() {
    console.log(`login: ${this.login} password: ${this.password}`);
    this.auth.logIn(this.login, this.password)
      .then(
        tokenResult => {
          if (tokenResult.isSuccess) {
            this.error = '';
            this.router.navigateToRoute('overview');
          } else {
            this.error = tokenResult.message;
          }
        }
      )
      .catch(error => {
        debugger;
        this.error = error.message;
      });
  }

}
