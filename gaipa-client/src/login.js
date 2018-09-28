import { AuthService } from './services/auth';
import { inject } from "aurelia-framework";
import { Router } from "aurelia-router";
import { EventAggregator } from 'aurelia-event-aggregator';


@inject(Router, AuthService, EventAggregator)
export class Login {
  login = '';
  password = '';

  constructor(router, authService, eventAggregator) {
    this.router = router;
    this.auth = authService;
    this.eventAggregator = eventAggregator;
  }

  logIn() {
    this.auth.logIn(this.login, this.password)
      .then(
        tokenResult => {
          if (tokenResult.isSuccess) {
            this.error = '';
            this.eventAggregator.publish(
              'user-changed', {userName: this.login}
            );
            this.router.navigateToRoute('overview');
          } else {
            this.error = tokenResult.message;
          }
        }
      )
      .catch(error => {
        let errorMsg = JSON.parse(error.response).error;
        this.eventAggregator.publish(
          'status-message', {message: errorMsg.message, type: 'error'}
        );
        console.log(errorMsg.message);
      });
  }

}
