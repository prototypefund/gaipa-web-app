import { inject } from "aurelia-framework";
import {Router} from 'aurelia-router';
import {ContentApi} from './api';


@inject(ContentApi, Router)
export class Search {
  heading = 'Search';
  constructor(contentApi, router) {
    this.api = contentApi;
    this.router = router;
    this.baseUrl = __GAIPA_API__;
  }

}
