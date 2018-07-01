import { bindable, inject } from "aurelia-framework";
import {activationStrategy} from 'aurelia-router';
import {ContentApi} from './api';


@inject(ContentApi)
export class SolutionArticle {
  constructor(gaipaContentApi) {
    this.contentApi = gaipaContentApi;
    this.data = {};
  }

  activate(params) {
    this.solutionId = params.id;
  }

  bind() {
    let path = this.solutionId;
    this.getSolutionData(this.solutionId);
  }

  getSolutionData(path) {
    this.contentApi.getSolution(path).then(
      solution => this.data = solution
    );

  }

}
