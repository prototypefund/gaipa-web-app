import {
  PloneRegistrationService
} from "./services/plone-registration";
import {
  Router
} from "aurelia-router";
import {
  inject
} from 'aurelia-framework';
import {
  EventAggregator
} from 'aurelia-event-aggregator';


@inject(PloneRegistrationService, Router, EventAggregator)
export class Register {
  email = '';
  fullname = '';
  username = '';

  constructor(ploneRegistrationService, router, eventAggregator) {
    this.router = router;
    this.ploneRegistrationService = ploneRegistrationService;
    this.eventAggregator = eventAggregator;
  }

  registerUser() {
    console.log(`register user ${this.email} - ${this.fullname}`);
    this.ploneRegistrationService.registerUser(this.email, this.fullname)
      .then(response => response)
      .then(result => {
        if (result.isSuccess) {
          this.eventAggregator.publish(
            'status-message', {
              message: `User "${this.email}" registered, please check you email for the activation link!`,
              type: 'info'
            }
          );
          this.router.navigateToRoute('overview');
        }
      })
      .catch(error => {
        debugger;
        let errorMsg = JSON.parse(error.response).error;
        this.eventAggregator.publish(
          'status-message', {
            message: errorMsg.message,
            type: 'error'
          }
        );
      });
  }
}
