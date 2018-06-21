import {activationStrategy} from 'aurelia-router';


export class NavAssistantCard {
  constructor() {
    this.message = 'Hello world';
  }

  activate(params) {
    this.path = params.path;
    console.log(params);
  }

  determineActivationStrategy() {
    return activationStrategy.replace;
  }
}
