import { inject } from "aurelia-framework";
import {Router} from 'aurelia-router';
import {ContentApi} from './api';


@inject(ContentApi, Router)
export class Search {
  heading = 'Search';
  constructor(contentApi, router) {
    this.api = contentApi;
    this.router = router;
    this.baseUrl = __GAIPA_API__ + '/app';
    this.items = [];
  }

  bind() {
    this.items = this.search();
  }

  search(searchableText, types) {
    //let path = '/@search?sort_on=path,portal_type=SolutionArticle';
    let path = '/@search?portal_type=SolutionArticle&sort_on=path&metadata_fields=modified';
    this.api.search(path)
      .then(
        items => this.items = items
      )
      .catch(error => {
        this.error = error.message;
      });
  }

}
