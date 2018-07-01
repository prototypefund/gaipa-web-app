import { bindable, inject } from "aurelia-framework";
import {activationStrategy} from 'aurelia-router';
import {ContentApi} from './api';


@inject(ContentApi)
export class NavAssistantCard {
  constructor(gaipaContentApi) {
    this.contentApi = gaipaContentApi;
    this.data = {};
  }

  activate(params) {
    this.path = params.path;
    this.parentUrl = params.parentUrl;
  }

  bind() {
    let cardPath;
    debugger;
    if ( !this.path.startsWith('http') ) {
      // create first level path
      cardPath = '/cards/' + this.path;
    } else {
      path = this.path.substring(this.path.indexOf(this.parentUrl))
      cardPath = '/cards/' + path;
    }
    this.getCardData(cardPath);
  }

  getCardData(path) {
    this.contentApi.getCard(path).then(
      card => this.data = card
    );

  }

  determineActivationStrategy() {
    return activationStrategy.replace;
  }
}
