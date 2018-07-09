import { bindable, inject } from "aurelia-framework";
import {activationStrategy} from 'aurelia-router';
import {Router} from 'aurelia-router';
import {ContentApi} from './api';


@inject(ContentApi, Router)
export class NavAssistantCard {
  constructor(gaipaContentApi, router) {
    this.contentApi = gaipaContentApi;
    this.router = router;
    this.card = null;
    this.path = '';
  }

  activate(params) {
    this.path = params.path;
    if (!this.path.startsWith('/')) {
      this.path = '/' + this.path;
    }
    console.log(this.path);
  }

  bind() {
    this.getCard(this.path);
  }

  navigateToCard(child) {
    let path = child['@id'];
    path = path.substring(
      path.indexOf(this.router.currentInstruction.fragment)
    );
    //this.router.navigate(path)
    path = path.replace('/card/', '');
    this.router.navigateToRoute('card', {path: path});
  }

  getCard(child) {
    let path = this.path;
    this.contentApi.getCard('/card' + path).then(
      card => this.card = card
    );
  }

  navigateToSolution(solution) {
    //this.router.navigate(path)
    let id = solution['@id'].split('/').slice(-1)[0]
    this.router.navigateToRoute('solution', {id: id});
  }

  determineActivationStrategy() {
    return activationStrategy.replace;
  }
}
