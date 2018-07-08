import { bindable, inject } from "aurelia-framework";
import {activationStrategy} from 'aurelia-router';
import {ContentApi} from './api';


@inject(ContentApi)
export class SolutionArticle {
  constructor(gaipaContentApi) {
    this.contentApi = gaipaContentApi;
    this.solution = {};
    this.services = [];
  }

  activate(params) {
    this.solutionId = params.id;
  }

  bind() {
    this.getSolutionData('/solution/' + this.solutionId);
  }

  attached() {
    this.getSolutionServices(this.solution.solution_category);
  }

  navigateToSolution(child) {
    let path = child['@id'];
    path = path.substring(
      path.indexOf(this.router.currentInstruction.fragment)
    );
    //this.router.navigate(path)
    this.router.navigateToRoute('card', {path: path});
  }

  getSolutionData(path) {
    this.contentApi.getSolution(path).then(
      solution => this.solution = solution
    );
  }

  getSolutionServices(category) {
    this.contentApi.getSolutionServices(category).then(
      services => this.services = services
    );
  }
}
