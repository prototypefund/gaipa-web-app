import { bindable, inject } from "aurelia-framework";
import {activationStrategy} from 'aurelia-router';
import {Router} from 'aurelia-router';
import {ContentApi} from './api';


@inject(ContentApi, Router)
export class NavAssistantCard {
  constructor(gaipaContentApi, router) {
    this.contentApi = gaipaContentApi;
    this.baseUrl = __GAIPA_API__ + '/app';
    this.router = router;
    this.pathrd = null;
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

  getCard(child) {
    let error = '';
    let path = this.path;
    this.contentApi.getCard('/card' + path + '?expand=related-articles')
      .then(
        card => {
          this.card = card;
          this.relatedArticles = card['@components']['related-articles'].items;
        }
      )
      .catch(error => {
        this.error = error.message;
      });
  }

  navigateToCard(child) {
    let path = child['@id'];
    path = path.replace(this.baseUrl, '');
    this.router.navigate(path)
    //this.router.navigateToRoute('card', {path: path});
  }

  navigateToSolution(solution) {
    let path = solution['@id']
    path = path.replace(this.baseUrl, '');
    this.router.navigate(path)
    //this.router.navigateToRoute('solution', {id: id});
  }

  determineActivationStrategy() {
    return activationStrategy.replace;
  }
}
