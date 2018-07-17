import { bindable, inject } from "aurelia-framework";
import {Router} from 'aurelia-router';
import {ContentApi} from './api';


@inject(ContentApi, Router)
export class SolutionArticle {
  constructor(gaipaContentApi, router) {
    this.contentApi = gaipaContentApi;
    this.router = router;
    this.solution = {};
    this.services = [];
    this.baseUrl = __GAIPA_API__;
  }

  activate(params) {
    this.solutionPath = params.path;
  }

  bind() {
    this.getSolutionData('/solution/' + this.solutionPath);
  }

  navigateToService(child) {
    let path = child['@id'];
    path = path.replace(this.baseUrl, '');
    this.router.navigate(path)
    //this.router.navigateToRoute('service', {path: path});
  }

  getSolutionData(path) {
    this.contentApi.getSolution(path).then(
      solution => {
        this.solution = solution;
        this.getSolutionServices(solution.solution_category.token);
      }
    );
  }

  getSolutionServices(category) {
    this.contentApi.getSolutionServices(category).then(
      services => this.services = services
    );
  }

  determineActivationStrategy() {
    return activationStrategy.replace;
  }
}
