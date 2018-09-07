import { bindable, inject } from "aurelia-framework";
import {Router} from 'aurelia-router';
import {ContentApi} from './api';


@inject(ContentApi, Router)
export class SolutionArticle {
  constructor(gaipaContentApi, router) {
    this.contentApi = gaipaContentApi;
    this.router = router;
    this.baseUrl = __GAIPA_API__ + '/app';
  }

  activate(params) {
    this.articleId = params.articleId;
  }

  bind() {
    this.getArticleData('/solution/' + this.articleId);
  }

  getArticleData(path) {
    this.contentApi.getArticle(path)
      .then(
        article => {
          this.article = article;
          //this.relatedServices = article['@components']['related-services'].items;
        }
      )
      .catch(error => {
        this.error = error.message;
      });
  }

  navigateToChapter(child) {
    let path = child['@id'];
    path = path.replace(this.baseUrl, '');
    this.router.navigate(path)
  }

  navigateToService(child) {
    let path = child['@id'];
    path = path.replace(this.baseUrl, '');
    this.router.navigate(path)
    //this.router.navigateToRoute('service', {path: path});
  }

  determineActivationStrategy() {
    return activationStrategy.replace;
  }
}
