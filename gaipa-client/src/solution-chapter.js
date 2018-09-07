import { bindable, inject } from "aurelia-framework";
import {Router} from 'aurelia-router';
import {ContentApi} from './api';


@inject(ContentApi, Router)
export class SolutionChapter {
  constructor(gaipaContentApi, router) {
    this.contentApi = gaipaContentApi;
    this.router = router;
    this.baseUrl = __GAIPA_API__ + '/app';
  }

  activate(params) {
    this.articleId = params.articleId;
    this.chapterId = params.chapterId;
  }

  bind() {
    this.getChapterData('/solution/' + this.articleId + '/' + this.chapterId);
  }

  getChapterData(path) {
    this.contentApi.getChapter(path + '?expand=related-services')
      .then(
        chapter => {
          this.chapter = chapter;
          this.relatedServices = chapter['@components']['related-services'].items;
        }
      )
      .catch(error => {
        this.error = error.message;
      });
  }

  navigateToArticle(parent) {
    let path = parent['@id'];
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
